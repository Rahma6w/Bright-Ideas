import React from 'react';
import { UserProfile } from '../types';

interface ProfileCardProps {
  profile: UserProfile;
  onEditClick: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onEditClick }) => {
  // Format joined date to "Joined Month Year"
  const formattedDate = (() => {
    try {
      const d = new Date(profile.joinedDate);
      return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } catch {
      return 'March 2025';
    }
  })();

  return (
    <div className="profile-card">
      <button className="btn-edit" onClick={onEditClick} type="button">
        Edit profile
      </button>

      <div className="profile-card__header">
        <img
          className="profile-card__avatar"
          src={profile.avatarUrl}
          alt={profile.name}
        />
        <div className="profile-card__info">
          <h2 className="profile-card__name">{profile.name}</h2>
          <p className="profile-card__username">@{profile.username}</p>
        </div>
      </div>

      <p className="profile-card__bio">{profile.bio}</p>

      <div className="profile-card__badges">
        {profile.badges?.map((badge) => (
          <span key={badge} className="badge">
            <span className="badge-sparkle">✦</span>
            <span>{badge}</span>
          </span>
        ))}
      </div>

      <div className="profile-card__meta">
        <span>{profile.location}</span>
        <span className="dot-sep">·</span>
        <span>Joined {formattedDate}</span>
        <span className="dot-sep">·</span>
        <span>{profile.ideasShared} ideas shared</span>
      </div>
    </div>
  );
};

export default ProfileCard;
