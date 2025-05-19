import { ChevronsUpDown, LifeBuoy, SidebarIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";

import { Bell, Settings, User, LogOut } from "lucide-react";

import { DropdownMenu } from "@radix-ui/react-dropdown-menu";

import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useLogout } from "@/features/auth/hooks/useLogout";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();
  const logout = useLogout();

  return (
    <header className="sticky top-0 z-50 flex w-full items-center border-b bg-brand">
      {/* <div className="flex h-(--header-height) w-full items-center gap-2 px-2">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">
                Building Your Application
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <SearchForm className="w-full sm:ml-auto sm:w-auto" />
      </div> */}

      <div className="flex h-(--header-height) w-full items-center gap-2 px-2">
        <div
          className="group h-8 w-8 flex items-center justify-center rounded-md transition-colors duration-200 hover:bg-primary-foreground hover:text-brand"
          onClick={toggleSidebar}
        >
          <SidebarIcon className="h-5 w-5 text-primary-foreground group-hover:text-brand" />
        </div>
        {/* <Separator orientation="vertical" className="mr-2 h-3" /> */}
        <span className="text-xl text-primary-foreground font-medium flex items-center justify-center">
          Innovative Lab
        </span>
      </div>
      <div className="flex items-center justify-center pr-4 gap-4">
        <div className="group h-8 w-8 flex items-center justify-center rounded-md transition-colors duration-200 hover:bg-primary-foreground hover:text-brand">
          <Bell className="h-5 w-5 text-primary-foreground group-hover:text-brand" />
        </div>
        {/* <div className="group h-8 w-8 flex items-center justify-center rounded-md transition-colors duration-200 hover:bg-primary-foreground hover:text-brand">
          <Settings className="h-5 w-5 text-primary-foreground group-hover:text-brand" />
        </div>
        <div className="group h-8 w-8 flex items-center justify-center rounded-md transition-colors duration-200 hover:bg-primary-foreground hover:text-brand">
          <User className="h-5 w-5 text-primary-foreground group-hover:text-brand" />
        </div> */}
        {/* <div className="group h-8 w-8 flex items-center justify-center rounded-md transition-colors duration-200 hover:bg-primary-foreground hover:text-brand">
          <Popover>
            <PopoverTrigger asChild>
              <LogOut className="h-5 w-5 text-primary-foreground group-hover:text-brand" />
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Dimensions</h4>
                  <p className="text-sm text-muted-foreground">
                    Set the dimensions for the layer.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Width</Label>
                    <Input
                      id="width"
                      defaultValue="100%"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxWidth">Max. width</Label>
                    <Input
                      id="maxWidth"
                      defaultValue="300px"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="height">Height</Label>
                    <Input
                      id="height"
                      defaultValue="25px"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxHeight">Max. height</Label>
                    <Input
                      id="maxHeight"
                      defaultValue="none"
                      className="col-span-2 h-8"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div> */}

        {/* <Popover>
          <PopoverTrigger asChild>
            <div className="group h-8 w-8 flex items-center justify-center rounded-md transition-colors duration-200 hover:bg-primary-foreground hover:text-brand">
              <LogOut className="h-5 w-5 text-primary-foreground group-hover:text-brand" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-60 mr-2 p-2">
            <span>Signout</span>
          </PopoverContent>
        </Popover> */}
        {/* <div className="group h-8 w-16 flex items-center justify-center rounded-md transition-colors duration-200 hover:bg-primary-foreground hover:text-brand">
          <User className="h-5 w-5 text-primary-foreground group-hover:text-brand" />
          <ChevronsUpDown className="h-5 w-5 text-primary-foreground group-hover:text-brand" />
        </div>
        <div className="group h-8 w-8 flex items-center justify-center rounded-md transition-colors duration-200 hover:bg-primary-foreground hover:text-brand">
          <ChevronsUpDown className="h-5 w-5 text-primary-foreground group-hover:text-brand" />
        </div> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="p-2">
              RT
              <ChevronsUpDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mr-2">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LifeBuoy />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
