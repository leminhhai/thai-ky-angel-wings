
import { useState } from 'react';
import { toast } from 'sonner';
import { 
  generatePregnancyAppointments,
  generateCalendarURL,
  getOptimalCalendarFormat
} from '@/utils/calendarUtils';

export const useCalendarDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadCalendar = (dueDate: Date, currentWeek: number) => {
    setIsDownloading(true);
    
    try {
      // Generate appointments
      const appointments = generatePregnancyAppointments(dueDate, currentWeek);
      
      if (appointments.length === 0) {
        toast.error("Không có lịch khám nào để tải xuống");
        setIsDownloading(false);
        return;
      }
      
      // Get optimal format based on device
      const format = getOptimalCalendarFormat();
      
      // Generate download URL
      const calendarUrl = generateCalendarURL(appointments, format);
      
      if (!calendarUrl) {
        toast.error("Không thể tạo lịch khám");
        setIsDownloading(false);
        return;
      }
      
      // Create download or open in new tab based on format
      if (format === 'ics') {
        // Create anchor element for download
        const a = document.createElement('a');
        a.href = calendarUrl;
        a.download = `LichThai_Tuan${currentWeek}.ics`;
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(calendarUrl);
        }, 100);
        
        toast.success("Đã tải xuống lịch khám thai");
      } else {
        // Open Google Calendar in new tab
        window.open(calendarUrl, '_blank');
        toast.success("Đã mở Google Calendar");
      }
    } catch (error) {
      console.error("Error generating calendar:", error);
      toast.error("Lỗi khi tạo lịch khám thai");
    } finally {
      setIsDownloading(false);
    }
  };

  return { downloadCalendar, isDownloading };
};

export default useCalendarDownload;
