"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface CommonButtonProps {
  text: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  bgColor?: string;
  className?: string;
  disabled?: boolean;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  text,
  icon,
  iconPosition = "right",
  onClick,
  bgColor,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group inline-flex items-center justify-center",
        "px-6 py-3 rounded-full cursor-pointer",
        "text-sm sm:text-base md:text-lg font-semibold",
        "transition-all duration-300 ease-out",
        "bg-primary text-primary-foreground",
        "hover:shadow-lg hover:scale-[1.02]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
        bgColor,
      )}
    >
      {/* Left Icon */}
      {icon && iconPosition === "left" && (
        <span
          className="
            w-0 overflow-hidden
            opacity-0
            -translate-x-4
            transition-all duration-300 ease-out
            group-hover:w-auto
            group-hover:opacity-100
            group-hover:-translate-x-1
            group-hover:mr-2
          "
        >
          {icon}
        </span>
      )}

      {/* Text */}
      <span className="relative z-10 whitespace-nowrap">{text}</span>

      {/* Right Icon */}
      {icon && iconPosition === "right" && (
        <span
          className="
            w-0 overflow-hidden
            opacity-0
            translate-x-4
            transition-all duration-300 ease-out
            group-hover:w-auto
            group-hover:opacity-100
            group-hover:translate-x-1
            group-hover:ml-2
          "
        >
          {icon}
        </span>
      )}
    </button>
  );
};

export default CommonButton;
