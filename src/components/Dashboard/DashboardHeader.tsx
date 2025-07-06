import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const DashboardHeader = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/gas-monitoring", label: "Gas Monitoring" },
    { path: "/workers", label: "Worker Tracking" },
    { path: "/equipment", label: "Equipment" },
    { path: "/emergency", label: "Emergency" }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-primary text-primary-foreground px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-xl font-semibold">Mine Safety Management</h1>
          <nav className="flex space-x-6">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`${
                    isActive(item.path) 
                      ? "text-primary-foreground bg-primary-foreground/20" 
                      : "text-primary-foreground/80 hover:bg-primary/80"
                  }`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary/80">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary/80">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary/80">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;