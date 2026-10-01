export type StorySection = { heading: string; paragraphs: string[]; bullets?: string[] };
export type EditorialMedia = { src: string; type: "image" | "video"; alt: string };
export type EditorialStory = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  intro: string;
  sections: StorySection[];
  heroImage: string;
  imageAlt: string;
  imageCaption?: string;
  gallery?: EditorialMedia[];
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
  relatedSlugs?: string[];
};

export const DEFAULT_STORY_IMAGE = "/media/brand/cryptita-feature-placeholder.jpg";
