interface SectionDividerProps {
  delay?: number;
}

export default function SectionDivider({ delay = 0 }: SectionDividerProps) {
  return <hr className="border-t border-primary-gray/20 my-12" />;
}
