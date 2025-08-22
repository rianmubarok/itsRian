// Layout Components
export { default as Layout } from "./Layout";
export { default as Navbar } from "./layout/Navbar";
export { default as Footer } from "./layout/Footer";

// Common Components
export { default as ThemeToggle } from "./shared/common/ThemeToggle";
export { default as ProgressBar } from "./ProgressBar";

// UI Components
export {
  default as SkeletonLoader,
  ProjectCardSkeleton,
  FeaturedBlogRotatorSkeleton,
  ProjectsHeaderSkeleton,
  FeaturedProjectCardSkeleton,
  OtherProjectCardSkeleton,
  FeaturedBlogCardSkeleton,
} from "./shared/ui/SkeletonLoader";

// Project Components
export { default as ProjectCard } from "./project/ProjectCard";
export { default as OtherProjects } from "./project/OtherProjects";

// Home Components
export { default as IntroSection } from "./home/IntroSection";
export { default as FeaturedProjects } from "./home/FeaturedProjects";

// Guestbook Components
export { default as GuestbookMessage } from "./guestbook/GuestbookMessage";
export { MessageInput } from "./guestbook/MessageInput";
export { default as AuthButtons } from "./guestbook/AuthButtons";
export { default as MessageList } from "./guestbook/MessageList";
