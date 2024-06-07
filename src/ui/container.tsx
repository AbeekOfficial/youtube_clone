import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1280px] sm:px-6 lg:px-8">{children}</div>
  );
}
