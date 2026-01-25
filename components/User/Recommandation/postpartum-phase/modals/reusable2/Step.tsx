import Button from "@/components/ui/Button";

interface StepProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  buttonText?: string;
  stepNumber?: number;
}
const Step = ({
  steps,
  onNext,
}: {
  steps: StepProps[];
  onNext?: (stepNumber: number) => void;
}) => {
  return (
    <div className="my-6 space-y-6 flex flex-col">
      {steps.map((step, index) => (
        <div
          key={index}
          className="p-3 border-l-3 border-[#229ECF]/40! bg-[#229ECF]/10 rounded-lg flex items-center justify-between gap-3"
        >
          {step.icon && (
            <div className="w-10 h-10 rounded-lg    bg-[#229ECF]/10 flex items-center justify-center">
              {step.icon}
            </div>
          )}
          <div className="">
            <h1 className="text-lg font-semibold text-[#229ECF]">
              {step.title}
            </h1>
            <p className="text-sm text-gray-500 mt-2">{step.description}</p>
          </div>
          {step.buttonText && (
            <Button
              variant="outline"
              className="bg-white/60 w-fit border-2 border-white!  px-3 py-2.5 rounded-lg hover:bg-white hover:text-[#229ECF] transition"
              onClick={() => {
                onNext?.(step.stepNumber || 0);
              }}
            >
              {step.buttonText}
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};
export default Step;
