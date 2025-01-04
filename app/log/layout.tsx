"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogProvider, useLogContext } from "@/contexts/log-context";
import { format } from "date-fns";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LogProvider>
      <MainLayout>{children}</MainLayout>
    </LogProvider>
  );
}

function MainLayout({ children }: { children: React.ReactNode }) {
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  );

  const { logs, setLogs, setSelectedDate, filterText, setFilterText } =
    useLogContext();
  const [logText, setLogText] = useState("");
  const [isFetchingLogs, setFetchingLogs] = useState(true);

  // Load logs from localStorage
  useEffect(() => {
    const storedLogs = localStorage.getItem("logs");
    setFetchingLogs(false);

    if (storedLogs) {
      setLogs(JSON.parse(storedLogs));
    }
  }, [setLogs]);

  // Save logs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("logs", JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Add a new log
  const handleAddLog = () => {
    if (logText.trim() === "") return;

    const newLog = {
      date: format(new Date(), "PP"),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      text: logText,
    };

    setLogs((prevLogs) => [...prevLogs, newLog]);
    setLogText(""); // Clear input
    setSelectedDate(format(new Date(), "PP"));
  };
  return (
    <SidebarProvider>
      <div className="flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <SidebarTrigger className="ml-4" />
          <div className="flex flex-col">
            {logs && logs.length > 0 && (
              <div>
                <div className="flex w-full items-center p-4 gap-2">
                  <Input
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    type="text"
                    placeholder="Search logs"
                  />
                  <Button onClick={() => setFilterText("")}>Clear</Button>
                </div>
              </div>
            )}
            <div className="flex-1 overflow-y-auto p-4">
              {isFetchingLogs ? (
                <div>
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              ) : (
                children
              )}
            </div>
            <form
              onSubmit={(e: FormEvent) => {
                e.preventDefault();
                handleAddLog();
              }}
              className="sticky bottom-0 mx-auto left-0 w-full p-4 bg-background"
            >
              <Label
                className="w-full mx-auto opacity-60 text-sm py-2"
                htmlFor="log"
              >
                It is {currentTime} now,
              </Label>
              <div className="flex w-full items-center space-x-2">
                <Input
                  id="log"
                  type="text"
                  placeholder="What did you just do?"
                  className="flex-1"
                  value={logText}
                  onChange={(e) => setLogText(e.target.value)}
                />
                <Button onClick={handleAddLog}>Log Activity</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
