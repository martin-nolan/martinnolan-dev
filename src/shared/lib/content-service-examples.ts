// Example usage of the enhanced ContentService with media support

import { contentService } from "./content-service";
import type { FeaturedProject } from "../types";

// Example 1: Get profile with CV PDF
async function getProfileWithCV() {
  try {
    const profile = await contentService.getProfile();
    console.log("Profile:", profile);

    if (profile.cvPdf) {
      console.log("CV PDF URL:", profile.cvPdf);
      // You can now use this URL to download or display the CV
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}

// Example 2: Get featured projects with images from Strapi
async function getProjectsWithImages() {
  try {
    const projects = await contentService.getFeaturedProjects();

    projects.forEach((project: FeaturedProject) => {
      console.log(`Project: ${project.title}`);

      if (project.images && project.images.length > 0) {
        console.log("Project images:");
        project.images.forEach(
          (image: { src: string; description: string }, index: number) => {
            console.log(`  Image ${index + 1}: ${image.src}`);
            console.log(
              `  Description: ${image.description || "No description"}`
            );
          }
        );
      }
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
}

// Example 3: Get specific project images by category (e.g., cricket, kosmo)
async function getCricketImages() {
  try {
    const cricketImages = await contentService.getProjectImages("cricket");
    console.log("Cricket project images:", cricketImages);
  } catch (error) {
    console.error("Error fetching cricket images:", error);
  }
}

// Example 4: Get all media files in a specific folder
async function getKosmoMedia() {
  try {
    const kosmoFiles = await contentService.getMediaFiles("kosmo");
    console.log("Kosmo media files:", kosmoFiles);
  } catch (error) {
    console.error("Error fetching kosmo media:", error);
  }
}

// Example 5: Get all media files (no folder filter)
async function getAllMediaFiles() {
  try {
    const allMedia = await contentService.getMediaFiles();
    console.log("All media files:", allMedia);
  } catch (error) {
    console.error("Error fetching all media:", error);
  }
}

export {
  getProfileWithCV,
  getProjectsWithImages,
  getCricketImages,
  getKosmoMedia,
  getAllMediaFiles,
};
