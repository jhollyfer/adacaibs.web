import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const AboutSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
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
              src="/default.webp"
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

            <motion.p variants={itemVariants} className="text-gray-300 mb-4">
              Esta é uma iniciativa de colaboração integrada ou seja de
              cocriação para conservar rios ou áreas alagadas no trapézio
              amazônico que abrange partes do Brasil, Peru e Colômbia.
            </motion.p>

            <motion.p variants={itemVariants} className="text-gray-300 mb-4">
              A ADAIBS está localizada no município de Tabatinga,
              estrategicamente situado na região da Tríplice Fronteira Brasil,
              Peru e Colômbia na região do Alto Solimões do Estado do Amazonas.
            </motion.p>

            <motion.p variants={itemVariants} className="text-gray-300 mb-6">
              Nossa sede está situada em uma área central, facilitando o acesso
              às comunidades locais, empresas e organizações governamentais com
              as quais colaboramos.
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
};

export default AboutSection;
