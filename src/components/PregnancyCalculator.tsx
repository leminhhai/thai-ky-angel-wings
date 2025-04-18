import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, CalendarClock } from "lucide-react";
import { format, addWeeks, differenceInWeeks } from "date-fns";
import { vi } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import MilestoneList from './MilestoneList';
import useNotifications from '@/hooks/useNotifications';

type CalculationType = "due-date" | "last-period";

const PregnancyCalculator = () => {
  const [calculationType, setCalculationType] = useState<CalculationType>("due-date");
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [lastPeriod, setLastPeriod] = useState<Date | undefined>(undefined);
  const [pregnancyWeek, setPregnancyWeek] = useState<number | null>(null);
  const [calculationComplete, setCalculationComplete] = useState(false);

  const calculatePregnancyWeek = () => {
    if (calculationType === "due-date" && dueDate) {
      const today = new Date();
      const weeksUntilDue = Math.max(0, Math.floor(differenceInWeeks(dueDate, today)));
      const currentWeek = 40 - weeksUntilDue;
      setPregnancyWeek(currentWeek);
      setCalculationComplete(true);
    } else if (calculationType === "last-period" && lastPeriod) {
      const today = new Date();
      const weeksPregnant = Math.floor(differenceInWeeks(today, lastPeriod));
      setPregnancyWeek(weeksPregnant);
      setCalculationComplete(true);
      
      const calculatedDueDate = addWeeks(lastPeriod, 40);
      setDueDate(calculatedDueDate);
    } else {
      setCalculationComplete(false);
    }
  };

  const resetCalculation = () => {
    setDueDate(undefined);
    setLastPeriod(undefined);
    setPregnancyWeek(null);
    setCalculationComplete(false);
  };

  const { subscribeToNotifications } = useNotifications();

  const enableNotifications = async () => {
    if (dueDate) {
      await subscribeToNotifications(dueDate);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Tính tuần thai của bạn</h2>
      
      {!calculationComplete ? (
        <>
          <Tabs value={calculationType} onValueChange={(v) => setCalculationType(v as CalculationType)}>
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="due-date">Ngày dự sinh</TabsTrigger>
              <TabsTrigger value="last-period">Ngày kinh cuối</TabsTrigger>
            </TabsList>
            
            <TabsContent value="due-date" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="due-date">Chọn ngày dự sinh</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {dueDate ? (
                        format(dueDate, "dd/MM/yyyy", { locale: vi })
                      ) : (
                        "Chọn ngày"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={setDueDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </TabsContent>
            
            <TabsContent value="last-period" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="last-period">Ngày đầu kỳ kinh cuối</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarClock className="mr-2 h-4 w-4" />
                      {lastPeriod ? (
                        format(lastPeriod, "dd/MM/yyyy", { locale: vi })
                      ) : (
                        "Chọn ngày"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={lastPeriod}
                      onSelect={setLastPeriod}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </TabsContent>
          </Tabs>
          
          <Button 
            className="w-full mt-4 btn-primary"
            onClick={calculatePregnancyWeek}
            disabled={
              (calculationType === "due-date" && !dueDate) || 
              (calculationType === "last-period" && !lastPeriod)
            }
          >
            Tính tuần thai
          </Button>
        </>
      ) : (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-soft-peach to-baby-pink rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold mb-2">
              Bạn đang ở tuần thứ {pregnancyWeek}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {calculationType === "due-date" 
                ? `Ngày dự sinh: ${format(dueDate as Date, "dd/MM/yyyy", { locale: vi })}`
                : `Ngày dự sinh: ${format(dueDate as Date, "dd/MM/yyyy", { locale: vi })}`}
            </p>
            <div className="flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-inner">
                <span className="text-3xl font-bold animate-pulse-gentle">{pregnancyWeek}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: "Tam cá nguyệt", value: Math.ceil(pregnancyWeek as number / 13) },
              { label: "Lịch khám tiếp", value: pregnancyWeek && pregnancyWeek < 28 ? "4 tuần" : pregnancyWeek && pregnancyWeek < 36 ? "2 tuần" : "1 tuần" },
              { label: "Còn lại", value: Math.max(0, 40 - (pregnancyWeek as number)) + " tuần" },
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
            onClick={resetCalculation}
          >
            Tính lại
          </Button>
          
          <Button className="w-full btn-primary">
            Tạo lịch khám theo chuẩn y khoa
          </Button>

          {calculationComplete && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Lịch Trình Thai Kỳ</h3>
              <MilestoneList currentWeek={pregnancyWeek as number} />
            </div>
          )}

          {calculationComplete && (
            <Button
              className="w-full"
              onClick={enableNotifications}
            >
              <Bell className="w-4 h-4 mr-2" />
              Bật thông báo nhắc nhở
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default PregnancyCalculator;
