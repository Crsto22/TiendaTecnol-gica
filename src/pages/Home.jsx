import React from "react";
import { Monitor, Cpu, Package, Truck, ChevronRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import brands from "../data/brands";
import Products from "../components/Products";

const Home = () => {
  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const featureVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  };

  const [emblaRef1] = useEmblaCarousel(
    {
        loop: true,
        dragFree: true,
    },
    [
        AutoScroll({
            playOnInit: true,
            speed: 3,
            startDelay: 0,
        }),
    ]
);

  
  return (
    <div className="relative overflow-hidden mt-28">
      
      {/* Hero Section */}
      <div className="max-[1024px]:h-[600px] h-[800px] bg-gradient-to-br from-black via-red-950 to-black">
        
        {/* Main content */}
        <div className="relative container mx-auto px-4 h-full flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:w-1/2 space-y-8 text-center lg:text-left pt-16 lg:pt-0"
          >
            <div className="space-y-4">
              <motion.div 
                variants={itemVariants}
                className="inline-block"
              >
                <span className="bg-red-600/20 text-red-500 text-sm font-medium px-4 py-1 rounded-full">
                  Tu Tienda de Tecnología
                </span>
              </motion.div>
               {/* Imagen */}
      <motion.img
        src="https://labrujastore.com.pe/general/img/logo.png"
        alt="La Bruja Store Logo"
        className="max-[1024px]:w-full h-24 w-96 md:h-32 object-contain"
        variants={itemVariants}
      />
      
      {/* Eslogan */}
      <motion.span 
        variants={itemVariants}
        className="text-red-500 text-3xl md:text-4xl mt-2 font-bold text-center md:text-left"
      >
        Tecnología sin límites
      </motion.span>
              <motion.p 
                variants={itemVariants}
                className="text-lg text-gray-300 max-w-xl"
              >
                Explora nuestra selección de computadoras y componentes de
                última tecnología. Calidad y rendimiento en cada producto.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold 
                          hover:bg-red-700 transition-colors flex items-center justify-center gap-2
                          shadow-lg shadow-red-600/30"
              >
                Ver Catálogo
                <ChevronRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-red-500 text-white rounded-lg font-semibold 
                          hover:bg-red-950 transition-colors"
              >
                Contactar Ventas
              </motion.button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-4 justify-center lg:justify-start text-gray-300"
            >
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Star className="w-6 h-6 fill-current text-red-500" />
                  </motion.div>
                ))}
              </div>
              <span>+1000 clientes satisfechos</span>
            </motion.div>
          </motion.div>

          {/* Right content - Image and Features */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:w-1/2 space-y-8 hidden min-[1024px]:block"
          >
            {/* Computer Image */}
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent rounded-xl "></div>
              <img
                src="https://cdn.shopify.com/s/files/1/0098/7247/4167/files/pc_gaming_con_setup_de_luces_led.jpg?v=1630513725"
                alt="Gaming PC Setup"
                className="rounded-xl shadow-2xl shadow-red-600/20 w-4/5"
              />
              {/* Floating stats */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-4 -right-4 bg-black/80 backdrop-blur-lg rounded-lg p-4 border border-red-500/20"
              >
                <div className="text-white">
                  <span className="text-red-500 font-bold">+500</span>
                  <p className="text-sm">Productos disponibles</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Features grid */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 gap-4"
            >
              {[
                {
                  icon: <Monitor className="w-6 h-6" />,
                  title: "Equipos Premium",
                  desc: "Las mejores marcas",
                },
                {
                  icon: <Package className="w-6 h-6" />,
                  title: "Precios Competitivos",
                  desc: "Ofertas exclusivas",
                },
                {
                  icon: <Cpu className="w-6 h-6" />,
                  title: "Última Tecnología",
                  desc: "Componentes 2024",
                },
                {
                  icon: <Truck className="w-6 h-6" />,
                  title: "Envío Rápido",
                  desc: "Entrega garantizada",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  variants={featureVariants}
                  whileHover="hover"
                  className="bg-black/40 backdrop-blur-lg rounded-xl p-4 hover:bg-red-950/40 
                            transition-colors cursor-pointer group border border-red-500/10"
                >
                  <div className="text-red-500 group-hover:text-white transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-white font-semibold mt-2 text-sm">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Products />
      <section className="py-8 md:py-16 bg-gray-50 mb-6">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className=" md:text-3xl text-xl font-bold text-gray-900">
              Marcas <span className="text-red-600">con las que trabajamos</span>
            </h2>
            <p className="text-gray-600 mt-2">Distribuidores Oficiales</p>
          </div>

          <div className="overflow-hidden" ref={emblaRef1}>
            <div className="flex">
              {[...brands, ...brands].map((brand, index) => (
                <div
                  key={`${brand.id}-${index}`}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333333%] lg:flex-[0_0_25%] min-w-0 px-2 md:px-4"
                >
                  <div className="bg-white rounded-lg shadow-md p-4 md:p-6 h-24 md:h-32 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                    <img
                      src={brand.image}
                      alt={`${brand.name} logo`}
                      className="max-w-full h-auto max-h-16 md:max-h-20 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
    </div>
    
  );
};

export default Home;