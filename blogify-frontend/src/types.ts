export interface Post {
  _id: string;
  title: string;
  content: string;
  category: { _id: string; name: string } | string;
  tags?: string[];
  status: "draft" | "published";
  author?: { name: string; email: string; role: string };
}

export interface Category {
  _id: string;
  name: string;
}