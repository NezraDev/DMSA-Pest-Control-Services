import { galleryItems } from "./gallery-data.js";

// The map and gallery share one source of truth. Update gallery-data.js and both
// views update automatically on the next local build or Vercel deployment.
export const treatedLocations = galleryItems;
