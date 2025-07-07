import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  Wind,
  Users,
  Wrench,
  Shield,
  Activity,
  BarChart3,
  AlertTriangle,
  Eye,
  Radio
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Menu items
const mainItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Gas Monitoring",
    url: "/gas-monitoring",
    icon: Wind,
    badge: "1 Critical"
  },
  {
    title: "Worker Tracking",
    url: "/workers",
    icon: Users,
    badge: "247 Active"
  },
  {
    title: "Equipment",
    url: "/equipment",
    icon: Wrench,
    badge: "12 Online"
  },
  {
    title: "Emergency",
    url: "/emergency",
    icon: Shield,
    badge: "Ready"
  },
]

const monitoringItems = [
  {
    title: "Live Cameras",
    url: "/cameras",
    icon: Eye,
  },
  {
    title: "Sensor Network",
    url: "/sensors",
    icon: Radio,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: Activity,
  },
]

export function AppSidebar() {
  const location = useLocation()
  
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/"
    }
    return location.pathname.startsWith(path)
  }

  return (
    <Sidebar variant="inset" className="border-r-2">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Shield className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-sidebar-foreground">Mine Safety</h1>
            <p className="text-xs text-sidebar-foreground/60">Management System</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                    className="w-full"
                  >
                    <Link to={item.url} className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ml-auto ${
                            item.badge.includes("Critical") ? "bg-destructive/20 text-destructive" :
                            item.badge.includes("Active") ? "bg-success/20 text-success" :
                            "bg-info/20 text-info"
                          }`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <Separator className="my-2" />
        
        <SidebarGroup>
          <SidebarGroupLabel>Monitoring & Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {monitoringItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                  >
                    <Link to={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/settings">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 text-xs text-sidebar-foreground/60">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>System Online</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}