import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 bg-gray-50 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
