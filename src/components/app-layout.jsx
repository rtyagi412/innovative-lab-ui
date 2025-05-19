import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function AppLayout() {
  return (
    <div className="fixed inset-0 p-0.5 bg-gray-100">
      <div className="h-full w-full rounded-md shadow-md overflow-hidden bg-background flex flex-col border border-gray-200">
        <div className="[--header-height:calc(theme(spacing.14))] flex flex-col flex-1">
          <SidebarProvider className="flex flex-col flex-1 overflow-hidden">
            <SiteHeader />
            <div className="flex flex-1 overflow-hidden">
              <AppSidebar />
              <SidebarInset className="overflow-auto">
                <Outlet />
                <Toaster />
              </SidebarInset>
            </div>
          </SidebarProvider>
        </div>
      </div>
    </div>
  );
}
