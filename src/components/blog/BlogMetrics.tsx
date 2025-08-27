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
    <div className="flex items-center gap-3 text-sm text-primary-gray">
      <span className="inline-flex items-center gap-1.5">
        <Eye className="w-3.5 h-3.5" />
        {viewCount} VIEWS
      </span>
      <span className="w-1 h-1 bg-primary-gray rounded-full" />
      <span className="inline-flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5" />
        {readingTime} MINS READ
      </span>
    </div>
  );
}
