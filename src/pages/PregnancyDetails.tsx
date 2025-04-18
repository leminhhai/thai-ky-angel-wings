
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import Header from "@/components/pregnancy/PregnancyHeader";
import PregnancyInfo from "@/components/pregnancy/PregnancyInfo";
import { toast } from "sonner";

const PregnancyDetails = () => {
  const location = useLocation();
  const pregnancyData = location.state;

  if (!pregnancyData) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-baby-pink/20 to-transparent">
      <Header currentWeek={pregnancyData.currentWeek} dueDate={pregnancyData.dueDate} />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <PregnancyInfo {...pregnancyData} />
      </main>
    </div>
  );
};

export default PregnancyDetails;
