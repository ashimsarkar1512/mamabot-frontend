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
  return (
    <div className=" p-10 mb-10 rounded-xl bg-white shadow-xl  text-gray-900">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 ">
        <div>
          <Link href="/" className="flex items-center  cursor-pointer">
            <div className="w-14 h-14 md:w-20 md:h-20 flex items-center justify-center">
              <Image
                src="/images/icon.png"
                alt="Cliste"
                width={100}
                height={100}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-4xl font-semibold text-primary text-foreground">
              Mamabot.de
            </span>
          </Link>
          <p className=" text-lg md:text-2xl text-muted-foreground">
            A modern Next.js 16 template with TypeScript and Tailwind CSS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <h4 className="font-semibold text-primary mb-4 uppercase text-xl tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2 text-lg text-gray-600">
              <li>
                <a href="#" className="hover:text-pink-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-600 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-600 transition-colors">
                  Imprint
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-600 transition-colors">
                  Medical Disclaimer
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-600 transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-600 transition-colors">
                  Affiliate Disclosure
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-primary mb-4 uppercase text-xl tracking-wider">
              Support
            </h4>
            <ul className="space-y-3 text-lg text-gray-600 mb-6">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-pink-600" />
                <a
                  href="mailto:support@mamabot.de"
                  className="hover:text-pink-600 transition-colors"
                >
                  support@mamabot.de
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-pink-600" />
                <a
                  href="mailto:feedback@mamabot.de"
                  className="hover:text-pink-600 transition-colors"
                >
                  feedback@mamabot.de
                </a>
              </li>
            </ul>
            <div>
              <h5 className="font-semibold text-gray-900 mb-3 text-lg">
                Follow Us:
              </h5>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label="Instagram"
                >
                  <Facebook className="w-4 h-4 text-primary" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label="TikTok"
                >
                  <InstagramIcon className="w-4 h-4 text-primary" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label="Social"
                >
                  <Linkedin className="w-4 h-4 text-primary" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12  pt-8 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Mamabot.de | All Rights Reserved</p>
        <p className="mt-1">
          Mamabot is not a substitute for medical advice. In emergencies: 112
        </p>
      </div>
    </div>
  );
}
