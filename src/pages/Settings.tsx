import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Bell,
  Search,
  Menu
} from "lucide-react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { SettingsManagement } from "@/components/dashboard/SettingsManagement";
import { Input } from "@/components/ui/input";

// Settings Content Component
const SettingsContent = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="min-h-screen flex w-full bg-background">
      <DashboardSidebar />
      
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header - Mobile Optimized */}
        <header className="border-b border-border p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden p-2"
                onClick={toggleSidebar}
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <div className="min-w-0 flex-1">
                <h1 className="text-xl md:text-2xl font-bold text-foreground truncate">
                  Settings
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-10 w-40 lg:w-64" />
              </div>
              <Button variant="outline" size="sm" className="px-2 md:px-3">
                <Bell className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">3</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Content - Mobile Optimized */}
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          <SettingsManagement />
        </div>
      </main>
    </div>
  );
};

// Main Settings Component with SidebarProvider
const Settings = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <SettingsContent />
    </SidebarProvider>
  );
};

export default Settings;