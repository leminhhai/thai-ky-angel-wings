
import { useNavigate } from "react-router-dom";
import { usePregnancyCalculator } from "@/hooks/usePregnancyCalculator";
import { PregnancyInputForm } from "./pregnancy/PregnancyInputForm";
import { PregnancyResults } from "./pregnancy/PregnancyResults";
import useNotifications from '@/hooks/useNotifications';
import { PhoneCall, Mail, MapPin, Clock } from "lucide-react";

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
    <div className="w-full max-w-md mx-auto px-4">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-clinic-primary">Tính tuần thai của bạn</h2>
      
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

      <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-clinic-secondary to-white shadow-md">
        <h3 className="text-lg font-bold text-clinic-primary mb-4">Phòng khám Sản phụ khoa An Sinh</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-clinic-primary mt-1" />
            <p>416 Minh Khai Đồng Nguyên Từ Sơn Bắc Ninh Việt Nam</p>
          </div>
          <div className="flex items-center gap-3">
            <PhoneCall className="w-5 h-5 text-clinic-primary" />
            <a href="tel:0899268299" className="hover:text-clinic-primary">0899 268 299</a>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-clinic-primary" />
            <a href="mailto:phusanansinh.com@gmail.com" className="hover:text-clinic-primary">
              phusanansinh.com@gmail.com
            </a>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-clinic-primary mt-1" />
            <div>
              <p>Thứ 2 - thứ 7: 17h00 - 22h00</p>
              <p>Chủ nhật: 8h00 - 22h00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PregnancyCalculator;
