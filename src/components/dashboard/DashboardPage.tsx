import React from 'react';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  Briefcase, 
  MessageSquare, 
  Eye, 
  Download,
  Calendar,
  ArrowUpRight,
  Clock,
  BarChart3,
  Activity,
  Sparkles,
  Target,
  Zap,
  Award
} from 'lucide-react';

const DashboardPage = () => {
  // Sample data
  const stats = [
    { 
      title: 'Total Visitors', 
      value: '12,458', 
      change: '+12.5%', 
      icon: <Users className="text-blue-500" size={24} />,
      color: 'bg-blue-50',
      trend: 'up'
    },
    { 
      title: 'Projects', 
      value: '24', 
      change: '+3', 
      icon: <Briefcase className="text-purple-500" size={24} />,
      color: 'bg-purple-50',
      trend: 'up'
    },
    { 
      title: 'Blog Posts', 
      value: '56', 
      change: '+8', 
      icon: <FileText className="text-green-500" size={24} />,
      color: 'bg-green-50',
      trend: 'up'
    },
    { 
      title: 'Contact Messages', 
      value: '189', 
      change: '-5%', 
      icon: <MessageSquare className="text-orange-500" size={24} />,
      color: 'bg-orange-50',
      trend: 'down'
    },
  ];

  const recentActivities = [
    { id: 1, action: 'New project published', user: 'Web Design System', time: '10 min ago', icon: <Briefcase size={16} /> },
    { id: 2, action: 'Blog post created', user: 'React Performance Guide', time: '2 hours ago', icon: <FileText size={16} /> },
    { id: 3, action: 'Contact form submitted', user: 'John Doe', time: '5 hours ago', icon: <MessageSquare size={16} /> },
    { id: 4, action: 'Skill updated', user: 'TypeScript', time: '1 day ago', icon: <Award size={16} /> },
    { id: 5, action: 'Visitor milestone', user: '10,000 views', time: '2 days ago', icon: <Eye size={16} /> },
  ];

  const topProjects = [
    { id: 1, name: 'E-commerce Platform', views: 2450, completion: 95, status: 'Live' },
    { id: 2, name: 'Mobile Banking App', views: 1890, completion: 87, status: 'In Progress' },
    { id: 3, name: 'AI Dashboard', views: 3120, completion: 100, status: 'Live' },
    { id: 4, name: 'Portfolio Redesign', views: 980, completion: 65, status: 'Development' },
  ];

  const blogPerformance = [
    { month: 'Jan', views: 1200, reads: 800 },
    { month: 'Feb', views: 1800, reads: 1200 },
    { month: 'Mar', views: 2400, reads: 1600 },
    { month: 'Apr', views: 3200, reads: 2400 },
    { month: 'May', views: 4100, reads: 3200 },
    { month: 'Jun', views: 5200, reads: 4100 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your portfolio.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
            <Download size={18} />
            Export Report
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Calendar size={18} />
            Last 30 days
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingUp size={16} className="rotate-180" />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mt-4">{stat.value}</h3>
            <p className="text-gray-600">{stat.title}</p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center text-sm text-gray-500">
                <Clock size={14} className="mr-1" />
                Updated just now
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Projects & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Projects */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Top Projects</h3>
              <p className="text-gray-600 text-sm">Most viewed projects this month</p>
            </div>
            <Target className="text-orange-500" size={24} />
          </div>
          
          <div className="space-y-4">
            {topProjects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${project.status === 'Live' ? 'bg-green-500' : project.status === 'In Progress' ? 'bg-blue-500' : 'bg-yellow-500'}`}></div>
                    <div>
                      <h4 className="font-medium text-gray-900">{project.name}</h4>
                      <p className="text-sm text-gray-600">{project.views.toLocaleString()} views</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{project.completion}%</span>
                    <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        style={{ width: `${project.completion}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${project.status === 'Live' ? 'bg-green-100 text-green-800' : project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats & Goals */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Goals & Insights</h3>
              <p className="text-gray-600 text-sm">Track your progress and goals</p>
            </div>
            <Sparkles className="text-purple-500" size={24} />
          </div>
          
          <div className="space-y-6">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-gray-900">Monthly Visitors Goal</span>
                <span className="text-sm text-gray-600">15,000 target</span>
              </div>
              <div className="w-full h-3 bg-white rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: '83%' }}></div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>12,458 achieved</span>
                <span>83%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={18} className="text-yellow-500" />
                  <span className="font-medium text-gray-900">Avg. Visit Time</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">4m 32s</p>
                <p className="text-sm text-gray-600 mt-1">+45s from last month</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Eye size={18} className="text-blue-500" />
                  <span className="font-medium text-gray-900">Bounce Rate</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">28%</p>
                <p className="text-sm text-gray-600 mt-1">-7% improvement</p>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors text-sm">
                  Add Project
                </button>
                <button className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg font-medium hover:bg-purple-100 transition-colors text-sm">
                  Write Blog
                </button>
                <button className="px-4 py-2 bg-green-50 text-green-700 rounded-lg font-medium hover:bg-green-100 transition-colors text-sm">
                  Update Skills
                </button>
                <button className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg font-medium hover:bg-orange-100 transition-colors text-sm">
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Messages Preview */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Recent Messages</h3>
            <p className="text-gray-600 text-sm">Latest contact form submissions</p>
          </div>
          <MessageSquare className="text-green-500" size={24} />
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Email</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Subject</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-900">Alex Johnson</div>
                </td>
                <td className="py-3 px-4 text-gray-600">alex@example.com</td>
                <td className="py-3 px-4">
                  <span className="font-medium text-gray-900">Project Inquiry</span>
                </td>
                <td className="py-3 px-4 text-gray-600">Today, 10:30</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                    New
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-900">Sarah Miller</div>
                </td>
                <td className="py-3 px-4 text-gray-600">sarah@company.com</td>
                <td className="py-3 px-4">
                  <span className="font-medium text-gray-900">Collaboration</span>
                </td>
                <td className="py-3 px-4 text-gray-600">Yesterday, 14:20</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                    Read
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-900">Michael Chen</div>
                </td>
                <td className="py-3 px-4 text-gray-600">michael@tech.com</td>
                <td className="py-3 px-4">
                  <span className="font-medium text-gray-900">Job Offer</span>
                </td>
                <td className="py-3 px-4 text-gray-600">2 days ago</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">
                    Replied
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-100">
          <button className="flex items-center justify-center gap-2 w-full py-2 text-blue-600 hover:text-blue-800 font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            View all messages
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;