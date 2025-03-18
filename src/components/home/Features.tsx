import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: index * 0.1 },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-6">
        <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg mb-4">
          <span
            className="text-yellow-500 text-3xl"
            dangerouslySetInnerHTML={{ __html: icon }}
          ></span>
        </div>
        <h3 className="text-xl font-bold text-black mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

const Features = () => {
  const features = [
    {
      icon: "&#9635;",
      title: "Fortalecer",
      description:
        "a Associação de Desenvolvimento Artístico e Cultural da Aldeia Indígena de Belém do Solimões",
    },
    {
      icon: "&#9783;",
      title: "Conservar",
      description: "e Proteger a biodiversidade dos ecossistemas de água doce",
    },
    {
      icon: "&#9634;",
      title: "Elaborar",
      description:
        "e instigar a vigilância dos lagos e documentar conhecimentos tradicionais",
    },
    {
      icon: "&#9777;",
      title: "Enaltecer",
      description:
        "a sabedoria tradicional Tikuna e promover a cultura indígena",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
