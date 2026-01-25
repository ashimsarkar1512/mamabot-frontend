interface StepProps {
  title: string;
  description: string;
}
const Step = ({ steps }: { steps: StepProps[] }) => {
  return (
    <div className="my-6 space-y-6 flex flex-col">
      {steps.map((step, index) => (
        <div
          key={index}
          className="p-3 border-l-3 border-[#229ECF]/40! bg-[#229ECF]/10 rounded-lg"
        >
          <h1 className="text-lg font-semibold text-[#229ECF]">{step.title}</h1>
          <p className="text-sm text-gray-500 mt-2">{step.description}</p>
        </div>
      ))}
    </div>
  );
};
export default Step;
