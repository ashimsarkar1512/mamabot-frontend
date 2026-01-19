import React from "react";
import { cn } from "@/lib/utils";

interface CommonButtonProps {
  text: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  text,
  icon,
  iconPosition = "right",
  onClick,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        // base
        "group inline-flex items-center justify-center gap-2",
        "px-6 py-3 rounded-full cursor-pointer",
        "text-sm sm:text-base md:text-lg font-semibold",
        "transition-all duration-300 ease-out",

        // colors (can override later)
        "bg-primary text-primary-foreground",

        // hover + focus
        "hover:shadow-lg hover:scale-[1.02]",
        "disabled:opacity-50 disabled:cursor-not-allowed",

        className,
      )}
    >
      {/* Left Icon */}
      {icon && iconPosition === "left" && (
        <span className="transition-transform duration-300 group-hover:-translate-x-1">
          {icon}
        </span>
      )}

      {/* Text */}
      <span className="relative z-10">{text}</span>

      {/* Right Icon */}
      {icon && iconPosition === "right" && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </button>
  );
};

export default CommonButton;
