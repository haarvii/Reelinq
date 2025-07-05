import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, Bell, UserCircle, BarChart2, Settings, Film } from 'lucide-react';
import { sidebarMenu } from 'config/sidebarMenu';
import { NavLink } from 'react-router-dom';
import BrandModal from 'components/BrandSelector/BrandModal';

import Logo from 'components/Logo';
import BrandSelector from 'components/BrandSelector/BrandSelector';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  
  const notifications = [
    { id: 1, message: "Reel 'Bhagavad Gita Wisdom' created successfully." },
    { id: 2, message: "Reel 'Untitled Reel' updated." }
    // Or empty array if no notifications
  ];

  const userPlan = 'free';

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white font-sans">
      {/* Sidebar */}
      <aside
        className={`transition-all duration-300 ${isSidebarOpen ? 'w-48' : 'w-16'
          } bg-white dark:bg-gray-800 shadow-md flex flex-col py-4 space-y-4 overflow-hidden`}
      >
        <div className="flex justify-center mb-6">
          <Logo className="h-8 w-auto" />
        </div>

        {sidebarMenu.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive
                ? 'bg-primary text-white dark:bg-primary-dark' // <- Active item styling
                : 'text-gray-800 dark:text-gray-200'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {isSidebarOpen && (
              <span className="text-sm whitespace-nowrap">{label}</span>
            )}
          </NavLink>
        ))}

        {/* Avatar section */}
        <div className="mt-auto px-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40?img=3"
              alt="User"
              className="w-8 h-8 rounded-md border border-gray-300 dark:border-gray-600"
            />
            {isSidebarOpen && (
              <div className="text-sm text-gray-700 dark:text-gray-200">Martin</div>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="w-full bg-white dark:bg-gray-800 shadow px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <Menu className="w-6 h-6 text-gray-700 dark:text-white" />
            </button>

            <BrandSelector />
          </div>

          {/* <div className="flex items-center gap-4"> */}

          {/* </div> */}

          <div className="text-xl font-semibold">Welcome, Martin</div>
          <div className="flex items-center gap-4">
            {/* Reel limit indicator */}
            <div className="flex items-center gap-1 text-sm px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800">
              <Film className="w-4 h-4" />
              <span>0/1</span>
            </div>

            {userPlan === 'free' && (
              <button
                // onClick={() => navigate('/pricing')} // or show upgrade modal
                className="px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold rounded-md shadow-sm transition"
              >
                Upgrade
              </button>
            )}
            {/* Notification Icon with Badge */}
            <div className="relative group">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-1.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 py-0.5 rounded-full">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* Dropdown (if any) */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 z-50">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Notifications</h4>
                  {notifications.length > 0 ? (
                    <ul className="space-y-2 max-h-64 overflow-y-auto">
                      {notifications.map((n) => (
                        <li key={n.id} className="text-sm text-gray-600 dark:text-gray-300 border-b pb-2 last:border-none">
                          {n.message}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No notifications.</p>
                  )}
                </div>
              )}
            </div>

          </div>
        </nav>

        {/* Page Content */}
        <section className="flex-1 p-6 overflow-y-auto">
          <Outlet /> {/* This will render nested route content */}
          <BrandModal
            isOpen={isBrandModalOpen}
            onClose={() => setIsBrandModalOpen(false)}
          />
        </section>
      </main>
    </div>
  );
}