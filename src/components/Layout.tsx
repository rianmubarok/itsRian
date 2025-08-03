import { ThemeProvider } from "next-themes";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import ProgressBar from "./ProgressBar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ProgressBar />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1" role="main">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
