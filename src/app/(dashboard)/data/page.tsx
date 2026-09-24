import DashboardLayout from "@/layouts/user/DashboardLayout";
import DataPurchaseForm from "@/components/user/data/DataPurchaseForm";

export default function DataRoute() {
	return (
		<DashboardLayout>
			<DataPurchaseForm />
		</DashboardLayout>
	);
}
