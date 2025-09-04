import { ButttonSpinnerProps } from "@/app/interfaces";
import React from "react";

export const Spinner: React.FC<
  ButttonSpinnerProps & { className?: string }
> = ({ size = 16, color = "#fff", text, className = "" }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 ${className}`}
        style={{
          width: size,
          height: size,
          borderTopColor: color,
          borderBottomColor: color,
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderStyle: "solid",
          borderWidth: "2px",
        }}
        role="status"
        aria-hidden="true"
      />
      {text && (
        <span className="text-sm text-white/50 text-center">{text}</span>
      )}
    </div>
  );
};
