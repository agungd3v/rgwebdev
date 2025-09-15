"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BsBookmarkFill } from "react-icons/bs";

export default function ListNote() {
  const [notes, setNotes] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadRef = useRef<HTMLDivElement | null>(null);

  const getNotes = useCallback(async () => {
    if (loading || page > totalPages) return;

    setLoading(true);
    const res = await fetch(`/api/note/global?page=${page}&size=${12}`);
    const {notes: data, totalPages: total} = await res.json();

    setNotes((prevState) => [...prevState, ...data]);
    setTotalPages(total);
    setLoading(false);
  }, [page, totalPages, loading]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting && !loading && page < totalPages) {
        setPage((p) => p + 1);
      }
    }, { threshold: 1.0 });

    if (loadRef.current) {
      observer.observe(loadRef.current);
    }

    return () => {
      if (loadRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(loadRef.current);
      }
    }
  }, [loading, page, totalPages]);

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-5">
      {notes.map((d: any, i: number) => {
        return (
          <Link
            key={i}
            href={`/notes/${d.id}`}
            className="bg-yellow-300 rounded-2xl p-5 shadow-xl relative mt-3"
          >
            <div className="absolute -left-2 -top-2">
              <BsBookmarkFill size={28} className="text-orange-700" />
            </div>
            <p className="font-bold mb-1">{d.title == "" ? "Tanpa Judul" : d.title}</p>
            <p>{d.description}</p>
          </Link>
        );
      })}

      {page < totalPages && <p ref={loadRef} className="col-span-full text-center">Loading...</p>}
    </div>
  );
}