
import { useLocation, Navigate } from "react-router-dom";
import Header from "@/components/pregnancy/PregnancyHeader";
import PregnancyInfo from "@/components/pregnancy/PregnancyInfo";
import { useIsMobile } from "@/hooks/use-mobile";

const PregnancyDetails = () => {
  const location = useLocation();
  const pregnancyData = location.state;
  const isMobile = useIsMobile();

  // Redirect if no data is present
  if (!pregnancyData) {
    return <Navigate to="/" replace />;
  }

  // Calculate if pregnancy is still ongoing
  const isOngoing = pregnancyData.currentWeek <= 40;

  return (
    <div className="min-h-screen bg-gradient-to-b from-baby-pink/20 to-transparent">
      <Header currentWeek={pregnancyData.currentWeek} dueDate={pregnancyData.dueDate} />
      <main className={`container mx-auto ${isMobile ? 'px-3' : 'px-4'} py-4 sm:py-6 space-y-4 sm:space-y-6`}>
        {!isOngoing ? (
          <div className="text-center py-8">
            <h2 className="text-xl font-bold text-[#fd7e14] mb-2">Thai kỳ đã kết thúc</h2>
            <p className="text-[#6c757d]">Chúc mừng bạn đã sinh em bé thành công!</p>
          </div>
        ) : (
          <PregnancyInfo {...pregnancyData} />
        )}
      </main>
    </div>
  );
};

export default PregnancyDetails;
