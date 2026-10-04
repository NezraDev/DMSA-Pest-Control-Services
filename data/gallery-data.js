/**
 * Add approved local image paths (for example, /gallery/project-name/before.jpg)
 * after placing each file inside public. Empty paths intentionally render
 * a clear sample placeholder and never imply that a generated image is real work.
 * Set both beforeImage and afterImage to false to hide the comparison section.
 * The treatment carousel will continue to use every entry in imagePaths.
 *
 * @type {import("../lib/content-types").GalleryItem[]}
 */
export const galleryItems = [
  {
    id: "sample-001",
    slug: "anos-los-banos-residential-monitoring",
    title: "Residential Termite Treatment",
    imagePaths: [
      "/brand/anos/1.png",
      "/brand/anos/2.png",
      "/brand/anos/3.png",
      "/brand/anos/4.png",
      "/brand/anos/5.png",
      "/brand/anos/6.png",
    ],
    beforeImage: false,
    afterImage: false,
    category: "Termite Control",
    displayCategory: "Termite Treatment",
    propertyType: "Residential",
    servicePerformed: "Termite Treatment",
    generalLocation: "Anos, Los Baños, Laguna",
    treatmentDate: "2026-09-03",
    year: 2026,
    coordinates: [121.231206845477, 14.178571849297366],
    region: "Laguna",
    pest: "Termites",
    customerType: "Residential",
    description:
      "A residential termite treatment carried out in Anos, Los Baños, Laguna, focusing on affected areas and potential termite entry points. The treatment included inspection of the property, targeted application in termite-affected areas, and removal of termite-infested soil and debris to help eliminate active termite activity and reduce the risk of reinfestation.",
    shortDescription:
      "Residential termite treatment and cleanup in Anos, Los Baños, Laguna.",
    customerFeedback: "",
    featured: false,
    isSample: true,
  },
];
