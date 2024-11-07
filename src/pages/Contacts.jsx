import React from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  MapPin, 
  Clock, 
  User, 
  MapPinned,
  Building,
  Calendar
} from 'lucide-react';

const Contacts = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const advisors = {
    lima: [
      { name: 'Cristhofer', phone: '999999999' },
      { name: 'Cristhofer', phone: '999999999' }
    ],
    arequipa: [
      { name: 'Cristhofer', phone: '999999999' },
      { name: 'Cristhofer', phone: '999999999' }
    ]
  };

  const locations = {
    lima: {
      name: 'Lima',
      address: 'AV. xxx ',
      mall: 'CENTRO COMERCIAL ',
      schedule: {
        weekdays: '10:00 AM a 8:00 PM',
        sunday: '10:00 AM a 6:00 PM'
      }
    },
    arequipa: {
      name: 'Arequipa',
      address: 'xxx',
      mall: 'CENTRO COMERCIAL',
      schedule: {
        weekdays: '10:00 AM a 8:00 PM',
        sunday: '10:00 AM a 6:00 PM'
      }
    }
  };

  const AdvisorCard = ({ name, phone }) => (
    <motion.div 
      variants={itemVariants}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex flex-col items-center space-y-3">
        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
          <User size={32} className="text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Asesor {name}</h3>
        <div className="flex items-center space-x-2 text-gray-600">
          <Phone size={18} className="text-red-600" />
          <span className="text-lg">{phone}</span>
        </div>
      </div>
    </motion.div>
  );

  const LocationCard = ({ location }) => (
    <motion.div 
      variants={itemVariants}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
            <MapPinned size={24} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{location.name}</h3>
        </div>

        <div className="space-y-3 ml-2">
          <div className="flex items-start space-x-3">
            <MapPin size={20} className="text-red-600 mt-1 flex-shrink-0" />
            <div>
              <p className="text-gray-700">{location.address}</p>
              <p className="text-red-600 font-semibold">{location.mall}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Clock size={20} className="text-red-600 mt-1 flex-shrink-0" />
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-gray-500" />
                <span className="text-gray-700">Lunes - Sábado:</span>
                <span className="font-semibold">{location.schedule.weekdays}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-gray-500" />
                <span className="text-gray-700">Domingo:</span>
                <span className="font-semibold">{location.schedule.sunday}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 mt-28">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-6xl mx-auto space-y-12"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-red-600">Contáctanos</h1>
          <p className="text-gray-600 text-lg">Nuestro equipo está listo para atenderte</p>
        </motion.div>

        {/* Asesores Section */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Nuestros Asesores</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advisors.lima.map((advisor, index) => (
              <AdvisorCard key={`lima-${index}`} {...advisor} />
            ))}
            {advisors.arequipa.map((advisor, index) => (
              <AdvisorCard key={`arequipa-${index}`} {...advisor} />
            ))}
          </div>
        </motion.div>

        {/* Ubicaciones Section */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <Building size={20} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Nuestras Ubicaciones</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.values(locations).map((location, index) => (
              <LocationCard key={index} location={location} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contacts;