
import { useLocation, Navigate } from "react-router-dom";
import Header from "@/components/pregnancy/PregnancyHeader";
import PregnancyInfo from "@/components/pregnancy/PregnancyInfo";
import { Button } from "@/components/ui/button";
import { Calendar, Download } from "lucide-react";
import { toast } from "sonner";
import { format, addWeeks } from "date-fns";
import { vi } from "date-fns/locale";

const PregnancyDetails = () => {
  const location = useLocation();
  const pregnancyData = location.state;

  if (!pregnancyData) {
    return <Navigate to="/" replace />;
  }

  const handleAddToCalendar = () => {
    const checkups = [8, 12, 16, 20, 24, 28, 32, 36].map(week => {
      const checkupDate = addWeeks(new Date(pregnancyData.lastPeriod), week);
      return {
        title: `Khám thai tuần ${week}`,
        date: format(checkupDate, 'yyyy-MM-dd'),
        description: `Lịch khám thai định kỳ tuần ${week}`,
      };
    });

    const isMobileIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isMobileIOS) {
      // Generate ICS file for iOS
      const icsContent = generateICSFile(checkups);
      downloadFile(icsContent, 'lich-kham-thai.ics', 'text/calendar');
    } else {
      // Generate CSV file for Android
      const csvContent = generateCSVFile(checkups);
      downloadFile(csvContent, 'lich-kham-thai.csv', 'text/csv');
    }
    
    toast.success("Đã tải xuống lịch khám thai. Vui lòng mở file để thêm vào lịch của bạn.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-baby-pink/20 to-transparent">
      <Header currentWeek={pregnancyData.currentWeek} dueDate={pregnancyData.dueDate} />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <PregnancyInfo {...pregnancyData} />
        
        <div className="fixed bottom-6 left-0 right-0 px-4">
          <Button 
            onClick={handleAddToCalendar} 
            className="w-full bg-baby-pink hover:bg-baby-pink/90 text-white"
            size="lg"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Thêm vào lịch
          </Button>
        </div>
      </main>
    </div>
  );
};

const generateICSFile = (checkups) => {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//An Sinh//Pregnancy Calendar//EN',
    ...checkups.map(checkup => [
      'BEGIN:VEVENT',
      `DTSTART;VALUE=DATE:${checkup.date.replace(/-/g, '')}`,
      `SUMMARY:${checkup.title}`,
      `DESCRIPTION:${checkup.description}`,
      'END:VEVENT'
    ].join('\n')),
    'END:VCALENDAR'
  ].join('\n');
  
  return icsContent;
};

const generateCSVFile = (checkups) => {
  const header = 'Subject,Start Date,Description\n';
  const rows = checkups.map(checkup => 
    `${checkup.title},${checkup.date},${checkup.description}`
  ).join('\n');
  
  return header + rows;
};

const downloadFile = (content: string, filename: string, type: string) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export default PregnancyDetails;
