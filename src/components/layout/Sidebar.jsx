import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FlaskConical, 
  Layers, 
  Dna,
  Settings, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/app' },
  { icon: FlaskConical, label: 'Lab Bench', path: '/app/analyze' },
  { icon: Dna, label: 'Molecule 3D', path: '/app/visualization' },
  { icon: Layers, label: 'Batch Process', path: '/app/batch' },
  { icon: Settings, label: 'Settings', path: '/app/settings' },
];

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <aside className="fixed left-4 top-4 bottom-4 w-20 md:w-64 z-50 flex flex-col transition-all duration-300">
      
      {/* The Glass Container */}
      <div className="h-full flex flex-col rounded-3xl border border-white/20 bg-white/10 dark:bg-black/30 backdrop-blur-xl shadow-2xl overflow-hidden relative">
        
        {/* Logo Area */}
        <div className="h-24 flex items-center justify-center border-b border-white/10 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-bio-teal/10 to-bio-violet/10 opacity-50" />
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-bio-teal to-bio-violet hidden md:block">
            DrugForge
          </h1>
          <FlaskConical className="w-8 h-8 text-bio-teal md:hidden" />
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/app'}
              className={({ isActive }) => `
                group flex items-center px-3 py-3 rounded-xl transition-all duration-300 relative overflow-hidden
                ${isActive 
                  ? 'bg-gradient-to-r from-bio-teal/20 to-bio-blue/20 text-bio-teal shadow-lg border border-white/10' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-white/10 hover:text-slate-700 dark:hover:text-slate-200'}
              `}
            >
              {({ isActive }) => (
                <>
                  {/* Active Indicator Line */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-bio-teal rounded-r-full" />
                  )}
                  
                  <item.icon className={`w-6 h-6 transition-transform group-hover:scale-110 ${isActive ? 'text-bio-teal' : ''}`} />
                  
                  <span className="ml-3 font-medium hidden md:block">
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User / Logout Section */}
        <div className="p-4 border-t border-white/10 bg-black/5">
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center md:justify-start px-3 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="ml-3 hidden md:block">Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
