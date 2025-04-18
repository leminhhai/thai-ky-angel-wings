
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import useNotifications from "@/hooks/useNotifications";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface PregnancyHeaderProps {
  currentWeek: number;
  dueDate: Date;
}

const PregnancyHeader = ({ currentWeek, dueDate }: PregnancyHeaderProps) => {
  const { subscribeToNotifications } = useNotifications();

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Tuần {currentWeek}</h1>
            <p className="text-sm text-muted-foreground">
              Ngày dự sinh: {format(new Date(dueDate), 'dd/MM/yyyy', { locale: vi })}
            </p>
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => subscribeToNotifications(new Date(dueDate))}
          >
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default PregnancyHeader;
