import { format } from "date-fns";
import React, { createContext, useContext, useState } from "react";

interface LogEntry {
  date: string;
  time: string;
  text: string;
}

interface Summary {
  date: string;
  text: string;
}

interface LogContextProps {
  logs: LogEntry[];
  selectedDate: string;
  filterText: string;
  summaries: Summary[];
  setLogs: React.Dispatch<React.SetStateAction<LogEntry[]>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  setFilterText: React.Dispatch<React.SetStateAction<string>>;
  setSummaries: React.Dispatch<React.SetStateAction<Summary[]>>;
}

const LogContext = createContext<LogContextProps | undefined>(undefined);

export const useLogContext = () => {
  const context = useContext(LogContext);
  if (!context) {
    throw new Error("useLogContext must be used within a LogProvider");
  }
  return context;
};

export const LogProvider = ({ children }: { children: React.ReactNode }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [filterText, setFilterText] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), "PP"), // Default to current date
  );

  return (
    <LogContext.Provider
      value={{
        logs,
        setLogs,
        summaries,
        setSummaries,
        selectedDate,
        setSelectedDate,
        filterText,
        setFilterText,
      }}
    >
      {children}
    </LogContext.Provider>
  );
};
