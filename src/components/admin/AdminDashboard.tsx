import React, { useState, useEffect } from 'react';
import { Layout } from '../Layout';
import { UserManagement } from './UserManagement';
import { Users, BarChart3, FileText, Settings } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalReports: 0,
    activeReports: 0,
    completedReports: 0
  });

  useEffect(() => {
    // Simulate loading stats
    setStats({
      totalUsers: 25,
      totalReports: 150,
      activeReports: 45,
      completedReports: 105
    });
  }, []);

  const tabs = [
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'reports', name: 'Reports', icon: FileText },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <Layout title="Admin Dashboard">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={Users}
            color="bg-blue-500"
          />
          <StatCard
            title="Total Reports"
            value={stats.totalReports}
            icon={FileText}
            color="bg-green-500"
          />
          <StatCard
            title="Active Reports"
            value={stats.activeReports}
            icon={BarChart3}
            color="bg-yellow-500"
          />
          <StatCard
            title="Completed Reports"
            value={stats.completedReports}
            icon={Settings}
            color="bg-purple-500"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'users' && <UserManagement />}
            {activeTab === 'analytics' && (
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Dashboard</h3>
                <p className="text-gray-600">Detailed analytics and reporting features will be available here.</p>
              </div>
            )}
            {activeTab === 'reports' && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Report Management</h3>
                <p className="text-gray-600">Comprehensive report management and oversight tools.</p>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="text-center py-12">
                <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">System Settings</h3>
                <p className="text-gray-600">Configure system-wide settings and preferences.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};