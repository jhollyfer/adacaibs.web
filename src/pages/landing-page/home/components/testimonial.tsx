import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import { Star } from "lucide-react";
import React from "react";
import { useInView } from "react-intersection-observer";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  image: string;
  rating: number;
  index: number;
}

function TestimonialCard({
  quote,
  author,
  role,
  image,
  rating,
  index,
}: TestimonialCardProps): React.JSX.Element {
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

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.1 },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      className="bg-black/95 p-6 rounded-xl shadow-lg relative"
    >
      <div className="flex items-start mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={cn(
              i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
            )}
          />
        ))}
      </div>
      <p className="text-gray-300 mb-6 italic">"{quote}"</p>
      <div className="flex items-center">
        <img
          src={image}
          alt={author}
          className="w-10 h-10 rounded-full mr-3 object-cover"
        />
        <div>
          <p className="font-medium text-white">{author}</p>
          <p className="text-sm text-gray-400">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonial(): React.JSX.Element {
  const testimonials = [
    {
      quote:
        "O trabalho da Associação de Desenvolvimento Artístico e Cultural da Aldeia Indígena de Belém do Solimões é fundamental. A iniciativa do Festival Cultural Tradicional foi incrível! Parabéns pelo trabalho de todos vocês.",
      author: "Maria Silva",
      role: "Coordenadora de Projetos Sociais",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
      rating: 5,
    },
    {
      quote:
        "Fiquei impressionado com o projeto de preservação da língua indígena. É fundamental que ações como essa sejam apoiadas e ampliadas. A cultura e a identidade de um povo estão diretamente ligadas à sua língua. Excelente iniciativa!",
      author: "João Oliveira",
      role: "Professor de Antropologia",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4,
    },
    {
      quote:
        "Visitei a Aldeia de Belém do Solimões durante o Festival Cultural e foi uma experiência incrível! A música, a comida e a hospitalidade da comunidade são de tirar o fôlego. Recomendo a todos que queiram conhecer mais sobre a cultura indígena.",
      author: "Ana Costa",
      role: "Turista e Fotógrafa",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 5,
    },
    {
      quote:
        "A Associação tem feito um trabalho incrível em nossa aldeia. Desde o apoio aos artistas até a organização de eventos culturais, tudo é feito com muito cuidado e respeito às nossas tradições. Estamos muito gratos por todo o empenho!",
      author: "Roberto Almeida",
      role: "Líder Comunitário",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      rating: 5,
    },
    {
      quote:
        "Participei do projeto de documentação da biodiversidade dos igarapés e fiquei impressionado com o conhecimento tradicional dos moradores da Aldeia Indígena de Belém do Solimões. Fundamental preservarmos este patrimônio!",
      author: "Paulo Mendes",
      role: "Biólogo",
      image: "https://randomuser.me/api/portraits/men/79.jpg",
      rating: 5,
    },
  ];

  const sectionControls = useAnimation();
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  React.useEffect(() => {
    if (sectionInView) {
      sectionControls.start("visible");
    }
  }, [sectionControls, sectionInView]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-gray-100 to-white"
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={sectionControls}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            O que <span className="text-yellow-500">comunidade</span> fala?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Confira os depoimentos de pessoas que conhecem e participam das
            atividades e projetos desenvolvidos pela ADACAIBS.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              image={testimonial.image}
              rating={testimonial.rating}
              index={index}
            />
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.slice(3, 5).map((testimonial, index) => (
            <TestimonialCard
              key={index + 3}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              image={testimonial.image}
              rating={testimonial.rating}
              index={index + 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
