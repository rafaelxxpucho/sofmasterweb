"use client"

import { useState, useEffect, useRef } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Messages } from "@/lib/lang"

interface TestimonialsProps {
  t: Messages["testimonials"]
}

export function Testimonials({ t }: TestimonialsProps) {
  const testimonialsData = [
    {
      name: t.testimonial1_name,
      role: t.testimonial1_role,
      company: t.testimonial1_company,
      content: t.testimonial1_content,
      rating: 5,
      numericRating: 4.9,
    },
    {
      name: t.testimonial2_name,
      role: t.testimonial2_role,
      company: t.testimonial2_company,
      content: t.testimonial2_content,
      rating: 5,
      numericRating: 4.8,
    },
    {
      name: t.testimonial3_name,
      role: t.testimonial3_role,
      company: t.testimonial3_company,
      content: t.testimonial3_content,
      rating: 5,
      numericRating: 5.0,
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true) // Estado para la animación de desvanecimiento
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null) // Ref para el intervalo de auto-play

  // Función para iniciar el auto-play
  const startAutoplay = () => {
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current) // Limpia cualquier intervalo existente
    autoplayIntervalRef.current = setInterval(() => {
      setIsVisible(false) // Inicia el desvanecimiento (fade out)
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1))
        setIsVisible(true) // Inicia el desvanecimiento (fade in)
      }, 300) // Este tiempo debe coincidir con la duración de la transición CSS
    }, 5000) // Cambia el testimonio cada 5 segundos (5000 ms)
  }

  // Función para detener el auto-play
  const stopAutoplay = () => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current)
      autoplayIntervalRef.current = null
    }
  }

  // useEffect para iniciar y limpiar el auto-play
  useEffect(() => {
    startAutoplay() // Inicia el auto-play al montar el componente
    return () => stopAutoplay() // Limpia el intervalo al desmontar el componente
  }, [testimonialsData.length]) // Se ejecuta cuando cambia la longitud de los testimonios

  // Modifica las funciones goToPrevious y goToNext para manejar la animación y el auto-play
  const goToPrevious = () => {
    stopAutoplay() // Detiene el auto-play en interacción manual
    setIsVisible(false)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1))
      setIsVisible(true)
      startAutoplay() // Reinicia el auto-play después de la interacción manual
    }, 300)
  }

  const goToNext = () => {
    stopAutoplay() // Detiene el auto-play en interacción manual
    setIsVisible(false)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1))
      setIsVisible(true)
      startAutoplay() // Reinicia el auto-play después de la interacción manual
    }, 300)
  }

  // Función para manejar el clic en los puntos de navegación
  const handleDotClick = (index: number) => {
    stopAutoplay() // Detiene el auto-play en interacción manual
    setIsVisible(false)
    setTimeout(() => {
      setCurrentIndex(index)
      setIsVisible(true)
      startAutoplay() // Reinicia el auto-play después de la interacción manual
    }, 300)
  }

  const currentTestimonial = testimonialsData[currentIndex]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32" id="testimonios">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t.title}</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              {t.description}
            </p>
          </div>
        </div>
        <div
          className="mx-auto max-w-2xl py-12 relative"
          onMouseEnter={stopAutoplay} // Pausa al pasar el ratón
          onMouseLeave={startAutoplay} // Reanuda al quitar el ratón
        >
          <div className="flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/50 hover:bg-white/70 rounded-full"
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous testimonial</span>
            </Button>
            {/* Aplica las clases de transición y opacidad aquí */}
            <div className={`transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
              <TestimonialCard
                key={currentIndex} // ¡Importante! Esto fuerza a React a re-renderizar el componente y aplicar la transición
                name={currentTestimonial.name}
                role={currentTestimonial.role}
                company={currentTestimonial.company}
                content={currentTestimonial.content}
                rating={currentTestimonial.rating}
                numericRating={currentTestimonial.numericRating}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/50 hover:bg-white/70 rounded-full"
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-[#0052D4]" : "bg-gray-300"}`}
                onClick={() => handleDotClick(index)} // Usa la nueva función para el clic en los puntos
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface TestimonialCardProps {
  name: string
  role: string
  company: string
  content: string
  rating: number
  numericRating: number
}

function TestimonialCard({ name, role, company, content, rating, numericRating }: TestimonialCardProps) {
  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < rating ? "text-[#FFA500] fill-[#FFA500]" : "text-gray-300"}`} />
          ))}
          <span className="text-lg font-bold text-gray-700">{numericRating.toFixed(1)}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-500 dark:text-gray-400">"{content}"</p>
        <div>
          <p className="font-semibold">{name}</p>
          <CardDescription>
            {role}, {company}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  )
}
