import { Eye, Clock } from "lucide-react";

interface BlogMetricsProps {
  viewCount: string;
  readingTime: string;
}

export default function BlogMetrics({
  viewCount,
  readingTime,
}: BlogMetricsProps) {
  return (
    <div className="flex items-center gap-4 sm:gap-6 text-sm text-primary-gray">
      <div className="flex items-center gap-2">
        <Eye className="w-4 h-4" />
        <span>{viewCount} views</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4" />
        <span>{readingTime} read</span>
      </div>
    </div>
  );
}
