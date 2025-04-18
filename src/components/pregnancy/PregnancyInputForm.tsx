
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarDays, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type CalculationType = "due-date" | "last-period";

interface PregnancyInputFormProps {
  calculationType: CalculationType;
  setCalculationType: (type: CalculationType) => void;
  dueDate: Date | undefined;
  setDueDate: (date: Date | undefined) => void;
  lastPeriod: Date | undefined;
  setLastPeriod: (date: Date | undefined) => void;
  onCalculate: () => void;
}

export function PregnancyInputForm({
  calculationType,
  setCalculationType,
  dueDate,
  setDueDate,
  lastPeriod,
  setLastPeriod,
  onCalculate
}: PregnancyInputFormProps) {
  return (
    <div className="space-y-6">
      <Tabs value={calculationType} onValueChange={(v) => setCalculationType(v as CalculationType)} className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
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
                  className="w-full justify-start text-left font-normal border-clinic-primary/20"
                >
                  <CalendarDays className="mr-2 h-4 w-4 text-clinic-primary" />
                  {dueDate ? (
                    format(dueDate, "dd/MM/yyyy", { locale: vi })
                  ) : (
                    "Chọn ngày"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  className="rounded-md border"
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
                  className="w-full justify-start text-left font-normal border-clinic-primary/20"
                >
                  <CalendarClock className="mr-2 h-4 w-4 text-clinic-primary" />
                  {lastPeriod ? (
                    format(lastPeriod, "dd/MM/yyyy", { locale: vi })
                  ) : (
                    "Chọn ngày"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={lastPeriod}
                  onSelect={setLastPeriod}
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
          </div>
        </TabsContent>
      </Tabs>
      
      <Button 
        className="w-full bg-clinic-primary hover:bg-clinic-primary-dark text-white"
        onClick={onCalculate}
        disabled={
          (calculationType === "due-date" && !dueDate) || 
          (calculationType === "last-period" && !lastPeriod)
        }
      >
        Tính tuần thai
      </Button>
    </div>
  );
}
