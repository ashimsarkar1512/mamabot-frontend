import { AlertCircle } from "lucide-react";

const CommonAlert = ({ alert }: { alert: string }) => {
  return (
    <div className="flex  items-center gap-2 py-3 px-6 bg-[#229ECF]/10 rounded">
      <AlertCircle className="w-6 h-6 text-[#229ECF]" size={15} />
      <p className="text-gray-500 font-medium text-sm text-left">{alert}</p>
    </div>
  );
};

export default CommonAlert;
