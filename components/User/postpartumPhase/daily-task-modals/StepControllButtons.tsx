import Button from "@/components/ui/Button";

const StepControllButtons = ({
  back,
  next,
}: {
  back: () => void;
  next: () => void;
}) => {
  return (
    <div className="flex justify-between gap-3">
      <Button variant="outline" onClick={back}>
        ← Back
      </Button>
      <Button
        variant="primary"
        className="px-8  rounded-2xl bg-[#229ECF]! hover:bg-[#229ECF]/80"
        onClick={next}
      >
        Next →
      </Button>
    </div>
  );
};
export default StepControllButtons;
