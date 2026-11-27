import React from 'react';

interface NavbarProps {
  credits: number;
  isConnected?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ credits, isConnected }) => {
  return (
    <nav className="navbar">
      <div className="navbar__brand-wrap">
        <span className="navbar__brand">A home for what comes next.</span>
        {isConnected !== undefined && (
          <span
            className={`api-status-dot ${isConnected ? 'connected' : 'offline'}`}
            title={isConnected ? 'Backend connected (Spring Boot 8080)' : 'Backend offline (using local cache)'}
          />
        )}
      </div>

      <div className="navbar__search">
        <input
          type="text"
          placeholder="Search ideas, people, possibilities..."
          aria-label="Search"
        />
      </div>

      <div className="navbar__actions">
        <span className="navbar__credits">
          {credits.toLocaleString()} credits
        </span>
        <button className="btn-share" type="button">+ Share an idea</button>
        <button className="btn-profile-nav" type="button">Your profile</button>
      </div>
    </nav>
  );
};

export default Navbar;
