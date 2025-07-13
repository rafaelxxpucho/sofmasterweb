"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface FormState {
  success: boolean
  message: string
}

export async function sendContactForm(previousState: FormState | null, formData: FormData): Promise<FormState> {
  console.log("Server Action (Principal - sendContactForm): Recibiendo datos del formulario...")
  console.log("Server Action (Principal - sendContactForm): formData:", formData)

  if (!formData) {
    console.error("Server Action (Principal - sendContactForm): formData es null o undefined.")
    return { success: false, message: "Error: No se recibieron datos del formulario." }
  }

  const nombre = formData.get("nombre") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const serviceType = formData.get("serviceType") as string
  const urgency = formData.get("urgency") as string
  const message = formData.get("message") as string

  console.log("Server Action (Principal - sendContactForm): Datos extraídos:")
  console.log({ nombre, email, phone, serviceType, urgency, message })

  if (!nombre || !email || !phone || !serviceType || !urgency || !message) {
    console.error("Server Action (Principal - sendContactForm): Faltan campos requeridos.")
    return { success: false, message: "Por favor, completa todos los campos requeridos." }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "contacto@sofmaster.com", // Asegúrate de que este dominio esté verificado en Resend
      to: "soporte@sofmaster.com", // Cambia esto a tu dirección de correo electrónico real
      subject: `Nueva Solicitud de Soporte de ${nombre}`,
      html: `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo Electrónico:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Tipo de Servicio:</strong> ${serviceType}</p>
        <p><strong>Urgencia:</strong> ${urgency}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `,
    })

    if (error) {
      console.error("Error al enviar el correo con Resend:", error)
      return { success: false, message: error.message || "Error al enviar el formulario." }
    }

    console.log("Correo enviado con éxito:", data)
    return { success: true, message: "Formulario enviado con éxito." }
  } catch (error) {
    console.error("Error inesperado en sendContactForm:", error)
    return { success: false, message: "Ocurrió un error inesperado al procesar tu solicitud." }
  }
}
