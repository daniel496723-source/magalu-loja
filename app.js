// ============================================================
// MAGALU CLONE - app.js
// Todos os produtos, carrinho, carousel e lógica da loja
// ============================================================

const PRODUCTS = [
  // ─── SMARTPHONES ───────────────────────────────────────
  {
    id: 1, category: 'smartphones', brand: 'Apple',
    name: 'iPhone 15 Pro Max 256GB Titânio Natural Apple',
    sku: 'MLU0001',
    price: 7499.00, oldPrice: 9499.00,
    discount: 21,
    rating: 4.9, reviews: 3847,
    images: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702708',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-2-202309?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693008890668',
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80'
    ],
    variants: ['Titânio Natural', 'Titânio Preto', 'Titânio Branco', 'Titânio Azul'],
    highlights: [
      'Chip A17 Pro com GPU de 6 núcleos',
      'Câmera principal 48MP com zoom óptico 5x',
      'Tela Super Retina XDR 6,7" ProMotion 120Hz',
      'Titânio grau aeroespacial – mais leve e resistente',
      'Botão de Ação personalizável',
      'USB-C com suporte a USB 3 (velocidades de até 20Gb/s)',
      'Bateria com até 29h de reprodução de vídeo'
    ],
    description: 'O iPhone 15 Pro Max é o smartphone Apple mais avançado já criado. Com o revolucionário chip A17 Pro fabricado em processo de 3 nanômetros, ele oferece desempenho sem precedentes para gaming, fotografia computacional e IA on-device. O sistema de câmera tripla com lente tetraprismática proporciona zoom óptico 5x inédito em iPhones, permitindo capturar detalhes a grande distância com nitidez impressionante. A estrutura em titânio grau aeroespacial torna o aparelho o iPhone mais resistente e, ao mesmo tempo, o mais leve da linha Pro Max. O novo Botão de Ação substitui a chave de silêncio e pode ser programado para dezenas de funções diferentes.',
    specs: [
      ['Tela', '6,7" Super Retina XDR OLED 2796x1290px 460ppi'],
      ['Processador', 'Apple A17 Pro (3nm)'],
      ['RAM', '8GB'],
      ['Armazenamento', '256GB NVMe'],
      ['Câmera Traseira', '48MP (principal) + 12MP (ultrawide) + 12MP (telephoto 5x)'],
      ['Câmera Frontal', '12MP TrueDepth com autofoco'],
      ['Bateria', '4422 mAh – até 29h vídeo'],
      ['Conexão', '5G, Wi-Fi 6E, Bluetooth 5.3, USB-C 3.0'],
      ['Sistema', 'iOS 17'],
      ['Dimensões', '159,9 x 76,7 x 8,25 mm, 221g'],
      ['Proteção', 'Ceramic Shield frontal, IP68'],
    ],
    reviewsData: [
      { user: 'Carlos M.', rating: 5, date: '12/11/2024', comment: 'Simplesmente o melhor smartphone que já tive. A câmera zoom 5x é impressionante, fotografei detalhes que meu olho mal enxergava. Bateria durando 2 dias no meu uso moderado.' },
      { user: 'Ana Paula S.', rating: 5, date: '03/11/2024', comment: 'Entrega rápida pelo Magalu, produto original lacrado. A tela é lindíssima, e o titânio realmente parece premium. Vale cada centavo!' },
      { user: 'Roberto F.', rating: 4, date: '28/10/2024', comment: 'Excelente produto. Só tirei um ponto porque o carregador não vem na caixa (como todos os iPhones recentes). Mas o celular em si é perfeito.' },
    ]
  },

  {
    id: 2, category: 'smartphones', brand: 'Samsung',
    name: 'Samsung Galaxy S24 Ultra 256GB 5G Titânio Preto',
    sku: 'MLU0002',
    price: 6299.00, oldPrice: 8299.00,
    discount: 24,
    rating: 4.8, reviews: 2341,
    images: [
      'https://images.samsung.com/is/image/samsung/p6pim/br/2401/gallery/br-galaxy-s24-ultra-sm-s928bzkpzto-thumb-539097895?$650_519_PNG$',
      'https://images.samsung.com/is/image/samsung/p6pim/br/2401/gallery/br-galaxy-s24-ultra-sm-s928bzkpzto-536870914?$650_519_PNG$',
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80'
    ],
    variants: ['Titânio Preto', 'Titânio Cinza', 'Titânio Violeta', 'Titânio Amarelo'],
    highlights: [
      'S Pen integrada com IA Galaxy AI',
      'Câmera 200MP com zoom óptico 10x',
      'Tela Dynamic AMOLED 2X 6,8" 120Hz',
      'Snapdragon 8 Gen 3 for Galaxy',
      '12GB RAM + 256GB armazenamento',
      'Bateria 5000mAh com carregamento 45W',
      'Resistência IP68'
    ],
    description: 'O Galaxy S24 Ultra redefine o que um smartphone pode fazer. Com a caneta S Pen integrada e a Galaxy AI, você pode resumir documentos, traduzir conversas em tempo real, remover objetos de fotos com um toque e muito mais. O sistema de câmera quíntupla com sensor principal de 200MP e zoom óptico de 10x captura cada detalhe com clareza excepcional, mesmo à noite. O Snapdragon 8 Gen 3 for Galaxy garante desempenho de elite em todos os cenários, do gaming à multitarefa mais exigente.',
    specs: [
      ['Tela', '6,8" Dynamic AMOLED 2X 3088x1440px 501ppi'],
      ['Processador', 'Snapdragon 8 Gen 3 for Galaxy (4nm)'],
      ['RAM', '12GB'],
      ['Armazenamento', '256GB UFS 4.0'],
      ['Câmera Traseira', '200MP + 12MP + 10MP (3x) + 50MP (5x)'],
      ['Câmera Frontal', '12MP'],
      ['Bateria', '5000mAh – carregamento 45W'],
      ['Conexão', '5G, Wi-Fi 7, Bluetooth 5.3, NFC, USB-C 3.2'],
      ['Sistema', 'Android 14 / One UI 6.1'],
      ['Dimensões', '162,3 x 79,0 x 8,6 mm, 232g'],
      ['Proteção', 'Gorilla Glass Armor, IP68'],
    ],
    reviewsData: [
      { user: 'Fernanda L.', rating: 5, date: '15/11/2024', comment: 'A câmera de 200MP é absurda. Fotografei pássaros a distância e os detalhes nas penas são nítidos. A S Pen com IA é um diferencial enorme para quem trabalha.' },
      { user: 'Thiago B.', rating: 5, date: '08/11/2024', comment: 'Comprei para substituir meu S23 Ultra e a melhora é perceptível. A tela é mais brilhante, o zoom melhorou e a Galaxy AI é surpreendentemente útil.' },
      { user: 'Mariana C.', rating: 4, date: '01/11/2024', comment: 'Produto incrível, mas pesado. Quem está acostumado com celulares mais leves pode estranhar no início. A qualidade compensa.' },
    ]
  },

  {
    id: 3, category: 'smartphones', brand: 'Motorola',
    name: 'Motorola Edge 50 Pro 512GB 12GB RAM 5G Moonlight Pearl',
    sku: 'MLU0003',
    price: 2699.00, oldPrice: 3499.00,
    discount: 23,
    rating: 4.7, reviews: 1203,
    images: [
      'https://motorola-global-portal.custhelp.com/ci/fattach/get/1154694/0/filename/Edge%2050%20Pro_Pearl_Hero.jpg',
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80'
    ],
    variants: ['Moonlight Pearl', 'Black Beauty', 'Luxe Lavender'],
    highlights: [
      'Tela pOLED curva 6,7" 144Hz',
      'Câmera 50MP com OIS avançado',
      'Snapdragon 7 Gen 3',
      'Carregamento TurboPower 125W',
      '12GB RAM + 512GB armazenamento',
      'IP68 – resistente a água e poeira',
      'Alto-falante estéreo com Dolby Atmos'
    ],
    description: 'O Motorola Edge 50 Pro combina design sofisticado com tecnologia de ponta em uma faixa de preço acessível. A tela pOLED curva de 144Hz oferece uma experiência visual imersiva, enquanto o carregamento TurboPower 125W carrega o aparelho de 0 a 100% em apenas 22 minutos. O processador Snapdragon 7 Gen 3 garante fluidez em qualquer tarefa, e a câmera tripla com sensor Sony de 50MP captura fotos e vídeos com qualidade profissional.',
    specs: [
      ['Tela', '6,7" pOLED curva 2712x1220px 446ppi 144Hz'],
      ['Processador', 'Snapdragon 7 Gen 3 (4nm)'],
      ['RAM', '12GB LPDDR5'],
      ['Armazenamento', '512GB UFS 3.1'],
      ['Câmera Traseira', '50MP OIS + 13MP ultrawide + 10MP telephoto 3x'],
      ['Câmera Frontal', '50MP'],
      ['Bateria', '4500mAh – TurboPower 125W'],
      ['Conexão', '5G, Wi-Fi 6E, Bluetooth 5.4, NFC'],
      ['Sistema', 'Android 14'],
      ['Dimensões', '161,2 x 73,0 x 8,19 mm, 186g'],
      ['Proteção', 'IP68'],
    ],
    reviewsData: [
      { user: 'Lucas P.', rating: 5, date: '20/11/2024', comment: 'O carregamento de 125W é de outro mundo. Coloco no carregador por 15 minutos e tenho bateria suficiente para o dia. A tela curva é linda.' },
      { user: 'Julia K.', rating: 5, date: '14/11/2024', comment: 'Excelente custo-benefício. Câmera muito boa, desempenho fluido e design diferenciado. Muito melhor que outros celulares na mesma faixa de preço.' },
    ]
  },

  {
    id: 4, category: 'smartphones', brand: 'Xiaomi',
    name: 'Xiaomi 14 Ultra 512GB 16GB RAM 5G Titânio Preto',
    sku: 'MLU0004',
    price: 5499.00, oldPrice: 6999.00,
    discount: 21,
    rating: 4.8, reviews: 876,
    images: [
      'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0/pms_1706698614.34913388.png',
      'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80',
      'https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=600&q=80'
    ],
    variants: ['Titânio Preto', 'Titânio Branco'],
    highlights: [
      'Sistema Leica Summilux com 4 câmeras',
      'Sensor Sony LYT-900 de 1 polegada',
      'Snapdragon 8 Gen 3',
      'HyperCharge 90W + carregamento sem fio 80W',
      'Tela AMOLED 6,73" 120Hz',
      '16GB RAM + 512GB armazenamento',
      'Carregamento reverso sem fio 10W'
    ],
    description: 'O Xiaomi 14 Ultra é o parceiro fotográfico definitivo, desenvolvido em colaboração com a Leica. O sistema de câmera quádrupla com sensor Sony LYT-900 de 1 polegada captura luz de forma excepcional em qualquer condição. As ópticas Leica Summilux com abertura variável (f/1.63–f/4.0) oferecem controle criativo sem precedentes em um smartphone. O HyperCharge 90W carrega a bateria de 5000mAh em apenas 35 minutos.',
    specs: [
      ['Tela', '6,73" AMOLED 3200x1440px 522ppi 120Hz'],
      ['Processador', 'Snapdragon 8 Gen 3 (4nm)'],
      ['RAM', '16GB LPDDR5X'],
      ['Armazenamento', '512GB UFS 4.0'],
      ['Câmera Traseira', '50MP f/1.63 1" + 50MP ultrawide + 50MP 3x + 50MP 5x'],
      ['Câmera Frontal', '32MP'],
      ['Bateria', '5000mAh – 90W com fio + 80W sem fio'],
      ['Conexão', '5G, Wi-Fi 7, Bluetooth 5.4, NFC, USB-C 3.2'],
      ['Sistema', 'Android 14 / HyperOS'],
      ['Dimensões', '161,4 x 75,3 x 9,2 mm, 229g'],
      ['Proteção', 'IP68'],
    ],
    reviewsData: [
      { user: 'Pedro A.', rating: 5, date: '10/11/2024', comment: 'As fotos com a câmera Leica são simplesmente de outra dimensão. O sensor de 1 polegada faz diferença absurda na qualidade noturna. Não troco por nada.' },
    ]
  },

  // ─── NOTEBOOKS ───────────────────────────────────────────
  {
    id: 5, category: 'notebooks', brand: 'Dell',
    name: 'Notebook Dell XPS 15 Intel Core i9 32GB 1TB RTX 4070 OLED',
    sku: 'MLU0005',
    price: 12999.00, oldPrice: 16499.00,
    discount: 21,
    rating: 4.9, reviews: 634,
    images: [
      'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-15-9530/media-gallery/silver/notebook-xps-15-9530-t-silver-gallery-1.psd?fmt=pjpg&pscan=auto&scl=1&hei=402&wid=402&qlt=100,1&resMode=sharp2&size=402,402',
      'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80',
    ],
    variants: ['Prata Platina', 'Preto Carbono'],
    highlights: [
      'Processador Intel Core i9-13900H',
      'NVIDIA GeForce RTX 4070 8GB',
      '32GB RAM DDR5 5200MHz',
      'SSD NVMe 1TB PCIe Gen 4',
      'Tela OLED 3.5K 15,6" 60Hz 100% DCI-P3',
      'Bateria 86Wh com carregamento USB-C 130W',
      'Peso apenas 1,86kg'
    ],
    description: 'O Dell XPS 15 é o notebook premium para criativos e profissionais exigentes. A tela OLED 3.5K com 100% de cobertura DCI-P3 e 0,2ms de tempo de resposta oferece cores absolutamente precisas para design, fotografia e edição de vídeo. O processador Intel Core i9-13900H combinado com a RTX 4070 garante potência para renderização 3D, edição 4K e gaming de alto nível. O design ultrafino em alumínio usinado transmite sofisticação e durabilidade.',
    specs: [
      ['Tela', '15,6" OLED 3456x2160px 60Hz 500nits 100% DCI-P3'],
      ['Processador', 'Intel Core i9-13900H (14 núcleos, até 5.4GHz)'],
      ['RAM', '32GB DDR5 5200MHz'],
      ['Armazenamento', '1TB NVMe PCIe Gen 4'],
      ['GPU', 'NVIDIA GeForce RTX 4070 8GB GDDR6'],
      ['Bateria', '86Wh – até 13h (uso básico)'],
      ['Conexão', 'Wi-Fi 6E, Bluetooth 5.3, Thunderbolt 4 x2, USB-A x1, SD'],
      ['Sistema Operacional', 'Windows 11 Home'],
      ['Peso', '1,86kg'],
      ['Dimensões', '344,4 x 230,1 x 18,0mm'],
    ],
    reviewsData: [
      { user: 'Renata M.', rating: 5, date: '05/11/2024', comment: 'Comprei para trabalhar com edição de fotos e vídeo. A tela OLED com calibração de fábrica é de cair o queixo. O XPS 15 é o melhor notebook que já tive.' },
      { user: 'André S.', rating: 5, date: '29/10/2024', comment: 'Desempenho absurdo. Renderizo projetos 3D que no meu notebook anterior levavam horas, agora levam minutos. Vale todo o investimento.' },
    ]
  },

  {
    id: 6, category: 'notebooks', brand: 'Apple',
    name: 'MacBook Pro 14" Apple M3 Pro 18GB 512GB SSD Preto Espacial',
    sku: 'MLU0006',
    price: 14499.00, oldPrice: 17999.00,
    discount: 19,
    rating: 4.9, reviews: 1247,
    images: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311054290',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
    ],
    variants: ['Preto Espacial', 'Prateado'],
    highlights: [
      'Chip Apple M3 Pro com CPU 11 núcleos',
      '18GB de memória unificada',
      'SSD ultrarrápido 512GB',
      'Tela Liquid Retina XDR 14,2" 120Hz ProMotion',
      'Bateria de até 22 horas',
      'HDMI 2.1, SD card, 3 Thunderbolt 4',
      'Novo acabamento Preto Espacial exclusivo'
    ],
    description: 'O MacBook Pro com chip M3 Pro redefine o que um notebook pode fazer. O chip M3 Pro com CPU de 11 núcleos e GPU de 14 núcleos entrega desempenho excepcional para compilação de código, edição de vídeo ProRes, renderização 3D e fluxos de trabalho de machine learning. A tela Liquid Retina XDR brilha com até 1600 nits de brilho de pico, tornando-a legível até ao sol. A autonomia de até 22 horas é imbatível na categoria.',
    specs: [
      ['Tela', '14,2" Liquid Retina XDR 3024x1964px 120Hz 1000nits'],
      ['Processador', 'Apple M3 Pro (CPU 11 núcleos / GPU 14 núcleos)'],
      ['Memória', '18GB unificada'],
      ['Armazenamento', '512GB NVMe'],
      ['Bateria', 'até 22 horas'],
      ['Portas', '3x Thunderbolt 4, HDMI 2.1, SD, MagSafe 3, Jack 3.5mm'],
      ['Conexão', 'Wi-Fi 6E, Bluetooth 5.3'],
      ['Sistema Operacional', 'macOS Sonoma'],
      ['Peso', '1,61kg'],
      ['Dimensões', '312,6 x 221,2 x 15,5mm'],
    ],
    reviewsData: [
      { user: 'Carolina F.', rating: 5, date: '18/11/2024', comment: 'Fiz upgrade do M1 Pro e a diferença é enorme. Compilações de código que levavam 40s agora levam 12s. A tela Liquid Retina XDR é incomparável.' },
    ]
  },

  // ─── SMART TVs ────────────────────────────────────────────
  {
    id: 7, category: 'tvs', brand: 'LG',
    name: 'Smart TV LG OLED evo 65" 4K 120Hz C3 Dolby Vision IQ ThinQ AI',
    sku: 'MLU0007',
    price: 4999.00, oldPrice: 7999.00,
    discount: 37,
    rating: 4.9, reviews: 2134,
    images: [
      'https://www.lg.com/br/images/tvs/md07536350/gallery/medium01.jpg',
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80',
    ],
    variants: ['65"', '55"', '77"', '83"'],
    highlights: [
      'Painel OLED auto-iluminado – preto absoluto',
      'Processador α9 Gen6 AI com IA de imagem',
      'Dolby Vision IQ + Dolby Atmos',
      'Taxa de atualização 120Hz com NVIDIA G-Sync',
      '4 entradas HDMI 2.1 (48Gbps)',
      'webOS 23 com ThinQ AI',
      'Modo Gamer – input lag de apenas 1ms'
    ],
    description: 'A LG OLED evo C3 é considerada a melhor TV de 2023/2024 por dezenas de veículos especializados. O painel OLED auto-iluminado oferece preto absoluto, contraste infinito e cores vibrantes que nenhuma tecnologia LCD consegue igualar. O processador α9 Gen6 AI analisa cada cena em tempo real para otimizar imagem e som automaticamente. Com 4 portas HDMI 2.1 e input lag de 1ms, é a escolha perfeita para consoles next-gen como PS5 e Xbox Series X.',
    specs: [
      ['Tamanho', '65 polegadas (163cm)'],
      ['Resolução', '4K Ultra HD (3840x2160px)'],
      ['Painel', 'OLED evo (auto-iluminado)'],
      ['Taxa de Atualização', '120Hz (G-Sync compatible, FreeSync Premium)'],
      ['HDR', 'Dolby Vision IQ, HDR10, HLG'],
      ['Áudio', '60W – Dolby Atmos, DTS:X'],
      ['Smart TV', 'webOS 23 com ThinQ AI'],
      ['HDMI', '4x HDMI 2.1 (48Gbps)'],
      ['USB', '3x USB'],
      ['Conectividade', 'Wi-Fi 6, Bluetooth 5.0, AirPlay 2, HomeKit'],
    ],
    reviewsData: [
      { user: 'Marcos R.', rating: 5, date: '12/11/2024', comment: 'Jogar PS5 nessa TV é uma experiência transcendental. O modo gamer com 1ms de input lag + 120Hz faz toda a diferença. O OLED é realmente incomparável.' },
      { user: 'Silvia T.', rating: 5, date: '05/11/2024', comment: 'Assistimos Star Wars e choramos de emoção com a qualidade da imagem. O preto absoluto do OLED transforma qualquer filme. Melhor compra que já fiz.' },
    ]
  },

  {
    id: 8, category: 'tvs', brand: 'Samsung',
    name: 'Smart TV Samsung Neo QLED 8K 75" QN900C 240Hz Dolby Atmos',
    sku: 'MLU0008',
    price: 12999.00, oldPrice: 18999.00,
    discount: 32,
    rating: 4.8, reviews: 432,
    images: [
      'https://images.samsung.com/is/image/samsung/p6pim/br/qe75qn900ctxzd/gallery/br-neo-qled-8k-qn900c-qe75qn900ctxzd-537146748?$650_519_PNG$',
      'https://images.unsplash.com/photo-1571415060716-baff5f717c37?w=600&q=80',
    ],
    variants: ['75"', '65"', '85"'],
    highlights: [
      'Resolução 8K (7680x4320px) com upscaling por IA',
      'Processador Neural Quantum 8K Gen2',
      'Painel Neo QLED com Mini LEDs',
      'Taxa de atualização 240Hz',
      'Dolby Atmos + Object Tracking Sound+',
      'Design Infinity One – bordas imperceptíveis',
      'Tizen OS com SmartThings integrado'
    ],
    description: 'A Samsung Neo QLED 8K é o ápice da tecnologia de TV. Com resolução 8K e o processador Neural Quantum 8K Gen2, cada conteúdo é upscalado em tempo real para qualidade cinematográfica. Os Mini LEDs retroiluminam o painel QLED com precisão milimétrica, criando contraste e brilho sem igual. O design Infinity One com bordas quase invisíveis integra a TV perfeitamente a qualquer ambiente.',
    specs: [
      ['Tamanho', '75 polegadas'],
      ['Resolução', '8K (7680x4320px)'],
      ['Painel', 'Neo QLED (Mini LED + Quantum Dot)'],
      ['Taxa de Atualização', '240Hz'],
      ['HDR', 'HDR10+, HLG'],
      ['Áudio', '70W – Dolby Atmos, Object Tracking Sound+'],
      ['Smart TV', 'Tizen OS, SmartThings, Bixby, Alexa, Google'],
      ['HDMI', '4x HDMI 2.1'],
      ['Conectividade', 'Wi-Fi 6E, Bluetooth 5.2, AirPlay 2'],
    ],
    reviewsData: [
      { user: 'Eduardo C.', rating: 5, date: '20/11/2024', comment: 'A TV é uma obra de arte. O design Infinity One é elegantíssimo e a imagem 8K com upscaling é impressionante mesmo assistindo conteúdo 4K.' },
    ]
  },

  // ─── GAMES ────────────────────────────────────────────────
  {
    id: 9, category: 'games', brand: 'Sony',
    name: 'PlayStation 5 Slim Console Disco 1TB SSD + Controle DualSense Branco',
    sku: 'MLU0009',
    price: 3799.00, oldPrice: 4799.00,
    discount: 21,
    rating: 4.9, reviews: 5782,
    images: [
      'https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$',
      'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&q=80',
      'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=600&q=80'
    ],
    variants: ['Edição Disco', 'Edição Digital'],
    highlights: [
      'SSD ultrarrápido 825GB – carregamentos quase instantâneos',
      'Resolução até 8K e taxa de atualização 120fps',
      'Ray Tracing em tempo real',
      'DualSense com feedback tátil e gatilhos adaptativos',
      'Tempest 3D AudioTech – som espacial imersivo',
      'Retrocompatível com jogos PS4',
      'Design Slim 30% menor que a versão original'
    ],
    description: 'O PlayStation 5 Slim é a evolução perfeita do console mais premiado da Sony. O SSD ultrarrápido de 825GB elimina praticamente os tempos de carregamento, trazendo os jogadores diretamente para a ação. O controle DualSense revoluciona a experiência com feedback tátil que simula texturas e gatilhos adaptativos que oferecem resistência variável conforme a situação do jogo. O Tempest 3D AudioTech cria um som espacial tão preciso que você consegue ouvir de onde cada som vem ao redor.',
    specs: [
      ['CPU', 'AMD Zen 2 – 8 núcleos a 3,5GHz'],
      ['GPU', 'AMD RDNA 2 – 10,3 teraflops'],
      ['RAM', '16GB GDDR6'],
      ['Armazenamento', 'SSD NVMe 825GB (expansível)'],
      ['Resolução Máxima', '8K'],
      ['Frame Rate', 'até 120fps'],
      ['Áudio', 'Tempest 3D AudioTech'],
      ['Mídia', 'Blu-ray 4K Ultra HD'],
      ['Conectividade', 'USB-A, USB-C, HDMI 2.1, Wi-Fi 6, Bluetooth 5.1, Ethernet'],
      ['Dimensões', '358 x 96 x 216mm'],
    ],
    reviewsData: [
      { user: 'Gabriel N.', rating: 5, date: '22/11/2024', comment: 'Comprei com Spider-Man 2 e foi uma experiência incrível. Os gatilhos adaptativos do DualSense tornam cada jogo completamente imersivo. Entrega rápida pelo Magalu!' },
      { user: 'Patricia O.', rating: 5, date: '15/11/2024', comment: 'Presente para meu filho e ele ficou radiante. O tamanho slim é mais fácil de encaixar no rack. Funcionamento perfeito, produto original.' },
      { user: 'Diego M.', rating: 4, date: '08/11/2024', comment: 'Ótimo console. Só senti falta de mais jogos exclusivos disponíveis no lançamento, mas God of War e Spider-Man compensam.' },
    ]
  },

  {
    id: 10, category: 'games', brand: 'Microsoft',
    name: 'Xbox Series X Console 1TB SSD 4K 120fps HDR Preto',
    sku: 'MLU0010',
    price: 3499.00, oldPrice: 4299.00,
    discount: 19,
    rating: 4.8, reviews: 2341,
    images: [
      'https://news.xbox.com/en-us/wp-content/uploads/sites/2/2020/12/XboxSeriesX_Consolealone.png',
      'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600&q=80',
    ],
    variants: ['Preto'],
    highlights: [
      'Resolução 4K a 60fps e 1080p a 120fps',
      'SSD NVMe 1TB com Xbox Velocity Architecture',
      '12 teraflops de poder gráfico',
      'Quick Resume – retome múltiplos jogos instantaneamente',
      'Retrocompatível com 4 gerações de consoles Xbox',
      'Xbox Game Pass Ultimate incluso por 1 mês',
      'Suporte a Auto HDR e FPS Boost em títulos antigos'
    ],
    description: 'O Xbox Series X é o console mais poderoso da Microsoft, com 12 teraflops de poder gráfico e o SSD NVMe mais rápido de um console. O Quick Resume permite alternar entre múltiplos jogos em segundos, retomando exatamente de onde você parou. A retrocompatibilidade com quatro gerações de títulos Xbox significa que você tem acesso a uma biblioteca de milhares de jogos desde o lançamento, muitos deles com melhorias automáticas de resolução, HDR e framerate.',
    specs: [
      ['CPU', 'AMD Zen 2 – 8 núcleos a 3,8GHz'],
      ['GPU', 'AMD RDNA 2 – 12 teraflops'],
      ['RAM', '16GB GDDR6'],
      ['Armazenamento', 'SSD NVMe 1TB (expansível)'],
      ['Resolução Máxima', '8K (upscaling)'],
      ['Frame Rate', 'até 120fps'],
      ['Conectividade', 'USB-A x3, HDMI 2.1, Wi-Fi 6, Bluetooth 5.0, Ethernet'],
      ['Dimensões', '301 x 151 x 151mm, 4,45kg'],
    ],
    reviewsData: [
      { user: 'Rodrigo A.', rating: 5, date: '18/11/2024', comment: 'O Quick Resume é uma funcionalidade que não consigo mais viver sem. Troco entre 5 jogos em segundos. Game Pass Ultimate vale muito a pena também.' },
    ]
  },

  // ─── ÁUDIO ───────────────────────────────────────────────
  {
    id: 11, category: 'audio', brand: 'Sony',
    name: 'Fone de Ouvido Sony WH-1000XM5 Bluetooth ANC 30h Preto',
    sku: 'MLU0011',
    price: 1799.00, oldPrice: 2499.00,
    discount: 28,
    rating: 4.9, reviews: 3201,
    images: [
      'https://www.sony.com.br/image/5d02da5df552836db894cead8a68f056?fmt=pjpeg&wid=600',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    ],
    variants: ['Preto', 'Prata'],
    highlights: [
      'Melhor cancelamento de ruído da categoria',
      '8 microfones com 2 processadores de ANC',
      'Drivers de 30mm desenvolvidos especialmente',
      'Até 30h de bateria com ANC ativado',
      'Carregamento rápido: 3h de uso em 3 min',
      'Suporte LDAC para áudio de alta resolução',
      'Dobrável – capa de viagem incluída'
    ],
    description: 'O Sony WH-1000XM5 é consistentemente eleito o melhor fone com cancelamento de ruído do mundo. Com 8 microfones e dois processadores de ANC trabalhando em conjunto, ele elimina virtualmente qualquer ruído ambiente, seja o motor de um avião, o barulho de escritório ou o tráfego da rua. O suporte ao codec LDAC permite streaming de áudio em até 990kbps – três vezes mais que o Bluetooth convencional – revelando detalhes que outros fones simplesmente não transmitem.',
    specs: [
      ['Driver', '30mm, circularmente orientado'],
      ['Resposta de Frequência', '4Hz – 40.000Hz'],
      ['ANC', 'Sim – 8 microfones + 2 processadores'],
      ['Bateria', 'até 30h (com ANC) / 40h (sem ANC)'],
      ['Carregamento', 'USB-C – 3min = 3h de uso'],
      ['Codecs', 'LDAC, AAC, SBC'],
      ['Conexão', 'Bluetooth 5.2 + P2 3,5mm'],
      ['Peso', '250g'],
      ['Compatibilidade', '360 Reality Audio, DSEE Extreme, Speak-to-Chat'],
    ],
    reviewsData: [
      { user: 'Amanda V.', rating: 5, date: '14/11/2024', comment: 'Uso diariamente em voos internacionais. O ANC é tão bom que literalmente não ouço nada do motor do avião. Bateria chegando em 28h no meu uso. Perfeito.' },
      { user: 'Henrique D.', rating: 5, date: '07/11/2024', comment: 'Trabalhando em casa com dois filhos, esse fone me salvou. Coloco e entro em outro mundo. Qualidade de áudio de outro patamar com LDAC.' },
    ]
  },

  // ─── WEARABLES ───────────────────────────────────────────
  {
    id: 12, category: 'wearables', brand: 'Apple',
    name: 'Apple Watch Series 9 GPS 45mm Alumínio Midnight Pulseira Sport Band',
    sku: 'MLU0012',
    price: 3299.00, oldPrice: 3999.00,
    discount: 18,
    rating: 4.8, reviews: 4123,
    images: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MR9Q3ref_VW_34FR+watch-45-alum-midnight-nc-9s_VW_34FR_WF_CO?wid=700&hei=700&trim=1&fmt=p-jpg&qlt=95&.v=1694507562463',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80',
    ],
    variants: ['Midnight 41mm', 'Midnight 45mm', 'Starlight 41mm', 'Starlight 45mm', 'Pink 41mm', '(PRODUCT)RED 41mm'],
    highlights: [
      'Chip S9 SiP – processamento on-device para Siri',
      'Novo gesto Double Tap para controlar sem tocar',
      'Tela Always-On Retina 2000 nits – legível ao sol',
      'Temperatura do pulso, ECG e SpO2',
      'Rastreamento de ciclismo e natação automáticos',
      'Detecção de acidente e Detecção de queda',
      'Carregamento USB-C'
    ],
    description: 'O Apple Watch Series 9 é o smartwatch mais avançado da Apple, com o novo chip S9 que processa comandos Siri completamente no dispositivo, sem enviar dados para a nuvem. O novo gesto Double Tap – tocar o dedo indicador e o polegar duas vezes – permite controlar o relógio com uma mão, ideal durante exercícios. Os sensores de saúde incluem temperatura do pulso, ECG, SpO2, frequência cardíaca e detector de arritmia.',
    specs: [
      ['Tamanho', '45mm'],
      ['Chip', 'S9 SiP (4 núcleos)'],
      ['Tela', 'LTPO OLED Always-On Retina 2000nits'],
      ['GPS', 'L1 + L5'],
      ['Sensores', 'Cardiograma (ECG), SpO2, Temperatura, Altímetro'],
      ['Bateria', 'até 18h / 36h em modo Low Power'],
      ['Carregamento', 'USB-C MagSafe'],
      ['Resistência', 'WR50 – 50m de profundidade'],
      ['Conectividade', 'GPS, Wi-Fi 4, Bluetooth 5.3, NFC (Apple Pay)'],
      ['Compatibilidade', 'iPhone XS ou mais recente'],
    ],
    reviewsData: [
      { user: 'Isabela C.', rating: 5, date: '19/11/2024', comment: 'O Double Tap mudou completamente como eu uso o relógio. Consigo pausar música e responder mensagens com uma mão enquanto carrego meu bebê. Revolucionário.' },
      { user: 'Bruno F.', rating: 5, date: '11/11/2024', comment: 'Uso para corridas e o GPS L5 é muito mais preciso que o Series 7 que tinha antes. As métricas de saúde são confiáveis e o app Saúde integra tudo perfeitamente.' },
    ]
  },
];

