"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  CalendarClock,
  CheckCircle,
  Clock,
  type LucideIcon,
  MailIcon,
  Phone,
  Shield,
  Wrench,
  Server,
  HardDrive,
  Cpu,
  Laptop,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { Testimonials } from "@/components/testimonials"
import { messages, type Language } from "@/lib/lang"
// No necesitamos importar Toaster aquí, ya está en app/layout.tsx

export default function HomePage() {
  const [currentLang, setCurrentLang] = useState<Language>("es")
  const t = messages[currentLang]

  const toggleLanguage = () => {
    setCurrentLang((prevLang) => (prevLang === "es" ? "en" : "es"))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar currentLang={currentLang} toggleLanguage={toggleLanguage} t={t.navbar} />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#0052D4] text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">{t.hero.title}</h1>
                  <p className="max-w-[600px] text-gray-200 md:text-xl">{t.hero.description}</p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-[#FFA500] hover:bg-[#FF8C00] text-black font-bold">
                    <Link href="#agendar">{t.hero.cta1}</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white/10 bg-transparent"
                  >
                    <Link href="#servicios">{t.hero.cta2}</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="/images/Firefly_A technician repairing a desktop modern computer CPU on a workbench, focused expressi 925308.jpg"
                width={550}
                height={550}
                alt="Soporte Técnico"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
              />
            </div>
          </div>
        </section>

        {/* Servicios Section */}
        <section className="w-full py-12 md:py-24 lg:py-32" id="servicios">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t.services.title}</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  {t.services.description}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-4">
              <ServiceCard
                icon={Cpu}
                title={t.services.optimization_title}
                description={t.services.optimization_description}
                features={[]}
                price=""
                buttonText={t.buttons.request_service}
              />
              <ServiceCard
                icon={HardDrive}
                title={t.services.hardware_title}
                description={t.services.hardware_description}
                features={[]}
                price=""
                buttonText={t.buttons.request_service}
              />
              <ServiceCard
                icon={Shield}
                title={t.services.virus_title}
                description={t.services.virus_description}
                features={[]}
                price=""
                buttonText={t.buttons.request_service}
              />
              <ServiceCard
                icon={Wrench}
                title={t.services.software_title}
                description={t.services.software_description}
                features={[]}
                price=""
                buttonText={t.buttons.request_service}
              />
            </div>
          </div>
        </section>

        {/* Planes Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50" id="planes">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t.plans.title}</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  {t.plans.description}
                </p>
              </div>
            </div>
            <Tabs defaultValue="empresas" className="w-full max-w-4xl mx-auto mt-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="empresas">{t.plans.tab_companies}</TabsTrigger>
                <TabsTrigger value="hogar">{t.plans.tab_home}</TabsTrigger>
              </TabsList>
              <TabsContent value="empresas" className="mt-6">
                <div className="grid gap-6 lg:grid-cols-3">
                  <PlanCard
                    title={t.plans.basic_title}
                    price={t.plans.basic_price}
                    description={t.plans.basic_description}
                    features={t.plans.basic_features}
                    buttonText={t.buttons.hire}
                  />
                  <PlanCard
                    title={t.plans.professional_title}
                    price={t.plans.professional_price}
                    description={t.plans.professional_description}
                    features={t.plans.professional_features}
                    highlighted
                    buttonText={t.buttons.hire}
                  />
                  <PlanCard
                    title={t.plans.premium_title}
                    price={t.plans.premium_price}
                    description={t.plans.premium_description}
                    features={t.plans.premium_features}
                    buttonText={t.buttons.hire}
                  />
                </div>
              </TabsContent>
              <TabsContent value="hogar" className="mt-6">
                <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                  <ServiceCard
                    icon={Wrench}
                    title={t.plans.home_repair_title}
                    price={t.plans.home_repair_price}
                    description={t.plans.home_repair_description}
                    features={t.plans.home_repair_features}
                    image="/images/Firefly_creame una imagen para mi seccion de por que elergirnos recuerda que mi negocio es de 20279.jpg"
                    buttonText={t.buttons.request_service}
                  />
                  <ServiceCard
                    icon={HardDrive}
                    title={t.plans.home_diagnosis_title}
                    price={t.plans.home_diagnosis_price}
                    description={t.plans.home_diagnosis_description}
                    features={t.plans.home_diagnosis_features}
                    image="/images/pc-diagnosis.jpeg"
                    buttonText={t.buttons.request_service}
                  />
                  <ServiceCard
                    icon={Shield}
                    title={t.plans.home_virus_title}
                    price={t.plans.home_virus_price}
                    description={t.plans.home_virus_description}
                    features={t.plans.home_virus_features}
                    image="/images/Gemini_Generated_Image_clyx6xclyx6xclyx.png"
                    buttonText={t.buttons.request_service}
                  />
                  <ServiceCard
                    icon={Cpu}
                    title={t.plans.home_format_title}
                    price={t.plans.home_format_price}
                    description={t.plans.home_format_description}
                    features={t.plans.home_format_features}
                    image="/images/Gemini_Generated_Image_jk7uz2jk7uz2jk7u.png"
                    buttonText={t.buttons.request_service}
                  />
                  <ServiceCard
                    icon={Server}
                    title={t.plans.home_assembly_title}
                    price={t.plans.home_assembly_price}
                    description={t.plans.home_assembly_description}
                    features={t.plans.home_assembly_features}
                    image="/images/Gemini_Generated_Image_3u1dnq3u1dnq3u1d.png"
                    buttonText={t.buttons.request_service}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Soporte por Horas Section */}
        <section className="w-full py-12 md:py-24 lg:py-32" id="on-demand">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t.on_demand.title}</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    {t.on_demand.description}
                  </p>
                </div>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#0052D4]" />
                    <span>{t.on_demand.feature1}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#0052D4]" />
                    <span>{t.on_demand.feature2}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#0052D4]" />
                    <span>{t.on_demand.feature3}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#0052D4]" />
                    <span>{t.on_demand.feature4}</span>
                  </li>
                </ul>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-[#0052D4] hover:bg-[#003DAA]">
                    <Link href="#agendar">{t.on_demand.cta}</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Card className="w-full max-w-md">
                  <CardHeader>
                    <CardTitle>{t.on_demand.card_title}</CardTitle>
                    <CardDescription>{t.on_demand.card_description}</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-[#0052D4]" />
                        <span>{t.on_demand.remote_support}</span>
                      </div>
                      <span className="font-bold">$95/hora</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Wrench className="h-5 w-5 text-[#0052D4]" />
                        <span>{t.on_demand.on_site_support}</span>
                      </div>
                      <span className="font-bold">$150/hora</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Server className="h-5 w-5 text-[#0052D4]" />
                        <span>{t.on_demand.specialized_services}</span>
                      </div>
                      <span className="font-bold">$250/hora</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-gray-500">{t.on_demand.footer_text}</p>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Por qué elegirnos */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#0052D4] text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t.why_choose_us.title}</h2>
                <p className="max-w-[900px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t.why_choose_us.description}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={Clock}
                title={t.why_choose_us.feature1_title}
                description={t.why_choose_us.feature1_description}
              />
              <FeatureCard
                icon={Shield}
                title={t.why_choose_us.feature2_title}
                description={t.why_choose_us.feature2_description}
              />
              <FeatureCard
                icon={Wrench}
                title={t.why_choose_us.feature3_title}
                description={t.why_choose_us.feature3_description}
              />
              <FeatureCard
                icon={Laptop}
                title={t.why_choose_us.feature4_title}
                description={t.why_choose_us.feature4_description}
              />
              <FeatureCard
                icon={Server}
                title={t.why_choose_us.feature5_title}
                description={t.why_choose_us.feature5_description}
              />
              <FeatureCard
                icon={CalendarClock}
                title={t.why_choose_us.feature6_title}
                description={t.why_choose_us.feature6_description}
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <Testimonials t={t.testimonials} />

        {/* Contact Form Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50" id="agendar">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t.contact.title}</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  {t.contact.description}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-5 w-5 text-[#0052D4]" />
                  <h3 className="text-xl font-bold">{t.contact.response_title}</h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400">{t.contact.response_text}</p>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-[#0052D4]" />
                  <h3 className="text-xl font-bold">{t.contact.phone_title}</h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  <span className="font-bold">{t.contact.phone_number}</span>
                </p>
                <div className="flex items-center gap-2">
                  <MailIcon className="h-5 w-5 text-[#0052D4]" />
                  <h3 className="text-xl font-bold">{t.contact.email_title}</h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  <span className="font-bold">{t.contact.email_address}</span>
                </p>
              </div>
              <ContactForm t={t.contact} />
            </div>
          </div>
        </section>
      </main>
      <Footer t={t.footer} />
      {/* Toaster ya está en app/layout.tsx, no es necesario aquí */}
    </div>
  )
}

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-2">
      <div className="rounded-full bg-white/10 p-3">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-200">{description}</p>
    </div>
  )
}

