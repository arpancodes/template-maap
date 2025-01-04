import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useLogContext } from "@/contexts/log-context";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const { setOpenMobile } = useSidebar();
  const { logs, setSelectedDate } = useLogContext();
  const uniqueDates = [...new Set(logs.map((log) => log.date))].reverse();

  const handleButtonClick = (date: string) => {
    setSelectedDate(date);
    setOpenMobile(false);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Previous logs</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {!uniqueDates.includes(format(new Date(), "PP")) && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Button
                      variant="ghost"
                      className="flex justify-start items-start"
                      onClick={() =>
                        handleButtonClick(format(new Date(), "PP"))
                      }
                    >
                      Today
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
              {uniqueDates.length > 0 &&
                uniqueDates.map((date) => (
                  <SidebarMenuItem key={date}>
                    <SidebarMenuButton asChild>
                      <Button
                        variant="ghost"
                        className="flex justify-start items-start"
                        onClick={() => handleButtonClick(date)}
                      >
                        {date === format(new Date(), "PP") ? "Today" : date}
                      </Button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
