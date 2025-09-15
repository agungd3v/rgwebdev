import React from "react";
import CreateNote from "@/components/CreateNote";
import DashboardListNote from "@/components/DashboardListNote";

export default function NotesPage() {
  return (
    <React.Fragment>
      <CreateNote />
      <div className="h-8" />
      <DashboardListNote />
    </React.Fragment>
  );
}