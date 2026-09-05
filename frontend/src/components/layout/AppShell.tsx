import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toast";

export function AppShell() {
  const location = useLocation();
  const isWorkspace = location.pathname.startsWith("/problems/");

  return (
    <div className="min-h-screen flex flex-col bg-forge-bg">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      {!isWorkspace && <Footer />}
      <Toaster />
    </div>
  );
}
