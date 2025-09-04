export interface Post {
  _id: string;
  title: string;
  content: string;
  authorId: {
    _id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PostCardProps {
  post: Post;
}

export interface ButttonSpinnerProps {
  size?: number;
  color?: string;
  text?: string;
}

export type ToastType = "success" | "error" | "warning" | "info";

export interface GlassToastProps {
  message: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  isVisible: boolean;
  onClose: () => void;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
}
