import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"
import type { Messages } from "@/lib/lang"

interface FooterProps {
  t: Messages["footer"]
}

export function Footer({ t }: FooterProps) {
  return (
    <footer className="w-full border-t bg-[#0052D4] text-white py-12">
      <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-4">
        <div className="space-y-4">
          <Link href="/" className="flex items-center space-x-2 mb-4">
            <Image
              src="/images/sofmaster_full-horizontal-positive.png"
              alt="SofMaster Logo"
              width={180}
              height={35}
              className="h-auto"
            />
          </Link>
          <p className="text-sm text-gray-200">{t.company_description}</p>
          <div className="flex space-x-4">
             {/* <Link href="#" className="text-gray-200 hover:text-[#FFA500]">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-gray-200 hover:text-[#FFA500]">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-gray-200 hover:text-[#FFA500]">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-gray-200 hover:text-[#FFA500]">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>  */}
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-bold">{t.services_heading}</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>
              <Link href="/#servicios" className="hover:text-[#FFA500]">
                {t.services_opt}
              </Link>
            </li>
            <li>
              <Link href="/#servicios" className="hover:text-[#FFA500]">
                {t.services_rec}
              </Link>
            </li>
            <li>
              <Link href="/#on-demand" className="hover:text-[#FFA500]">
                {t.services_ondemand}
              </Link>
            </li>
            <li>
              <Link href="/#servicios" className="hover:text-[#FFA500]">
                {t.services_security}
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-bold">{t.company_heading}</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>
              <Link href="/#testimonios" className="hover:text-[#FFA500]">
                {t.company_testimonials}
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-bold">{t.contact_heading}</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li className="flex items-start gap-2">
              <Phone className="h-5 w-5 text-[#FFA500] shrink-0" />
              <span>(678) 744-3233</span>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="h-5 w-5 text-[#FFA500] shrink-0" />
              <span>soporte@sofmaster.com</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-[#FFA500] shrink-0" />
              <span>1425 Ridenour Blvd Kennesaw</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mt-8 border-t border-white/20 pt-8 px-4 md:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-200">
            &copy; {new Date().getFullYear()} SOFMASTER. {t.copyright}
          </p>
          <nav className="flex gap-4">
            <Link href="#" className="text-xs text-gray-200 hover:underline">
              {t.terms}
            </Link>
            <Link href="#" className="text-xs text-gray-200 hover:underline">
              {t.privacy}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
