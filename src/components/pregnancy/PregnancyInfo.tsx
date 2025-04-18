
import { Card } from "@/components/ui/card";
import MilestoneList from "@/components/MilestoneList";

interface PregnancyInfoProps {
  currentWeek: number;
  dueDate: Date;
}

const PregnancyInfo = ({ currentWeek }: PregnancyInfoProps) => {
  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { label: "Tam cá nguyệt", value: Math.ceil(currentWeek / 13) },
            { label: "Lịch khám tiếp", value: currentWeek < 28 ? "4 tuần" : currentWeek < 36 ? "2 tuần" : "1 tuần" },
            { label: "Còn lại", value: Math.max(0, 40 - currentWeek) + " tuần" },
          ].map((item, index) => (
            <div key={index} className="rounded-lg bg-muted p-3">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      </Card>

      <div>
        <h2 className="text-lg font-semibold mb-4">Lịch trình thai kỳ</h2>
        <MilestoneList currentWeek={currentWeek} />
      </div>
    </div>
  );
};

export default PregnancyInfo;
