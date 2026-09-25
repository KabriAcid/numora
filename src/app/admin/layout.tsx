import AdminPortalShell from "@/layouts/admin/AdminLayout";

export default function AdminLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return <AdminPortalShell>{children}</AdminPortalShell>;
}
