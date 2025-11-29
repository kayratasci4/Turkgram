export interface User {
  id: string;
  username: string;
  fullName: string;
  avatarUrl: string;
  isVerified?: boolean;
}

export interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: string;
}

export interface Post {
  id: string;
  user: User;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  location?: string;
  isLiked: boolean;
  isSaved: boolean;
}

export interface Story {
  id: string;
  user: User;
  isSeen: boolean;
}

export type ViewState = 'home' | 'search' | 'create' | 'reels' | 'profile';