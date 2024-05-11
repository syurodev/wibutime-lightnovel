type LightnovelResponse = {
  id: string;
  url_id: string;
  name: string;
  categories: {
    id: string;
    name: string;
  }[];
  image?: {
    key?: string;
    url?: string;
  };
  status: string;
  created_at: number;
};

type Image = {
  key: string;
  url: string;
};

type Category = {
  id: string;
  name: string;
};

type LightnovelDetailResponse = {
  id: string;
  url_id: string;
  name: string;
  other_names: string[];
  author: string;
  artist: string;
  image: Image;
  categories: Category[];
  summary: string;
  deleted: boolean;
  status: string;
  note: string;
  user_id: number;
  created_at: number;
  updated_at: number;
};
