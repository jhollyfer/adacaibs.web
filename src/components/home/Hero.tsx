
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Hero = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden" ref={ref}>
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/516afdeb-e44c-4cf0-81a2-d0951e9348f5.png"
          alt="Aldeia Indígena de Belém do Solimões" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-adacaibs-black/70 via-adacaibs-black/50 to-adacaibs-black/90"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 pt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          <div className="text-white">
            <motion.p 
              variants={itemVariants}
              className="text-adacaibs-yellow font-medium mb-4"
            >
              Associação de Desenvolvimento Artístico e Cultural
            </motion.p>
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-balance"
            >
              Aldeia <span className="text-adacaibs-yellow">Indígena</span> de Belém do Solimões
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-gray-200 text-lg mb-8 max-w-xl"
            >
              Promovemos a preservação da cultura, tradições e saberes do povo Tikuna, enquanto conservamos a biodiversidade e os ecossistemas de água doce.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <Button asChild size="lg" className="bg-adacaibs-yellow text-adacaibs-black hover:bg-yellow-400">
                <Link to="/sobre">Leia mais</Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                <Link to="/videos" className="flex items-center gap-2">
                  <Play size={18} />
                  <span>Assista ao vídeo</span>
                </Link>
              </Button>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="mt-10 text-sm text-gray-300"
            >
              <p className="mb-2">#artenaldeia #culturavivabrasil #aldeiaindígena #raízesdosolimões #orgulhoindígena</p>
              <p>#raízeseculturais #tradiçãoearte #culturasqueres #solimõescriativo #terrasindígenasamazônia</p>
            </motion.div>
          </div>
          
          <motion.div
            variants={itemVariants}
            className="hidden lg:flex justify-center"
          >
            <img 
              src="/lovable-uploads/8ab9495a-6e4e-4a6e-983e-adfcede7b8f7.png" 
              alt="ADACAIBS Logo"
              className="max-w-full h-auto"
              style={{ maxHeight: '350px' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
