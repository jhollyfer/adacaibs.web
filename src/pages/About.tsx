import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 text-center">Sobre Nós</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <img
                src="/default.webp"
                alt="ADACAIBS Logo"
                className="w-full h-auto mb-4"
              />
              <p className="text-lg text-gray-700 mb-4">
                A Associação Desportiva, Artística, Cultural Amigos da Igreja
                Batista do Silêncio (ADACAIBS) foi fundada com o propósito de
                promover a inclusão social através de atividades esportivas,
                artísticas e culturais.
              </p>
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-semibold mb-4">Nossa Missão</h2>
              <p className="text-lg text-gray-700 mb-4">
                Nossa missão é criar um ambiente acolhedor onde pessoas surdas e
                ouvintes possam interagir, aprender e crescer juntas, promovendo
                a inclusão e o respeito à diversidade.
              </p>
              <h2 className="text-2xl font-semibold mb-4">Nossa Visão</h2>
              <p className="text-lg text-gray-700 mb-4">
                Ser reconhecida como uma organização de referência na promoção
                da inclusão social e no desenvolvimento de atividades que
                valorizam a comunidade surda.
              </p>
            </div>
          </div>

          <div className="bg-gray-100 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Nossos Valores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-xl mb-2">Inclusão</h3>
                <p>
                  Promovemos ambientes inclusivos onde todos são valorizados,
                  independentemente de suas capacidades.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-xl mb-2">Respeito</h3>
                <p>
                  Respeitamos a diversidade e as diferentes formas de
                  comunicação e expressão.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-xl mb-2">Comunidade</h3>
                <p>
                  Fomentamos o senso de pertencimento e o fortalecimento dos
                  laços comunitários.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Nossa História
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              A ADACAIBS nasceu do desejo de um grupo de amigos da Igreja
              Batista do Silêncio de expandir seu impacto na comunidade surda e
              ouvinte. Desde a nossa fundação, temos trabalhado incansavelmente
              para promover a inclusão social através de iniciativas esportivas,
              artísticas e culturais.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Ao longo dos anos, nossa associação tem crescido
              significativamente, ampliando suas atividades e seu alcance. Temos
              orgulho de ter construído uma comunidade vibrante e inclusiva,
              onde pessoas surdas e ouvintes compartilham experiências e
              aprendem umas com as outras.
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default About;
