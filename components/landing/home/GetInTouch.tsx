"use client";

import Image from "next/image";

const GetInTouch = () => {
  return (
    <section className="bg-[#ffffff]/25 rounded-3xl shadow-lg px-6 my-7 md:my-24 py-10 md:px-16 md:py-14">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* LEFT – FORM */}
        <div>
          <h2 className="text-[26px] md:text-[36px] font-semibold text-gray-900 mb-2 md:mb-5">
            Get in touch
          </h2>
          <p className="text-base md:text-xl text-gray-500 mb-8 md:mb-12">
            Our friendly team would love to hear from you.
          </p>

          <form className="space-y-5">
            {/* First + Last name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  First name
                </label>
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full h-10 rounded-lg bg-white border border-gray-200 px-3 text-base focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Last name
                </label>
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full h-10 rounded-lg bg-white border border-gray-200 px-3 text-base focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full h-10 rounded-lg bg-white border border-gray-200 px-3 text-base focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Phone number
              </label>
              <div className="flex">
                <select className="h-10 rounded-l-lg border border-gray-200 bg-white px-3 text-base focus:outline-none">
                  <option>US</option>
                  <option>BD</option>
                  <option>IN</option>
                </select>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full h-10 rounded-r-lg bg-white border border-l-0 border-gray-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full rounded-lg border bg-white border-gray-200 px-3 py-2 text-base resize-none focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            {/* Privacy */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <input type="checkbox" className="rounded border-gray-300" />
              <span>
                You agree to our friendly{" "}
                <span className="text-primary underline cursor-pointer">
                  privacy policy
                </span>
                .
              </span>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full h-11 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90 transition"
            >
              Send message
            </button>
          </form>
        </div>

        {/* RIGHT – IMAGE */}
        <div className="flex justify-center lg:justify-end">
          <div className=" w-173.5 h-200 rounded-2xl">
            <Image
              src="/images/getInTouch.png"
              alt="Get in touch"
              width={684}
              height={800}
              className="rounded-xl w-full h-full object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
