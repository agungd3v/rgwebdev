"use client"

import React, { useCallback, useEffect, useState } from "react";
import { useToggleState } from "@/store/toggle";
import { BsBookmarkFill, BsFillReplyFill, BsChatFill } from "react-icons/bs";
import { toast } from "react-toastify";

export default function DashboardListNote() {
  const [notes, setNotes] = useState([]);
  const {fetchNotes, setFetchNotes} = useToggleState();

  const getNotes = useCallback(async () => {
    const res = await fetch("/api/note");

    if (res.status) {
      const {data} = await res.json();
      setNotes(data);
      setFetchNotes(false);
    }
  }, [setNotes, setFetchNotes]);

  const shareUrl = async (param: number) => {
    const url = `${window.location.origin}/notes/${param}`;
    await navigator.clipboard.writeText(url);
    toast.success("Berhasil menyalin link");
  }

  useEffect(() => {
    if (fetchNotes) {
      getNotes();
    }
  }, [fetchNotes, getNotes]);

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-5">
      {notes.map((d: any, i: number) => {
        return (
          <div key={i} className="bg-yellow-300 rounded-2xl p-5 shadow-xl relative mt-3">
            <div
              key={i}
              onClick={() => console.log("oke")}
              className="w-full h-full"
            >
              <p className="font-bold mb-1 select-none">{d.title == "" ? "Tanpa Judul" : d.title}</p>
              <p className="select-none leading-6">{d.description}</p>
              <div className="h-8" />
            </div>
            <div className="absolute left-3 bottom-2 flex items-center gap-1">
              <BsChatFill size={18} className="text-orange-700" />
              {d.comments.length}
            </div>
            <div className="absolute -left-2 -top-2">
              <BsBookmarkFill size={28} className="text-orange-700" />
            </div>
            <div
              onClick={() => shareUrl(d.id)}
              className="z-10 absolute -right-2 -bottom-2 rotate-180 w-8 h-8 bg-orange-700 rounded-full flex items-center justify-center cursor-pointer"
            >
              <BsFillReplyFill size={24} className="text-yellow-300" />
            </div>
          </div>
        );
      })}
    </div>
  );
}