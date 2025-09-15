"use client"

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavsStore } from "@/store/navs";
import { useToggleState } from "@/store/toggle";

export default function DashboardNavbar() {
  const path = usePathname();
  const {navs, setNavs} = useNavsStore();
  const {setFetchNotes} = useToggleState();

  useEffect(() => {
    setNavs(path);
    if (path == "/dashboard/notes") setFetchNotes(true);
  }, [path, setNavs, setFetchNotes]);

  return (
    <React.Fragment>
      {navs.map((n: any, i: number) => {
        return (
          <Link
            key={i}
            href={n.path}
            className={`${n.active ? "text-orange-700 bg-yellow-300 rounded-t-xl border-orange-700 font-bold" : "border-transparent"} border-2 border-b-0 flex items-center h-10 px-3`}
          >
            {n.label}
          </Link>
        );
      })}
    </React.Fragment>
  );
}