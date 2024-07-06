export interface Movie {
  id: string;
  title: string;
  url: string;
  sharedBy: string;
  liked: boolean;
  disliked: boolean;
  likes: number;
  dislikes: number;
  description?: string;
}