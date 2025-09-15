import React from "react";

export default function Avatar({alias}: {alias: string | null}) {
  return (
    <div className="w-11 h-11 rounded-full bg-yellow-200 text-orange-700 font-bold flex items-center justify-center">
      {alias ? alias.split("")[0] : "N"}
    </div>
  );
} 