interface PlanCardProps {
  title: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
  buttonText: string // Add buttonText prop
}

function PlanCard({ title, price, description, features, highlighted = false, buttonText }: PlanCardProps) {
  return (
    <Card className={`flex flex-col ${highlighted ? "border-[#0052D4] shadow-lg" : ""}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-2">
          <span className="text-3xl font-bold">{price}</span>
          {price !== "Consultar" && price !== "Cotización" && price !== "Personalizado" && (
            <span className="text-gray-500 dark:text-gray-400"> {price.includes("$") ? "" : "/mes"}</span>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="grid gap-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-[#0052D4]" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className={`w-full ${highlighted ? "bg-[#0052D4] hover:bg-[#003DAA]" : ""}`} asChild>
          <Link href="#agendar">{buttonText}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  price: string
  description: string
  features: string[]
  image?: string // Añadir prop para la imagen
  buttonText: string // Add buttonText prop
}

function ServiceCard({ icon: Icon, title, price, description, features, image, buttonText }: ServiceCardProps) {
  return (
    <Card className="flex flex-col">
      {image && (
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
          <Image src={image || "/placeholder.svg"} alt={title} layout="fill" objectFit="cover" />
        </div>
      )}
      <CardHeader>
        {!image && <Icon className="h-12 w-12 text-[#0052D4] mb-2" />}
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-2">
          <span className="text-2xl font-bold text-[#0052D4]">{price}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="grid gap-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-[#0052D4]" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-[#FFA500] hover:bg-[#FF8C00] text-black font-bold" asChild>
          <Link href="#agendar">{buttonText}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
