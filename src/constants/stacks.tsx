import React, { JSX } from "react";
import { BsFillBootstrapFill, BsRobot } from "react-icons/bs";
import {
  SiCss3,
  SiFirebase,
  SiJavascript,
  SiJquery,
  SiLaravel,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiVuedotjs,
  SiWordpress,
  SiMongodb,
  SiGit,
  SiGithub,
  SiVercel,
  SiFigma,
  SiMysql,
  SiGooglecloud,
  SiSqlite,
  SiRailway,
  SiNotion,
  SiFlutter,
  SiDart,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAdobeaftereffects,
  SiCanva,
  SiSupabase,
  SiExpress,
  SiEjs,
  SiPm2,
} from "react-icons/si";

export type StackProps = {
  [key: string]: JSX.Element;
};

const iconSize = 20;

export const STACKS: StackProps = {
  PHP: <SiPhp size={iconSize} className="text-blue-500" />,
  JavaScript: <SiJavascript size={iconSize} className="text-yellow-400" />,
  TypeScript: <SiTypescript size={iconSize} className="text-blue-400" />,
  "Next.js": <SiNextdotjs size={iconSize} />,
  "React.js": <SiReact size={iconSize} className="text-sky-500" />,
  TailwindCSS: <SiTailwindcss size={iconSize} className="text-cyan-300" />,
  Bootstrap: (
    <BsFillBootstrapFill size={iconSize} className="text-purple-500" />
  ),
  WordPress: <SiWordpress size={iconSize} />,
  Laravel: <SiLaravel size={iconSize} className="text-red-500" />,
  Vite: <SiVite size={iconSize} className="text-purple-500" />,
  Firebase: <SiFirebase size={iconSize} className="text-yellow-500" />,
  "Artificial Intelligence": (
    <BsRobot size={iconSize} className="text-rose-500" />
  ),
  "Vue.js": <SiVuedotjs size={iconSize} className="text-green-500" />,
  "Node.js": <SiNodedotjs size={iconSize} className="text-green-600" />,
  CSS: <SiCss3 size={iconSize} className="text-blue-300" />,
  Jquery: <SiJquery size={iconSize} />,
  MongoDB: <SiMongodb size={iconSize} className="text-green-500" />,
  Git: <SiGit size={iconSize} className="text-orange-500" />,
  GitHub: <SiGithub size={iconSize} />,
  Vercel: <SiVercel size={iconSize} />,
  Figma: <SiFigma size={iconSize} className="text-pink-500" />,
  MySQL: <SiMysql size={iconSize} className="text-blue-500" />,
  "Google Cloud": <SiGooglecloud size={iconSize} className="text-blue-500" />,
  Railway: <SiRailway size={iconSize} className="text-violet-500" />,
  Notion: <SiNotion size={iconSize} />,
  SQLite: <SiSqlite size={iconSize} className="text-blue-600" />,
  Dart: <SiDart size={iconSize} className="text-blue-600" />,
  Flutter: <SiFlutter size={iconSize} className="text-cyan-500" />,
  Photoshop: <SiAdobephotoshop size={iconSize} className="text-sky-500" />,
  Illustrator: (
    <SiAdobeillustrator size={iconSize} className="text-orange-500" />
  ),
  "After Effects": (
    <SiAdobeaftereffects size={iconSize} className="text-violet-600" />
  ),
  Canva: <SiCanva size={iconSize} className="text-cyan-500" />,
  Supabase: <SiSupabase size={iconSize} className="text-emerald-500" />,
  Express: <SiExpress size={iconSize} />,
  EJS: <SiEjs size={iconSize} className="text-yellow-400" />,
  PM2: <SiPm2 size={iconSize} className="text-green-500" />,
};
