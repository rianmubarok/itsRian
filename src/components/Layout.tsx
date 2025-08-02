import { ThemeProvider } from "next-themes";
import Navbar from "./Navbar";
import Footer from "./Footer";

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
