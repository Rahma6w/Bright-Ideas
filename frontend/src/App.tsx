import React, { useState, useEffect } from 'react';
import './App.css';
import { UserProfile, Project, Post } from './types';
import { api, fallbackProfile } from './services/api';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import HeroBanner from './components/HeroBanner';
import ProfileCard from './components/ProfileCard';
import Workbench from './components/Workbench';
import ActivityFeed from './components/ActivityFeed';
import EditProfileModal from './components/EditProfileModal';

function App() {
  const [profile, setProfile] = useState<UserProfile>(fallbackProfile);
  const [projects, setProjects] = useState<Project[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'posts' | 'comments' | 'supporting'>('posts');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, projectsData, postsData] = await Promise.all([
          api.getProfile(1),
          api.getProjects(1),
          api.getPosts(1),
        ]);
        setProfile(profileRes.data);
        setIsBackendConnected(profileRes.fromBackend);
        setProjects(projectsData);
        setPosts(postsData);
      } catch (err) {
        console.warn('Backend not reached, using local data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSaveProfile = async (updated: Partial<UserProfile>) => {
    try {
      const saved = await api.updateProfile(profile.id, updated);
      setProfile((prev) => ({ ...prev, ...saved }));
      setShowEditModal(false);
    } catch {
      setProfile((prev) => ({ ...prev, ...updated }));
      setShowEditModal(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner" />
        <span>Loading Workshop...</span>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Navbar credits={profile.credits} isConnected={isBackendConnected} />
      <div className="layout">
        <Sidebar credits={profile.credits} />
        <main className="main-content">
          <HeroBanner />
          <ProfileCard
            profile={profile}
            onEditClick={() => setShowEditModal(true)}
          />
          <Workbench projects={projects} />
          <ActivityFeed
            posts={posts}
            profile={profile}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </main>
      </div>

      {showEditModal && (
        <EditProfileModal
          profile={profile}
          onSave={handleSaveProfile}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}

export default App;
