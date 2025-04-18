
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
      <div className="bg-gradient-to-br from-soft-peach to-baby-pink rounded-xl p-6 text-center">
        <h3 className="text-xl font-bold mb-2">
          Bạn đang ở tuần thứ {pregnancyWeek}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Ngày dự sinh: {format(dueDate, "dd/MM/yyyy", { locale: vi })}
        </p>
        <div className="flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-inner">
            <span className="text-3xl font-bold animate-pulse-gentle">{pregnancyWeek}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3 text-center">
        {[
          { label: "Tam cá nguyệt", value: Math.ceil(pregnancyWeek / 13) },
          { label: "Lịch khám tiếp", value: pregnancyWeek < 28 ? "4 tuần" : pregnancyWeek < 36 ? "2 tuần" : "1 tuần" },
          { label: "Còn lại", value: Math.max(0, 40 - pregnancyWeek) + " tuần" },
        ].map((item, index) => (
          <div key={index} className="rounded-lg bg-muted p-3">
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="font-bold">{item.value}</p>
          </div>
        ))}
      </div>
      
      <Button
        variant="outline"
        className="w-full"
        onClick={onReset}
      >
        Tính lại
      </Button>
      
      <Button className="w-full btn-primary">
        Tạo lịch khám theo chuẩn y khoa
      </Button>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Lịch Trình Thai Kỳ</h3>
        <MilestoneList currentWeek={pregnancyWeek} />
      </div>

      <Button
        className="w-full"
        onClick={onEnableNotifications}
      >
        <Bell className="w-4 h-4 mr-2" />
        Bật thông báo nhắc nhở
      </Button>
    </div>
  );
}
