// import Image from "next/image";
// import Link from "next/link";

// export async function Footer() {
//   console.log("Generated  Footer");
//   return (
//     <footer className=" border border-[#E0E0E0] bg-footer-bg  text-foreground">
//       <div className="container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
//           <div>
//             <Link
//               href="/"
//               className="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
//             >
//               <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
//                 <Image
//                   src="/images/icon.png"
//                   alt="Cliste"
//                   width={40}
//                   height={40}
//                   className="w-full h-full object-contain"
//                 />
//               </div>
//               <span className="text-lg font-semibold text-primary text-foreground">
//                 Mamabot.de
//               </span>
//             </Link>
//             <p className="text-sm text-muted-foreground">
//               A modern Next.js 16 template with TypeScript and Tailwind CSS.
//             </p>
//           </div>

//           <div>
//             <h4 className="font-medium text-foreground mb-4">Product</h4>
//             <ul className="space-y-2 text-sm text-muted-foreground">
//               <li>
//                 <Link href="/" className="hover:text-primary transition-colors">
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/about"
//                   className="hover:text-primary transition-colors"
//                 >
//                   About
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/services"
//                   className="hover:text-primary transition-colors"
//                 >
//                   Services
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="font-medium text-foreground mb-4">Company</h4>
//             <ul className="space-y-2 text-sm text-muted-foreground">
//               <li>
//                 <Link
//                   href="/about"
//                   className="hover:text-primary transition-colors"
//                 >
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/contact"
//                   className="hover:text-primary transition-colors"
//                 >
//                   Contact
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="hover:text-primary transition-colors">
//                   Careers
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="font-medium text-foreground mb-4">Legal</h4>
//             <ul className="space-y-2 text-sm text-muted-foreground">
//               <li>
//                 <Link href="#" className="hover:text-primary transition-colors">
//                   Privacy Policy
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="hover:text-primary transition-colors">
//                   Terms of Service
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="hover:text-primary transition-colors">
//                   Cookie Policy
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
//           © {new Date().getFullYear()} NextJS Template. All rights reserved.
//         </div>
//       </div>
//     </footer>
//   );
// }



import { Instagram, Mail, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (

      <div className="  py-6 text-gray-900">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 ">
        <div>
            <Link
              href="/"
               className="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
               <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
               <Image
                  src="/images/icon.png"
                  alt="Cliste"
                   width={40}
                   height={40}
                   className="w-full h-full object-contain"
                 />
              </div>
               <span className="text-lg font-semibold text-primary text-foreground">
                 Mamabot.de
             </span>
            </Link>
             <p className="text-sm text-muted-foreground">
               A modern Next.js 16 template with TypeScript and Tailwind CSS.
             </p>
           </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4 uppercase text-xs tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
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
            <h4 className="font-semibold text-gray-900 mb-4 uppercase text-xs tracking-wider">
              Support
            </h4>
            <ul className="space-y-3 text-sm text-gray-600 mb-6">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-pink-600" />
                <a href="mailto:support@mamabot.de" className="hover:text-pink-600 transition-colors">
                  support@mamabot.de
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-pink-600" />
                <a href="mailto:feedback@mamabot.de" className="hover:text-pink-600 transition-colors">
                  feedback@mamabot.de
                </a>
              </li>
            </ul>
            <div>
              <h5 className="font-semibold text-gray-900 mb-3 text-sm">Follow Us:</h5>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-linear-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-white" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label="TikTok"
                >
                  <div className="w-4 h-4 text-white font-bold text-xs flex items-center justify-center">
                    T
                  </div>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label="Social"
                >
                  <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12  pt-8 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Mamabot.de | All Rights Reserved</p>
          <p className="mt-1">Mamabot is not a substitute for medical advice. In emergencies: 112</p>
        </div>
      </div>
   
  );
}
