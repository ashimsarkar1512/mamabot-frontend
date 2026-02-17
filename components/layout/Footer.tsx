"use client";

import { useGetFooterPagesQuery } from "@/redux/features/api/FooterPages";
import { useGetWebSettingsQuery } from "@/redux/features/api/user/Footer";
import {
  Facebook,
  InstagramIcon,
  Linkedin,
  Mail,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const { data, isLoading, error } = useGetWebSettingsQuery();
  const { data: FooterPage, isLoading: pagesLoading } = useGetFooterPagesQuery();
  console.log(FooterPage,"footer")
  if (isLoading) return <p className="text-center py-6">Loading footer...</p>;
  if (error || !data?.data)
    return <p className="text-center py-6">Footer not available</p>;

  const settings = data.data;
  const pages = FooterPage?.data || [];
  return (
    <div className="py-2 px-4 md:px-10 md:py-10 mt-5  mb-10 rounded-xl bg-[#F5F5F5] shadow-xl  text-gray-900 container mx-auto">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 ">
        <div>
          <Link href="/" className="flex items-center mb-2 cursor-pointer">
            <div className="w-10 h-10 md:w-20 md:h-20 flex items-center justify-center">
              {settings.logo ? (
                <Image
                  src={settings.logo}
                  alt={settings.site_name}
                  width={100}
                  height={100}
                  className="w-full h-full object-contain"
                />
              ) : (
                <Image
                  src="/images/icon.png"
                  alt="Logo placeholder"
                  width={100}
                  height={100}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            <span className="text-2xl md:text-4xl font-semibold text-primary">
              {settings.site_name}
            </span>
          </Link>
          <p className=" text-base pl-2 mt-4 text-muted-foreground">
            {settings.footer_description ||
              " AI-powered advice for expecting and new parents."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <h4 className="font-semibold text-primary mb-4 uppercase text-xl tracking-wider">
              Legal
            </h4>
            {/* <ul className="space-y-2 text-base md:text-lg text-gray-600">
              <li>
                <Link
                  href="/footerPages/privacy-policy"
                  className="hover:text-pink-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/footerPages/terms-of-service"
                  className="hover:text-pink-600 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/footerPages/imprint"
                  className="hover:text-pink-600 transition-colors"
                >
                  Imprint
                </Link>
              </li>
              <li>
                <Link
                  href="/footerPages/medical-disclaimer"
                  className="hover:text-pink-600 transition-colors"
                >
                  Medical Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  href="/footerPages/cookie-policy"
                  className="hover:text-pink-600 transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/footerPages/affiliate-disclosure"
                  className="hover:text-pink-600 transition-colors"
                >
                  Affiliate Disclosure
                </Link>
              </li>
            </ul> */}
            <ul className="space-y-2 text-base md:text-lg text-gray-600">
              {pages.map((page) => (
                <li key={page.id}>
                  <Link
                    href={`/footerPages/${page.slug}`}
                    className="hover:text-pink-600 transition-colors"
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-primary mb-4 uppercase text-xl tracking-wider">
              Support
            </h4>
            <ul className="space-y-3 text-base md:text-lg text-gray-600 mb-6">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-pink-600" />
                <a
                  href={`mailto:${settings.mail_1}`}
                  className="hover:text-pink-600 transition-colors"
                >
                  {settings.mail_1}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-pink-600" />
                <a
                  href={`mailto:${settings.mail_2}`}
                  className="hover:text-pink-600 transition-colors"
                >
                  {settings.mail_2}
                  {/* {mail_2} */}
                </a>
              </li>
            </ul>
            <div>
              <h5 className="font-semibold text-gray-900 mb-3 text-lg">
                {settings.footer_text}
              </h5>
              <div className="flex gap-3">
                {settings.fb_link && (
                  <a
                    href={settings.fb_link}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform"
                    aria-label="Facebook"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Facebook className="w-4 h-4 text-primary" />
                  </a>
                )}
                {settings.insta_link && (
                  <a
                    href={settings.insta_link}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform"
                    aria-label="Instagram"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <InstagramIcon className="w-4 h-4 text-primary" />
                  </a>
                )}
                {settings.tiktok_link && (
                  <a
                    href={settings.tiktok_link}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform"
                    aria-label="TikTok"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Linkedin className="w-4 h-4 text-primary" />
                  </a>
                )}
              </div>
            </div>
            {/* <div>
              <p>{working_hour}</p>
              <p>{headquarter_address}</p>
            </div> */}
          </div>
        </div>
      </div>

      <div className="mt-12  pt-8 text-center text-xs text-gray-500">
        <p>{settings.copyright_text}</p>
        <p className="mt-1">
          Mamabot is not a substitute for medical advice. In emergencies: 112
        </p>
      </div>
    </div>
  );
}
