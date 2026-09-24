import DashboardLayout from "@/layouts/user/DashboardLayout";
import AirtimePurchaseForm from "@/components/user/airtime/AirtimePurchaseForm";

export default function AirtimeRoute() {
	return (
		<DashboardLayout>
			<AirtimePurchaseForm />
		</DashboardLayout>
	);
}
