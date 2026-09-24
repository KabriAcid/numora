import DashboardLayout from "@/components/user/layout/DashboardLayout";
import AirtimePurchaseForm from "@/components/user/services/AirtimePurchaseForm";

export default function AirtimeRoute() {
	return (
		<DashboardLayout>
			<AirtimePurchaseForm />
		</DashboardLayout>
	);
}
