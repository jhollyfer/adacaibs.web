import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { MOCK_NEWS, NoticeMock } from "../../mock";

export function NoticeCard({
  image,
  // category,
  date,
  title,
  excerpt,
  // link,
  index,
  slug,
}: NoticeMock & { index: number }): React.JSX.Element {
  const link = "/noticias/" + slug;
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
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full"
    >
      <Link to={link} className="overflow-hidden block">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-60 object-cover transform hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-4">
          {/* <span className="text-xs px-3 py-1 bg-white text-green-800 rounded-full font-medium">
            {category}
          </span> */}
          <span className="text-sm text-gray-500 ">{date}</span>
        </div>
        <Link to={link} className="group">
          <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-500 transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{excerpt}</p>
        <Link
          to={link}
          className="inline-flex items-center text-yellow-500 hover:text-yellow-600 font-medium transition-colors"
        >
          Saiba mais <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
    </motion.div>
  );
}

export function Notice(): React.JSX.Element {
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
    <section ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={sectionControls}
          className="flex flex-col md:flex-row justify-between items-center mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Notícias</h2>
            <div className="w-20 h-1 bg-yellow-500 mt-2 mb-4"></div>
            <p className="text-gray-600 max-w-xl">
              Acompanhe as últimas novidades, eventos e projetos da ADACAIBS e
              da Aldeia Indígena de Belém do Solimões.
            </p>
          </div>
          <Button asChild className="mt-6 md:mt-0">
            <Link to="/noticias" className="flex items-center gap-2">
              Ver todas as notícias
              <ArrowRight size={16} />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_NEWS.map((item, index) => (
            <NoticeCard
              key={index}
              image={item.image}
              category={item.category}
              date={item.date}
              title={item.title}
              excerpt={item.excerpt}
              link={item.link}
              index={index}
              content={item.content}
              gallery={item.gallery}
              id={item.id}
              slug={item.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
