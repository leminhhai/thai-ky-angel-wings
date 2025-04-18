
import { ArrowLeft, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import useNotifications from "@/hooks/useNotifications";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

interface PregnancyHeaderProps {
  currentWeek: number;
  dueDate: Date;
}

const PregnancyHeader = ({ currentWeek, dueDate }: PregnancyHeaderProps) => {
  const navigate = useNavigate();
  const { subscribeToNotifications } = useNotifications();

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold truncate">Tuần {currentWeek}</h1>
            <p className="text-sm text-muted-foreground truncate">
              Ngày dự sinh: {format(new Date(dueDate), 'dd/MM/yyyy', { locale: vi })}
            </p>
          </div>
          <Button 
            variant="outline"
            onClick={() => subscribeToNotifications(new Date(dueDate))}
            className="shrink-0 gap-2 border-clinic-primary/20 text-clinic-primary"
          >
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Nhận thông báo</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default PregnancyHeader;
