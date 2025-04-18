
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import MilestoneList from '../MilestoneList';

interface PregnancyResultsProps {
  pregnancyWeek: number;
  dueDate: Date;
  onReset: () => void;
  onEnableNotifications: () => void;
}

export function PregnancyResults({
  pregnancyWeek,
  dueDate,
  onReset,
  onEnableNotifications
}: PregnancyResultsProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-clinic-secondary to-white rounded-xl p-6 text-center shadow-md">
        <h3 className="text-xl font-bold mb-2 text-clinic-primary">
          Bạn đang ở tuần thứ {pregnancyWeek}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Ngày dự sinh: {format(dueDate, "dd/MM/yyyy", { locale: vi })}
        </p>
        <div className="flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-inner">
            <span className="text-3xl font-bold text-clinic-primary animate-pulse-gentle">
              {pregnancyWeek}
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3 text-center">
        {[
          { label: "Tam cá nguyệt", value: Math.ceil(pregnancyWeek / 13) },
          { label: "Lịch khám tiếp", value: pregnancyWeek < 28 ? "4 tuần" : pregnancyWeek < 36 ? "2 tuần" : "1 tuần" },
          { label: "Còn lại", value: Math.max(0, 40 - pregnancyWeek) + " tuần" },
        ].map((item, index) => (
          <div key={index} className="rounded-lg bg-clinic-secondary p-3">
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="font-bold text-clinic-primary">{item.value}</p>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        className="w-full border-clinic-primary/20 text-clinic-primary hover:bg-clinic-secondary"
        onClick={onReset}
      >
        Tính lại
      </Button>
      
      <Button 
        className="w-full bg-clinic-primary hover:bg-clinic-primary-dark text-white"
        onClick={onEnableNotifications}
      >
        <Bell className="w-4 h-4 mr-2" />
        Bật thông báo nhắc nhở
      </Button>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-clinic-primary">Lịch Trình Thai Kỳ</h3>
        <MilestoneList currentWeek={pregnancyWeek} />
      </div>
    </div>
  );
}
