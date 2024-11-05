const products = [
  {
    id: 1,
    name: "Procesador Intel Core i7",
    brand: "Intel",
    price: 350,
    stock: 10,
    category: "Procesadores",
    imageUrl: "https://hca.pe/storage/media/large_wHv2gcKL4mXZK8STyYIYD3JELxTIHZllU3dfFkoY.png",
    description: "Un potente procesador Intel Core i7, ideal para tareas exigentes y gaming de alto rendimiento.",
    features: [
      "12 núcleos y 20 hilos",
      "Frecuencia base de 3.6 GHz",
      "Caché de 25MB",
      "Socket LGA 1700"
    ]
  },
  {
    id: 2,
    name: "Tarjeta Gráfica NVIDIA GeForce RTX 3080",
    brand: "NVIDIA",
    price: 800,
    stock: 5,
    category: "Tarjetas Gráficas",
    imageUrl: "https://smartbusiness.pe/cdn/shop/products/714183-tarjeta-de-video-evga-geforce-rtx-3080-12gb-ftw3-ultra-gaming-12gb-gddr6x-hdmi-dp-3--1.jpg?v=1723672241",
    description: "Experimenta gráficos de última generación con esta tarjeta gráfica NVIDIA GeForce RTX 3080.",
    features: [
      "Memoria GDDR6X de 12GB",
      "Reloj de impulso hasta 1.71 GHz",
      "Soporte para Ray Tracing",
      "Compatible con DirectX 12 Ultimate"
    ]
  },
  {
    id: 3,
    name: "Placa Base ASUS ROG Strix B550",
    brand: "ASUS",
    price: 200,
    stock: 15,
    category: "Placas Base",
    imageUrl: "https://www.sercoplus.com/29739-large_default/mainboard-asus-rog-strix-b550-f-gaming-w.jpg",
    description: "Placa base ASUS ROG Strix B550, optimizada para procesadores Ryzen y con soporte para PCIe 4.0.",
    features: [
      "Socket AM4",
      "PCIe 4.0 para tarjetas gráficas y SSD",
      "VRM optimizado para overclocking",
      "Soporte para Wi-Fi 6"
    ]
  },
  {
    id: 4,
    name: "Memoria RAM Corsair Vengeance 16GB",
    brand: "Corsair",
    price: 80,
    stock: 20,
    category: "Memorias RAM",
    imageUrl: "https://rimage.ripley.com.pe/home.ripley/Attachment/MKP/447/PMP20000311799/full_image-1.jpeg",
    description: "Memoria RAM Corsair Vengeance de 16GB, perfecta para mejorar la velocidad y el rendimiento de tu PC.",
    features: [
      "Capacidad de 16GB (2x8GB)",
      "Frecuencia de 3200 MHz",
      "Diseño de bajo perfil",
      "Compatible con Intel y AMD"
    ]
  },
  {
    id: 5,
    name: "SSD Samsung 970 EVO 1TB",
    brand: "Samsung",
    price: 150,
    stock: 25,
    category: "Almacenamiento",
    imageUrl: "https://www.sisumgesa.es/img/p/1/2/1/6/4/12164-medium_default.jpg",
    description: "SSD Samsung 970 EVO de 1TB, almacenamiento ultra rápido para tus archivos y aplicaciones.",
    features: [
      "Capacidad de 1TB",
      "Interfaz NVMe PCIe Gen 3",
      "Velocidad de lectura hasta 3,500 MB/s",
      "Resistente y duradero para uso intensivo"
    ]
  },
  {
    id: 6,
    name: "Teclado Mecánico Razer BlackWidow V3",
    brand: "Razer",
    price: 120,
    stock: 18,
    category: "Teclados",
    imageUrl: "https://baetech.pe/cdn/shop/files/48bc910352e51a5199a1d543309ef93b_800x.jpg?v=1692805725",
    description: "Teclado mecánico Razer BlackWidow V3 con retroiluminación RGB y switches táctiles de alta durabilidad.",
    features: [
      "Switches mecánicos Razer Green",
      "Retroiluminación RGB personalizable",
      "Construcción en aluminio",
      "Diseño ergonómico con reposamuñecas"
    ]
  },
  {
    id: 7,
    name: "Monitor Gaming LG UltraGear 27GL850",
    brand: "LG",
    price: 450,
    stock: 7,
    category: "Monitores",
    imageUrl: "https://www.lg.com/content/dam/channel/wcms/es/images/monitores/27gl850-b_aeu_eees_es_c/27gl850-01.jpg",
    description: "Monitor gaming LG UltraGear 27 pulgadas con resolución QHD y tecnología Nano IPS para una experiencia visual superior.",
    features: [
      "Resolución QHD (2560x1440)",
      "Frecuencia de actualización de 144 Hz",
      "Tiempo de respuesta de 1ms",
      "Tecnología AMD FreeSync y NVIDIA G-Sync"
    ]
  },
  {
    id: 8,
    name: "Ratón Inalámbrico Logitech MX Master 3",
    brand: "Logitech",
    price: 100,
    stock: 12,
    category: "Ratones",
    imageUrl: "https://hca.pe/storage/media/pjoIVlXCjjOolCwNxe51yAphwBayLJBse3B27yzS.png",
    description: "Ratón inalámbrico Logitech MX Master 3, diseño ergonómico y desplazamiento MagSpeed para productividad avanzada.",
    features: [
      "Sensor de alta precisión de 4000 DPI",
      "Batería recargable con hasta 70 días de duración",
      "Conexión inalámbrica Bluetooth o USB",
      "Diseño ergonómico avanzado"
    ]
  },
  {
    id: 9,
    name: "Disco Duro Externo WD My Passport 4TB",
    brand: "Western Digital",
    price: 110,
    stock: 30,
    category: "Almacenamiento",
    imageUrl: "https://sysbol.com/1005-thickbox_default/western-digital-my-passport-de-4tb-usb-30.jpg",
    description: "Disco duro externo WD My Passport de 4TB, almacenamiento seguro y portátil para tus archivos importantes.",
    features: [
      "Capacidad de 4TB",
      "Conexión USB 3.0 para alta velocidad",
      "Compatible con Windows y Mac",
      "Software de respaldo automático incluido"
    ]
  },
  {
    id: 10,
    name: "Auriculares Sony WH-1000XM4",
    brand: "Sony",
    price: 1280,
    stock: 8,
    category: "Auriculares",
    imageUrl: "https://cdn.sony.com/image.jpg",
    description: "Auriculares Sony WH-1000XM4 con cancelación de ruido avanzada y sonido de alta calidad.",
    features: [
      "Cancelación activa de ruido líder en la industria",
      "Hasta 30 horas de duración de batería",
      "Conectividad Bluetooth 5.0",
      "Compatible con asistentes de voz"
    ]
  },
  {
    id: 11,
    name: "Impresora Multifuncional HP DeskJet 4155e",
    brand: "HP",
    price: 60,
    stock: 16,
    category: "Impresoras",
    imageUrl: "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c07118526.png",
    description: "Impresora multifuncional HP DeskJet 4155e, ideal para impresión, escaneo y copiado en casa o la oficina.",
    features: [
      "Funcionalidad de impresión, escaneo y copiado",
      "Conectividad Wi-Fi y HP Smart App",
      "Impresión a color y en blanco y negro",
      "Diseño compacto y fácil de usar"
    ]
  },
  {
    id: 12,
    name: "Altavoz Bluetooth JBL Charge 5",
    brand: "JBL",
    price: 180,
    stock: 13,
    category: "Altavoces",
    imageUrl: "https://www.jbl.com.pe/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw93fc11a6/JBL_CHARGE5_WIFI_HERO%20_LEFT_37890_x3.png",
    description: "Altavoz Bluetooth portátil JBL Charge 5, con sonido potente, resistente al agua y batería de larga duración.",
    features: [
      "Sonido JBL Pro de alta calidad",
      "Resistente al agua y al polvo (IP67)",
      "Hasta 20 horas de reproducción",
      "Función de carga para otros dispositivos"
    ]
  },
  {
    id: 13,
    name: "Laptop Dell XPS 13",
    brand: "Dell",
    price: 1200,
    stock: 10,
    category: "Laptops",
    imageUrl: "https://www.dell.com/sites/imageService.jpg",
    description: "Laptop Dell XPS 13 con pantalla de alta resolución y diseño ultraligero, ideal para trabajo y entretenimiento.",
    features: [
      "Pantalla de 13.4 pulgadas FHD+",
      "Procesador Intel Core i7 de 11ª generación",
      "16GB de RAM y 512GB SSD",
      "Lector de huellas dactilares y cámara IR"
    ]
  }
];

export default products;
