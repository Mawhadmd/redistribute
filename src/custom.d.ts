// Declarations for side-effect imports used by CRA / Vite projects
// Allows importing CSS and assets in TypeScript without type errors.

declare module "*.css";
declare module "*.scss";
declare module "*.sass";

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.webp";

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// If you import other asset types (woff, mp4, etc.) add them here similarly.
