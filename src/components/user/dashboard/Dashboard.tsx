"use client";

import DashboardLayout from "@/layouts/user/DashboardLayout";
import type { DashboardUser } from "@/types/user";
import DashboardOverview from "./DashboardOverview";
import DashboardProfileCompletion from "./DashboardProfileCompletion";

export default function Dashboard() {
	const user: DashboardUser = {};

	return (
		<DashboardLayout>
			<div className="p-4 lg:p-8">
				<DashboardProfileCompletion user={user} />
				<DashboardOverview user={user} />
			</div>
		</DashboardLayout>
	);
}
