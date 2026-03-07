// ============================================================
// MAGALU CLONE - app.js v4.0
// Imagens únicas e de qualidade por produto + troca por cor
// ============================================================

const PRODUCTS = [

  // ══════════════════════════════════════════
  // SMARTPHONES
  // ══════════════════════════════════════════
  {
    id: 1, category: 'smartphones', brand: 'Apple',
    name: 'iPhone 16 128GB',
    sku: 'MLU0001', price: 4299, oldPrice: 7999, discount: 46,
    rating: 4.9, reviews: 5821,
    // Imagem padrão (Azul) + gallery
    images: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-ultramarine?wid=800&hei=800&fmt=p-jpg&qlt=95&.v=1723312958722',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-ultramarine-angled-202409?wid=800&hei=800&fmt=p-jpg&qlt=95&.v=1723312994016',
    ],
    // Cada variante tem: label, cor CSS, imagem própria
    variants: [
      { label: 'Ultramarino', color: '#4f7dc2', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-ultramarine?wid=800&hei=800&fmt=p-jpg&qlt=95&.v=1723312958722' },
      { label: 'Preto',       color: '#1d1d1f', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-black?wid=800&hei=800&fmt=p-jpg&qlt=95&.v=1723312958722' },
      { label: 'Branco',      color: '#f5f5f0', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-white?wid=800&hei=800&fmt=p-jpg&qlt=95&.v=1723312958722' },
      { label: 'Rosa',        color: '#f4b8c1', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-pink?wid=800&hei=800&fmt=p-jpg&qlt=95&.v=1723312958722' },
      { label: 'Verde',       color: '#cde8d0', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-teal?wid=800&hei=800&fmt=p-jpg&qlt=95&.v=1723312958722' },
    ],
    highlights: ['Chip A18 (3nm)', 'Câmera Fusion 48MP', 'Controle de Câmera físico', 'Tela 6,1" Super Retina XDR 60Hz', 'USB-C', 'Bateria até 22h vídeo', 'IP68 – 6m por 30min'],
    description: 'iPhone 16 com chip A18, o mais avançado já colocado num iPhone padrão. O novo Controle de Câmera permite tirar fotos e gravar vídeos com um toque intuitivo. Câmera Fusion de 48MP com zoom óptico 2x e gravação 4K Dolby Vision a 120fps.',
    specs: [['Tela','6,1" OLED 2556×1179px 460ppi'],['CPU','Apple A18 (3nm)'],['RAM','8GB'],['Armazenamento','128GB'],['Câmera','48MP Fusion + 12MP ultrawide'],['Bateria','3561mAh – 22h vídeo'],['Sistema','iOS 18'],['Proteção','IP68 – 6m/30min']],
    reviewsData: [{ user: 'Carla M.', rating: 5, date: '20/11/2024', comment: 'O Controle de Câmera é fantástico. Muito mais prático para fotos.' }, { user: 'Paulo R.', rating: 5, date: '15/11/2024', comment: 'Melhor iPhone que já tive. Bateria dura muito mais que o 14.' }]
  },

  {
    id: 2, category: 'smartphones', brand: 'Apple',
    name: 'iPhone 16 Pro Max 256GB',
    sku: 'MLU0002', price: 7299, oldPrice: 10999, discount: 34,
    rating: 4.9, reviews: 4203,
    images: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=800&hei=800&fmt=p-jpg&qlt=95&.v=1723312958722',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-deserttitanium-angled-202409?wid=800&hei=800&fmt=p-jpg&qlt=95',
    ],
    variants: [
      { label: 'Titânio Deserto', color: '#c8a882', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=800&hei=800&fmt=p-jpg&qlt=95&.v=1723312958722' },
      { label: 'Titânio Natural', color: '#e3d0be', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-naturaltitanium?wid=800&hei=800&fmt=p-jpg&qlt=95&.v=1723312958722' },
      { label: 'Titânio Branco',  color: '#f5f0eb', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-whitetitanium?wid=800&hei=800&fmt=p-jpg&qlt=95&.v=1723312958722' },
      { label: 'Titânio Preto',   color: '#3a3a3c', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-blacktitanium?wid=800&hei=800&fmt=p-jpg&qlt=95&.v=1723312958722' },
    ],
    highlights: ['Chip A18 Pro (3nm)', 'Câmera 48MP zoom óptico 5x Tetra‑prism', 'Tela ProMotion XDR 6,9" 1–120Hz', 'Controle de Câmera', 'Gravação 4K 120fps Dolby Vision', 'Botão de Ação', 'Titanium grau aeroespacial'],
    description: 'iPhone 16 Pro Max: o iPhone mais avançado de todos os tempos. Tela ProMotion 6,9", câmera com zoom 5x Tetra-prism, chip A18 Pro e novo Controle de Câmera para gravação profissional 4K 120fps Dolby Vision.',
    specs: [['Tela','6,9" ProMotion OLED 2868×1320px 1–120Hz'],['CPU','Apple A18 Pro (3nm)'],['RAM','8GB'],['Armazenamento','256GB'],['Câmera','48MP + 48MP ultrawide + 12MP 5x'],['Bateria','4685mAh – 33h vídeo'],['Sistema','iOS 18'],['Proteção','IP68 – 6m/30min']],
    reviewsData: [{ user: 'Lucas F.', rating: 5, date: '18/11/2024', comment: 'Câmera com zoom 5x é absurda. Gravei vídeos de shows com qualidade cinema.' }, { user: 'Beatriz N.', rating: 5, date: '12/11/2024', comment: 'A tela ProMotion 6,9" é a mais bonita que já vi num celular.' }]
  },

  {
    id: 3, category: 'smartphones', brand: 'Samsung',
    name: 'Samsung Galaxy S25 Ultra 256GB 5G',
    sku: 'MLU0003', price: 6499, oldPrice: 9999, discount: 35,
    rating: 4.8, reviews: 2891,
    images: [
      'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-ultra-sm-s938-sm-s938bzkcbro-thumb-544342679?$650_519_PNG$',
      'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-ultra-sm-s938-sm-s938bzkcbro-544342680?$650_519_PNG$',
    ],
    variants: [
      { label: 'Titanium Black',      color: '#2d2d2d', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-ultra-sm-s938-sm-s938bzkcbro-thumb-544342679?$650_519_PNG$' },
      { label: 'Titanium Silver Blue', color: '#8fa3b8', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-ultra-sm-s938-sm-s938bzsdbro-thumb-544342601?$650_519_PNG$' },
      { label: 'Titanium White Silver',color: '#e8e8e8', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-ultra-sm-s938-sm-s938bzsebro-thumb-544342605?$650_519_PNG$' },
      { label: 'Titanium Gray',        color: '#8a8a8a', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-ultra-sm-s938-sm-s938bzaabro-thumb-544342593?$650_519_PNG$' },
    ],
    highlights: ['Snapdragon 8 Elite for Galaxy', 'S Pen integrada com Galaxy AI', 'Câmera 200MP zoom óptico 10x', 'Dynamic AMOLED 2X 6,9" 120Hz', '12GB RAM + 256GB UFS 4.0', 'Bateria 5000mAh carga 45W', 'IP68 Armor Aluminum 2'],
    description: 'Galaxy S25 Ultra: S Pen + Galaxy AI no dispositivo mais poderoso da Samsung. Snapdragon 8 Elite, câmera 200MP com zoom 10x e Dynamic AMOLED 2X de 6,9 polegadas.',
    specs: [['Tela','6,9" Dynamic AMOLED 2X 3088×1440px 120Hz'],['CPU','Snapdragon 8 Elite (3nm)'],['RAM','12GB'],['Armazenamento','256GB UFS 4.0'],['Câmera','200MP+50MP+10MP 3x+50MP 5x'],['Bateria','5000mAh – 45W'],['Sistema','Android 15 / One UI 7'],['Proteção','IP68']],
    reviewsData: [{ user: 'Fernanda A.', rating: 5, date: '22/01/2025', comment: 'Galaxy AI melhorou muito! Resumir e traduzir on-device é incrível.' }, { user: 'Roberto C.', rating: 5, date: '18/01/2025', comment: 'S Pen com IA é um diferencial absurdo para produtividade.' }]
  },

  {
    id: 4, category: 'smartphones', brand: 'Samsung',
    name: 'Samsung Galaxy S25+ 256GB 5G',
    sku: 'MLU0004', price: 4799, oldPrice: 7499, discount: 36,
    rating: 4.8, reviews: 1876,
    images: [
      'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-sm-s936-sm-s936bzkdbro-thumb-544342411?$650_519_PNG$',
    ],
    variants: [
      { label: 'Iceberg Blue', color: '#a8c4d4', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-sm-s936-sm-s936bzbdbro-thumb-544342403?$650_519_PNG$' },
      { label: 'Mint',         color: '#b2d8c8', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-sm-s936-sm-s936bzgdbro-thumb-544342407?$650_519_PNG$' },
      { label: 'Phantom Black',color: '#1a1a1a', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-sm-s936-sm-s936bzkdbro-thumb-544342411?$650_519_PNG$' },
      { label: 'Silver Shadow', color: '#d4d4d4', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-sm-s936-sm-s936bzsdbro-thumb-544342415?$650_519_PNG$' },
    ],
    highlights: ['Snapdragon 8 Elite for Galaxy', 'Câmera tripla 50MP OIS', 'AMOLED 2X 6,7" 120Hz', '12GB RAM + 256GB', 'Bateria 4900mAh 45W', 'Carregamento sem fio 15W', 'IP68'],
    description: 'Galaxy S25+ com Snapdragon 8 Elite e câmera tripla 50MP. Display AMOLED 2X de 6,7" brilhante, fino e leve. Galaxy AI embarcada para tarefas inteligentes.',
    specs: [['Tela','6,7" AMOLED 2X 3088×1440px 120Hz'],['CPU','Snapdragon 8 Elite'],['RAM','12GB'],['Armazenamento','256GB'],['Câmera','50MP OIS + 12MP + 10MP 3x'],['Bateria','4900mAh 45W'],['Sistema','Android 15 One UI 7'],['Proteção','IP68']],
    reviewsData: [{ user: 'Thiago M.', rating: 5, date: '20/01/2025', comment: 'Design elegantíssimo e desempenho impecável. Tela linda!' }]
  },

  {
    id: 5, category: 'smartphones', brand: 'Samsung',
    name: 'Samsung Galaxy A56 5G 128GB 8GB RAM',
    sku: 'MLU0005', price: 1799, oldPrice: 2999, discount: 40,
    rating: 4.7, reviews: 3214,
    images: [
      'https://images.samsung.com/is/image/samsung/p6pim/br/sm-a566blbpzto/gallery/br-galaxy-a56-5g-sm-a566-thumb?$650_519_PNG$',
    ],
    variants: [
      { label: 'Azul',   color: '#3d7abf', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/sm-a566blbpzto/gallery/br-galaxy-a56-5g-sm-a566-thumb?$650_519_PNG$' },
      { label: 'Branco', color: '#f0f0f0', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/sm-a566bzwpzto/gallery/br-galaxy-a56-5g-sm-a566-thumb?$650_519_PNG$' },
      { label: 'Preto',  color: '#1a1a1a', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/sm-a566bzkpzto/gallery/br-galaxy-a56-5g-sm-a566-thumb?$650_519_PNG$' },
    ],
    highlights: ['Super AMOLED+ 6,7" 120Hz FHD+', 'Exynos 1580 (4nm)', 'Câmera 50MP OIS', '5G ultrarrápido', '8GB RAM + 128GB', 'Bateria 5000mAh 45W', 'IP67 Gorilla Glass Victus+'],
    description: 'Galaxy A56 5G com Exynos 1580, tela Super AMOLED+ 120Hz e câmera 50MP com OIS. O custo-benefício premium da Samsung com 5G e carregamento rápido 45W.',
    specs: [['Tela','6,7" Super AMOLED+ FHD+ 120Hz'],['CPU','Exynos 1580 (4nm)'],['RAM','8GB'],['Armazenamento','128GB'],['Câmera','50MP OIS + 12MP + 5MP'],['Bateria','5000mAh 45W'],['Sistema','Android 15 One UI 7'],['Proteção','IP67']],
    reviewsData: [{ user: 'Camila S.', rating: 5, date: '10/02/2025', comment: 'Tela linda e câmera muito boa para o preço. Custo-benefício imbatível!' }]
  },

  {
    id: 6, category: 'smartphones', brand: 'Motorola',
    name: 'Motorola Edge 50 Pro 512GB 12GB RAM 5G',
    sku: 'MLU0006', price: 1899, oldPrice: 3499, discount: 46,
    rating: 4.7, reviews: 1543,
    images: [
      'https://motorola-global-portal.custhelp.com/ci/fattach/get/1154694/0/filename/Edge%2050%20Pro_Black.jpg',
    ],
    variants: [
      { label: 'Black Beauty',    color: '#1a1a1a', img: 'https://lh3.googleusercontent.com/Jab27h3ixbJPBHMjAC4UcHcVfzxHXE_R6FnPc9j9xvnxGR2R5RxB1dpLEMJ7FBm4MRYS0cSWvPAtqBjbv2Qk=s1000' },
      { label: 'Moonlight Pearl', color: '#e8e4f0', img: 'https://lh3.googleusercontent.com/6y1V0G4IbEb3_9bSETLT2b3XxCqQpwm1x5pHhM3I-VnY2JNRhMa9x0c2v1vMGGhJq8PGY9_y1NnVABRGrpY=s1000' },
      { label: 'Luxe Lavender',   color: '#c9b8d8', img: 'https://lh3.googleusercontent.com/EGzAtXiW9hvj9k_rMqREjQTSL0VJT_e7OHIF12f8Dg6OXFJZJw3mCJpPaKLq-pSA0JH4HfnS7TrJVAB3rdE=s1000' },
    ],
    highlights: ['pOLED curva 6,7" 144Hz', 'Câmera 50MP Sony LYTIA OIS', 'Snapdragon 7 Gen 3 (4nm)', 'TurboPower 125W – 100% em 22min', '12GB RAM + 512GB', 'Alto-falante estéreo Dolby Atmos', 'IP68'],
    description: 'Motorola Edge 50 Pro: pOLED curva de 144Hz, câmera Sony LYTIA com OIS e TurboPower 125W que vai de 0 a 100% em apenas 22 minutos.',
    specs: [['Tela','6,7" pOLED curva 2712×1220px 144Hz'],['CPU','Snapdragon 7 Gen 3'],['RAM','12GB LPDDR5'],['Armazenamento','512GB'],['Câmera','50MP Sony + 13MP + 10MP 3x'],['Bateria','4500mAh TurboPower 125W'],['Sistema','Android 14'],['Proteção','IP68']],
    reviewsData: [{ user: 'Lucas P.', rating: 5, date: '14/11/2024', comment: '125W é absurdo! Carrego em 20 minutos e vou o dia todo.' }]
  },

  {
    id: 7, category: 'smartphones', brand: 'Xiaomi',
    name: 'Xiaomi 15 Ultra 512GB 16GB RAM 5G Câmera Leica',
    sku: 'MLU0007', price: 4999, oldPrice: 8999, discount: 44,
    rating: 4.9, reviews: 987,
    images: [
      'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0/pms_1739353386.01261734.png',
    ],
    variants: [
      { label: 'Titanium Black', color: '#2a2a2a', img: 'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0/pms_1739353386.01261734.png' },
      { label: 'Titanium White', color: '#f0ede8', img: 'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0/pms_1739353437.30199738.png' },
    ],
    highlights: ['Chip Snapdragon 8 Elite (3nm)', 'Leica Summilux 4 câmeras', 'Sensor Sony LYT-900 de 1 polegada', 'HyperCharge 90W + sem fio 80W', 'AMOLED 6,73" 120Hz 3200×1440px', '16GB LPDDR5X + 512GB UFS 4.0', 'Vidro Xiaomi Shield Glass 2.0'],
    description: 'Xiaomi 15 Ultra co-desenvolvido com Leica. Sensor Sony de 1 polegada, abertura variável f/1.63–f/4.0, Snapdragon 8 Elite e HyperCharge 90W que carrega 5500mAh em 35 minutos.',
    specs: [['Tela','6,73" AMOLED 3200×1440px 120Hz'],['CPU','Snapdragon 8 Elite (3nm)'],['RAM','16GB LPDDR5X'],['Armazenamento','512GB UFS 4.0'],['Câmera','50MP f/1.63 sensor 1" + 50MP + 50MP 3x + 50MP 5x'],['Bateria','5500mAh 90W + sem fio 80W'],['Sistema','Android 15 HyperOS 2'],['Proteção','IP68']],
    reviewsData: [{ user: 'Pedro A.', rating: 5, date: '25/01/2025', comment: 'A colaboração com Leica elevou demais a qualidade fotográfica. Sensor de 1" é brutal.' }]
  },

  // ══════════════════════════════════════════
  // NOTEBOOKS
  // ══════════════════════════════════════════
  {
    id: 8, category: 'notebooks', brand: 'Apple',
    name: 'MacBook Pro 14" M4 Pro 24GB 512GB SSD Preto Espacial',
    sku: 'MLU0008', price: 14999, oldPrice: 22999, discount: 35,
    rating: 4.9, reviews: 1432,
    images: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202410?wid=800&hei=800&fmt=jpeg&qlt=95&.v=1728916322613',
    ],
    variants: [
      { label: 'Preto Espacial', color: '#1d1d1f', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202410?wid=800&hei=800&fmt=jpeg&qlt=95&.v=1728916322613' },
      { label: 'Prateado',       color: '#e3e4e6', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-silver-select-202410?wid=800&hei=800&fmt=jpeg&qlt=95&.v=1728916322613' },
    ],
    highlights: ['Chip M4 Pro CPU 14 núcleos GPU 20 núcleos', '24GB memória unificada', 'SSD NVMe 512GB ultrarrápido', 'Liquid Retina XDR 14,2" 120Hz ProMotion', 'Até 24 horas de bateria', 'HDMI 2.1 + SD + 3× Thunderbolt 5', 'Thunderbolt 5 – 120Gb/s'],
    description: 'MacBook Pro 14" com chip M4 Pro de nova geração. CPU 14 núcleos, GPU 20 núcleos, até 24 horas de bateria e conectividade Thunderbolt 5 com 120Gb/s. A escolha definitiva para profissionais.',
    specs: [['Tela','14,2" Liquid Retina XDR 3024×1964px 120Hz'],['CPU','Apple M4 Pro (14 CPU / 20 GPU núcleos)'],['Memória','24GB unificada'],['Armazenamento','512GB NVMe'],['Bateria','até 24 horas'],['Portas','3× Thunderbolt 5, HDMI 2.1, SD, MagSafe 3'],['Sistema','macOS Sequoia'],['Peso','1,62kg']],
    reviewsData: [{ user: 'Carolina F.', rating: 5, date: '02/12/2024', comment: 'M4 Pro é um salto enorme. Edição de vídeo RAW 8K sem soluços.' }, { user: 'Tiago L.', rating: 5, date: '28/11/2024', comment: 'Thunderbolt 5 com eGPU voou. 24h de bateria no dia a dia confirmado.' }]
  },

  {
    id: 9, category: 'notebooks', brand: 'Dell',
    name: 'Notebook Dell XPS 16 Core Ultra 9 32GB RTX 4070 OLED 16"',
    sku: 'MLU0009', price: 12999, oldPrice: 20999, discount: 38,
    rating: 4.9, reviews: 743,
    images: [
      'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-16-9640/media-gallery/silver/notebook-xps-16-9640-silver-gallery-3.psd?fmt=pjpeg&pscan=auto&scl=1&wid=800&hei=800&qlt=100,1&resMode=sharp2&size=800,800',
    ],
    variants: [
      { label: 'Prata Platina', color: '#c8c8c8', img: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-16-9640/media-gallery/silver/notebook-xps-16-9640-silver-gallery-3.psd?fmt=pjpeg&pscan=auto&scl=1&wid=800&hei=800&qlt=100,1&resMode=sharp2&size=800,800' },
    ],
    highlights: ['Intel Core Ultra 9 185H 16 núcleos', 'NVIDIA GeForce RTX 4070 8GB', '32GB LPDDR5x 6400MHz', 'SSD 1TB PCIe Gen 4', 'Tela OLED 4K+ 16" 120Hz 100% DCI-P3', 'Bateria 99,5Wh carga 130W', 'Peso 1,96kg'],
    description: 'Dell XPS 16 com tela OLED 4K+ 16" e 100% DCI-P3. Intel Core Ultra 9 + RTX 4070 para renderização 3D, edição 4K e AI workloads com Intel AI Boost.',
    specs: [['Tela','16" OLED 3840×2400px 120Hz 100% DCI-P3'],['CPU','Intel Core Ultra 9 185H (16 núcleos)'],['RAM','32GB LPDDR5x 6400MHz'],['Armazenamento','1TB NVMe PCIe Gen 4'],['GPU','RTX 4070 8GB GDDR6'],['Bateria','99,5Wh – carga 130W USB-C'],['Sistema','Windows 11 Home'],['Peso','1,96kg']],
    reviewsData: [{ user: 'André S.', rating: 5, date: '10/12/2024', comment: 'OLED 4K é uma obra de arte. Trabalho com Motion Design e nunca vi cores tão precisas.' }]
  },

  {
    id: 10, category: 'notebooks', brand: 'Samsung',
    name: 'Samsung Galaxy Book5 Pro 14" Intel Ultra 7 16GB OLED Preto',
    sku: 'MLU0010', price: 8999, oldPrice: 13999, discount: 36,
    rating: 4.8, reviews: 621,
    images: [
      'https://images.samsung.com/is/image/samsung/p6pim/br/np940xma-kb1br/gallery/br-galaxy-book5-pro-np940xma-np940xma-kb1br-thumb?$650_519_PNG$',
    ],
    variants: [
      { label: 'Moonstone Gray', color: '#5a5a5a', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/np940xma-kb1br/gallery/br-galaxy-book5-pro-np940xma-np940xma-kb1br-thumb?$650_519_PNG$' },
      { label: 'Platinum Silver', color: '#c8c8c8', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/np940xma-ks1br/gallery/br-galaxy-book5-pro-np940xma-np940xma-ks1br-thumb?$650_519_PNG$' },
    ],
    highlights: ['Intel Core Ultra 7 258V (4nm)', '16GB LPDDR5x', 'AMOLED 2K 14" 120Hz', 'SSD 512GB NVMe PCIe Gen 4', 'Até 25h de bateria', 'Galaxy AI com Copilot+', 'Peso 1,23kg ultraslim'],
    description: 'Samsung Galaxy Book5 Pro: o notebook mais leve e fino da linha com tela AMOLED 2K 120Hz. Intel Core Ultra 7 com NPU para Galaxy AI e Copilot+. Autonomia de até 25 horas.',
    specs: [['Tela','14" AMOLED 2880×1800px 120Hz'],['CPU','Intel Core Ultra 7 258V (4nm)'],['RAM','16GB LPDDR5x'],['Armazenamento','512GB NVMe Gen 4'],['Bateria','até 25 horas'],['Conectividade','Wi-Fi 6E, BT 5.3, TB4×2, USB-C, HDMI'],['Sistema','Windows 11 Home'],['Peso','1,23kg']],
    reviewsData: [{ user: 'Patricia M.', rating: 5, date: '15/01/2025', comment: '1,23kg e bateria que dura o dia todo. AMOLED 120Hz linda. Melhor ultrabook.' }]
  },

  // ══════════════════════════════════════════
  // SMART TVs
  // ══════════════════════════════════════════
  {
    id: 11, category: 'tvs', brand: 'LG',
    name: 'Smart TV LG OLED evo C4 65" 4K 120Hz Dolby Vision webOS 24',
    sku: 'MLU0011', price: 5499, oldPrice: 9999, discount: 45,
    rating: 4.9, reviews: 2876,
    images: [
      'https://www.lg.com/br/images/tvs/md08007749/gallery/medium01.jpg',
    ],
    variants: [
      { label: '55"', color: '#444', img: 'https://www.lg.com/br/images/tvs/md08007749/gallery/medium01.jpg' },
      { label: '65"', color: '#444', img: 'https://www.lg.com/br/images/tvs/md08007749/gallery/medium01.jpg' },
      { label: '77"', color: '#444', img: 'https://www.lg.com/br/images/tvs/md08007749/gallery/medium01.jpg' },
      { label: '83"', color: '#444', img: 'https://www.lg.com/br/images/tvs/md08007749/gallery/medium01.jpg' },
    ],
    highlights: ['Painel OLED evo – preto absoluto', 'Processador α9 Gen7 AI', 'Dolby Vision IQ + Dolby Atmos', '120Hz NVIDIA G-Sync', '4× HDMI 2.1 (48Gbps)', 'webOS 24 ThinQ AI', 'Input lag 1ms modo gamer'],
    description: 'LG OLED evo C4: o melhor OLED do mercado com o novo processador α9 Gen7 AI. Imagem perfeita para filmes, jogos e esportes. 4× HDMI 2.1 e 1ms para PS5 e Xbox Series X.',
    specs: [['Tamanho','65 pol.'],['Resolução','4K 3840×2160px'],['Painel','OLED evo'],['Taxa','120Hz G-Sync + FreeSync'],['HDR','Dolby Vision IQ, HDR10, HLG'],['Áudio','60W Dolby Atmos DTS:X'],['Smart TV','webOS 24, ThinQ AI, AirPlay 2, HomeKit'],['HDMI','4× HDMI 2.1 48Gbps']],
    reviewsData: [{ user: 'Marcos V.', rating: 5, date: '05/11/2024', comment: 'PS5 no OLED C4 é outro nível. Preto absoluto + 120Hz = transcendental.' }, { user: 'Silvia T.', rating: 5, date: '01/11/2024', comment: 'Melhor TV que já vi. Cada detalhe em filmes HDR é impressionante.' }]
  },

  {
    id: 12, category: 'tvs', brand: 'Samsung',
    name: 'Smart TV Samsung OLED S90D 65" 4K 144Hz Neural Quantum',
    sku: 'MLU0012', price: 6999, oldPrice: 11999, discount: 42,
    rating: 4.8, reviews: 1243,
    images: [
      'https://images.samsung.com/is/image/samsung/p6pim/br/qe65s90daexzd/gallery/br-oled-s90d-qe65s90daexzd-thumb-539897046?$650_519_PNG$',
    ],
    variants: [
      { label: '55"', color: '#333', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/qe65s90daexzd/gallery/br-oled-s90d-qe65s90daexzd-thumb-539897046?$650_519_PNG$' },
      { label: '65"', color: '#333', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/qe65s90daexzd/gallery/br-oled-s90d-qe65s90daexzd-thumb-539897046?$650_519_PNG$' },
      { label: '77"', color: '#333', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/qe65s90daexzd/gallery/br-oled-s90d-qe65s90daexzd-thumb-539897046?$650_519_PNG$' },
    ],
    highlights: ['Painel OLED Samsung QD-OLED', 'Neural Quantum Processor 4K', '144Hz ultrasuave', 'Tela One Design sem bordas visíveis', 'HDR10+, Dolby Vision', 'Gaming Hub integrado', '4× HDMI 2.1'],
    description: 'Samsung OLED S90D com QD-OLED: combina os pontos quânticos Samsung com a auto-iluminação OLED para cores mais vivas e brilho mais alto que OLEDs tradicionais. 144Hz para gaming impecável.',
    specs: [['Tamanho','65 pol.'],['Resolução','4K 3840×2160px'],['Painel','QD-OLED'],['Taxa','144Hz VRR'],['HDR','HDR10+, Dolby Vision, HLG'],['Áudio','60W OTS+'],['Smart TV','Tizen OS, Gaming Hub, Bixby, Alexa'],['HDMI','4× HDMI 2.1']],
    reviewsData: [{ user: 'Eduardo B.', rating: 5, date: '18/11/2024', comment: 'QD-OLED é a melhor tecnologia de TV. Cores mais vivas que OLED convencional!' }]
  },

  // ══════════════════════════════════════════
  // GAMES
  // ══════════════════════════════════════════
  {
    id: 13, category: 'games', brand: 'Sony',
    name: 'PlayStation 5 Pro Console 2TB SSD + Controle DualSense Branco',
    sku: 'MLU0013', price: 4999, oldPrice: 7499, discount: 33,
    rating: 4.9, reviews: 3892,
    images: [
      'https://gmedia.playstation.com/is/image/SIEPDC/ps5-pro-product-thumbnail-01-en-14oct24?$facebook$',
    ],
    variants: [
      { label: 'Branco', color: '#f0f0f0', img: 'https://gmedia.playstation.com/is/image/SIEPDC/ps5-pro-product-thumbnail-01-en-14oct24?$facebook$' },
    ],
    highlights: ['GPU 67% mais rápida que PS5 original', 'SSD 2TB ultrarrápido', 'PlayStation Spectral Super Resolution (PSSR)', 'Ray Tracing aprimorado', 'Wi-Fi 7', 'DualSense feedback tátil + gatilhos adaptativos', 'Retrocompatível com PS4'],
    description: 'PlayStation 5 Pro: a versão definitiva do PS5 com GPU 67% mais rápida, PSSR para upscaling por IA e SSD 2TB. Ray tracing aprimorado e Wi-Fi 7 para gaming sem compromisso.',
    specs: [['CPU','AMD Zen 2 8 núcleos 3,85GHz'],['GPU','AMD RDNA (45 CUs) – 67% mais rápida'],['RAM','16GB GDDR6'],['Armazenamento','SSD NVMe 2TB'],['Resolução','8K / 4K 60/120fps'],['Wi-Fi','Wi-Fi 7 (802.11be)'],['Dimensões','358×80×216mm']],
    reviewsData: [{ user: 'Felipe G.', rating: 5, date: '15/11/2024', comment: 'PSSR upscaling é impressionante. Spider-Man 2 em modo Fidelidade + 60fps é inacreditável!' }, { user: 'Juliana K.', rating: 5, date: '10/11/2024', comment: 'GPU 67% mais rápida é perceptível em todos os jogos. Compra que não me arrependo.' }]
  },

  {
    id: 14, category: 'games', brand: 'Microsoft',
    name: 'Xbox Series X Console 1TB SSD 4K 120fps + Game Pass 3 meses',
    sku: 'MLU0014', price: 2999, oldPrice: 4999, discount: 40,
    rating: 4.8, reviews: 2671,
    images: [
      'https://news.xbox.com/en-us/wp-content/uploads/sites/2/2020/12/XboxSeriesX_Consolealone.png',
    ],
    variants: [
      { label: 'Preto', color: '#1a1a1a', img: 'https://news.xbox.com/en-us/wp-content/uploads/sites/2/2020/12/XboxSeriesX_Consolealone.png' },
    ],
    highlights: ['12 teraflops – console mais potente já criado', 'SSD NVMe 1TB Xbox Velocity', 'Quick Resume múltiplos jogos', 'Retrocompatível com 4 gerações Xbox', 'Auto HDR + FPS Boost automáticos', 'Game Pass Ultimate 3 meses incluso', 'HDMI 2.1 120fps 4K'],
    description: 'Xbox Series X com Game Pass Ultimate 3 meses incluso. 12 teraflops, Quick Resume, 4K 120fps e biblioteca de milhares de jogos com melhorias automáticas de HDR e framerate.',
    specs: [['CPU','AMD Zen 2 8 núcleos 3,8GHz'],['GPU','AMD RDNA 2 – 12 TF'],['RAM','16GB GDDR6'],['Armazenamento','SSD NVMe 1TB expansível'],['Resolução','até 8K upscaling / 120fps'],['Mídia','UHD Blu-ray 4K'],['Conectividade','HDMI 2.1, USB×3, Wi-Fi 6, BT 5.0']],
    reviewsData: [{ user: 'Rodrigo C.', rating: 5, date: '20/11/2024', comment: 'Quick Resume é funcionalidade que não vivo sem. Game Pass é custo-benefício absurdo.' }]
  },

  {
    id: 15, category: 'games', brand: 'Nintendo',
    name: 'Nintendo Switch 2 Edição Standard + Controles Joy-Con 2',
    sku: 'MLU0015', price: 2799, oldPrice: 3999, discount: 30,
    rating: 4.9, reviews: 4231,
    images: [
      'https://assets.nintendo.com/image/upload/c_fill,f_auto,q_auto,w_1200/ncom/en_US/switch-2/switch-2-hardware-images/switch-2-dock-joycon2-white-hero',
    ],
    variants: [
      { label: 'Branco', color: '#f5f5f5', img: 'https://assets.nintendo.com/image/upload/c_fill,f_auto,q_auto,w_800/ncom/en_US/switch-2/switch-2-hardware-images/switch-2-dock-joycon2-white-hero' },
      { label: 'Preto',  color: '#1a1a1a', img: 'https://assets.nintendo.com/image/upload/c_fill,f_auto,q_auto,w_800/ncom/en_US/switch-2/switch-2-hardware-images/switch-2-dock-joycon2-black-hero' },
    ],
    highlights: ['Tela LCD 7,9" 1080p portátil', 'Saída 4K na TV via HDMI 2.0', 'Joy-Con 2 com botão C (mouse)', 'GameChat integrado para chat de voz', 'Retrocompat. com maioria dos jogos Switch', 'Mais potente que Switch original', 'Dock incluído com porta USB-C'],
    description: 'Nintendo Switch 2: maior, mais potente e com novos Joy-Con 2 que funcionam como mouse na superfície. Tela 1080p portátil, 4K na TV e retrocompatibilidade com maioria dos jogos Switch.',
    specs: [['Tela','7,9" LCD 1920×1080px portátil'],['Saída TV','4K via HDMI 2.0'],['Armazenamento','256GB + microSDXC'],['Joy-Con 2','novo botão C + funciona como mouse'],['Conectividade','Wi-Fi 6, Bluetooth 5.0, USB-C'],['Peso','approx. 400g sem Joy-Con']],
    reviewsData: [{ user: 'Sofia B.', rating: 5, date: '10/04/2025', comment: 'Joy-Con 2 como mouse é genial. Mario Kart World é incrível em 4K!' }]
  },

  // ══════════════════════════════════════════
  // ÁUDIO
  // ══════════════════════════════════════════
  {
    id: 16, category: 'audio', brand: 'Sony',
    name: 'Fone Sony WH-1000XM5 Bluetooth ANC 30h Hi-Res Audio',
    sku: 'MLU0016', price: 1399, oldPrice: 2499, discount: 44,
    rating: 4.9, reviews: 5312,
    images: [
      'https://www.sony.com.br/image/5d02da5df552836db894cead8a68f056?fmt=pjpeg&wid=800&bgcolor=FFFFFF',
    ],
    variants: [
      { label: 'Preto',  color: '#1a1a1a', img: 'https://www.sony.com.br/image/5d02da5df552836db894cead8a68f056?fmt=pjpeg&wid=800&bgcolor=FFFFFF' },
      { label: 'Prata',  color: '#c8c8c8', img: 'https://www.sony.com.br/image/eb348a23cd6b0f557aabc76e5a47ec3d?fmt=pjpeg&wid=800&bgcolor=FFFFFF' },
    ],
    highlights: ['Melhor ANC do mercado – 8 microfones', '2 processadores V1 + QN1', 'Drivers 30mm exclusivos',  '30h bateria com ANC', 'Carga rápida: 3min = 3h', 'LDAC hi-res 990kbps', 'Speak-to-Chat, Multi-point'],
    description: 'Sony WH-1000XM5: 5 anos consecutivo como melhor fone ANC do mundo. 8 microfones e dois processadores V1 + QN1 para silêncio total. LDAC transmite áudio hi-res 3× mais detalhado.',
    specs: [['Driver','30mm circular'],['Frequência','4Hz – 40kHz'],['ANC','8 microfones + processadores V1+QN1'],['Bateria','30h ANC / 40h sem ANC'],['Carga','USB-C 3min=3h'],['Codecs','LDAC, AAC, SBC'],['Bluetooth','5.2 Multi-point'],['Peso','250g']],
    reviewsData: [{ user: 'Amanda V.', rating: 5, date: '14/11/2024', comment: 'Em voos internacionais o ANC cancela o motor completamente. Magnífico.' }, { user: 'Henrique D.', rating: 5, date: '07/11/2024', comment: 'Trabalho em home office com filhos. Coloco o fone e entro em outro mundo.' }]
  },

  {
    id: 17, category: 'audio', brand: 'Apple',
    name: 'AirPods Pro 2ª Geração USB-C ANC Áudio Espacial 30h',
    sku: 'MLU0017', price: 1699, oldPrice: 2999, discount: 43,
    rating: 4.9, reviews: 8234,
    images: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MXK73?wid=800&hei=800&fmt=jpeg&qlt=95&.v=1724911735726',
    ],
    variants: [
      { label: 'Branco (USB-C)', color: '#f5f5f0', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MXK73?wid=800&hei=800&fmt=jpeg&qlt=95&.v=1724911735726' },
    ],
    highlights: ['Chip H2 – ANC 2× mais potente', 'Modo Transparência Adaptativa', 'Áudio Espacial Personalizado', '30h total com case USB-C', 'IPX4 fone + IPX4 case', 'Volume adaptativo automático', 'Encontrar de precisão com iPhone'],
    description: 'AirPods Pro 2ª Geração com chip H2 e case USB-C. ANC duas vezes mais potente, Modo Transparência Adaptativa, Áudio Espacial Personalizado e 30h de autonomia total.',
    specs: [['Chip','Apple H2'],['Bateria','6h (fone) + 24h (case) = 30h'],['Resistência','IPX4 fone + IPX4 case'],['Conectividade','Bluetooth 5.3'],['Case','USB-C + MagSafe + Apple Watch'],['Peso','5,3g/fone + 50,3g case']],
    reviewsData: [{ user: 'Tatiana R.', rating: 5, date: '21/11/2024', comment: 'Melhor TWS que já tive de qualquer marca. ANC fenomenal.' }, { user: 'Gustavo P.', rating: 5, date: '14/11/2024', comment: 'Transparência Adaptativa é mágica. Parece que não tem nada no ouvido.' }]
  },

  // ══════════════════════════════════════════
  // WEARABLES
  // ══════════════════════════════════════════
  {
    id: 18, category: 'wearables', brand: 'Apple',
    name: 'Apple Watch Series 10 GPS 46mm Alumínio Jet Black',
    sku: 'MLU0018', price: 3499, oldPrice: 5499, discount: 36,
    rating: 4.9, reviews: 3421,
    images: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s10-case-unselect-gallery-2-202409?wid=800&hei=800&fmt=jpeg&qlt=95&.v=1724162916755',
    ],
    variants: [
      { label: 'Jet Black 46mm', color: '#1d1d1f', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s10-case-unselect-gallery-2-202409?wid=800&hei=800&fmt=jpeg&qlt=95&.v=1724162916755' },
      { label: 'Rose Gold 46mm', color: '#d4a090', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s10-rosegold-unselect-gallery-2-202409?wid=800&hei=800&fmt=jpeg&qlt=95&.v=1724162916755' },
      { label: 'Silver 42mm',    color: '#e3e4e6', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s10-silver-unselect-gallery-2-202409?wid=800&hei=800&fmt=jpeg&qlt=95&.v=1724162916755' },
    ],
    highlights: ['Design mais fino de todos os tempos (9,7mm)', 'Chip S10 mais rápido', 'Tela Super Retina XDR maior', 'Treino de mergulho + apneia', 'ECG + SpO2 + temperatura', 'Detecção acidente e queda', 'Carregamento rápido USB-C'],
    description: 'Apple Watch Series 10: o mais fino de todos, 9,7mm de espessura. Tela maior, chip S10 mais rápido, novo recurso de mergulho com rastreamento de apneia e algoritmo atualizado de detecção de sono.',
    specs: [['Tamanho','46mm'],['Chip','S10 SiP'],['Espessura','9,7mm – mais fino'],['Tela','LTPO OLED Always-On mais brilhante'],['GPS','L1+L5 Dual-band'],['Sensores','ECG, SpO2, Temperatura, Profundidade'],['Bateria','18h / 36h Low Power'],['Resistência','WR50 + certificação de mergulho']],
    reviewsData: [{ user: 'Isabela F.', rating: 5, date: '28/10/2024', comment: 'Mais fino e mais bonito. Rastreamento de mergulho é perfeito para minhas aulas.' }]
  },

  {
    id: 19, category: 'wearables', brand: 'Samsung',
    name: 'Galaxy Watch Ultra 47mm 4G LTE Titanium White',
    sku: 'MLU0019', price: 2999, oldPrice: 5499, discount: 45,
    rating: 4.8, reviews: 1432,
    images: [
      'https://images.samsung.com/is/image/samsung/p6pim/br/sm-l705fzmazto/gallery/br-galaxy-watch-ultra-sm-l705-sm-l705fzmazto-thumb-541209088?$650_519_PNG$',
    ],
    variants: [
      { label: 'Titanium White',  color: '#e8e8e6', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/sm-l705fzmazto/gallery/br-galaxy-watch-ultra-sm-l705-sm-l705fzmazto-thumb-541209088?$650_519_PNG$' },
      { label: 'Titanium Black',  color: '#2a2a2a', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/sm-l705fzkszto/gallery/br-galaxy-watch-ultra-sm-l705-sm-l705fzkszto-thumb-541209080?$650_519_PNG$' },
      { label: 'Titanium Silver', color: '#c8c8c8', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/sm-l705fzsszto/gallery/br-galaxy-watch-ultra-sm-l705-sm-l705fzsszto-thumb-541209084?$650_519_PNG$' },
    ],
    highlights: ['Estrutura Titanium ultrarresistente', 'Tela Super AMOLED 1,5" 480nits pico 3000nits', 'Monitoramento de mergulho até 100m', 'ECG + pressão arterial + SpO2', 'Bateria 590mAh até 60h modo longa duração', '4G LTE independente do celular', 'MIL-STD-810U resistência extrema'],
    description: 'Galaxy Watch Ultra: o relógio de desempenho máximo da Samsung. Estrutura em Titanium, monitoramento de mergulho até 100m, bateria de 60h e 4G LTE independente. Pico de brilho de 3000nits legível em qualquer luz.',
    specs: [['Tamanho','47mm'],['Material','Titanium Grade 4'],['Tela','Super AMOLED 1,5" 480×480px 3000nits'],['Bateria','590mAh – até 60h'],['Resistência','10ATM + MIL-STD-810U'],['Conectividade','4G LTE, Wi-Fi 5, BT 5.3, NFC'],['Armazenamento','32GB'],['Sistema','Wear OS + One UI Watch 6']],
    reviewsData: [{ user: 'Carlos B.', rating: 5, date: '20/07/2024', comment: 'O Galaxy Watch Ultra é o melhor relógio que já usei. Titanium, 4G, mergulho. Perfeito.' }]
  },

  // ══════════════════════════════════════════
  // ELETROS
  // ══════════════════════════════════════════
  {
    id: 20, category: 'eletros', brand: 'Samsung',
    name: 'Geladeira Samsung French Door 460L Inox SpaceMax A+++',
    sku: 'MLU0020', price: 4299, oldPrice: 7999, discount: 46,
    rating: 4.7, reviews: 1243,
    images: [
      'https://images.samsung.com/is/image/samsung/p6pim/br/rf44a5202s9-bz/gallery/br-rf44a5202s9-bz-front-open?$650_519_PNG$',
    ],
    variants: [
      { label: 'Inox',   color: '#b0b0b0', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/rf44a5202s9-bz/gallery/br-rf44a5202s9-bz-front-open?$650_519_PNG$' },
      { label: 'Branca', color: '#f5f5f5', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/rf44a5202ww-bz/gallery/br-rf44a5202ww-bz-front?$650_519_PNG$' },
    ],
    highlights: ['460L capacidade total', 'SpaceMax – parede fina mais espaço', 'Digital Inverter – 10 anos garantia', 'All-Around Cooling uniforme', 'Gaveta FlexZone 4 temperaturas', 'Frost Free total', 'Classe A+++'],
    description: 'Samsung French Door 460L com SpaceMax e Digital Inverter. Isolamento de parede fina para mais espaço interno, resfriamento uniforme All-Around e gaveta FlexZone com 4 configurações de temperatura.',
    specs: [['Capacidade','460L (296L + 164L)'],['Compressor','Digital Inverter (10 anos garantia)'],['Classe Energética','A+++ – 391kWh/ano'],['Tipo','French Door + FlexZone'],['Dimensões','178×91×71cm'],['Tensão','Bivolt automático'],['Garantia','1 ano fabricante + 10 anos compressor']],
    reviewsData: [{ user: 'Lúcia R.', rating: 5, date: '10/11/2024', comment: 'Espaçosa, silenciosíssima e temperatura uniforme em todos os compartimentos!' }]
  },

  {
    id: 21, category: 'eletros', brand: 'Philips',
    name: 'Aspirador Robô Philips HomeRun 7000 3000Pa Wi-Fi + Estação Auto-Esvaziamento',
    sku: 'MLU0021', price: 2499, oldPrice: 4999, discount: 50,
    rating: 4.7, reviews: 987,
    images: [
      'https://www.philips.com.br/c-dam/b2c/consumer/domestic-appliances/robot-vacuum/homerun-3000/PSG/XU3110_01_PS_Global-001.jpg',
    ],
    variants: [
      { label: 'Preto', color: '#1a1a1a', img: 'https://www.philips.com.br/c-dam/b2c/consumer/domestic-appliances/robot-vacuum/homerun-3000/PSG/XU3110_01_PS_Global-001.jpg' },
    ],
    highlights: ['Mapeamento IA por câmera visual', 'Sucção 3000Pa ultra-potente', 'Estação auto-esvaziamento 60 dias', 'Mopa integrada – aspira + lava', 'Autonomia 120min por ciclo', 'App + Alexa + Google Home', 'Filtro HEPA 99,97% alérgenos'],
    description: 'Philips HomeRun 7000 com estação de auto-esvaziamento: 60 dias sem precisar esvaziar. IA por câmera visual, sucção 3000Pa, mopa integrada e autonomia de 120 minutos.',
    specs: [['Sucção','3000Pa'],['Mapeamento','Câmera visual com IA'],['Autonomia','120 minutos'],['Reservatório','500ml pó / 200ml água'],['Estação','auto-esvaziamento 60 dias'],['Filtro','HEPA 99,97%'],['Conectividade','Wi-Fi + Alexa + Google Home']],
    reviewsData: [{ user: 'Sandra B.', rating: 5, date: '05/11/2024', comment: 'Nunca mais passo aspirador! Mopa molhada funciona muito bem no piso.' }]
  },

  // ══════════════════════════════════════════
  // CÂMERAS
  // ══════════════════════════════════════════
  {
    id: 22, category: 'cameras', brand: 'Sony',
    name: 'Câmera Sony Alpha ZV-E10 II APS-C 26MP Vlog 4K 120fps',
    sku: 'MLU0022', price: 3499, oldPrice: 5999, discount: 42,
    rating: 4.8, reviews: 1243,
    images: [
      'https://www.sony.com.br/image/6b1f88a0c74e2c4c9ce12c76c9f33a08?fmt=pjpeg&wid=800&bgcolor=FFFFFF',
    ],
    variants: [
      { label: 'Preta', color: '#1a1a1a', img: 'https://www.sony.com.br/image/6b1f88a0c74e2c4c9ce12c76c9f33a08?fmt=pjpeg&wid=800&bgcolor=FFFFFF' },
      { label: 'Branca', color: '#f0f0f0', img: 'https://www.sony.com.br/image/a8a74d5e0c6f9a8b3d2e1f4c7b0a5d3e?fmt=pjpeg&wid=800&bgcolor=FFFFFF' },
    ],
    highlights: ['Sensor APS-C Exmor R 26.1MP backlit', '4K 60fps / 4K 120fps super-slow', 'Eye AF em tempo real (humanos + animais)', 'Vídeo vertical nativo para Reels/TikTok', 'Microfone 3 cápsulas direcional', 'Tela touch articulada 3"', 'Compatível todas as lentes Sony E-mount'],
    description: 'Sony ZV-E10 II: a câmera vlog de segunda geração com sensor BSI 26MP, 4K 120fps para slow motion e modo vídeo vertical nativo. AF em tempo real para olhos humanos e animais.',
    specs: [['Sensor','APS-C Exmor R BSI 26.1MP'],['Vídeo','4K 60fps / 4K 120fps / 1080p 240fps'],['AF','Eye AF Tempo Real – humanos + animais'],['Microfone','3 cápsulas + entrada P2'],['Tela','3" touch articulada'],['ISO','100–51200'],['Bateria','NP-FW50 – 340 disparos'],['Peso','291g (corpo)']],
    reviewsData: [{ user: 'Bruna F.', rating: 5, date: '20/12/2024', comment: '4K 120fps é absurdo para slow motion. O modo vertical nativo é um diferencial enorme para criadores.' }]
  },
];

// ══════════════════════════════════════════
// CART
// ══════════════════════════════════════════
let cart = JSON.parse(localStorage.getItem('magaluCart') || '[]');
function saveCart() { localStorage.setItem('magaluCart', JSON.stringify(cart)); }

function addToCart(name, price, img) {
  const ex = cart.find(i => i.name === name);
  if (ex) ex.qty++;
  else cart.push({ name, price, qty: 1, img: img || '' });
  saveCart(); updateCartBadge(); renderCart(); openCart();
}
function removeFromCart(name) {
  cart = cart.filter(i => i.name !== name);
  saveCart(); updateCartBadge(); renderCart();
}
function changeQty(name, delta) {
  const item = cart.find(i => i.name === name);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) removeFromCart(name);
    else { saveCart(); renderCart(); updateCartBadge(); }
  }
}
function updateCartBadge() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('#cartBadge').forEach(b => {
    b.textContent = total;
    b.style.display = total > 0 ? 'flex' : 'none';
  });
}
function openCart()  { document.getElementById('cartSidebar')?.classList.add('open');    document.getElementById('cartOverlay')?.classList.add('open'); }
function closeCart() { document.getElementById('cartSidebar')?.classList.remove('open'); document.getElementById('cartOverlay')?.classList.remove('open'); }

function renderCart() {
  const el = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  if (!el) return;
  if (!cart.length) {
    el.innerHTML = '<div class="cart-empty">🛒<p>Seu carrinho está vazio</p><a href="index.html">Continuar comprando</a></div>';
    footer.innerHTML = ''; return;
  }
  el.innerHTML = cart.map(item => `
    <div class="cart-item">
      ${item.img ? `<img src="${item.img}" style="width:52px;height:52px;object-fit:contain;border-radius:6px;background:#f5f5f5;flex-shrink:0">` : ''}
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}</div>
        <div class="cart-item-qty">
          <button onclick="changeQty('${item.name.replace(/'/g,"\\'")}', -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty('${item.name.replace(/'/g,"\\'")}', 1)">+</button>
          <button class="cart-remove" onclick="removeFromCart('${item.name.replace(/'/g,"\\'")}')">🗑</button>
        </div>
      </div>
    </div>`).join('');
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  footer.innerHTML = `
    <div class="cart-total-row"><span>Subtotal:</span><strong>R$ ${total.toFixed(2).replace('.', ',')}</strong></div>
    <div class="cart-total-row pix"><span>💚 No Pix (-5%):</span><strong>R$ ${(total * 0.95).toFixed(2).replace('.', ',')}</strong></div>
    <button class="btn-checkout" onclick="alert('✅ Compra realizada!\\nObrigado por comprar no Magalu!')">Finalizar Compra</button>`;
}

// ══════════════════════════════════════════
// RENDER PRODUCTS — com seletor de cor + troca de imagem
// ══════════════════════════════════════════
function renderProducts(list) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  grid.innerHTML = list.map(p => {
    const isColorVariant = p.variants && p.variants[0] && p.variants[0].color;
    const variantHTML = isColorVariant
      ? `<div class="color-variants" id="cv-${p.id}">
          ${p.variants.map((v, i) => `
            <button
              class="color-dot ${i === 0 ? 'active' : ''}"
              title="${v.label}"
              style="background:${v.color};${v.color === '#f5f5f0' || v.color === '#e3e4e6' || v.color === '#f0f0f0' || v.color === '#e8e8e8' || v.color === '#f0ede8' ? 'border:2px solid #ccc;' : 'border:2px solid transparent;'}"
              onclick="event.stopPropagation();selectVariant(${p.id},${i},'${v.img.replace(/'/g,"\\'")}','${v.label}')">
            </button>`).join('')}
         </div>`
      : '';

    return `
      <div class="product-card" id="card-${p.id}" onclick="window.location.href='produto.html?id=${p.id}'">
        <div class="product-badge">-${p.discount}%</div>
        <button class="product-fav" onclick="event.stopPropagation();this.classList.toggle('active');this.textContent=this.classList.contains('active')?'♥':'♡'">♡</button>
        <div class="product-img-wrap">
          <img
            id="pimg-${p.id}"
            src="${p.images[0]}"
            alt="${p.name}"
            loading="lazy"
            onerror="this.onerror=null;this.src='https://placehold.co/300x300/f5f5f5/999?text=${encodeURIComponent(p.brand)}'">
        </div>
        <div class="product-info">
          <div class="product-brand">${p.brand}</div>
          <div class="product-name" id="pname-${p.id}">${p.name}</div>
          ${variantHTML}
          <div class="product-stars">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5-Math.floor(p.rating))} <span>(${p.reviews.toLocaleString()})</span></div>
          <div class="product-price-old">De: R$ ${p.oldPrice.toFixed(2).replace('.', ',')}</div>
          <div class="product-price">R$ ${p.price.toFixed(2).replace('.', ',')}</div>
          <div class="product-installment">12x R$ ${(p.price/12).toFixed(2).replace('.', ',')} s/juros</div>
          <div class="product-pix">💚 R$ ${(p.price*0.95).toFixed(2).replace('.', ',')} no Pix</div>
          <button class="product-buy" id="pbuy-${p.id}"
            onclick="event.stopPropagation();
              addToCart('${p.name.replace(/'/g,"\\'")}',${p.price},document.getElementById('pimg-${p.id}').src);
              this.textContent='✓ Adicionado';
              this.style.background='#27ae60';
              setTimeout(()=>{this.textContent='Comprar';this.style.background=''},1600)">
            Comprar
          </button>
        </div>
      </div>`;
  }).join('');
}

// Troca de imagem ao selecionar cor
function selectVariant(productId, variantIndex, imgUrl, label) {
  // Troca a imagem principal do card
  const imgEl = document.getElementById(`pimg-${productId}`);
  if (imgEl) {
    imgEl.style.opacity = '0';
    imgEl.style.transition = 'opacity 0.2s';
    setTimeout(() => {
      imgEl.src = imgUrl;
      imgEl.style.opacity = '1';
    }, 150);
  }
  // Atualiza o nome para mostrar a cor selecionada
  const nameEl = document.getElementById(`pname-${productId}`);
  if (nameEl) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (product) {
      const baseName = product.name;
      nameEl.textContent = `${baseName} – ${label}`;
    }
  }
  // Marca o dot ativo
  const container = document.getElementById(`cv-${productId}`);
  if (container) {
    container.querySelectorAll('.color-dot').forEach((d, i) => {
      d.classList.toggle('active', i === variantIndex);
    });
  }
}

// ══════════════════════════════════════════
// FILTER / SEARCH
// ══════════════════════════════════════════
function filterCategory(cat) {
  const list = cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === cat);
  renderProducts(list.length ? list : PRODUCTS);
  setTimeout(() => document.getElementById('productsGrid')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
}

function doSearch() {
  const q = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
  if (!q) return renderProducts(PRODUCTS);
  const res = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  );
  renderProducts(res.length ? res : PRODUCTS);
  setTimeout(() => document.getElementById('productsGrid')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
}

// ══════════════════════════════════════════
// HERO CAROUSEL
// ══════════════════════════════════════════
let slideIdx = 0;
const SLIDE_COUNT = 4;
function changeSlide(dir) { goSlide((slideIdx + dir + SLIDE_COUNT) % SLIDE_COUNT); }
function goSlide(n) {
  slideIdx = n;
  const s = document.getElementById('heroSlides');
  if (s) s.style.transform = `translateX(-${slideIdx * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === slideIdx));
}

// ══════════════════════════════════════════
// COUNTDOWN
// ══════════════════════════════════════════
function startCountdown() {
  let end = parseInt(localStorage.getItem('cdEnd') || '0');
  if (!end || end < Date.now()) { end = Date.now() + 6 * 3600 * 1000; localStorage.setItem('cdEnd', end); }
  setInterval(() => {
    const diff = Math.max(0, end - Date.now());
    const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    const el = document.getElementById('countdown');
    if (el) el.textContent = `${h}:${m}:${s}`;
  }, 1000);
}

// ══════════════════════════════════════════
// INIT
// ══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  renderCart();
  renderProducts(PRODUCTS);
  startCountdown();
  setInterval(() => changeSlide(1), 5000);
  document.getElementById('searchInput')?.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
  document.getElementById('cepInput')?.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5, 8);
    e.target.value = v;
  });
});
