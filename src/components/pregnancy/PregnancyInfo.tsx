
import { Card } from "@/components/ui/card";
import MilestoneList from "@/components/MilestoneList";
import { useIsMobile } from "@/hooks/use-mobile";

interface PregnancyInfoProps {
  currentWeek: number;
  dueDate: Date;
}

const PregnancyInfo = ({ currentWeek }: PregnancyInfoProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-6">
      <Card className="p-4 bg-gradient-to-br from-white to-clinic-secondary border-0 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          {[
            { label: "Tam cá nguyệt", value: Math.ceil(currentWeek / 13) },
            { label: "Lịch khám tiếp", value: currentWeek < 28 ? "4 tuần" : currentWeek < 36 ? "2 tuần" : "1 tuần" },
            { label: "Còn lại", value: Math.max(0, 40 - currentWeek) + " tuần" },
          ].map((item, index) => (
            <div key={index} className="rounded-lg bg-white/90 backdrop-blur-sm p-3 shadow-sm">
              <p className="text-sm text-[#6c757d] font-semibold">{item.label}</p>
              <p className="font-bold text-lg text-[#fd7e14]">{item.value}</p>
            </div>
          ))}
        </div>
      </Card>

      <div>
        <h2 className="text-xl font-bold mb-4 text-[#fd7e14]">Lịch trình thai kỳ</h2>
        <MilestoneList currentWeek={currentWeek} />
      </div>
    </div>
  );
};

export default PregnancyInfo;
