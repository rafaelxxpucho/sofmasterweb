"use client"

import React from "react"
import { CalendarClock } from "lucide-react"
import { useActionState } from "react"
import { sendContactForm } from "@/app/actions" // Importa la Server Action correcta

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import type { Messages } from "@/lib/lang"

interface ContactFormProps {
  t: Messages["contact"]
}

export function ContactForm({ t }: ContactFormProps) {
  // Asegúrate de que useActionState esté usando sendContactForm
  const [state, formAction, isPending] = useActionState(sendContactForm, null)

  React.useEffect(() => {
    if (state?.success) {
      toast({
        title: t.toast_title,
        description: t.toast_description,
      })
      // Opcional: Resetear el formulario después de un envío exitoso
      // Puedes añadir aquí la lógica para limpiar los campos del formulario
    } else if (state?.message && !state.success) {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      })
    }
  }, [state, t])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.form_title}</CardTitle>
        <CardDescription>{t.form_description}</CardDescription>
      </CardHeader>
      {/* El atributo 'action' del formulario debe apuntar a la Server Action */}
      <form action={formAction} key={state?.success ? "success" : "initial"}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">{t.form_name_label}</Label>
            <Input id="nombre" name="nombre" placeholder={t.form_name_placeholder} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t.form_email_label}</Label>
            <Input id="email" name="email" placeholder={t.form_email_placeholder} type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{t.form_phone_label}</Label>
            <Input id="phone" name="phone" placeholder={t.form_phone_placeholder} type="tel" required />
          </div>
          <div className="space-y-2">
            <Label>{t.form_service_type_label}</Label>
            <RadioGroup defaultValue="hogar" name="serviceType" className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hogar" id="hogar" />
                <Label htmlFor="hogar" className="font-normal">
                  {t.form_service_type_home}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="empresa" id="empresa" />
                <Label htmlFor="empresa" className="font-normal">
                  {t.form_service_type_business}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="on-demand" id="on-demand" />
                <Label htmlFor="on-demand" className="font-normal">
                  {t.form_service_type_on_demand}
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="urgency">{t.form_urgency_label}</Label>
            <Select defaultValue="normal" name="urgency">
              <SelectTrigger>
                <SelectValue placeholder={t.form_urgency_label} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="baja">{t.form_urgency_low}</SelectItem>
                <SelectItem value="normal">{t.form_urgency_normal}</SelectItem>
                <SelectItem value="alta">{t.form_urgency_high}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">{t.form_message_label}</Label>
            <Textarea id="message" name="message" placeholder={t.form_message_placeholder} className="min-h-[100px]" />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-[#0052D4] hover:bg-[#003DAA]" disabled={isPending}>
            {isPending ? (
              <>
                <CalendarClock className="mr-2 h-4 w-4 animate-spin" />
                {t.form_submitting}
              </>
            ) : (
              t.form_submit_button
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
