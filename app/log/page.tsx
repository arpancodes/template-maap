"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useLogContext } from "@/contexts/log-context";
import { format } from "date-fns";
import { Terminal, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";

const LogPage = () => {
  const { logs, setLogs, filterText, selectedDate, summaries, setSummaries } =
    useLogContext();
  const [isFetchingSummaries, setFetchingSummaries] = useState(true);
  const [thisSummmary, setThisSummary] = useState("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setError("");
    if (!isFetchingSummaries) {
      localStorage.setItem("summaries", JSON.stringify(summaries));
      setThisSummary(
        summaries.find((s) => s.date === selectedDate)?.text || "",
      );
    }
  }, [summaries, selectedDate, isFetchingSummaries]);

  useEffect(() => {
    const storedSummaries = localStorage.getItem("summaries");
    setFetchingSummaries(false);

    if (storedSummaries) {
      setSummaries(JSON.parse(storedSummaries));
    }
  }, [setSummaries]);

  const getSummary = () => {
    setLoading(true);
    setProgress(5);
    if (filteredLogs.length <= 0) {
      setLoading(false);
      setProgress(0);
      setError("Please spend some time adding your activities to the log?");
      return;
    }
    const intervalId = setInterval(() => {
      setProgress((prevProgress: number) => {
        if (prevProgress >= 100) {
          clearInterval(intervalId);
          return 100;
        }
        return prevProgress + 5;
      });
    }, 200);

    fetch("/api/platform/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: JSON.stringify(filteredLogs),
      }),
    })
      .then((res) => {
        if (res.status !== 200) {
          setError("That didn't work well ☹️`, try again?");
          setLoading(false);
          clearInterval(intervalId);
          setProgress(0);
        }
        return res.json();
      })
      .then((response) => {
        console.log(response);
        setSummaries([...summaries, { text: response, date: selectedDate }]);
        setLoading(false);
        clearInterval(intervalId);
        setProgress(0);
        setError("");
      });
  };

  // Filter logs for the selected date
  const filteredLogs = filterText
    ? logs.filter((log) =>
      log.text.toLowerCase().includes(filterText.toLowerCase()),
    )
    : logs.filter((log) => log.date === selectedDate);

  return (
    <div>
      <AlertDialog>
        {progress > 0 && (
          <Progress
            value={progress}
            className="md:w-3/4 w-5/6 mx-auto my-3 border-0"
          />
        )}
        {error && <p className="w-4/5 mx-auto text-destructive">{error}</p>}
        {!filterText &&
          !isFetchingSummaries &&
          (thisSummmary ? (
            <div className="py-4">
              <Markdown>{thisSummmary}</Markdown>
            </div>
          ) : (
            <div className="flex justify-end py-2 items-center gap-2">
              {!isLoading && (
                <AlertDialogTrigger>
                  <Button>Summarize Day</Button>
                </AlertDialogTrigger>
              )}
            </div>
          ))}
        {filterText ? (
          <h2 className="text-lg font-bold mb-4">
            Tasks logged with: {filterText} ({filteredLogs.length})
          </h2>
        ) : (
          <h2 className="text-lg font-bold mb-4">
            Tasks logged{" "}
            {selectedDate === format(new Date(), "PP")
              ? "today "
              : `on ${selectedDate} `}
            ({filteredLogs.length})
          </h2>
        )}

        {filteredLogs.length > 0 ? (
          filteredLogs.map((log, index) => (
            <div
              key={index}
              className="p-2 border-b border-gray-700 flex justify-between"
            >
              <div>
                <p className="text-foreground">{log.text}</p>
                <p className="opacity-50 text-sm">
                  {log.time} on {log.date}
                </p>
              </div>
              {!thisSummmary && (
                <Button
                  variant="ghost"
                  className="hover:bg-transparent hover:text-destructive"
                  disabled={!!thisSummmary}
                  onClick={() => {
                    setLogs(logs.filter((l) => l.text != log.text));
                  }}
                >
                  <X />
                </Button>
              )}
            </div>
          ))
        ) : (
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Start logging activities below...</AlertTitle>
            <AlertDescription>
              Consider this as your real-time journal.
              <p className="opacity-50">
                Example: Finished Christmas shopping.
              </p>
            </AlertDescription>
          </Alert>
        )}

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You can only use this once a day! So it is advised that you do it
              at the end of the day, after you have lots of activities logged.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={getSummary}>
              Continue, generate summary...
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LogPage;
