
import { ArrowLeft, Bell, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import useNotifications from "@/hooks/useNotifications";
import useCalendarDownload from "@/hooks/useCalendarDownload";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { useState } from "react";

interface PregnancyHeaderProps {
  currentWeek: number;
  dueDate: Date;
}

const PregnancyHeader = ({ currentWeek, dueDate }: PregnancyHeaderProps) => {
  const navigate = useNavigate();
  const { subscribeToNotifications } = useNotifications();
  const { downloadCalendar, isDownloading } = useCalendarDownload();
  const isMobile = useIsMobile();
  const [showCalendarOptions, setShowCalendarOptions] = useState(false);

  const handleNotificationSubscription = async () => {
    try {
      const success = await subscribeToNotifications(new Date(dueDate));
      if (success) {
        toast.success("Đã bật thông báo thành công!", {
          description: "Bạn sẽ nhận được các thông báo quan trọng về thai kỳ."
        });
      }
    } catch (error) {
      toast.error("Không thể bật thông báo", {
        description: "Vui lòng kiểm tra lại quyền thông báo trên trình duyệt."
      });
    }
  };

  const handleCalendarDownload = () => {
    downloadCalendar(new Date(dueDate), currentWeek);
  };

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="shrink-0"
            aria-label="Quay lại"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <h1 className="text-lg font-bold truncate text-[#fd7e14]">Tuần {currentWeek}</h1>
            <p className="text-sm text-[#6c757d] truncate">
              Ngày dự sinh: {format(new Date(dueDate), 'dd/MM/yyyy', { locale: vi })}
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={handleCalendarDownload}
              disabled={isDownloading}
              className="shrink-0 gap-1 sm:gap-2 border-[#fd7e14]/20 bg-white text-[#fd7e14] hover:bg-[#fd7e14]/10 hover:text-[#fd7e14] px-2 sm:px-4"
              size={isMobile ? "sm" : "default"}
            >
              <Calendar className="h-4 w-4" />
              {!isMobile && <span className="text-sm">Tải lịch</span>}
            </Button>
            <Button 
              variant="outline"
              onClick={handleNotificationSubscription}
              className="shrink-0 gap-1 sm:gap-2 border-[#fd7e14]/20 bg-white text-[#fd7e14] hover:bg-[#fd7e14]/10 hover:text-[#fd7e14] px-2 sm:px-4"
              size={isMobile ? "sm" : "default"}
            >
              <Bell className="h-4 w-4" />
              {!isMobile && <span className="text-sm">Nhận thông báo</span>}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PregnancyHeader;
