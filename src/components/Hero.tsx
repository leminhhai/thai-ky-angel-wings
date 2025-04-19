import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CalendarDays, Bell, ArrowRight } from "lucide-react";
import PregnancyCalculator from "./PregnancyCalculator";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="min-h-screen pt-20 pb-10 px-4 flex flex-col justify-center items-center">
      <div className="container mx-auto grid md:grid-cols-2 gap-6 md:gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 sm:gap-6 order-2 md:order-1"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Đồng hành cùng{" "}
            <span className="bg-gradient-to-r from-baby-pink to-soft-peach text-transparent bg-clip-text">
              mẹ bầu
            </span>{" "}
            trên từng chặng đường
          </h1>
          
          <p className="text-base sm:text-lg text-muted-foreground">
            Nhắc lịch khám thai, cung cấp thông tin bổ ích và đồng hành cùng
            bạn trong suốt thai kỳ tại phòng khám An Sinh.
          </p>
          
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-1 sm:mt-2">
            <Button className="btn-primary gap-2 text-sm sm:text-base">
              <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5" />
              Tạo lịch khám thai
            </Button>
            <Button variant="outline" className="gap-2 rounded-full text-sm sm:text-base">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              Nhận thông báo
            </Button>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4 mt-2 sm:mt-4">
            <div className="flex -space-x-3 sm:-space-x-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-baby-pink to-soft-peach flex items-center justify-center text-white font-medium border-2 border-white"
                >
                  {item}
                </div>
              ))}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Hơn <span className="font-bold">2,000+</span> mẹ bầu đã đăng ký
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="pregnancy-card order-1 md:order-2"
        >
          <PregnancyCalculator />
        </motion.div>
      </div>
      
      <div className="w-full max-w-5xl mt-8 sm:mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Thông tin thai kỳ</h2>
          <Button variant="ghost" className="gap-1 text-sm">
            Xem tất cả <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              week: 12,
              title: "Bé như quả chanh",
              color: "from-mint-green to-baby-blue",
              description: "Bé yêu đã có thể nháy mắt và đang phát triển móng tay!"
            },
            {
              week: 20,
              title: "Bé như quả chuối",
              color: "from-soft-yellow to-soft-peach",
              description: "Bé đã bắt đầu nghe được và phản ứng với âm thanh bên ngoài."
            },
            {
              week: 28,
              title: "Bé như quả dừa",
              color: "from-baby-pink to-soft-lavender",
              description: "Bé đang luyện tập hít thở và có thể mở mắt!"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className={`rounded-2xl bg-gradient-to-br ${item.color} p-6 shadow-md hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-medium px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm">
                  Tuần {item.week}
                </span>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
