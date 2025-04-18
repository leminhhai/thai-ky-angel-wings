
import { useState } from "react";
import { addWeeks, differenceInWeeks } from "date-fns";

type CalculationType = "due-date" | "last-period";

export function usePregnancyCalculator() {
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
      return {
        currentWeek,
        dueDate,
        calculationType: 'due-date' as const
      };
    } else if (calculationType === "last-period" && lastPeriod) {
      const today = new Date();
      const weeksPregnant = Math.floor(differenceInWeeks(today, lastPeriod));
      setPregnancyWeek(weeksPregnant);
      const calculatedDueDate = addWeeks(lastPeriod, 40);
      setDueDate(calculatedDueDate);
      setCalculationComplete(true);
      return {
        currentWeek: weeksPregnant,
        dueDate: calculatedDueDate,
        lastPeriod,
        calculationType: 'last-period' as const
      };
    }
  };

  const resetCalculation = () => {
    setDueDate(undefined);
    setLastPeriod(undefined);
    setPregnancyWeek(null);
    setCalculationComplete(false);
  };

  return {
    calculationType,
    setCalculationType,
    dueDate,
    setDueDate,
    lastPeriod,
    setLastPeriod,
    pregnancyWeek,
    calculationComplete,
    calculatePregnancyWeek,
    resetCalculation
  };
}
