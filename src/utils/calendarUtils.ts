
import { addDays, format, differenceInWeeks } from 'date-fns';

type AppointmentInfo = {
  title: string;
  description: string;
  startDate: Date;
  duration: number; // in minutes
  location?: string;
};

/**
 * Generates calendar events for pregnancy checkups based on due date
 */
export function generatePregnancyAppointments(dueDate: Date, currentWeek: number): AppointmentInfo[] {
  const appointments: AppointmentInfo[] = [];
  const totalWeeks = 40;
  
  // Create array of weeks when appointments should occur
  const appointmentWeeks = [
    { week: 8, name: "Khám thai lần đầu" },
    { week: 12, name: "Siêu âm 3 tháng đầu" },
    { week: 16, name: "Khám thai định kỳ" },
    { week: 20, name: "Siêu âm hình thái" },
    { week: 24, name: "Khám thai định kỳ" },
    { week: 28, name: "Khám thai + Xét nghiệm đường huyết" },
    { week: 32, name: "Khám thai định kỳ" },
    { week: 36, name: "Khám thai + CTG" },
    { week: 37, name: "Khám thai hàng tuần" },
    { week: 38, name: "Khám thai hàng tuần" },
    { week: 39, name: "Khám thai hàng tuần" },
    { week: 40, name: "Dự kiến sinh" }
  ];
  
  // Filter out appointment weeks that have already passed
  const futureAppointments = appointmentWeeks.filter(apt => apt.week >= currentWeek);
  
  // Calculate the first day of pregnancy based on due date (40 weeks prior)
  const firstDayOfPregnancy = addDays(dueDate, -280);
  
  // Generate appointments
  futureAppointments.forEach(appointment => {
    // Calculate days since first day of pregnancy for this appointment
    const daysToAdd = appointment.week * 7;
    const appointmentDate = addDays(firstDayOfPregnancy, daysToAdd);
    
    appointments.push({
      title: appointment.name,
      description: `Thai kỳ tuần thứ ${appointment.week}`,
      startDate: appointmentDate,
      duration: 60, // 1 hour appointment
      location: ""
    });
  });
  
  return appointments;
}

/**
 * Generate iCalendar (ICS) file content
 */
export function generateICSContent(appointments: AppointmentInfo[]): string {
  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'CALSCALE:GREGORIAN',
    'PRODID:-//AnSinh//PregnancyTrackerApp//VN',
    'METHOD:PUBLISH',
  ].join('\r\n') + '\r\n';

  appointments.forEach(appointment => {
    const startDate = format(appointment.startDate, "yyyyMMdd'T'HHmmss");
    const endDate = format(
      addDays(appointment.startDate, 0), 
      "yyyyMMdd'T'HHmmss"
    );
    
    // Create event block
    const eventBlock = [
      'BEGIN:VEVENT',
      `UID:${Math.random().toString(36).substring(2, 15)}@ansinh.com`,
      `DTSTAMP:${format(new Date(), "yyyyMMdd'T'HHmmss")}`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      `SUMMARY:${appointment.title}`,
      `DESCRIPTION:${appointment.description}`,
      appointment.location ? `LOCATION:${appointment.location}` : '',
      'END:VEVENT'
    ].filter(Boolean).join('\r\n') + '\r\n';
    
    icsContent += eventBlock;
  });

  icsContent += 'END:VCALENDAR';
  return icsContent;
}

/**
 * Generate calendar file download URL
 */
export function generateCalendarURL(appointments: AppointmentInfo[], format: 'ics' | 'google'): string {
  if (format === 'ics') {
    const icsContent = generateICSContent(appointments);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    return URL.createObjectURL(blob);
  } else if (format === 'google') {
    // Return the URL of the first appointment for Google Calendar
    const firstAppt = appointments[0];
    if (!firstAppt) return '';
    
    // Format dates as primitive strings
    const startTimeStr = format(firstAppt.startDate, "yyyyMMdd'T'HHmmss");
    const endTimeStr = format(
      addDays(firstAppt.startDate, 0),
      "yyyyMMdd'T'HHmmss"
    );
    
    // Create date parameter with primitive string concatenation
    const dateParam = `${startTimeStr}/${endTimeStr}`;
    
    const googleCalUrl = new URL('https://calendar.google.com/calendar/render');
    googleCalUrl.searchParams.append('action', 'TEMPLATE');
    googleCalUrl.searchParams.append('text', firstAppt.title);
    googleCalUrl.searchParams.append('dates', dateParam);
    googleCalUrl.searchParams.append('details', firstAppt.description);
    if (firstAppt.location) {
      googleCalUrl.searchParams.append('location', firstAppt.location);
    }
    
    return googleCalUrl.toString();
  }
  
  return '';
}

/**
 * Detect device type
 */
export function detectDeviceType(): 'ios' | 'android' | 'desktop' {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  
  // iOS detection
  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
    return 'ios';
  }
  
  // Android detection
  if (/android/i.test(userAgent)) {
    return 'android';
  }
  
  // Default to desktop
  return 'desktop';
}

/**
 * Get optimal calendar format based on device
 */
export function getOptimalCalendarFormat(): 'ics' | 'google' {
  const device = detectDeviceType();
  
  // iOS devices work best with ICS
  if (device === 'ios') {
    return 'ics';
  }
  
  // Android devices work better with Google Calendar
  if (device === 'android') {
    return 'google';
  }
  
  // Desktop can use either, default to ICS
  return 'ics';
}
