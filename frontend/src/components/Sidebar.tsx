import React from 'react';

interface SidebarProps {
  credits?: number;
}

const navItems = [
  { label: 'Home feed', href: '#' },
  { label: 'Saved & favourites', href: '#' },
  { label: 'Private workspace', href: '#' },
  { label: 'Messages', href: '#' },
  { label: 'Notifications', href: '#' },
  { label: 'Reputation & badges', href: '#' },
  { label: 'Profile', href: '#', active: true },
  { label: 'Gift shop', href: '#' },
  { label: 'Credits', href: '#' },
  { label: 'Settings', href: '#' },
  { label: 'Staff dashboard', href: '#' },
];

const Sidebar: React.FC<SidebarProps> = ({ credits = 1240 }) => {
  return (
    <aside className="sidebar">
      <p className="sidebar__section-label">YOUR WORKSHOP</p>
      <ul className="sidebar__nav">
        {navItems.map((item) => (
          <li key={item.label} className={item.active ? 'active' : ''}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>

      <div className="sidebar__credits-card">
        <p className="credits-headline">A little support goes far.</p>
        <div className="credits-amount">{credits.toLocaleString()} credits</div>
        <div className="credits-tagline">Give a spark. Keep ideas moving.</div>
      </div>
    </aside>
  );
};

export default Sidebar;
