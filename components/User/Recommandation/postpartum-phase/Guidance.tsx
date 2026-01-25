import Button from "@/components/ui/Button";
import { Heart } from "lucide-react";
import Image from "next/image";
import SecontBannerImage from "@/public/images/icon.png";

const Guidance = () => {
  return (
    <div className="mb-8 w-full bg-[#229ECF] rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
      {/* LEFT CONTENT */}
      <div className="flex-1 text-white space-y-4 flex gap-3">
        <div className="hidden w-12 h-12 rounded-full bg-white/20 md:flex items-center justify-center">
          <Heart size={24} />
        </div>
        <div className="grid grid-cols-1 gap-4 ">
          <h2 className="text-lg md:text-2xl font-semibold">
            Your Most Important Tip for Today
          </h2>

          <p className="text-sm md:text-base text-white/90 ">
            Gentle walking for 10 minutes can improve circulation and reduce
            discomfort. Remember to rest when needed.
          </p>

          <Button
            variant="outline"
            className="bg-transparent w-fit border border-white text-white px-5 py-2.5 rounded-lg hover:bg-white hover:text-[#229ECF] transition"
          >
            View Full Guidance
          </Button>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="shrink-0 relative hidden md:block">
        <Image
          src={SecontBannerImage}
          alt="Doctor illustration"
          height={100}
          width={100}
        />
      </div>
    </div>
  );
};

export default Guidance;
