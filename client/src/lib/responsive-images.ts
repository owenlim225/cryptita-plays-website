// Keep each URL literal separate so the build's media inventory can discover it.
export const brandBanner = {
  src: "/images/optimized/cryptita-banner-640.webp",
  width: 640,
  height: 189,
};

export const brandMark = {
  src: "/images/optimized/cryptita-mark-160.webp",
  width: 160,
  height: 159,
};

function responsivePhoto(small: string, large: string, width: number, height: number) {
  return { src: large, srcSet: `${small} 640w, ${large} 1280w`, width, height };
}

export const campusPhoto = responsivePhoto(
  "/images/optimized/web3-campus-640.webp",
  "/images/optimized/web3-campus-1280.webp",
  1280, 851,
);

export const libraryPhoto = responsivePhoto(
  "/images/optimized/mini-library-640.webp",
  "/images/optimized/mini-library-1280.webp",
  1280, 721,
);

export const heroPoster = responsivePhoto(
  "/images/optimized/learning-event-640.webp",
  "/images/optimized/learning-event-1280.webp",
  1280, 960,
);
