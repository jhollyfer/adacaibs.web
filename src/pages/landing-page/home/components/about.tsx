import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

export function About(): React.JSX.Element {
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
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
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
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute -inset-4 bg-yellow-500/20 rounded-xl -z-10 blur-xl"></div>
            <img
              // src="/default.webp"
              src="https://pub-26f491708de845d2a89c0c5ff5131187.r2.dev/a1df24f5-2d41-4763-9d94-1f7b2025d32b.webp"
              loading="lazy"
              alt="Mapa da região"
              className="rounded-xl shadow-2xl w-full object-cover"
            />
          </motion.div>

          {/* Content */}
          <div>
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Quem <span className="text-yellow-500">somos nós</span> e onde
                estamos?
              </h2>
              <div className="w-20 h-1 text-yellow-500 mb-6"></div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-gray-300 mb-4 text-justify"
            >
              A ADACAIBS (Associação de Desenvolvimento Artístico e Cultural da
              Aldeia Indígena de Belém do Solimões) é uma organização indígena
              sem fins lucrativos, criada com o objetivo de preservar a cultura
              indígena Ticuna, promover a educação e fomentar a sustentabilidade
              ambiental na região do Alto Solimões, situada na comunidade
              indígena de Belém do Solimões, na Tríplice Fronteira na fronteira
              entre Brasil, Colômbia e Peru.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-gray-300 mb-4 text-justify"
            >
              A associação surgiu como uma resposta à crescente necessidade de
              fortalecer a identidade cultural da comunidade Ticuna, ao mesmo
              tempo em que promove práticas de conservação ambiental e
              desenvolvimento sustentável, especialmente relacionadas aos rios e
              lagos da região, que são essenciais para a vida e as tradições
              dessa etnia.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Button
                asChild
                className="bg-yellow-500 text-black hover:bg-yellow-400"
              >
                <Link to="/sobre" className="flex items-center gap-2">
                  Saiba mais sobre nós
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
