/**
 * Cloudinary URL Optimization Utility
 *
 * Transforms URLs to use Cloudinary's optimization parameters:
 * - w_800: Max width of 800px
 * - q_auto: Automatic quality based on device
 * - f_auto: Automatic format (WebP, etc.)
 */

export function optimizeCloudinaryUrl(url, options = {}) {
  if (!url || typeof url !== "string") return url;

  const {
    width = 800,
    quality = "auto",
    format = "auto",
    crop = "scale", // 'scale', 'fill', 'thumb', etc.
    gravity, // Optional: 'face', 'center', etc.
  } = options;

  // Already an optimized Cloudinary URL
  if (url.includes("/upload/") && url.includes("w_")) {
    return url;
  }

  // Not a Cloudinary URL
  if (!url.includes("cloudinary.com")) {
    return url;
  }

  // Extract Cloudinary path and filename
  const uploadIndex = url.indexOf("/upload/");
  if (uploadIndex === -1) return url;

  const beforeUpload = url.substring(0, uploadIndex + "/upload/".length);
  const afterUpload = url.substring(uploadIndex + "/upload/".length);

  // Build transformation string
  const transforms = [`w_${width}`, `q_${quality}`, `f_${format}`, `c_${crop}`];

  if (gravity) {
    transforms.push(`g_${gravity}`);
  }

  const transformString = transforms.join(",");

  return `${beforeUpload}${transformString}/${afterUpload}`;
}

/**
 * Get optimized thumbnail URL (smaller dimensions)
 */
export function getThumbnailUrl(url, width = 300) {
  return optimizeCloudinaryUrl(url, {
    width,
    quality: "auto",
    format: "auto",
    crop: "fill",
  });
}

/**
 * Get optimized full-size URL (for lightbox)
 */
export function getFullSizeUrl(url, width = 1200) {
  return optimizeCloudinaryUrl(url, {
    width,
    quality: "auto",
    format: "auto",
    crop: "scale",
  });
}
