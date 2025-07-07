import EquipmentStatus from "@/components/Dashboard/EquipmentStatus";
import ComplianceSection from "@/components/Dashboard/ComplianceSection";

const EquipmentPage = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Equipment Management</h1>
        <p className="text-muted-foreground">Equipment status monitoring and maintenance tracking</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EquipmentStatus />
        <ComplianceSection />
      </div>
    </div>
  );
};

export default EquipmentPage;