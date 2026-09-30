import type { TrekVideo } from "./trip-packages";

/** Same trail films as the live Everest Base Camp page (Watch video + guest reviews). */
export const EBC_WATCH_VIDEO: TrekVideo = {
  id: "ebc-watch",
  title: "Watch the trail",
  subtitle: "Everest Base Camp Luxury Trek",
  duration: "06:29",
  imageSrc: "/uploads/upload-1790010018817-vk7pll.webp",
  imageAlt: "Watch the Everest Base Camp luxury trek film",
  videoSrc: "https://www.youtube.com/watch?v=-XbXBGPu5m8",
};

export const EBC_VIDEO_REVIEWS: TrekVideo[] = [
  {
    id: "vr-ebc",
    title: "How do our guests feel in the Gokyo Ri !!!",
    subtitle: "14 Days Journey",
    duration: "04:28",
    imageSrc: "/uploads/upload-1790010484050-uomwog.webp",
    imageAlt: "Hikers on the Everest Base Camp trail",
    videoSrc: "https://www.youtube.com/watch?v=pL7DMrBvaYw",
  },
  {
    id: "vr-namche",
    title: "Video from Everest Base Camp/vídeo desde el campamento base del Everest",
    subtitle: "Guest film",
    duration: "03:40",
    imageSrc: "/uploads/upload-1790010569902-oy0l6r.webp",
    imageAlt: "Namche Bazaar and high Khumbu views",
    videoSrc: "https://www.youtube.com/watch?v=LIA3vj0AF5U",
  },
];
