import React from 'react';
import { Post, UserProfile } from '../types';

interface ActivityFeedProps {
  posts: Post[];
  profile: UserProfile;
  activeTab: 'posts' | 'comments' | 'supporting';
  onTabChange: (tab: 'posts' | 'comments' | 'supporting') => void;
}

function timeAgo(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) return 'just now';
    if (diffHours === 2) return '2 hours ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } catch {
    return '2 hours ago';
  }
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({
  posts,
  profile,
  activeTab,
  onTabChange,
}) => {
  return (
    <section className="activity-section">
      <div className="activity-tabs">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => onTabChange('posts')}
        >
          Posts {profile.posts}
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'comments' ? 'active' : ''}`}
          onClick={() => onTabChange('comments')}
        >
          Comments {profile.comments}
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'supporting' ? 'active' : ''}`}
          onClick={() => onTabChange('supporting')}
        >
          Supporting {profile.supporting}
        </button>
      </div>

      <div className="post-list">
        {activeTab === 'posts' && (
          posts.length > 0 ? (
            posts.map((post) => (
              <article key={post.id} className="post-item">
                <div className="post-item__meta">
                  <span className="post-item__category">{post.category}</span>
                  <span className="dot-sep">·</span>
                  <span className="post-item__time">{timeAgo(post.createdAt)}</span>
                </div>
                <h3 className="post-item__title">{post.title}</h3>
              </article>
            ))
          ) : (
            <article className="post-item">
              <div className="post-item__meta">
                <span className="post-item__category">Tech</span>
                <span className="dot-sep">·</span>
                <span className="post-item__time">2 hours ago</span>
              </div>
              <h3 className="post-item__title">A park bench that brings people together.</h3>
            </article>
          )
        )}

        {activeTab === 'comments' && (
          <div className="empty-tab-state">
            <p>142 comments shared across the community.</p>
          </div>
        )}

        {activeTab === 'supporting' && (
          <div className="empty-tab-state">
            <p>Currently supporting 63 community ideas and creators.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ActivityFeed;
