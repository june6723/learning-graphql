type Photo = {
  id: number;
  url?: string;
  name: string;
  description?: string | null;
};
type PhotoCategory = "SELFIE" | "PORTRAIT" | "ACTION" | "LANDSCAPE" | "GRAPHIC";
type PhotoInput = {
  name: string;
  category: PhotoCategory;
  description?: string | null;
};

export type { Photo, PhotoCategory, PhotoInput };
