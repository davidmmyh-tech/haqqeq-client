//TODO: /api/docvideos ?limit=x&page=x
//Returns list of Videos
//Paginated with limit and page queries
type VideosResponse = {
  videos: [
    {
      id: number;
      title: string;
      description: string;
      views_count: number;
      image_path: string;
      created_at: string;
      updated_at: string;
      category: {
        id: number | string;
        name: string;
      };
    }
  ];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
};

//TODO: /api/docvideos/{video_id}
//Returns single Video details,
type VideoDetailsResponse = {
  id: number;
  title: string;
  description: string;
  views_count: number;
  image_path: string;
  video_path: string;
  created_at: string;
  updated_at: string;
  category: {
    id: number | string;
    name: string;
  };
};

//TODO: /api/categories/docvideos/{Category_id} ?limit=x&page=x
//Returns single category with list of videos under this category,
//pagenated with limit and page queries
type VideosCategoryResponse = {
  status: string;
  message: string;
  videos: {
    id: number;
    name: string;
    image: string;
    description: string;
    doc_videos: {
      id: number;
      title: string;
      description: string;
      views_count: number;
      image_path: string;
      video_path: string;
      created_at: string;
      updated_at: string;
      category: {
        id: number | string;
        name: string;
      };
    }[];
  };
};

//TODO: /api/categories/docvideos ?limit=x&page=x
//Returns list of categories only
// paginated with limit and page queries
type VideosCategoriesResponse = {
  categories: [
    {
      id: number;
      name: string;
      image: string;
      description: string;
    }
  ];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
};
