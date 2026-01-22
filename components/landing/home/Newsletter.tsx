"use client";

const Newsletter = () => {
  return (
    <div className="px-0 md:px-30">
      <div className="bg-white p-22 rounded-xl shadow-xl mb-6 md:mb-11">
        <div>
          <h2 className="text-[32px] text-center mb-10">
            Subscribe to our <span className="text-primary">newsletter</span>
          </h2>

          <div className="">
            {/* #FBE9F2 */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3">
              {/* First name */}
              <input
                type="text"
                placeholder="First name"
                className="w-full md:w-[220px] h-[44px] px-5 rounded-full bg-[#FBE9F2] text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />

              {/* Email */}
              <input
                type="email"
                placeholder="Email address"
                className="w-full md:w-[260px] h-[44px] px-5 rounded-full bg-[#FBE9F2] text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />

              {/* Button */}
              <button
                type="button"
                className="h-[44px] px-8 rounded-full bg-primary text-white text-base font-medium hover:opacity-90 transition"
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
