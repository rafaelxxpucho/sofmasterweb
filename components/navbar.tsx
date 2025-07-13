"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import type { Language, Messages } from "@/lib/lang"

interface NavbarProps {
  currentLang: Language
  toggleLanguage: () => void
  t: Messages["navbar"]
}

export function Navbar({ currentLang, toggleLanguage, t }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeHash, setActiveHash] = useState("")

  useEffect(() => {
    // Set initial hash
    setActiveHash(window.location.hash)

    // Listen for hash changes
    const handleHashChange = () => {
      setActiveHash(window.location.hash)
    }

    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  const getLinkClass = (href: string) => {
    const isActive = activeHash === href || (href === "/" && activeHash === "")
    return `text-sm font-medium transition-colors ${isActive ? "text-[#FFA500]" : "hover:text-[#FFA500]"}`
  }

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
    window.history.pushState(null, "", "/") // Update URL hash to root
    setActiveHash("") // Update active hash state
    setIsOpen(false) // Close mobile menu if open
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#0052D4] text-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2" onClick={handleHomeClick}>
            <Image
              src="/images/sofmaster_full-horizontal-positive.png"
              alt="SofMaster Logo"
              width={150}
              height={30}
              className="h-auto"
            />
          </Link>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className={getLinkClass("/")} onClick={handleHomeClick}>
            {t.home}
          </Link>
          <Link href="#servicios" className={getLinkClass("#servicios")}>
            {t.services}
          </Link>
          <Link href="#planes" className={getLinkClass("#planes")}>
            {t.companies}
          </Link>
          <Link href="#agendar" className={getLinkClass("#agendar")}>
            {t.contact}
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button
            onClick={toggleLanguage}
            variant="outline"
            size="sm"
            className="border-white text-white hover:bg-white/10 bg-transparent"
          >
            {t.language_button}
          </Button>
          <Button asChild className="hidden md:flex bg-[#FFA500] hover:bg-[#FF8C00] text-black font-bold">
            <Link href="#agendar">{t.get_support}</Link>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" className="border-white text-white bg-transparent">
                <Menu className="h-5 w-5" />
                <span className="sr-only">{t.toggle_menu}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0052D4] text-white border-l-white">
              <div className="flex flex-col gap-4 mt-8">
                <Link
                  href="/"
                  className="text-lg font-medium hover:text-[#FFA500] transition-colors"
                  onClick={handleHomeClick}
                >
                  {t.home}
                </Link>
                <Link
                  href="/#servicios"
                  className="text-lg font-medium hover:text-[#FFA500] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t.services}
                </Link>
                <Link
                  href="/#planes"
                  className="text-lg font-medium hover:text-[#FFA500] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t.companies}
                </Link>
                <Link
                  href="/#agendar"
                  className="text-lg font-medium hover:text-[#FFA500] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t.contact}
                </Link>
                <Button asChild className="mt-4 bg-[#FFA500] hover:bg-[#FF8C00] text-black font-bold">
                  <Link href="/#agendar" onClick={() => setIsOpen(false)}>
                    {t.get_support}
                  </Link>
                </Button>
                <Button
                  onClick={() => {
                    toggleLanguage()
                    setIsOpen(false)
                  }}
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                >
                  {t.language_button}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