// ============================================================
// CART
// ============================================================
let cart = JSON.parse(localStorage.getItem('magaluCart') || '[]');

function saveCart() { localStorage.setItem('magaluCart', JSON.stringify(cart)); }

function addToCart(name, price, img) {
  const existing = cart.find(i => i.name === name);
  if (existing) { existing.qty++; } else { cart.push({ name, price, qty: 1, img: img || '' }); }
  saveCart();
  updateCartBadge();
  renderCart();
  openCart();
}

function removeFromCart(name) {
  cart = cart.filter(i => i.name !== name);
  saveCart();
  updateCartBadge();
  renderCart();
}

function updateCartBadge() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('#cartBadge').forEach(b => { b.textContent = total; b.style.display = total ? 'flex' : 'none'; });
}

function openCart() {
  document.getElementById('cartSidebar')?.classList.add('open');
  document.getElementById('cartOverlay')?.classList.add('open');
}

function closeCart() {
  document.getElementById('cartSidebar')?.classList.remove('open');
  document.getElementById('cartOverlay')?.classList.remove('open');
}

function renderCart() {
  const el = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  if (!el) return;
  if (cart.length === 0) {
    el.innerHTML = '<div class="cart-empty">🛒<p>Seu carrinho está vazio</p><a href="index.html">Continuar comprando</a></div>';
    footer.innerHTML = '';
    return;
  }
  el.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">R$ ${(item.price * item.qty).toFixed(2).replace('.',',')}</div>
        <div class="cart-item-qty">
          <button onclick="changeQty('${item.name}',-1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty('${item.name}',1)">+</button>
          <button class="cart-remove" onclick="removeFromCart('${item.name}')">🗑</button>
        </div>
      </div>
    </div>`).join('');
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  footer.innerHTML = `
    <div class="cart-total-row"><span>Subtotal:</span><strong>R$ ${total.toFixed(2).replace('.',',')}</strong></div>
    <div class="cart-total-row pix"><span>💚 No Pix:</span><strong>R$ ${(total*0.95).toFixed(2).replace('.',',')}</strong></div>
    <button class="btn-checkout" onclick="alert('Finalizando compra... Obrigado!')">Finalizar Compra</button>`;
}

function changeQty(name, delta) {
  const item = cart.find(i => i.name === name);
  if (item) { item.qty += delta; if (item.qty <= 0) removeFromCart(name); else { saveCart(); renderCart(); updateCartBadge(); } }
}

// ============================================================
// RENDER PRODUCTS
// ============================================================
function renderProducts(list) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = list.map(p => `
    <div class="product-card" onclick="window.location.href='produto.html?id=${p.id}'">
      <div class="product-badge">-${p.discount}%</div>
      <button class="product-fav" onclick="event.stopPropagation();this.classList.toggle('active');this.textContent=this.classList.contains('active')?'♥':'♡'">♡</button>
      <div class="product-img-wrap">
        <img src="${p.images[0]}" alt="${p.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/200x200/f5f5f5/999?text=Produto'">
      </div>
      <div class="product-info">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-stars">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5-Math.floor(p.rating))} <span>(${p.reviews.toLocaleString()})</span></div>
        <div class="product-price-old">R$ ${p.oldPrice.toFixed(2).replace('.',',')}</div>
        <div class="product-price">R$ ${p.price.toFixed(2).replace('.',',')}</div>
        <div class="product-installment">12x de R$ ${(p.price/12).toFixed(2).replace('.',',')} s/juros</div>
        <div class="product-pix">💚 R$ ${(p.price*0.95).toFixed(2).replace('.',',')} no Pix</div>
        <button class="product-buy" onclick="event.stopPropagation();addToCart('${p.name.replace(/'/g,"\\'")}',${p.price},'${p.images[0]}');this.textContent='✓ Adicionado';this.style.background='#27ae60';setTimeout(()=>{this.textContent='Comprar';this.style.background=''},1500)">Comprar</button>
      </div>
    </div>`).join('');
}

function filterCategory(cat) {
  const filtered = PRODUCTS.filter(p => p.category === cat);
  renderProducts(filtered.length ? filtered : PRODUCTS);
  window.scrollTo({ top: document.getElementById('productsGrid')?.offsetTop - 100 || 0, behavior: 'smooth' });
}

function doSearch() {
  const q = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
  if (!q) return renderProducts(PRODUCTS);
  const res = PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  renderProducts(res.length ? res : PRODUCTS);
}

// ============================================================
// HERO CAROUSEL
// ============================================================
let slideIndex = 0;
const slideCount = 4;

function changeSlide(dir) {
  goSlide((slideIndex + dir + slideCount) % slideCount);
}

function goSlide(n) {
  slideIndex = n;
  const slides = document.getElementById('heroSlides');
  if (slides) slides.style.transform = `translateX(-${slideIndex * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === slideIndex));
}

// ============================================================
// COUNTDOWN
// ============================================================
function startCountdown() {
  const stored = localStorage.getItem('magaluCountdown');
  let end = stored ? parseInt(stored) : Date.now() + 6*3600*1000;
  if (!stored || end < Date.now()) { end = Date.now() + 6*3600*1000; localStorage.setItem('magaluCountdown', end); }
  setInterval(() => {
    const diff = Math.max(0, end - Date.now());
    const h = String(Math.floor(diff/3600000)).padStart(2,'0');
    const m = String(Math.floor((diff%3600000)/60000)).padStart(2,'0');
    const s = String(Math.floor((diff%60000)/1000)).padStart(2,'0');
    const el = document.getElementById('countdown');
    if (el) el.textContent = `${h}:${m}:${s}`;
  }, 1000);
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  renderCart();
  renderProducts(PRODUCTS);
  startCountdown();

  // Search on Enter
  document.getElementById('searchInput')?.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

  // Auto-advance carousel
  setInterval(() => changeSlide(1), 5000);

  // CEP mask
  const cep = document.getElementById('cepInput');
  if (cep) cep.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g,'');
    if (v.length > 5) v = v.slice(0,5) + '-' + v.slice(5,8);
    e.target.value = v;
  });
});
