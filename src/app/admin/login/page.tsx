"use client";

import { useRouter } from "next/navigation";
import AdminLogin from "@/components/admin/auth/AdminLogin";

export default function AdminLoginPage() {
	const router = useRouter();
	return <AdminLogin onLogin={() => router.push("/admin")} />;
}
