import React from "react";

interface SummeryItem {
  label: string;
  value: React.ReactNode;
}

interface SummeryTableProps {
  items: SummeryItem[];
  className?: string;
  children?: React.ReactNode;
}

const SummeryTable: React.FC<SummeryTableProps> = ({
  items,
  className = "",
  children,
}) => {
  return (
    <div
      className={`text-sm text-left border border-[#229ECF]/40! rounded p-4 space-y-2 ${className}`}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={`flex justify-between items-center p-2 ${
            index !== items.length - 1 ? "border-b border-[#229ECF]/40!" : ""
          }`}
        >
          <p className="text-gray-500">{item.label}</p>
          <div className="text-right">{item.value}</div>
        </div>
      ))}
      {children}
    </div>
  );
};

export default SummeryTable;
