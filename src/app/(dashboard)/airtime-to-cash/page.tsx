import DashboardLayout from "@/layouts/user/DashboardLayout";
import AirtimeToCashForm from "@/components/user/airtime-to-cash/AirtimeToCashForm";

export default function AirtimeToCashRoute() {
	return (
		<DashboardLayout>
			<AirtimeToCashForm />
		</DashboardLayout>
	);
}
