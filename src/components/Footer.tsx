
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 px-4 bg-gradient-to-t from-baby-pink/30 to-transparent">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-baby-pink to-soft-peach text-transparent bg-clip-text">
              Nhắc Nhở Thai Kỳ
            </h3>
            <p className="text-muted-foreground mb-4">
              Đồng hành cùng mẹ bầu trong suốt hành trình mang thai, 
              cung cấp thông tin y khoa đáng tin cậy và những lời nhắc nhở quan trọng.
            </p>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Được tạo với</span>
              <Heart className="h-4 w-4 mx-1 text-baby-pink animate-pulse-gentle" />
              <span>bởi phòng khám An Sinh</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Liên kết</h4>
            <ul className="space-y-2">
              {["Trang chủ", "Tính tuần thai", "Lịch khám", "Thông tin thai kỳ", "Liên hệ"].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Liên hệ</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Phòng khám An Sinh</li>
              <li>123 Đường Sức Khỏe, Quận Hạnh Phúc</li>
              <li>TP. Hồ Chí Minh, Việt Nam</li>
              <li>Email: contact@ansinh-clinic.com</li>
              <li>Hotline: 1900 1234</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Phòng khám An Sinh. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
