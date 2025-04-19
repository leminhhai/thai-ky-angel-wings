
import { motion } from "framer-motion";
import { Bell, Calendar, Clock, Baby, Apple, Stethoscope } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Features = () => {
  const isMobile = useIsMobile();

  const features = [
    {
      icon: <Calendar className="h-8 w-8 sm:h-10 sm:w-10 text-baby-pink" />,
      title: "Lịch khám tự động",
      description: "Tạo lịch khám theo chuẩn y khoa dựa trên tuần thai, tự động nhắc nhở trước mỗi buổi khám.",
      color: "baby-pink"
    },
    {
      icon: <Baby className="h-8 w-8 sm:h-10 sm:w-10 text-baby-blue" />,
      title: "Thông tin thai kỳ",
      description: "Cập nhật thông tin về sự phát triển của bé yêu và những điều mẹ cần biết từng tuần.",
      color: "baby-blue"
    },
    {
      icon: <Apple className="h-8 w-8 sm:h-10 sm:w-10 text-mint-green" />,
      title: "Dinh dưỡng thai kỳ",
      description: "Gợi ý chế độ dinh dưỡng phù hợp cho từng giai đoạn thai kỳ, đảm bảo mẹ và bé khỏe mạnh.",
      color: "mint-green"
    },
    {
      icon: <Bell className="h-8 w-8 sm:h-10 sm:w-10 text-soft-peach" />,
      title: "Nhắc nhở thông minh",
      description: "Nhận thông báo về lịch khám, uống thuốc và các mốc quan trọng trong thai kỳ.",
      color: "soft-peach"
    },
    {
      icon: <Stethoscope className="h-8 w-8 sm:h-10 sm:w-10 text-soft-lavender" />,
      title: "Thông tin y khoa",
      description: "Cung cấp kiến thức y khoa đáng tin cậy từ đội ngũ bác sĩ phòng khám An Sinh.",
      color: "soft-lavender"
    },
    {
      icon: <Clock className="h-8 w-8 sm:h-10 sm:w-10 text-soft-yellow" />,
      title: "Theo dõi thai kỳ",
      description: "Ghi lại các chỉ số quan trọng sau mỗi lần khám để theo dõi sự phát triển của thai nhi.",
      color: "soft-yellow"
    },
  ];

  return (
    <section className="py-10 sm:py-16 px-3 sm:px-4 bg-gradient-to-b from-white to-baby-pink/20">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-[#fd7e14]"
          >
            Tính năng tuyệt vời cho hành trình làm mẹ
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base text-[#6c757d]"
          >
            Chúng tôi mang đến những công cụ hữu ích để đồng hành cùng bạn từng ngày, 
            đảm bảo thai kỳ khỏe mạnh và trọn vẹn niềm vui.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-white rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-${feature.color}`}
            >
              <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-${feature.color}/20 flex items-center justify-center mb-3 sm:mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-[#fd7e14]">{feature.title}</h3>
              <p className="text-sm text-[#6c757d]">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
