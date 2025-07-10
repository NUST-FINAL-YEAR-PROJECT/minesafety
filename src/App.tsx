import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/Auth/LoginForm";
import Dashboard from "./pages/Dashboard"; 
import GasMonitoringPage from "./pages/GasMonitoring";
import WorkerTrackingPage from "./pages/WorkerTracking";
import EquipmentPage from "./pages/Equipment";
import EmergencyPage from "./pages/Emergency";
import CamerasPage from "./pages/Cameras";
import SensorsPage from "./pages/Sensors";
import ReportsPage from "./pages/Reports";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/gas-monitoring" element={<GasMonitoringPage />} />
        <Route path="/workers" element={<WorkerTrackingPage />} />
        <Route path="/equipment" element={<EquipmentPage />} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route path="/cameras" element={<CamerasPage />} />
        <Route path="/sensors" element={<SensorsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/analytics" element={<Analytics />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
