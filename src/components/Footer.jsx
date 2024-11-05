import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, ExternalLink, ChevronRight } from 'lucide-react';

const FooterLink = ({ children, href = "#" }) => (
  <a 
    href={href} 
    className="group flex items-center text-gray-300 hover:text-red-500 transition-colors duration-300"
  >
    <ChevronRight className="w-4 h-4 mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <span>{children}</span>
  </a>
);

const SocialIcon = ({ Icon, href = "#" }) => (
  <a 
    href={href}
    className="bg-red-600 p-2 rounded-full hover:bg-red-700 transition-colors duration-300"
  >
    <Icon className="w-5 h-5" />
  </a>
);

const ContactItem = ({ Icon, children }) => (
  <div className="flex items-start space-x-3 text-gray-300">
    <Icon className="w-5 h-5 mt-1 text-red-500" />
    <span>{children}</span>
  </div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { Icon: Facebook, href: "#" },
    { Icon: Instagram, href: "#" },
    { Icon: Twitter, href: "#" },
  ];

  const locations = [
    "AREQUIPA: C.C. CompuArequipa Tienda 133 y 219",
    "LIMA: C.C. Cyberplaza tienda 140 sector 2 B"
  ];

  const policies = [
    "Nosotros",
    "Políticas de Privacidad",
    "Términos y Condiciones",
    "Devoluciones"
  ];

  return (
    <footer className="bg-black text-white">

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <img src="https://labrujastore.com.pe/general/img/logo.png" alt="La Bruja Store" className="w-32" />
            <p className="text-gray-300">
              Consigue las mejores marcas a los mejores precios, aquí en La Bruja Store.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social, index) => (
                <SocialIcon key={index} Icon={social.Icon} href={social.href} />
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6">CONTÁCTANOS</h3>
            <div className="space-y-4">
              {locations.map((location, index) => (
                <ContactItem key={index} Icon={MapPin}>
                  {location}
                </ContactItem>
              ))}
              <ContactItem Icon={Mail}>
                labrujastore@outlook.com
              </ContactItem>
            </div>
          </div>

          {/* Policies Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6">POLÍTICAS</h3>
            <div className="space-y-3">
              {policies.map((policy, index) => (
                <FooterLink key={index}>{policy}</FooterLink>
              ))}
            </div>
          </div>

          {/* Hours Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6">HORARIO DE ATENCIÓN</h3>
            <div className="space-y-2 text-gray-300">
              <p>Lunes a Viernes</p>
              <p className="font-bold">9:00 AM - 7:00 PM</p>
              <p className="mt-4">Sábados</p>
              <p className="font-bold">10:00 AM - 4:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} La Bruja Store. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors duration-300">Privacidad</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Cookies</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Legal</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;