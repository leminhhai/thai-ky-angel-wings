
import { useLocation, Navigate } from "react-router-dom";
import Header from "@/components/pregnancy/PregnancyHeader";
import PregnancyInfo from "@/components/pregnancy/PregnancyInfo";
import { useIsMobile } from "@/hooks/use-mobile";

const PregnancyDetails = () => {
  const location = useLocation();
  const pregnancyData = location.state;
  const isMobile = useIsMobile();

  if (!pregnancyData) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-baby-pink/20 to-transparent">
      <Header currentWeek={pregnancyData.currentWeek} dueDate={pregnancyData.dueDate} />
      <main className={`container mx-auto ${isMobile ? 'px-3' : 'px-4'} py-4 sm:py-6 space-y-4 sm:space-y-6`}>
        <PregnancyInfo {...pregnancyData} />
      </main>
    </div>
  );
};

export default PregnancyDetails;
