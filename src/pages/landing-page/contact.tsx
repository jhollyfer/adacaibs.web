import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import React from "react";
import { useInView } from "react-intersection-observer";

export function Contact(): React.JSX.Element {
  const [formRef, formInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [infoRef, infoInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold mb-8 text-center">Entre em Contato</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <motion.div
          ref={formRef}
          initial={{ opacity: 0, x: -50 }}
          animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-6">Envie uma mensagem</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Nome completo
                </label>
                <Input id="name" placeholder="Seu nome" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  E-mail
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="block text-sm font-medium">
                Assunto
              </label>
              <Input id="subject" placeholder="Assunto da mensagem" required />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium">
                Mensagem
              </label>
              <Textarea
                id="message"
                placeholder="Digite sua mensagem aqui..."
                rows={6}
                required
              />
            </div>

            <Button type="submit" className="w-full sm:w-auto">
              Enviar mensagem
            </Button>
          </form>
        </motion.div>

        <motion.div
          ref={infoRef}
          initial={{ opacity: 0, x: 50 }}
          animate={infoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-6">
            Informações de contato
          </h2>

          <div className="space-y-6">
            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-primary mt-0.5 mr-3" />
              <div>
                <h3 className="font-medium">Endereço</h3>
                <p className="text-gray-700">
                  Rua das Flores, 123 - Centro
                  <br />
                  Cidade - Estado, CEP 00000-000
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="h-6 w-6 text-primary mt-0.5 mr-3" />
              <div>
                <h3 className="font-medium">Telefone</h3>
                <p className="text-gray-700">(00) 0000-0000</p>
                <p className="text-gray-700">(00) 90000-0000 (WhatsApp)</p>
              </div>
            </div>

            <div className="flex items-start">
              <Mail className="h-6 w-6 text-primary mt-0.5 mr-3" />
              <div>
                <h3 className="font-medium">E-mail</h3>
                <p className="text-gray-700">contato@adacaibs.org.br</p>
              </div>
            </div>

            <div className="flex items-start">
              <Clock className="h-6 w-6 text-primary mt-0.5 mr-3" />
              <div>
                <h3 className="font-medium">Horário de atendimento</h3>
                <p className="text-gray-700">Segunda a sexta: 09:00 - 18:00</p>
                <p className="text-gray-700">Sábado: 09:00 - 12:00</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-medium mb-4">Siga-nos nas redes sociais</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                <Youtube className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-medium mb-2">Precisa de um intérprete de Comunicação?</h3>
          <p className="text-gray-700 mb-4">
            Oferecemos serviços de interpretação em Comunicação para eventos, reuniões e outras ocasiões. Entre em contato para mais informações.
          </p>
          <Button variant="outline">Solicitar intérprete</Button>
        </div> */}
        </motion.div>
      </div>
    </div>
  );
}
