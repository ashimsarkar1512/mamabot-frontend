"use client";

import { useSendMessageMutation } from "@/redux/features/api/user/ContactUs/SendMessage";
import { Play } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function SendMessage() {
  const [agreed, setAgreed] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    message: "",
  });

  const [sendMessage, { isLoading }] = useSendMessageMutation();

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
    <div className="w-full pt-12 md:pt-16">
      <Toaster position="top-right" />
      {/* Heading Section */}
      <div className="text-center mb-10 md:mb-12">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
          Send us a message
        </h2>
        <p className="text-gray-600 text-base md:text-lg">
          We would love to hear from you. Fill out the form and we will respond
          as soon as possible.
        </p>
      </div>

      {/* Main Form Container */}
      <div className="bg-white/25 max-w-6xl mx-auto rounded-2xl shadow-lg border-2 !border-white overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                First Name
              </label>
              <input
                name="first_name"
                placeholder="First Name"
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
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Phone Number
              </label>
              <input
                name="phone_number"
                placeholder="Phone Number"
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1.5">Message</label>
            <textarea
              name="message"
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
              I have read and understood the Terms of Service{" "}
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
  );
}
