import { UserProfile, Project, Post } from '../types';

const BASE_URL = 'http://localhost:8080/api';

export const fallbackProfile: UserProfile = {
  id: 1,
  name: 'Alex Morgan',
  username: 'alexmakes',
  bio: 'Product designer, neighbourhood optimist, and chronic "what if?" asker. Building things that bring us a little closer.',
  location: 'London, UK',
  avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80',
  joinedDate: '2025-03-01',
  ideasShared: 28,
  credits: 1240,
  posts: 28,
  comments: 142,
  supporting: 63,
  badges: ['Community Builder', 'Golden Supporter'],
};

export const fallbackProjects: Project[] = [
  {
    id: 1,
    title: 'The listening bench',
    description: 'Prototype study · 8 images',
    imageUrl: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=700&h=420&q=80',
    type: 'prototype',
  },
  {
    id: 2,
    title: 'Small places. Shared stories.',
    description: 'Community design toolkit',
    type: 'field_notes',
    fieldNotesLabel: 'FIELD NOTES / 001',
    fieldNotesSubtitle: 'Community design toolkit',
    fileInfo: 'PDF · 12 pages · 2.4 MB',
  },
];

export const fallbackPosts: Post[] = [
  {
    id: 1,
    title: 'A park bench that brings people together.',
    category: 'Tech',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    title: 'Designing for the third place: lessons from local spaces.',
    category: 'Design',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    title: 'How community soundscapes can shape urban wellbeing.',
    category: 'Research',
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
];

export const api = {
  async getProfile(id: number = 1): Promise<{ data: UserProfile; fromBackend: boolean }> {
    try {
      const res = await fetch(`${BASE_URL}/profile/${id}`);
      if (!res.ok) throw new Error('Backend returned error');
      const data = await res.json();
      return { data, fromBackend: true };
    } catch {
      return { data: fallbackProfile, fromBackend: false };
    }
  },

  async updateProfile(id: number, data: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const res = await fetch(`${BASE_URL}/profile/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update profile on backend');
      return await res.json();
    } catch {
      return { ...fallbackProfile, ...data };
    }
  },

  async getProjects(profileId: number = 1): Promise<Project[]> {
    try {
      const res = await fetch(`${BASE_URL}/profile/${profileId}/projects`);
      if (!res.ok) throw new Error('Backend returned error');
      return await res.json();
    } catch {
      return fallbackProjects;
    }
  },

  async getPosts(profileId: number = 1): Promise<Post[]> {
    try {
      const res = await fetch(`${BASE_URL}/profile/${profileId}/posts`);
      if (!res.ok) throw new Error('Backend returned error');
      return await res.json();
    } catch {
      return fallbackPosts;
    }
  },
};
