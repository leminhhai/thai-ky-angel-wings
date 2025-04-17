
import { motion } from "framer-motion";
import { ArrowRight, Bell, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NotificationGuide = () => {
  const requestNotificationPermission = async () => {
    try {
      if ("Notification" in window) {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          new Notification("Chào mừng đến với Nhắc Nhở Thai Kỳ!", {
            body: "Cảm ơn bạn đã bật thông báo. Chúng tôi sẽ gửi những nhắc nhở hữu ích trong suốt thai kỳ của bạn.",
            icon: "/placeholder.svg",
          });
        }
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4"
          >
            Không bỏ lỡ các nhắc nhở quan trọng
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-muted-foreground"
          >
            Nhận thông báo về lịch khám, uống thuốc và các mốc quan trọng trong thai kỳ.
            Chỉ vài bước đơn giản để không bỏ lỡ bất kỳ thông tin quan trọng nào.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-2">
            <div className="p-8 bg-gradient-to-br from-baby-blue/50 to-soft-lavender/50">
              <div className="h-full flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">
                  Bật thông báo ngay bây giờ
                </h3>
                <p className="text-muted-foreground mb-6">
                  Để không bỏ lỡ lịch khám thai và các thông tin quan trọng,
                  hãy bật thông báo chỉ với một cú nhấp chuột.
                </p>
                <Button 
                  className="btn-primary w-full md:w-auto"
                  onClick={requestNotificationPermission}
                >
                  <Bell className="mr-2 h-5 w-5" />
                  Bật thông báo
                </Button>
              </div>
            </div>
            
            <div className="p-8">
              <Tabs defaultValue="browser">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="browser">Trình duyệt</TabsTrigger>
                  <TabsTrigger value="ios">iOS</TabsTrigger>
                </TabsList>
                
                <TabsContent value="browser" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-baby-pink flex items-center justify-center text-white font-bold flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium">Cho phép thông báo</h4>
                        <p className="text-sm text-muted-foreground">
                          Khi trình duyệt hiển thị hộp thoại, nhấn "Cho phép" để bật thông báo.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-baby-pink flex items-center justify-center text-white font-bold flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium">Đảm bảo không tắt thông báo</h4>
                        <p className="text-sm text-muted-foreground">
                          Kiểm tra cài đặt trình duyệt để đảm bảo thông báo không bị chặn.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-baby-pink flex items-center justify-center text-white font-bold flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium">Hoàn tất!</h4>
                        <p className="text-sm text-muted-foreground">
                          Bạn sẽ nhận được thông báo về lịch khám và những nhắc nhở quan trọng.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="ios" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-baby-blue flex items-center justify-center text-white font-bold flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium">Thêm vào màn hình chính</h4>
                        <p className="text-sm text-muted-foreground">
                          Mở Safari, nhấn nút Chia sẻ (biểu tượng hình hộp có mũi tên hướng lên).
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-baby-blue flex items-center justify-center text-white font-bold flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium">Chọn "Thêm vào màn hình chính"</h4>
                        <p className="text-sm text-muted-foreground">
                          Trong menu hiện ra, chọn "Thêm vào màn hình chính" (Add to Home Screen).
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-baby-blue flex items-center justify-center text-white font-bold flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium">Nhấn "Thêm" và hoàn tất</h4>
                        <p className="text-sm text-muted-foreground">
                          App sẽ được thêm vào màn hình chính và hoạt động như một ứng dụng thông thường.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="btn-secondary w-full mt-2">
                    <Smartphone className="mr-2 h-5 w-5" />
                    Xem hướng dẫn chi tiết
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NotificationGuide;
