
import { Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Tính tuần thai", href: "#calculator" },
    { label: "Thông tin thai kỳ", href: "#info" },
    { label: "Liên hệ", href: "#contact" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-clinic-primary to-[#fd7e14] text-transparent bg-clip-text">
            Nhắc Nhở Thai Kỳ
          </span>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#fd7e14] flex items-center justify-center text-[10px] font-bold text-white animate-pulse-gentle">
              2
            </span>
          </Button>
          
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[350px] border-l border-[#fd7e14]/20">
              <div className="flex flex-col gap-6 mt-8">
                <div className="space-y-4">
                  {menuItems.map((item, index) => (
                    <a 
                      key={index} 
                      href={item.href}
                      className="block py-2 px-4 text-lg font-semibold text-[#6c757d] hover:text-[#fd7e14] transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-[#fd7e14]/20 space-y-3">
                  <Button variant="outline" className="w-full rounded-full justify-center border-[#fd7e14]/20 text-[#fd7e14]">
                    Đăng nhập
                  </Button>
                  <Button className="w-full btn-primary justify-center">
                    Đăng ký
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <div className="hidden md:flex gap-2">
            <Button variant="outline" className="rounded-full border-[#fd7e14]/20 text-[#fd7e14] hover:bg-[#fd7e14]/10">
              Đăng nhập
            </Button>
            <Button className="btn-primary">
              Đăng ký
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
