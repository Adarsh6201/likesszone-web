import React from 'react';

/**
 * YouTube SVG Icon Component
 */
export const YoutubeIcon = ({ className = "h-5 w-5 text-red-600" }) => (
  React.createElement('svg', { className, viewBox: "0 0 24 24", fill: "currentColor" },
    React.createElement('path', { d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" })
  )
);

/**
 * Extracts YouTube video ID from various YouTube URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * - VIDEO_ID directly
 */
export const getYouTubeVideoId = (url) => {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (trimmed.length === 11 && !trimmed.includes('/') && !trimmed.includes('.')) {
    return trimmed;
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = trimmed.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

/**
 * Returns clean embed iframe URL for a YouTube link
 */
export const getYouTubeEmbedUrl = (url) => {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
};

/**
 * Returns high-definition YouTube video thumbnail image URL
 */
export const getYouTubeThumbnailUrl = (url) => {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};
