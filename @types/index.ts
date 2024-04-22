type User = {
  githubLogin: string;
  name: string;
};

type Photo = {
  id: string;
  url?: string;
  name: string;
  description?: string | null;
  githubUser: string;
  category: PhotoCategory;
};
type PhotoCategory = "SELFIE" | "PORTRAIT" | "ACTION" | "LANDSCAPE" | "GRAPHIC";
type PhotoInput = {
  name: string;
  category: PhotoCategory;
  description?: string | null;
};

export type { Photo, PhotoCategory, PhotoInput, User };
