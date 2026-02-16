import Button from "@/components/ui/Button";

const StepControllButtons = ({
  back,
  next,
  backBtnName = "Back",
  forwardBtnName = "Next →",
}: {
  back: () => void;
  next: () => void;
  backBtnName?: string;
  forwardBtnName?: string;
}) => {
  return (
    <div className="flex justify-between gap-3">
      <Button variant="outline" className="rounded-xl" onClick={back}>
        {backBtnName}
      </Button>
      <Button
        variant="primary"
        className="px-8  rounded-xl bg-[#229ECF]! hover:bg-[#229ECF]/80"
        onClick={next}
      >
        {forwardBtnName}
      </Button>
    </div>
  );
};
export default StepControllButtons;
