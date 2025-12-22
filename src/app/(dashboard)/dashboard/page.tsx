import StatsCard from "@/components/dashboard/StatsCard";
import { Folder, BookOpen, Wrench, Mail } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Projects"
        value={12}
        icon={<Folder size={22} />}
        trend="+2 this month"
      />
      <StatsCard title="Blogs" value={6} icon={<BookOpen size={22} />} />
      <StatsCard title="Skills" value={18} icon={<Wrench size={22} />} />
      <StatsCard
        title="Messages"
        value={3}
        icon={<Mail size={22} />}
        trend="New"
      />
    </div>
  );
}
