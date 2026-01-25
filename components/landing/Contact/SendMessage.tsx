// app/components/SendMessage.tsx
import { MapPin, PhoneIcon, Play, UploadCloudIcon } from "lucide-react";
import React from "react";

export default function SendMessage() {
  return (
    <div className="w-full  py-12 md:py-16">
      {/* Heading Section */}
      <div className="text-center mb-10 md:mb-12">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
          Send us a message
        </h2>
        <p className="text-gray-600 text-base md:text-lg">
          We'd love to hear from you. Fill out the form and we'll respond as
          soon as possible.
        </p>
      </div>

      {/* Main Form Container */}
      <div className="bg-white/25 max-w-6xl mx-auto rounded-2xl shadow-lg border-2 !border-white overflow-hidden">
        <form className="p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Full Name"
                className="w-full px-4 py-3 border border-[#677381] rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition"
              />
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-[#677381] rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition"
              />
            </div>
          </div>

          {/* Subject Type */}
          <div className="mb-6">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Subject Type
            </label>
            <select
              id="subject"
              defaultValue="General"
              className="w-full px-4 py-3 border border-[#677381] rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none bg-white transition"
            >
              <option value="General">General</option>
              <option value="Support">Support</option>
              <option value="Sales">Sales</option>
              <option value="Partnership">Partnership</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Message */}
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Tell us how we can help you..."
              className="w-full px-4 py-3 border border-[#677381] rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none resize-y min-h-[120px] transition"
            />
          </div>

          {/* File Upload */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Attachment (Optional)
            </label>
            <div className="border-2 border-dashed border-[#488BFF] rounded-xl p-8 text-center hover:border-pink-400 transition-colors cursor-pointer bg-gray-50">
              <div className="mx-auto w-12 h-12 mb-3 text-[#488BFF]">
                {/* Cloud icon - you can use heroicons or lucide */}
                <UploadCloudIcon className="w-12 h-12" />
              </div>
              <p className="text-black text-base md:text-lg mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-sm md:text-base text-gray-500">
                PDF, DOC, PNG, JPG (max 10MB)
              </p>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="inline-flex items-center  px-5 md:px-10 py-2 md:py-4 bg-primary text-white font-medium rounded-xl hover:opacity-80 cursor-pointer focus:ring-4 focus:ring-pink-300 transition shadow-md text-base md:text-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              <span className="mr-2">Send Message</span>
            </button>
          </div>
        </form>
      </div>

      {/* Contact Info Footer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 md:mt-24">
        {/* Headquarters */}
        <div className="flex flex-col mb-4 md:mb-10 items-start px-4 py-5 md:px-8 md:py-10 bg-slate-50 border-2 !border-white rounded-xl">
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-5 md:mb-10">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white mr-4">
              <MapPin width={24} height={24} />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 ">
              Our Headquarters
            </h3>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-black font-semibold text-base md:text-lg">
              Mamabot Digital Care Ltd.
              <br />
              <span className="text-sm md:text-base text-[#677381]">
                Friedrichstraße 68, 10117 Berlin, Germany
              </span>
            </p>
            <p className="text-black font-semibold text-base md:text-lg">
              Working Hours:
              <br />
              <span className="text-sm md:text-base text-[#677381]">
                Monday–Friday 9:00 AM - 6:00 PM CET
              </span>
            </p>
            <p className="text-[#229ECF] text-sm">support@mamabot.com</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col mb-10 items-start px-4 py-5 md:px-8 md:py-10 bg-slate-50 border-2 !border-white rounded-xl">
          <div className="flex items-center justify-center gap-4 mb-5 md:mb-10">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#229ECF] flex items-center justify-center text-white mr-4">
              <PhoneIcon width={24} height={24} />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 ">
              Contact Information
            </h3>
          </div>

          <div>
            <p className="text-black font-semibold text-base md:text-lg">
              Phone Number:
              <br />
              <span className="text-sm md:text-base text-[#677381]">
                +49 30-123-45678
              </span>
            </p>
            <p className="text-black font-semibold text-base md:text-lg">
              Email Address:
              <br />
              <span className="text-sm md:text-base text-[#677381]">
                support@mamabot.com
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
