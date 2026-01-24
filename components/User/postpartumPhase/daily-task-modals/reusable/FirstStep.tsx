import React from "react";
import Button from "@/components/ui/Button";
import { LucideIcon } from "lucide-react";

interface FirstStepProps {
  Icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  onNext: () => void;
}

const FirstStep: React.FC<FirstStepProps> = ({
  Icon,
  title,
  description,
  buttonText,
  onNext,
}) => {
  return (
    <div className="text-center space-y-6 min-h-[350px] flex flex-col items-center justify-center">
      <div className="mx-auto w-15 h-15 rounded-full bg-[#229ECF]/10 border border-[#229ECF]/60! flex items-center justify-center text-[#229ECF] font-bold">
        <Icon className="w-10 h-10 animate-pulse text-[#229ECF]" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed px-4">
        {description}
      </p>
      <Button
        variant="primary"
        className="px-8 mx-auto rounded-2xl bg-[#229ECF]! hover:bg-[#229ECF]/80"
        onClick={onNext}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default FirstStep;
