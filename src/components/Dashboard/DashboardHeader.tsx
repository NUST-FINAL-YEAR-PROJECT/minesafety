import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, User } from "lucide-react";

const DashboardHeader = () => {
  return (
    <header className="bg-primary text-primary-foreground px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-xl font-semibold">Safety & Risk Management</h1>
          <nav className="flex space-x-6">
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary/80">
              Dashboard
            </Button>
            <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:bg-primary/80">
              Live Monitoring
            </Button>
            <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:bg-primary/80">
              Incident Reports
            </Button>
            <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:bg-primary/80">
              Compliance
            </Button>
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