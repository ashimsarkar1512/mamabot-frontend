import Image from "next/image";

const ContactBanner = () => {
  return (
    <div
      className={`w-full bg-white/25 border-2 !border-white shadow-sm relative  overflow-hidden  rounded-3xl`}
    >
      <div>
        <div className="px-[30px] md:px-[100px] py-5 md:py-16">
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              {/* Heart Icon */}
              <div className="inline-flex items-center justify-center w-10 h-10  rounded-xl">
                <Image
                  src="/images/Contact-us/love.png"
                  className="w-full h-full"
                  alt="Heart"
                  width={40}
                  height={40}
                />
              </div>

              {/* Heading */}
              <h2 className="text-2xl pt-3 md:pt-6 pb-5 md:pb-10  md:text-[40px] font-bold text-gray-900 ">
                We're here to support, and guide you.
              </h2>

              {/* Description */}
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
                Whether you're a mom-to-be, a new mother, or simply seeking
                guidance our team is here to help.
              </p>
            </div>

            {/* Right Illustration */}
            <div className=" w-50 lg:w-100 h-auto ">
              <Image
                src="/images/Contact-us/Contact.png"
                alt="Contact Illustration"
                className="w-full h-full"
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactBanner;
