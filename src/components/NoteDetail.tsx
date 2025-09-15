"use client"

import React, { useEffect, useState } from "react";
import Avatar from "./shared/Avatar";
import { toast } from "react-toastify";

export default function NoteDetail({data}: {data: any}) {
  const [note, setNote] = useState(data);
  const [clientReady, setClientReady] = useState(false);
  const [comment, setComment] = useState("");
  const [disable, setDisable] = useState(false);

  const getNote = async () => {
    const res = await fetch("/api/note/detail", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id: data.id})
    });

    if (res.status) {
      const {data} = await res.json();
      console.log(data);
      setNote(data);
    }
  }
  
  const handleSubmit = async () => {
    setDisable(true);

    const res = await fetch("/api/note/comment", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id: data.id, comment})
    });

    if (res.ok) {
      setComment("");
      toast.success("Berhasil menambahkan komentar");
      getNote();
    } else {
      toast.error("Harap login terlebih dahulu");
    }

    setDisable(false);
  }

  useEffect(() => setClientReady(true), []);

  return (
    <div className="max-w-3xl mx-auto p-10">
      <h1 className="text-orange-700 font-bold text-2xl mb-2">{note.title == "" ? "Tanpa Judul" : note.title}</h1>
      <p>{note.description}</p>
      <div className="mb-5 mt-7 border-b-2 border-orange-700" />
      <p className="mb-3">Komentar:</p>
      <textarea
        rows={4}
        className="w-full border-2 border-orange-700 rounded-xl p-4 mb-2 outline-none"
        placeholder="Tulis komentar..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        type="button"
        className="bg-orange-700 text-white text-sm font-bold px-5 py-2 rounded-lg cursor-pointer disabled:cursor-auto flex items-center gap-2"
        disabled={disable}
        onClick={handleSubmit}
      >
        {disable &&
          <div className="w-4 h-4 border-2 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
        }
        Submit
      </button>
      <div className="h-10" />
      {note.comments.map((d: any, i: number) => {
        return (
          <div key={i} className="flex gap-3 mb-4">
            <Avatar alias={d.user.name} />
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="font-bold text-orange-700">{d.user.name}</span>
                {clientReady && (
                  <span className="text-xs font-bold">{new Date(d.createdAt).toLocaleDateString()}</span>
                )}
              </div>
              <div className="">
                {d.comment}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}