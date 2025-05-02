import { motion } from "framer-motion";
import React from "react";
import { useInView } from "react-intersection-observer";

export function About(): React.JSX.Element {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-24">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl w-full mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 text-center">Sobre Nós</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <img
              src="https://pub-26f491708de845d2a89c0c5ff5131187.r2.dev/adacaibs-lp-contact.webp"
              alt="ADACAIBS Logo"
              loading="lazy"
              className="w-full h-auto mb-4"
            />
            <p className="text-lg text-gray-700 mb-4 text-justify">
              A ADACAIBS (Associação de Desenvolvimento Artístico e Cultural da
              Aldeia Indígena de Belém do Solimões) é uma organização indígena
              sem fins lucrativos, fundada com o objetivo de preservar a cultura
              indígena Ticuna, promover a educação e fomentar a sustentabilidade
              ambiental na região do Alto Solimões, localizada na tríplice
              fronteira entre Brasil, Colômbia e Peru.
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-4">Nossa Missão</h2>
            <p className="text-lg text-gray-700 mb-4 text-justify">
              A missão da ADACAIBS é promover a preservação da cultura indígena
              Tikuna, fortalecer as comunidades do Alto Solimões e capacitar as
              novas gerações, com foco em educação, cultura, sustentabilidade e
              empoderamento por meio da comunicação e conservação ambiental.
            </p>
            <h2 className="text-2xl font-semibold mb-4">Nossa Visão</h2>
            <p className="text-lg text-gray-700 mb-4 text-justify">
              A ADACAIBS deseja ser uma referência regional em preservação
              cultural, educação indígena e sustentabilidade, promovendo a
              inclusão social e o protagonismo das gerações mais jovens, por
              meio do fortalecimento da Rádio A'uma e de parcerias estratégicas.
            </p>
          </div>
        </div>

        <div className="bg-gray-100 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Nossos Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-xl mb-2">Respeito à Cultura</h3>
              <p>Valorização das tradições indígenas </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-xl mb-2">Sustentabilidade</h3>
              <p>Compromisso com práticas ambientais sustentáveis</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-xl mb-2">Educação</h3>
              <p>A educação como transformação social</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-xl mb-2">
                Transparência e Colaboração
              </h3>
              <p>Honestidade nas ações e parcerias</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-xl mb-2">Protagonismo</h3>
              <p>Empoderamento das novas gerações</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-xl mb-2">
                Inovação e Inclusão
              </h3>
              <p>Inclusão social e inovação tecnológica</p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Nossa História
          </h2>
          <p className="text-lg text-gray-700 mb-4 text-justify">
            A cultura Ticuna tem suas raízes profundamente conectadas às águas
            do Alto Solimões. Os rios e lagos não são apenas fontes de sustento,
            mas também espaços sagrados e simbólicos para os Ticuna. A pesca, as
            celebrações tradicionais e a vida cotidiana giram em torno dessas
            águas, que alimentam as comunidades tanto física quanto
            espiritualmente.
          </p>
          <p className="text-lg text-gray-700 mb-4 text-justify">
            Os Ticuna preservam o conhecimento ancestral relacionado à gestão da
            água e à conservação dos ecossistemas aquáticos, práticas essas que
            são passadas de geração em geração. Além disso, as águas também são
            o palco de muitas das suas celebrações culturais, como rituais,
            danças e canções, que conectam a comunidade à natureza e à sua
            história ancestral
          </p>
        </div>
      </motion.div>
    </div>
  );
}
