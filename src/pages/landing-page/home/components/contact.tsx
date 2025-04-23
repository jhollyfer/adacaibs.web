import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, useAnimation } from "framer-motion";
import React from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";

export function Contact(): React.JSX.Element {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault();
    // Here you would typically handle the form submission, e.g. with an API call
    toast.success("Mensagem enviada com sucesso!");
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  }

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section ref={ref} className="py-20 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Image */}
          <motion.div
            variants={itemVariants}
            className="relative rounded-xl overflow-hidden"
          >
            <div className="absolute -inset-4 bg-yellow-500/20 rounded-xl -z-10 blur-xl"></div>
            <img
              // src="/default.webp"
              src="https://pub-26f491708de845d2a89c0c5ff5131187.r2.dev/WhatsApp%20Image%202025-04-22%20at%2021.45.19.jpeg"
              alt="Rio Solimões"
              className="w-full h-full object-cover rounded-xl"
            />
          </motion.div>

          {/* Form */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Fale <span className="text-yellow-500">conosco!</span>
            </h2>
            <div className="w-20 h-1 bg-yellow-500 mb-6"></div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-gray-300 text-sm">
                  Nome completo
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Digite seu nome completo"
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-gray-300 text-sm">
                    E-mail
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Digite seu melhor e-mail"
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-gray-300 text-sm">
                    Telefone
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(XX) XXXX-XXXX"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-gray-300 text-sm">
                  Assunto
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Informe o assunto do e-mail"
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-gray-300 text-sm">
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Escreva sua mensagem"
                  className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full sm:w-auto bg-yellow-500 text-black hover:bg-yellow-400"
              >
                Enviar
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
