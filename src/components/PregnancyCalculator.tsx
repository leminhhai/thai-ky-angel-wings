
import { useNavigate } from "react-router-dom";
import { usePregnancyCalculator } from "@/hooks/usePregnancyCalculator";
import { PregnancyInputForm } from "./pregnancy/PregnancyInputForm";
import { PregnancyResults } from "./pregnancy/PregnancyResults";
import useNotifications from '@/hooks/useNotifications';

const PregnancyCalculator = () => {
  const navigate = useNavigate();
  const { subscribeToNotifications } = useNotifications();
  const {
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
  } = usePregnancyCalculator();

  const handleCalculate = () => {
    const result = calculatePregnancyWeek();
    if (result) {
      navigate('/pregnancy-details', {
        state: result
      });
    }
  };

  const enableNotifications = async () => {
    if (dueDate) {
      await subscribeToNotifications(dueDate);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Tính tuần thai của bạn</h2>
      
      {!calculationComplete ? (
        <PregnancyInputForm
          calculationType={calculationType}
          setCalculationType={setCalculationType}
          dueDate={dueDate}
          setDueDate={setDueDate}
          lastPeriod={lastPeriod}
          setLastPeriod={setLastPeriod}
          onCalculate={handleCalculate}
        />
      ) : dueDate && pregnancyWeek !== null ? (
        <PregnancyResults
          pregnancyWeek={pregnancyWeek}
          dueDate={dueDate}
          onReset={resetCalculation}
          onEnableNotifications={enableNotifications}
        />
      ) : null}
    </div>
  );
};

export default PregnancyCalculator;
