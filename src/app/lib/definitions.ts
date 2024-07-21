export type Posts = {
  post_id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  category_id: number;
  category_name: string;
  user_name: string;
};

export type Categories = {
  category_id: number;
  name: string;
};

export type Preview = {
  title: string;
  content: string;
  created_at: string;
  user_name: string;
  category_name: string;
};
