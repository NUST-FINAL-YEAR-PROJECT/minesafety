import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Download,
  FileText,
  Calendar as CalendarIcon,
  Filter,
  Search,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  FileDown,
  Eye,
  Clock
} from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const ReportsPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [searchTerm, setSearchTerm] = useState("");
  const [downloading, setDownloading] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock report data
  const safetyReports = [
    {
      id: "RPT001",
      title: "Daily Safety Inspection Report",
      type: "Safety",
      date: "2024-01-15",
      status: "completed",
      size: "2.4 MB",
      format: "PDF",
      description: "Comprehensive daily safety inspection covering all mine zones"
    },
    {
      id: "RPT002", 
      title: "Gas Detection Analysis",
      type: "Gas Monitoring",
      date: "2024-01-14",
      status: "completed",
      size: "1.8 MB",
      format: "PDF",
      description: "Weekly gas detector readings and trend analysis"
    },
    {
      id: "RPT003",
      title: "Incident Investigation Report",
      type: "Incident",
      date: "2024-01-13",
      status: "draft",
      size: "3.2 MB", 
      format: "PDF",
      description: "Investigation findings for equipment malfunction in Zone B"
    }
  ];

  const performanceReports = [
    {
      id: "RPT004",
      title: "Equipment Performance Analysis",
      type: "Performance",
      date: "2024-01-15",
      status: "completed",
      size: "4.1 MB",
      format: "Excel",
      description: "Monthly equipment efficiency and maintenance metrics"
    },
    {
      id: "RPT005",
      title: "Worker Productivity Report",
      type: "Performance", 
      date: "2024-01-14",
      status: "completed",
      size: "1.9 MB",
      format: "PDF",
      description: "Weekly productivity metrics and safety compliance"
    }
  ];

  const complianceReports = [
    {
      id: "RPT006",
      title: "Regulatory Compliance Audit",
      type: "Compliance",
      date: "2024-01-12",
      status: "completed",
      size: "5.7 MB",
      format: "PDF",
      description: "Quarterly compliance audit results and recommendations"
    },
    {
      id: "RPT007",
      title: "Environmental Impact Assessment",
      type: "Environmental",
      date: "2024-01-10",
      status: "completed",
      size: "3.8 MB",
      format: "PDF",
      description: "Monthly environmental monitoring and impact analysis"
    }
  ];

  const downloadReport = async (reportId: string, title: string, format: string) => {
    setDownloading(reportId);
    
    // Simulate download process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create and trigger download of a mock file
    const content = `Mock Report Content\n\nReport: ${title}\nGenerated: ${new Date().toISOString()}\nFormat: ${format}\n\nThis is a simulated report download.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_')}.${format.toLowerCase()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setDownloading(null);
    toast({
      title: "Download Complete",
      description: `${title} has been downloaded successfully.`,
    });
  };

  const generateReport = (type: string) => {
    toast({
      title: "Generating Report",
      description: `Creating new ${type} report. This may take a few minutes.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-success/20 text-success";
      case "draft": return "bg-warning/20 text-warning";
      case "pending": return "bg-info/20 text-info";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Safety": return "bg-destructive/10 text-destructive";
      case "Performance": return "bg-primary/10 text-primary";
      case "Compliance": return "bg-warning/10 text-warning";
      case "Environmental": return "bg-success/10 text-success";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  const ReportCard = ({ report }: { report: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-sm font-medium">{report.title}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge className={getTypeColor(report.type)} variant="secondary">
                {report.type}
              </Badge>
              <Badge className={getStatusColor(report.status)} variant="secondary">
                {report.status}
              </Badge>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            {report.format}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{report.description}</p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {report.date}
          </div>
          <div>{report.size}</div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1"
            disabled={report.status === "draft"}
          >
            <Eye className="w-3 h-3 mr-1" />
            Preview
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => downloadReport(report.id, report.title, report.format)}
            disabled={downloading === report.id || report.status === "draft"}
          >
            {downloading === report.id ? (
              <>
                <div className="w-3 h-3 mr-1 animate-spin rounded-full border border-current border-t-transparent" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="w-3 h-3 mr-1" />
                Download
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">Download and manage safety, performance, and compliance reports</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics Dashboard
          </Button>
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Button 
          variant="outline" 
          className="h-auto p-4 flex-col gap-2"
          onClick={() => generateReport("Safety")}
        >
          <AlertTriangle className="w-6 h-6 text-destructive" />
          <span>Safety Report</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto p-4 flex-col gap-2"
          onClick={() => generateReport("Performance")}
        >
          <TrendingUp className="w-6 h-6 text-primary" />
          <span>Performance Report</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto p-4 flex-col gap-2"
          onClick={() => generateReport("Gas Analysis")}
        >
          <BarChart3 className="w-6 h-6 text-warning" />
          <span>Gas Analysis</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto p-4 flex-col gap-2"
          onClick={() => generateReport("Compliance")}
        >
          <FileDown className="w-6 h-6 text-success" />
          <span>Compliance Report</span>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="search">Search Reports</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by title, type, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label>Date Range</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[200px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <Button variant="outline" className="self-end">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Categories */}
      <Tabs defaultValue="safety" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="safety">Safety Reports</TabsTrigger>
          <TabsTrigger value="performance">Performance Reports</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="safety" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safetyReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {performanceReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;