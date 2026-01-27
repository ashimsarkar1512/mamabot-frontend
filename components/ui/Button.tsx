"use client";

import React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative rounded-full flex items-center transition-all duration-300",
  {
    variants: {
      variant: {
        primary: "bg-primary hover:bg-primary/50 text-primary-foreground",
        secondary:
          "bg-secondary hover:bg-secondary/90 text-secondary-foreground",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        common: "bg-gray-200 hover:bg-gray-300 text-gray-800",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 p-6",
        lg: "h-11 px-10 text-lg",
        icon: "h-10 w-10",
        default: "h-10 px-4 py-2",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false:
          "cursor-pointer group transform font-medium justify-center hover:scale-105 active:scale-90",
      },
      isOpen: {
        true: "animate-mobile-menu-item",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      disabled: false,
      isOpen: false,
    },
  },
);

type IconPosition = "left" | "right";

interface BaseButtonProps extends VariantProps<typeof buttonVariants> {
  text?: string;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  isOpen?: boolean;
  animationIndex?: number;
  href?: string;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

// Separate interface for when it's used as a Link
interface LinkButtonProps
  extends BaseButtonProps, React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

interface ClickableButtonProps
  extends BaseButtonProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
}

type ButtonProps = LinkButtonProps | ClickableButtonProps;

function Button({
  text,
  icon,
  iconPosition = "right",
  variant,
  size,
  className,
  isOpen = false,
  animationIndex = 0,
  href,
  onClick,
  children,
  disabled = false,
  ...props
}: ButtonProps) {
  // Determine icon spacing based on position
  const iconSpacing =
    size === "icon" ? "" : iconPosition === "left" ? "mr-2" : "ml-2";

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span
          className={`${iconSpacing} transition-transform duration-300 group-hover:translate-x-1`}
        >
          {icon}
        </span>
      )}
      {text && <span>{text}</span>}
      {children}
      {icon && iconPosition === "right" && (
        <span
          className={`${iconSpacing} transition-transform duration-300 group-hover:-translate-x-1`}
        >
          {icon}
        </span>
      )}
    </>
  );

  const buttonClass = cn(
    buttonVariants({ variant, size, disabled, isOpen, className }),
  );

  // If href is provided, render as Link, otherwise as button
  if (href) {
    return (
      <Link
        href={disabled ? "#" : href}
        onClick={
          disabled
            ? (e) => e.preventDefault()
            : onClick
              ? (onClick as React.MouseEventHandler<HTMLAnchorElement>)
              : undefined
        }
        className={buttonClass}
        style={{
          animationDelay: isOpen ? `${animationIndex * 80 + 150}ms` : "0ms",
        }}
        {...(props as any)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={
        disabled
          ? undefined
          : (onClick as React.MouseEventHandler<HTMLButtonElement>)
      }
      className={buttonClass}
      disabled={disabled}
      style={{
        animationDelay: isOpen ? `${animationIndex * 80 + 150}ms` : "0ms",
      }}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}

export { Button, buttonVariants };
export default Button;
