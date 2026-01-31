import { useState, useEffect } from "react";
import "./SideBarLayout.css";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  Menu, X, Home, FileText, Search, Clock, Mic, BarChart, Upload, ArrowLeft, LogOut, User
} from "lucide-react";

export default function SidebarLayout() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className={`sidebar-layout ${open ? "sidebar-open" : "sidebar-closed"}`}>

      {/* Mobile Overlay */}
      {open && <div className="sidebar-overlay" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "open" : "closed"}`}>
        <div className="sidebar-header">
          {open && <span className="sidebar-logo">NyayaManch</span>}
          <button className="toggle-btn" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {/* 🔙 HOME / LANDING PAGE */}
          <SidebarItem
            icon={<ArrowLeft size={20} />}
            label="Home"
            open={open}
            to="/"
            onClick={() => setOpen(false)}
          />
          <div className="sidebar-divider" />
          <SidebarItem icon={<Home size={20} />} label="Dashboard" open={open} to="/dashboard" onClick={() => setOpen(false)} />
          <SidebarItem icon={<FileText size={20} />} label="Judgement Summarizer" open={open} to="/summarizer" onClick={() => setOpen(false)} />
          <SidebarItem icon={<Upload size={20} />} label="Next Step Prediction" open={open} to="/upload" onClick={() => setOpen(false)} />
          <SidebarItem icon={<Search size={20} />} label="Similar Case Finder" open={open} to="/similar" onClick={() => setOpen(false)} />
          <SidebarItem icon={<Clock size={20} />} label="Delay Forecast" open={open} to="/forecast" onClick={() => setOpen(false)} />
          <SidebarItem icon={<Mic size={20} />} label="Vernacular & Voice" open={open} to="/vernacular" onClick={() => setOpen(false)} />
          <SidebarItem icon={<BarChart size={20} />} label="Case Strength" open={open} to="/strength" onClick={() => setOpen(false)} />
        </nav>

        {/* User Profile Section at Bottom */}
        <div className="sidebar-footer">
            <div className="sidebar-divider" />
            
            {user ? (
                <div className={`user-profile ${open ? 'open' : ''}`}>
                    <div className="user-info">
                        <div className="user-avatar">
                            {user.picture ? (
                                <img src={user.picture} alt="User" />
                            ) : (
                                <User size={20} />
                            )}
                        </div>
                        {open && (
                            <div className="user-details">
                                <span className="user-name">{user.name}</span>
                                <span className="user-email">{user.email}</span>
                            </div>
                        )}
                    </div>
                    
                    {open && (
                         <button className="sidebar-logout-btn" onClick={handleLogout} title="Logout">
                            <LogOut size={18} />
                         </button>
                    )}
                </div>
            ) : (
                // If not logged in, show login icon/button
                <NavLink to="/login" className="sidebar-item">
                    <div className="icon-wrapper"><User size={20} /></div>
                    {open && <span className="label-text">Login</span>}
                </NavLink>
            )}
        </div>
      </aside>

      {/* Page Content */}
      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, open, to, onClick }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
      onClick={window.innerWidth < 768 ? onClick : undefined}
    >
      <div className="icon-wrapper">{icon}</div>
      {open && <span className="label-text">{label}</span>}
    </NavLink>
  );
}