export interface UserProfile {
  id: number;
  name: string;
  username: string;
  bio: string;
  location: string;
  avatarUrl: string;
  joinedDate: string;
  ideasShared: number;
  credits: number;
  posts: number;
  comments: number;
  supporting: number;
  badges: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  type: 'prototype' | 'field_notes';
  fieldNotesLabel?: string;
  fieldNotesSubtitle?: string;
  fileInfo?: string;
}

export interface Post {
  id: number;
  title: string;
  category: string;
  createdAt: string;
}
