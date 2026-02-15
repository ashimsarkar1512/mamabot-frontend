"use client";

import { useSendMessageMutation } from "@/redux/features/api/user/ContactUs/SendMessage";
import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-number-input";
const GetInTouch = () => {
  const [agreed, setAgreed] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    message: "",
  });

  const [sendMessage, { isLoading, isSuccess, error }] =
    useSendMessageMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await sendMessage({
        ...formData,
        agreed_to_privacy: agreed ? 1 : 0,
      }).unwrap();

      toast.success("Message sent successfully!");

      // reset form
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        message: "",
      });
      setAgreed(false);
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
    }
  };
  return (
    <section className="bg-[#ffffff]/25 rounded-3xl shadow-lg px-6 my-7 md:my-24 py-5 md:px-16 md:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10 items-center">
        {/* LEFT – FORM */}
        <div>
          <h2 className="text-[26px] md:text-[36px] font-semibold text-gray-900 mb-2 md:mb-5">
            Get in touch
          </h2>
          <p className="text-base md:text-xl text-gray-500 mb-8 md:mb-12">
            Our friendly team would love to hear from you.
          </p>

          {/* Main Form Container */}
          <div className="bg-white/25 max-w-6xl mx-auto   overflow-hidden">
            <form onSubmit={handleSubmit} className="" suppressHydrationWarning>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    First Name
                  </label>
                  <input
                    name="first_name"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Last Name
                  </label>
                  <input
                    name="last_name"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1.5">
                  Email Address
                </label>
                <input
                  name="email"
                  value={formData.email}
                  type="email"
                  placeholder="you@company.com"
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg"
                />
              </div>

              <div className="mb-6 ">
                <label className="block text-sm font-medium mb-1.5">
                  Phone Number
                </label>

                <PhoneInput
                  international
                  defaultCountry="US"
                  value={formData.phone_number}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone_number: value || "",
                    }))
                  }
                  className="phone-input cursor-pointer  w-full rounded-lg"
                />
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  rows={5}
                  placeholder="Tell us how we can help you..."
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg"
                />
              </div>

              {/* Terms & Conditions */}
              <div className="mb-6 flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 h-4 w-4"
                />
                <label className="text-sm text-gray-600">
                  I have read and understood the{" "}
                  <a
                    href="/terms-and-conditions"
                    target="_blank"
                    className="text-primary underline"
                  >
                    Terms & Conditions
                  </a>{" "}
                  <span className="italic">(Optional)</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl"
                >
                  <Play size={18} />
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT – IMAGE */}
        <div className="flex justify-center lg:justify-end">
          <div className=" w-173.5 md:h-200 h-100 rounded-2xl">
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
