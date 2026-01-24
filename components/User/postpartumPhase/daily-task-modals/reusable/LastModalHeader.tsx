import { CheckCircle } from "lucide-react";

const LastModalHeader = ({ title }: { title: string }) => {
  return (
    <div className="">
      <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-2" />
      <h3 className="text-md font-regular text-gray-900 text-center">
        {title}
      </h3>
    </div>
  );
};
export default LastModalHeader;
