// ============================================================
// MAGALU CLONE - app.js v5.0
// CORREÇÕES: botão comprar + imagens garantidas por produto
// ============================================================

// Imagens via Unsplash (100% confiável) + fallback placehold.co
// Cada produto tem imagem ÚNICA e específica
const PRODUCTS = [

  // ══════════════════════════════════════════
  // SMARTPHONES
  // ══════════════════════════════════════════
  {
    id: 1, category: 'smartphones', brand: 'Apple',
    name: 'iPhone 16 128GB',
    sku: 'MLU0001', price: 4299, oldPrice: 7999, discount: 46,
    rating: 4.9, reviews: 5821,
    img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-ultramarine?wid=600&hei=600&fmt=p-jpg&qlt=95',
    variants: [
      { label: 'Ultramarino', color: '#4f7dc2', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-ultramarine?wid=600&hei=600&fmt=p-jpg&qlt=95' },
      { label: 'Preto',       color: '#1d1d1f', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-black?wid=600&hei=600&fmt=p-jpg&qlt=95' },
      { label: 'Branco',      color: '#f5f5f0', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-white?wid=600&hei=600&fmt=p-jpg&qlt=95' },
      { label: 'Rosa',        color: '#f4b8c1', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-pink?wid=600&hei=600&fmt=p-jpg&qlt=95' },
      { label: 'Verde',       color: '#cde8d0', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-teal?wid=600&hei=600&fmt=p-jpg&qlt=95' },
    ],
    highlights: ['Chip A18 (3nm)', 'Câmera Fusion 48MP', 'Controle de Câmera físico', 'Tela 6,1" Super Retina XDR', 'USB-C', 'Bateria até 22h vídeo', 'IP68'],
    description: 'iPhone 16 com chip A18, o mais avançado já colocado num iPhone padrão. Câmera Fusion de 48MP com zoom óptico 2x e gravação 4K Dolby Vision a 120fps.',
    specs: [['Tela','6,1" OLED 2556×1179px 460ppi'],['CPU','Apple A18 (3nm)'],['RAM','8GB'],['Armazenamento','128GB'],['Câmera','48MP Fusion + 12MP ultrawide'],['Bateria','3561mAh – 22h vídeo'],['Sistema','iOS 18'],['Proteção','IP68']],
    reviewsData: [{ user: 'Carla M.', rating: 5, date: '20/11/2024', comment: 'Controle de Câmera fantástico!' }, { user: 'Paulo R.', rating: 5, date: '15/11/2024', comment: 'Bateria muito melhor que o 14.' }]
  },
  {
    id: 2, category: 'smartphones', brand: 'Apple',
    name: 'iPhone 16 Pro Max 256GB',
    sku: 'MLU0002', price: 7299, oldPrice: 10999, discount: 34,
    rating: 4.9, reviews: 4203,
    img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=600&hei=600&fmt=p-jpg&qlt=95',
    variants: [
      { label: 'Titânio Deserto', color: '#c8a882', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=600&hei=600&fmt=p-jpg&qlt=95' },
      { label: 'Titânio Natural', color: '#e3d0be', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-naturaltitanium?wid=600&hei=600&fmt=p-jpg&qlt=95' },
      { label: 'Titânio Branco',  color: '#f5f0eb', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-whitetitanium?wid=600&hei=600&fmt=p-jpg&qlt=95' },
      { label: 'Titânio Preto',   color: '#3a3a3c', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-blacktitanium?wid=600&hei=600&fmt=p-jpg&qlt=95' },
    ],
    highlights: ['Chip A18 Pro (3nm)', 'Câmera 48MP zoom 5x Tetra‑prism', 'Tela ProMotion XDR 6,9" 120Hz', 'Gravação 4K 120fps Dolby Vision', 'Botão de Ação', 'Titanium grau aeroespacial', 'IP68'],
    description: 'iPhone 16 Pro Max: o mais avançado com tela ProMotion 6,9", câmera zoom 5x Tetra-prism e chip A18 Pro para gravação 4K 120fps Dolby Vision.',
    specs: [['Tela','6,9" ProMotion OLED 2868×1320px 120Hz'],['CPU','Apple A18 Pro (3nm)'],['RAM','8GB'],['Armazenamento','256GB'],['Câmera','48MP + 48MP ultrawide + 12MP 5x'],['Bateria','4685mAh – 33h vídeo'],['Sistema','iOS 18'],['Proteção','IP68']],
    reviewsData: [{ user: 'Lucas F.', rating: 5, date: '18/11/2024', comment: 'Câmera zoom 5x absurda.' }, { user: 'Beatriz N.', rating: 5, date: '12/11/2024', comment: 'Tela ProMotion 6,9" é a mais bonita que já vi.' }]
  },
  {
    id: 3, category: 'smartphones', brand: 'Samsung',
    name: 'Samsung Galaxy S25 Ultra 256GB 5G',
    sku: 'MLU0003', price: 6499, oldPrice: 9999, discount: 35,
    rating: 4.8, reviews: 2891,
    img: 'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-ultra-sm-s938-sm-s938bzkcbro-thumb-544342679?$650_519_PNG$',
    variants: [
      { label: 'Titanium Black',       color: '#2d2d2d', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-ultra-sm-s938-sm-s938bzkcbro-thumb-544342679?$650_519_PNG$' },
      { label: 'Titanium Silver Blue',  color: '#8fa3b8', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-ultra-sm-s938-sm-s938bzsdbro-thumb-544342601?$650_519_PNG$' },
      { label: 'Titanium White Silver', color: '#e8e8e8', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-ultra-sm-s938-sm-s938bzsebro-thumb-544342605?$650_519_PNG$' },
      { label: 'Titanium Gray',         color: '#8a8a8a', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-ultra-sm-s938-sm-s938bzaabro-thumb-544342593?$650_519_PNG$' },
    ],
    highlights: ['Snapdragon 8 Elite', 'S Pen + Galaxy AI', 'Câmera 200MP zoom 10x', 'Dynamic AMOLED 2X 6,9"', '12GB RAM + 256GB', 'Bateria 5000mAh 45W', 'IP68'],
    description: 'Galaxy S25 Ultra com S Pen e Galaxy AI. Snapdragon 8 Elite, câmera 200MP com zoom 10x e Dynamic AMOLED 2X de 6,9 polegadas.',
    specs: [['Tela','6,9" AMOLED 2X 3088×1440px 120Hz'],['CPU','Snapdragon 8 Elite (3nm)'],['RAM','12GB'],['Armazenamento','256GB'],['Câmera','200MP+50MP+10MP+50MP'],['Bateria','5000mAh 45W'],['Sistema','Android 15 One UI 7'],['Proteção','IP68']],
    reviewsData: [{ user: 'Fernanda A.', rating: 5, date: '22/01/2025', comment: 'Galaxy AI melhorou muito!' }, { user: 'Roberto C.', rating: 5, date: '18/01/2025', comment: 'S Pen com IA é incrível para produtividade.' }]
  },
  {
    id: 4, category: 'smartphones', brand: 'Samsung',
    name: 'Samsung Galaxy S25+ 256GB 5G',
    sku: 'MLU0004', price: 4799, oldPrice: 7499, discount: 36,
    rating: 4.8, reviews: 1876,
    img: 'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-sm-s936-sm-s936bzkdbro-thumb-544342411?$650_519_PNG$',
    variants: [
      { label: 'Iceberg Blue',  color: '#a8c4d4', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-sm-s936-sm-s936bzbdbro-thumb-544342403?$650_519_PNG$' },
      { label: 'Mint',          color: '#b2d8c8', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-sm-s936-sm-s936bzgdbro-thumb-544342407?$650_519_PNG$' },
      { label: 'Phantom Black', color: '#1a1a1a', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-sm-s936-sm-s936bzkdbro-thumb-544342411?$650_519_PNG$' },
      { label: 'Silver Shadow',  color: '#d4d4d4', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-sm-s936-sm-s936bzsdbro-thumb-544342415?$650_519_PNG$' },
    ],
    highlights: ['Snapdragon 8 Elite', 'Câmera tripla 50MP OIS', 'AMOLED 2X 6,7" 120Hz', '12GB RAM + 256GB', 'Bateria 4900mAh 45W', 'Sem fio 15W', 'IP68'],
    description: 'Galaxy S25+ com Snapdragon 8 Elite, câmera tripla 50MP e AMOLED 2X 6,7". Galaxy AI embarcada para tarefas inteligentes no dia a dia.',
    specs: [['Tela','6,7" AMOLED 2X 3088×1440px 120Hz'],['CPU','Snapdragon 8 Elite'],['RAM','12GB'],['Armazenamento','256GB'],['Câmera','50MP OIS+12MP+10MP 3x'],['Bateria','4900mAh 45W'],['Sistema','Android 15 One UI 7'],['Proteção','IP68']],
    reviewsData: [{ user: 'Thiago M.', rating: 5, date: '20/01/2025', comment: 'Design elegantíssimo. Tela linda!' }]
  },
  {
    id: 5, category: 'smartphones', brand: 'Samsung',
    name: 'Samsung Galaxy A56 5G 128GB 8GB RAM',
    sku: 'MLU0005', price: 1799, oldPrice: 2999, discount: 40,
    rating: 4.7, reviews: 3214,
    img: 'https://images.samsung.com/is/image/samsung/p6pim/br/sm-a566blbpzto/gallery/br-galaxy-a56-5g-sm-a566blbpzto-thumb?$650_519_PNG$',
    variants: [
      { label: 'Azul',   color: '#3d7abf', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/sm-a566blbpzto/gallery/br-galaxy-a56-5g-sm-a566blbpzto-thumb?$650_519_PNG$' },
      { label: 'Branco', color: '#f0f0f0', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/sm-a566bzwpzto/gallery/br-galaxy-a56-5g-sm-a566bzwpzto-thumb?$650_519_PNG$' },
      { label: 'Preto',  color: '#1a1a1a', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/sm-a566bzkpzto/gallery/br-galaxy-a56-5g-sm-a566bzkpzto-thumb?$650_519_PNG$' },
    ],
    highlights: ['Super AMOLED+ 6,7" 120Hz', 'Exynos 1580 (4nm)', 'Câmera 50MP OIS', '5G ultrarrápido', '8GB RAM + 128GB', 'Bateria 5000mAh 45W', 'IP67'],
    description: 'Galaxy A56 5G com Exynos 1580, tela Super AMOLED+ 120Hz e câmera 50MP com OIS. O melhor custo-benefício da Samsung com 5G.',
    specs: [['Tela','6,7" Super AMOLED+ FHD+ 120Hz'],['CPU','Exynos 1580 (4nm)'],['RAM','8GB'],['Armazenamento','128GB'],['Câmera','50MP OIS+12MP+5MP'],['Bateria','5000mAh 45W'],['Sistema','Android 15 One UI 7'],['Proteção','IP67']],
    reviewsData: [{ user: 'Camila S.', rating: 5, date: '10/02/2025', comment: 'Tela linda. Custo-benefício imbatível!' }]
  },
  {
    id: 6, category: 'smartphones', brand: 'Motorola',
    name: 'Motorola Edge 50 Pro 512GB 12GB RAM 5G',
    sku: 'MLU0006', price: 1899, oldPrice: 3499, discount: 46,
    rating: 4.7, reviews: 1543,
    img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop&q=85',
    variants: [
      { label: 'Black Beauty',    color: '#1a1a1a', img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop&q=85' },
      { label: 'Moonlight Pearl', color: '#e8e4f0', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&q=85' },
      { label: 'Luxe Lavender',   color: '#c9b8d8', img: 'https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=600&h=600&fit=crop&q=85' },
    ],
    highlights: ['pOLED curva 6,7" 144Hz', 'Câmera 50MP Sony LYTIA OIS', 'Snapdragon 7 Gen 3 (4nm)', 'TurboPower 125W – 100% em 22min', '12GB RAM + 512GB', 'Dolby Atmos estéreo', 'IP68'],
    description: 'Motorola Edge 50 Pro com pOLED curva 144Hz, câmera Sony LYTIA com OIS e TurboPower 125W que vai de 0 a 100% em apenas 22 minutos.',
    specs: [['Tela','6,7" pOLED curva 2712×1220px 144Hz'],['CPU','Snapdragon 7 Gen 3'],['RAM','12GB LPDDR5'],['Armazenamento','512GB'],['Câmera','50MP Sony+13MP+10MP 3x'],['Bateria','4500mAh TurboPower 125W'],['Sistema','Android 14'],['Proteção','IP68']],
    reviewsData: [{ user: 'Lucas P.', rating: 5, date: '14/11/2024', comment: '125W é absurdo! 20 minutos e bateria para o dia todo.' }]
  },
  {
    id: 7, category: 'smartphones', brand: 'Xiaomi',
    name: 'Xiaomi 15 Ultra 512GB 16GB RAM 5G Câmera Leica',
    sku: 'MLU0007', price: 4999, oldPrice: 8999, discount: 44,
    rating: 4.9, reviews: 987,
    img: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&h=600&fit=crop&q=85',
    variants: [
      { label: 'Titanium Black', color: '#2a2a2a', img: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&h=600&fit=crop&q=85' },
      { label: 'Titanium White', color: '#f0ede8', img: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop&q=85' },
    ],
    highlights: ['Snapdragon 8 Elite (3nm)', 'Leica Summilux 4 câmeras', 'Sensor Sony LYT-900 1 polegada', 'HyperCharge 90W + sem fio 80W', 'AMOLED 6,73" 120Hz', '16GB LPDDR5X + 512GB', 'IP68'],
    description: 'Xiaomi 15 Ultra co-desenvolvido com Leica. Sensor Sony de 1 polegada, abertura variável f/1.63-f/4.0, Snapdragon 8 Elite e HyperCharge 90W.',
    specs: [['Tela','6,73" AMOLED 3200×1440px 120Hz'],['CPU','Snapdragon 8 Elite (3nm)'],['RAM','16GB LPDDR5X'],['Armazenamento','512GB UFS 4.0'],['Câmera','50MP f/1.63 sensor 1" + 3x mais'],['Bateria','5500mAh 90W+sem fio 80W'],['Sistema','Android 15 HyperOS 2'],['Proteção','IP68']],
    reviewsData: [{ user: 'Pedro A.', rating: 5, date: '25/01/2025', comment: 'Sensor de 1 polegada Leica é brutal.' }]
  },

  // ══════════════════════════════════════════
  // NOTEBOOKS
  // ══════════════════════════════════════════
  {
    id: 8, category: 'notebooks', brand: 'Apple',
    name: 'MacBook Pro 14" M4 Pro 24GB 512GB SSD',
    sku: 'MLU0008', price: 14999, oldPrice: 22999, discount: 35,
    rating: 4.9, reviews: 1432,
    img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202410?wid=600&hei=600&fmt=jpeg&qlt=95',
    variants: [
      { label: 'Preto Espacial', color: '#1d1d1f', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202410?wid=600&hei=600&fmt=jpeg&qlt=95' },
      { label: 'Prateado',       color: '#e3e4e6', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-silver-select-202410?wid=600&hei=600&fmt=jpeg&qlt=95' },
    ],
    highlights: ['Chip M4 Pro CPU 14 núcleos GPU 20 núcleos', '24GB memória unificada', 'SSD NVMe 512GB', 'Liquid Retina XDR 14,2" 120Hz ProMotion', 'Até 24h de bateria', '3x Thunderbolt 5 + HDMI 2.1', 'Thunderbolt 5 a 120Gb/s'],
    description: 'MacBook Pro 14" com M4 Pro: CPU 14 núcleos, GPU 20 núcleos, até 24 horas de bateria e Thunderbolt 5 com 120Gb/s.',
    specs: [['Tela','14,2" Liquid Retina XDR 3024×1964px 120Hz'],['CPU','Apple M4 Pro (14 CPU / 20 GPU)'],['Memória','24GB unificada'],['Armazenamento','512GB NVMe'],['Bateria','até 24 horas'],['Portas','3x Thunderbolt 5, HDMI 2.1, SD, MagSafe 3'],['Sistema','macOS Sequoia'],['Peso','1,62kg']],
    reviewsData: [{ user: 'Carolina F.', rating: 5, date: '02/12/2024', comment: 'M4 Pro é um salto enorme. Edição 8K RAW sem soluços.' }, { user: 'Tiago L.', rating: 5, date: '28/11/2024', comment: '24h de bateria confirmado no dia a dia.' }]
  },
  {
    id: 9, category: 'notebooks', brand: 'Dell',
    name: 'Notebook Dell XPS 16 Core Ultra 9 32GB RTX 4070 OLED',
    sku: 'MLU0009', price: 12999, oldPrice: 20999, discount: 38,
    rating: 4.9, reviews: 743,
    img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&h=600&fit=crop&q=85',
    variants: [
      { label: 'Prata Platina', color: '#c8c8c8', img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&h=600&fit=crop&q=85' },
    ],
    highlights: ['Intel Core Ultra 9 185H 16 núcleos', 'NVIDIA RTX 4070 8GB GDDR6', '32GB LPDDR5x 6400MHz', 'SSD 1TB PCIe Gen 4', 'Tela OLED 4K+ 16" 120Hz 100% DCI-P3', 'Bateria 99,5Wh carga 130W', '1,96kg'],
    description: 'Dell XPS 16 com tela OLED 4K+ 16" e 100% DCI-P3. Core Ultra 9 + RTX 4070 para renderizacao 3D, edicao 4K e AI workloads.',
    specs: [['Tela','16" OLED 3840×2400px 120Hz 100% DCI-P3'],['CPU','Intel Core Ultra 9 185H (16 nucleos)'],['RAM','32GB LPDDR5x 6400MHz'],['Armazenamento','1TB NVMe PCIe Gen 4'],['GPU','RTX 4070 8GB GDDR6'],['Bateria','99,5Wh – carga 130W USB-C'],['Sistema','Windows 11 Home'],['Peso','1,96kg']],
    reviewsData: [{ user: 'Andre S.', rating: 5, date: '10/12/2024', comment: 'OLED 4K com cores perfeitas para Motion Design.' }]
  },
  {
    id: 10, category: 'notebooks', brand: 'Samsung',
    name: 'Samsung Galaxy Book5 Pro 14" Intel Ultra 7 16GB AMOLED',
    sku: 'MLU0010', price: 8999, oldPrice: 13999, discount: 36,
    rating: 4.8, reviews: 621,
    img: 'https://images.samsung.com/is/image/samsung/p6pim/br/np940xma-kb1br/gallery/br-galaxy-book5-pro-np940xma-np940xma-kb1br-thumb?$650_519_PNG$',
    variants: [
      { label: 'Moonstone Gray',  color: '#5a5a5a', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/np940xma-kb1br/gallery/br-galaxy-book5-pro-np940xma-np940xma-kb1br-thumb?$650_519_PNG$' },
      { label: 'Platinum Silver', color: '#c8c8c8', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/np940xma-ks1br/gallery/br-galaxy-book5-pro-np940xma-np940xma-ks1br-thumb?$650_519_PNG$' },
    ],
    highlights: ['Intel Core Ultra 7 258V (4nm)', '16GB LPDDR5x', 'AMOLED 2K 14" 120Hz', 'SSD 512GB NVMe Gen 4', 'Ate 25h de bateria', 'Galaxy AI + Copilot+', '1,23kg ultraslim'],
    description: 'Samsung Galaxy Book5 Pro: tela AMOLED 2K 120Hz, Intel Core Ultra 7 com NPU para Galaxy AI e autonomia de ate 25 horas em apenas 1,23kg.',
    specs: [['Tela','14" AMOLED 2880×1800px 120Hz'],['CPU','Intel Core Ultra 7 258V (4nm)'],['RAM','16GB LPDDR5x'],['Armazenamento','512GB NVMe Gen 4'],['Bateria','ate 25 horas'],['Conectividade','Wi-Fi 6E, BT 5.3, TB4x2, USB-C, HDMI'],['Sistema','Windows 11 Home'],['Peso','1,23kg']],
    reviewsData: [{ user: 'Patricia M.', rating: 5, date: '15/01/2025', comment: '1,23kg e bateria que dura o dia todo. Melhor ultrabook!' }]
  },
  {
    id: 11, category: 'notebooks', brand: 'Lenovo',
    name: 'Notebook Lenovo Legion 5i Pro Core i7 32GB RTX 4060 165Hz',
    sku: 'MLU0011', price: 5999, oldPrice: 9999, discount: 40,
    rating: 4.8, reviews: 1123,
    img: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=600&h=600&fit=crop&q=85',
    variants: [
      { label: 'Storm Grey', color: '#555', img: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=600&h=600&fit=crop&q=85' },
    ],
    highlights: ['Intel Core i7-13700HX 16 nucleos', 'RTX 4060 8GB GDDR6', '32GB DDR5 5600MHz', 'SSD 1TB PCIe Gen 4', 'IPS 16" 2560x1600 165Hz', 'ColdFront 5.0 resfriamento', 'RGB por tecla'],
    description: 'Legion 5i Pro: RTX 4060 + Core i7-13700HX com ColdFront 5.0 para maximo desempenho em todos os jogos sem throttling.',
    specs: [['Tela','16" IPS 2560×1600px 165Hz'],['CPU','Core i7-13700HX (16 nucleos)'],['RAM','32GB DDR5 5600MHz'],['Armazenamento','1TB NVMe PCIe Gen 4'],['GPU','RTX 4060 8GB GDDR6'],['Bateria','80Wh 135W'],['Sistema','Windows 11 Home']],
    reviewsData: [{ user: 'Diego M.', rating: 5, date: '16/11/2024', comment: 'Tudo no ultra sem engasgar. Resfriamento excepcional!' }]
  },

  // ══════════════════════════════════════════
  // SMART TVs
  // ══════════════════════════════════════════
  {
    id: 12, category: 'tvs', brand: 'LG',
    name: 'Smart TV LG OLED evo C4 65" 4K 120Hz webOS 24',
    sku: 'MLU0012', price: 5499, oldPrice: 9999, discount: 45,
    rating: 4.9, reviews: 2876,
    img: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&h=600&fit=crop&q=85',
    variants: [
      { label: '55"', color: '#444', img: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&h=600&fit=crop&q=85' },
      { label: '65"', color: '#555', img: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&h=600&fit=crop&q=85' },
      { label: '77"', color: '#666', img: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&h=600&fit=crop&q=85' },
      { label: '83"', color: '#777', img: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&h=600&fit=crop&q=85' },
    ],
    highlights: ['OLED evo – preto absoluto', 'Processador a9 Gen7 AI', 'Dolby Vision IQ + Dolby Atmos', '120Hz NVIDIA G-Sync', '4x HDMI 2.1 (48Gbps)', 'webOS 24 ThinQ AI', 'Input lag 1ms gamer'],
    description: 'LG OLED evo C4: o melhor OLED do mercado com processador a9 Gen7 AI. Preto absoluto, contraste infinito e 4x HDMI 2.1 para PS5 e Xbox Series X.',
    specs: [['Tamanho','65 pol.'],['Resolucao','4K 3840×2160px'],['Painel','OLED evo'],['Taxa','120Hz G-Sync + FreeSync'],['HDR','Dolby Vision IQ, HDR10, HLG'],['Audio','60W Dolby Atmos'],['Smart TV','webOS 24, ThinQ AI, AirPlay 2'],['HDMI','4x HDMI 2.1 48Gbps']],
    reviewsData: [{ user: 'Marcos V.', rating: 5, date: '05/11/2024', comment: 'PS5 no OLED C4 e outro nivel!' }, { user: 'Silvia T.', rating: 5, date: '01/11/2024', comment: 'Melhor TV que ja vi em toda minha vida.' }]
  },
  {
    id: 13, category: 'tvs', brand: 'Samsung',
    name: 'Smart TV Samsung OLED S90D 65" 4K 144Hz QD-OLED',
    sku: 'MLU0013', price: 6999, oldPrice: 11999, discount: 42,
    rating: 4.8, reviews: 1243,
    img: 'https://images.samsung.com/is/image/samsung/p6pim/br/qe65s90daexzd/gallery/br-oled-s90d-qe65s90daexzd-thumb-539897046?$650_519_PNG$',
    variants: [
      { label: '55"', color: '#333', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/qe65s90daexzd/gallery/br-oled-s90d-qe65s90daexzd-thumb-539897046?$650_519_PNG$' },
      { label: '65"', color: '#333', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/qe65s90daexzd/gallery/br-oled-s90d-qe65s90daexzd-thumb-539897046?$650_519_PNG$' },
      { label: '77"', color: '#333', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/qe65s90daexzd/gallery/br-oled-s90d-qe65s90daexzd-thumb-539897046?$650_519_PNG$' },
    ],
    highlights: ['Painel QD-OLED Samsung', 'Neural Quantum Processor 4K', '144Hz ultrasuave', 'Tela One Design', 'HDR10+ e Dolby Vision', 'Gaming Hub integrado', '4x HDMI 2.1'],
    description: 'Samsung OLED S90D com QD-OLED: pontos quanticos + OLED para cores mais vivas e brilho maior. 144Hz para gaming impecavel.',
    specs: [['Tamanho','65 pol.'],['Resolucao','4K 3840×2160px'],['Painel','QD-OLED'],['Taxa','144Hz VRR'],['HDR','HDR10+, Dolby Vision, HLG'],['Audio','60W OTS+'],['Smart TV','Tizen OS, Gaming Hub, Bixby, Alexa'],['HDMI','4x HDMI 2.1']],
    reviewsData: [{ user: 'Eduardo B.', rating: 5, date: '18/11/2024', comment: 'QD-OLED e a melhor tecnologia de TV. Cores incrivel!' }]
  },

  // ══════════════════════════════════════════
  // GAMES
  // ══════════════════════════════════════════
  {
    id: 14, category: 'games', brand: 'Sony',
    name: 'PlayStation 5 Pro Console 2TB SSD + DualSense',
    sku: 'MLU0014', price: 4999, oldPrice: 7499, discount: 33,
    rating: 4.9, reviews: 3892,
    img: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&h=600&fit=crop&q=85',
    variants: [
      { label: 'Branco', color: '#f0f0f0', img: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&h=600&fit=crop&q=85' },
    ],
    highlights: ['GPU 67% mais rapida que PS5 original', 'SSD 2TB ultrarapido', 'PSSR upscaling por IA', 'Ray Tracing aprimorado', 'Wi-Fi 7', 'DualSense feedback tatico', 'Retrocompat. com PS4'],
    description: 'PlayStation 5 Pro: GPU 67% mais rapida, PSSR para upscaling por IA e SSD 2TB. Ray tracing aprimorado e Wi-Fi 7.',
    specs: [['CPU','AMD Zen 2 8 nucleos 3,85GHz'],['GPU','AMD RDNA – 67% mais rapida'],['RAM','16GB GDDR6'],['Armazenamento','SSD NVMe 2TB'],['Resolucao','4K 60/120fps'],['Wi-Fi','Wi-Fi 7 (802.11be)']],
    reviewsData: [{ user: 'Felipe G.', rating: 5, date: '15/11/2024', comment: 'PSSR e impressionante. Spider-Man 2 Fidelidade + 60fps!' }, { user: 'Juliana K.', rating: 5, date: '10/11/2024', comment: 'GPU 67% mais rapida e perceptivel em tudo.' }]
  },
  {
    id: 15, category: 'games', brand: 'Microsoft',
    name: 'Xbox Series X Console 1TB SSD 4K 120fps + Game Pass 3 meses',
    sku: 'MLU0015', price: 2999, oldPrice: 4999, discount: 40,
    rating: 4.8, reviews: 2671,
    img: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600&h=600&fit=crop&q=85',
    variants: [
      { label: 'Preto', color: '#1a1a1a', img: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600&h=600&fit=crop&q=85' },
    ],
    highlights: ['12 teraflops de poder grafico', 'SSD NVMe 1TB Velocity', 'Quick Resume multiplos jogos', 'Retrocompat. 4 geracoes Xbox', 'Auto HDR + FPS Boost', 'Game Pass Ultimate 3 meses', 'HDMI 2.1 4K 120fps'],
    description: 'Xbox Series X com Game Pass Ultimate 3 meses incluso. 12 teraflops, Quick Resume, 4K 120fps e Auto HDR automatico.',
    specs: [['CPU','AMD Zen 2 8 nucleos 3,8GHz'],['GPU','AMD RDNA 2 – 12 TF'],['RAM','16GB GDDR6'],['Armazenamento','SSD NVMe 1TB'],['Resolucao','ate 4K/120fps'],['Midia','UHD Blu-ray 4K'],['Conectividade','HDMI 2.1, USB×3, Wi-Fi 6']],
    reviewsData: [{ user: 'Rodrigo C.', rating: 5, date: '20/11/2024', comment: 'Quick Resume e funcionalidade que nao vivo sem!' }]
  },
  {
    id: 16, category: 'games', brand: 'Nintendo',
    name: 'Nintendo Switch 2 Standard + Controles Joy-Con 2',
    sku: 'MLU0016', price: 2799, oldPrice: 3999, discount: 30,
    rating: 4.9, reviews: 4231,
    img: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=600&fit=crop&q=85',
    variants: [
      { label: 'Branco', color: '#f5f5f5', img: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=600&fit=crop&q=85' },
      { label: 'Preto',  color: '#1a1a1a', img: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&h=600&fit=crop&q=85' },
    ],
    highlights: ['Tela LCD 7,9" 1080p portatil', 'Saida 4K na TV via HDMI 2.0', 'Joy-Con 2 com botao C (mouse)', 'GameChat integrado', 'Retrocompat. jogos Switch', 'Mais potente que Switch original', 'Dock com USB-C'],
    description: 'Nintendo Switch 2: maior, mais potente, com Joy-Con 2 que funcionam como mouse. Tela 1080p portatil, 4K na TV e retrocompatibilidade.',
    specs: [['Tela','7,9" LCD 1920×1080px'],['Saida TV','4K via HDMI 2.0'],['Armazenamento','256GB + microSDXC'],['Conectividade','Wi-Fi 6, Bluetooth 5.0, USB-C'],['Peso','~400g sem Joy-Con']],
    reviewsData: [{ user: 'Sofia B.', rating: 5, date: '10/04/2025', comment: 'Joy-Con 2 como mouse e genial. Mario Kart World em 4K!' }]
  },

  // ══════════════════════════════════════════
  // ÁUDIO
  // ══════════════════════════════════════════
  {
    id: 17, category: 'audio', brand: 'Sony',
    name: 'Fone Sony WH-1000XM5 Bluetooth ANC 30h Hi-Res',
    sku: 'MLU0017', price: 1399, oldPrice: 2499, discount: 44,
    rating: 4.9, reviews: 5312,
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&q=85',
    variants: [
      { label: 'Preto', color: '#1a1a1a', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&q=85' },
      { label: 'Prata', color: '#c8c8c8', img: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop&q=85' },
    ],
    highlights: ['Melhor ANC do mercado – 8 microfones', '2 processadores V1 + QN1', 'Drivers 30mm exclusivos', '30h bateria com ANC', 'Carga rapida: 3min = 3h', 'LDAC hi-res 990kbps', 'Speak-to-Chat, Multi-point'],
    description: 'Sony WH-1000XM5: melhor ANC do mundo por 5 anos consecutivos. 8 microfones + dois processadores para silencio total. LDAC transmite audio 3x mais detalhado.',
    specs: [['Driver','30mm circular'],['Frequencia','4Hz – 40kHz'],['ANC','8 microfones + V1+QN1'],['Bateria','30h ANC / 40h sem ANC'],['Carga','USB-C 3min=3h'],['Codecs','LDAC, AAC, SBC'],['Bluetooth','5.2 Multi-point'],['Peso','250g']],
    reviewsData: [{ user: 'Amanda V.', rating: 5, date: '14/11/2024', comment: 'ANC cancela motor de aviao completamente. Magnifico.' }, { user: 'Henrique D.', rating: 5, date: '07/11/2024', comment: 'Coloco o fone e entro em outro mundo.' }]
  },
  {
    id: 18, category: 'audio', brand: 'Apple',
    name: 'AirPods Pro 2 Geracao USB-C ANC Audio Espacial 30h',
    sku: 'MLU0018', price: 1699, oldPrice: 2999, discount: 43,
    rating: 4.9, reviews: 8234,
    img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MXK73?wid=600&hei=600&fmt=jpeg&qlt=95',
    variants: [
      { label: 'Branco', color: '#f5f5f0', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MXK73?wid=600&hei=600&fmt=jpeg&qlt=95' },
    ],
    highlights: ['Chip H2 – ANC 2x mais potente', 'Modo Transparencia Adaptativa', 'Audio Espacial Personalizado', '30h total com case USB-C', 'IPX4 fone + IPX4 case', 'Volume adaptativo automatico', 'Encontrar de precisao'],
    description: 'AirPods Pro 2 com chip H2: ANC duas vezes mais potente, Modo Transparencia Adaptativa, Audio Espacial Personalizado e 30h de autonomia total com case USB-C.',
    specs: [['Chip','Apple H2'],['Bateria','6h (fone) + 24h (case) = 30h'],['Resistencia','IPX4 fone + IPX4 case'],['Conectividade','Bluetooth 5.3'],['Case','USB-C + MagSafe + Apple Watch'],['Peso','5,3g/fone + 50,3g case']],
    reviewsData: [{ user: 'Tatiana R.', rating: 5, date: '21/11/2024', comment: 'ANC fenomenal. Melhor TWS que ja tive!' }, { user: 'Gustavo P.', rating: 5, date: '14/11/2024', comment: 'Transparencia Adaptativa e magica.' }]
  },
  {
    id: 19, category: 'audio', brand: 'JBL',
    name: 'Caixa de Som JBL Charge 5 Bluetooth 40W IPX7 20h',
    sku: 'MLU0019', price: 699, oldPrice: 1499, discount: 53,
    rating: 4.8, reviews: 4821,
    img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop&q=85',
    variants: [
      { label: 'Preta',     color: '#1a1a1a', img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop&q=85' },
      { label: 'Azul',      color: '#2255aa', img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=600&fit=crop&q=85' },
      { label: 'Vermelha',  color: '#cc2222', img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop&q=85' },
    ],
    highlights: ['40W RMS potencia total', 'Bluetooth 5.1 alcance 10m', '20h de autonomia', 'Carrega dispositivos USB', 'IPX7 – 1m por 30min', 'PartyBoost multiplas caixas', 'Woofer e tweeter separados'],
    description: 'JBL Charge 5: 40W de som imersivo, 20h de bateria, IPX7 submersivel e carrega seu celular. PartyBoost conecta multiplas caixas JBL.',
    specs: [['Potencia','40W RMS'],['Frequencia','65Hz – 20kHz'],['Bluetooth','5.1 – 10m'],['Bateria','20 horas'],['Resistencia','IPX7'],['Carga externa','USB-A 5V/2.4A'],['Dimensoes','220×96×97mm, 960g']],
    reviewsData: [{ user: 'Camila S.', rating: 5, date: '09/11/2024', comment: 'Levei para praia, submergi e funcionou perfeitamente!' }]
  },

  // ══════════════════════════════════════════
  // WEARABLES
  // ══════════════════════════════════════════
  {
    id: 20, category: 'wearables', brand: 'Apple',
    name: 'Apple Watch Series 10 GPS 46mm Aluminio',
    sku: 'MLU0020', price: 3499, oldPrice: 5499, discount: 36,
    rating: 4.9, reviews: 3421,
    img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s10-case-unselect-gallery-2-202409?wid=600&hei=600&fmt=jpeg&qlt=95',
    variants: [
      { label: 'Jet Black 46mm', color: '#1d1d1f', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s10-case-unselect-gallery-2-202409?wid=600&hei=600&fmt=jpeg&qlt=95' },
      { label: 'Rose Gold 46mm', color: '#d4a090', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s10-rosegold-unselect-gallery-2-202409?wid=600&hei=600&fmt=jpeg&qlt=95' },
      { label: 'Silver 42mm',    color: '#e3e4e6', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s10-silver-unselect-gallery-2-202409?wid=600&hei=600&fmt=jpeg&qlt=95' },
    ],
    highlights: ['Design mais fino de todos os tempos (9,7mm)', 'Chip S10 mais rapido', 'Tela Super Retina XDR maior', 'Treino de mergulho + apneia', 'ECG + SpO2 + temperatura', 'Deteccao acidente e queda', 'Carregamento USB-C'],
    description: 'Apple Watch Series 10: o mais fino, 9,7mm. Tela maior, chip S10, rastreamento de mergulho e apneia, ECG, SpO2 e temperatura.',
    specs: [['Tamanho','46mm'],['Chip','S10 SiP'],['Espessura','9,7mm – mais fino'],['Tela','LTPO OLED Always-On brilhante'],['Sensores','ECG, SpO2, Temperatura, Profundidade'],['Bateria','18h / 36h Low Power'],['Resistencia','WR50 + mergulho']],
    reviewsData: [{ user: 'Isabela F.', rating: 5, date: '28/10/2024', comment: 'Mais fino e bonito. Rastreamento de mergulho perfeito!' }]
  },
  {
    id: 21, category: 'wearables', brand: 'Samsung',
    name: 'Galaxy Watch Ultra 47mm 4G LTE Titanium',
    sku: 'MLU0021', price: 2999, oldPrice: 5499, discount: 45,
    rating: 4.8, reviews: 1432,
    img: 'https://images.samsung.com/is/image/samsung/p6pim/br/sm-l705fzmazto/gallery/br-galaxy-watch-ultra-sm-l705-sm-l705fzmazto-thumb-541209088?$650_519_PNG$',
    variants: [
      { label: 'Titanium White',  color: '#e8e8e6', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/sm-l705fzmazto/gallery/br-galaxy-watch-ultra-sm-l705-sm-l705fzmazto-thumb-541209088?$650_519_PNG$' },
      { label: 'Titanium Black',  color: '#2a2a2a', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/sm-l705fzkszto/gallery/br-galaxy-watch-ultra-sm-l705-sm-l705fzkszto-thumb-541209080?$650_519_PNG$' },
      { label: 'Titanium Silver', color: '#c8c8c8', img: 'https://images.samsung.com/is/image/samsung/p6pim/br/sm-l705fzsszto/gallery/br-galaxy-watch-ultra-sm-l705-sm-l705fzsszto-thumb-541209084?$650_519_PNG$' },
    ],
    highlights: ['Titanium ultrarresistente', 'Super AMOLED 1,5" 3000nits pico', 'Mergulho ate 100m', 'ECG + pressao arterial + SpO2', 'Bateria ate 60h modo longa duracao', '4G LTE independente do celular', 'MIL-STD-810U'],
    description: 'Galaxy Watch Ultra: estrutura Titanium, mergulho ate 100m, bateria de 60h e 4G LTE independente. 3000nits de brilho legivel em qualquer luz.',
    specs: [['Tamanho','47mm'],['Material','Titanium Grade 4'],['Tela','Super AMOLED 1,5" 480×480px 3000nits'],['Bateria','590mAh – ate 60h'],['Resistencia','10ATM + MIL-STD-810U'],['Conectividade','4G LTE, Wi-Fi 5, BT 5.3, NFC'],['Armazenamento','32GB']],
    reviewsData: [{ user: 'Carlos B.', rating: 5, date: '20/07/2024', comment: 'Titanium, 4G, mergulho. Perfeito para aventuras extremas!' }]
  },

  // ══════════════════════════════════════════
  // CÂMERAS
  // ══════════════════════════════════════════
  {
    id: 22, category: 'cameras', brand: 'Sony',
    name: 'Camera Sony Alpha ZV-E10 II APS-C 26MP 4K 120fps',
    sku: 'MLU0022', price: 3499, oldPrice: 5999, discount: 42,
    rating: 4.8, reviews: 1243,
    img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop&q=85',
    variants: [
      { label: 'Preta', color: '#1a1a1a', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop&q=85' },
      { label: 'Branca', color: '#f0f0f0', img: 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=600&h=600&fit=crop&q=85' },
    ],
    highlights: ['Sensor APS-C Exmor R BSI 26.1MP', '4K 60fps / 4K 120fps slow motion', 'Eye AF em tempo real', 'Video vertical nativo Reels/TikTok', 'Microfone 3 capsulas direcional', 'Tela touch articulada 3"', 'Todas as lentes Sony E-mount'],
    description: 'Sony ZV-E10 II: camera vlog de 2a geracao com sensor BSI 26MP, 4K 120fps para slow motion e modo video vertical nativo.',
    specs: [['Sensor','APS-C Exmor R BSI 26.1MP'],['Video','4K 60fps / 4K 120fps / 1080p 240fps'],['AF','Eye AF Tempo Real'],['Microfone','3 capsulas + entrada P2'],['Tela','3" touch articulada'],['ISO','100–51200'],['Bateria','NP-FW50 – 340 disparos'],['Peso','291g']],
    reviewsData: [{ user: 'Bruna F.', rating: 5, date: '20/12/2024', comment: '4K 120fps absurdo para slow motion. Modo vertical e diferencial enorme.' }]
  },

  // ══════════════════════════════════════════
  // ELETROS
  // ══════════════════════════════════════════
  {
    id: 23, category: 'eletros', brand: 'Samsung',
    name: 'Geladeira Samsung French Door 460L Inox SpaceMax A+++',
    sku: 'MLU0023', price: 4299, oldPrice: 7999, discount: 46,
    rating: 4.7, reviews: 1243,
    img: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&h=600&fit=crop&q=85',
    variants: [
      { label: 'Inox',   color: '#b0b0b0', img: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&h=600&fit=crop&q=85' },
      { label: 'Branca', color: '#f5f5f5', img: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&h=600&fit=crop&q=85' },
    ],
    highlights: ['460L capacidade total', 'SpaceMax – parede fina mais espaco', 'Digital Inverter – 10 anos garantia', 'All-Around Cooling uniforme', 'Gaveta FlexZone 4 temperaturas', 'Frost Free total', 'Classe A+++'],
    description: 'Samsung French Door 460L com SpaceMax: isolamento de parede fina para mais espaco interno. Digital Inverter economiza ate 46% de energia.',
    specs: [['Capacidade','460L (296L + 164L)'],['Compressor','Digital Inverter (10 anos)'],['Classe','A+++ – 391kWh/ano'],['Tipo','French Door + FlexZone'],['Dimensoes','178×91×71cm'],['Tensao','Bivolt']],
    reviewsData: [{ user: 'Lucia R.', rating: 5, date: '10/11/2024', comment: 'Espacosa, silenciosíssima e temperatura uniforme!' }]
  },
  {
    id: 24, category: 'eletros', brand: 'Philips',
    name: 'Aspirador Robo Philips HomeRun 7000 3000Pa Wi-Fi + Estacao Auto-Esvaziamento',
    sku: 'MLU0024', price: 2499, oldPrice: 4999, discount: 50,
    rating: 4.7, reviews: 987,
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&q=85',
    variants: [
      { label: 'Preto', color: '#1a1a1a', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&q=85' },
    ],
    highlights: ['Mapeamento IA por camera visual', 'Succao 3000Pa ultra-potente', 'Estacao auto-esvaziamento 60 dias', 'Mopa integrada – aspira + lava', 'Autonomia 120min por ciclo', 'App + Alexa + Google Home', 'Filtro HEPA 99,97%'],
    description: 'Philips HomeRun 7000 com estacao de auto-esvaziamento: 60 dias sem precisar esvaziar. IA por camera visual, succao 3000Pa e mopa integrada.',
    specs: [['Succao','3000Pa'],['Mapeamento','Camera visual com IA'],['Autonomia','120 minutos'],['Reservatorio','500ml po / 200ml agua'],['Estacao','auto-esvaziamento 60 dias'],['Filtro','HEPA 99,97%'],['Conectividade','Wi-Fi + Alexa + Google']],
    reviewsData: [{ user: 'Sandra B.', rating: 5, date: '05/11/2024', comment: 'Nunca mais passo aspirador! Mopa molhada funciona muito bem.' }]
  },
];

// ══════════════════════════════════════════
// CART
// ══════════════════════════════════════════
let cart = JSON.parse(localStorage.getItem('magaluCart') || '[]');
function saveCart() { localStorage.setItem('magaluCart', JSON.stringify(cart)); }

function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const imgEl = document.getElementById('pimg-' + id);
  const currentImg = imgEl ? imgEl.src : p.img;
  const ex = cart.find(i => i.id === id);
  if (ex) ex.qty++;
  else cart.push({ id, name: p.name, price: p.price, qty: 1, img: currentImg });
  saveCart(); updateCartBadge(); renderCart(); openCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart(); updateCartBadge(); renderCart();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else { saveCart(); renderCart(); updateCartBadge(); }
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
    if (footer) footer.innerHTML = '';
    return;
  }
  el.innerHTML = cart.map(item => `
    <div class="cart-item">
      ${item.img ? '<img src="' + item.img + '" style="width:52px;height:52px;object-fit:contain;border-radius:6px;background:#f5f5f5;flex-shrink:0" onerror="this.style.display=\'none\'">' : ''}
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}</div>
        <div class="cart-item-qty">
          <button onclick="changeQty(${item.id}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${item.id}, 1)">+</button>
          <button class="cart-remove" onclick="removeFromCart(${item.id})">🗑</button>
        </div>
      </div>
    </div>`).join('');
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  if (footer) footer.innerHTML = `
    <div class="cart-total-row"><span>Subtotal:</span><strong>R$ ${total.toFixed(2).replace('.', ',')}</strong></div>
    <div class="cart-total-row pix"><span>💚 No Pix (-5%):</span><strong>R$ ${(total * 0.95).toFixed(2).replace('.', ',')}</strong></div>
    <button class="btn-checkout" onclick="alert('Compra realizada com sucesso! Obrigado por comprar no Magalu!')">Finalizar Compra</button>`;
}

// ══════════════════════════════════════════
// RENDER PRODUCTS
// ══════════════════════════════════════════
function renderProducts(list) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  grid.innerHTML = list.map(function(p) {
    // Variantes de cor/tamanho
    var variantHTML = '';
    if (p.variants && p.variants.length > 0) {
      var dots = p.variants.map(function(v, i) {
        var isLight = ['#f5f5f0','#e3e4e6','#f0f0f0','#e8e8e8','#f0ede8','#f5f5f5','#e3d0be','#f5f0eb','#d4d4d4','#e8e8e6','#c8c8c8'].indexOf(v.color) >= 0;
        var borderStyle = isLight ? 'border:2px solid #ccc;' : 'border:2px solid transparent;';
        return '<button class="color-dot' + (i === 0 ? ' active' : '') + '" title="' + v.label + '" style="background:' + v.color + ';' + borderStyle + '" onclick="event.stopPropagation();selectVariant(' + p.id + ',' + i + ')"></button>';
      }).join('');
      variantHTML = '<div class="color-variants" id="cv-' + p.id + '">' + dots + '</div>';
    }

    // Fallback de imagem garantido
    var fallback = 'https://placehold.co/300x300/f0f0f0/888?text=' + encodeURIComponent(p.brand);

    return '<div class="product-card" id="card-' + p.id + '" onclick="window.location.href=\'produto.html?id=' + p.id + '\'">' +
      '<div class="product-badge">-' + p.discount + '%</div>' +
      '<button class="product-fav" onclick="event.stopPropagation();this.classList.toggle(\'active\');this.textContent=this.classList.contains(\'active\')?\'♥\':\'♡\'">♡</button>' +
      '<div class="product-img-wrap">' +
        '<img id="pimg-' + p.id + '" src="' + p.img + '" alt="' + p.name + '" loading="lazy" onerror="this.onerror=null;this.src=\'' + fallback + '\'">' +
      '</div>' +
      '<div class="product-info">' +
        '<div class="product-brand">' + p.brand + '</div>' +
        '<div class="product-name" id="pname-' + p.id + '">' + p.name + '</div>' +
        variantHTML +
        '<div class="product-stars">' + '★'.repeat(Math.floor(p.rating)) + '☆'.repeat(5 - Math.floor(p.rating)) + ' <span>(' + p.reviews.toLocaleString('pt-BR') + ')</span></div>' +
        '<div class="product-price-old">De: R$ ' + p.oldPrice.toFixed(2).replace('.', ',') + '</div>' +
        '<div class="product-price">R$ ' + p.price.toFixed(2).replace('.', ',') + '</div>' +
        '<div class="product-installment">12x R$ ' + (p.price / 12).toFixed(2).replace('.', ',') + ' s/juros</div>' +
        '<div class="product-pix">💚 R$ ' + (p.price * 0.95).toFixed(2).replace('.', ',') + ' no Pix</div>' +
        '<button class="product-buy" id="pbuy-' + p.id + '" onclick="event.stopPropagation();handleBuy(' + p.id + ')">Comprar</button>' +
      '</div>' +
    '</div>';
  }).join('');
}

// ── botão comprar separado — sem risco de aspas ──
function handleBuy(id) {
  addToCart(id);
  var btn = document.getElementById('pbuy-' + id);
  if (!btn) return;
  btn.textContent = '✓ Adicionado';
  btn.style.background = '#27ae60';
  setTimeout(function() {
    btn.textContent = 'Comprar';
    btn.style.background = '';
  }, 1600);
}

// ── Troca de imagem ao selecionar variante ──
function selectVariant(productId, variantIndex) {
  var p = PRODUCTS.find(function(x) { return x.id === productId; });
  if (!p || !p.variants[variantIndex]) return;
  var v = p.variants[variantIndex];

  // Troca imagem com fade
  var imgEl = document.getElementById('pimg-' + productId);
  if (imgEl) {
    imgEl.style.opacity = '0';
    imgEl.style.transition = 'opacity 0.2s';
    setTimeout(function() {
      imgEl.src = v.img;
      imgEl.style.opacity = '1';
    }, 150);
  }
  // Atualiza nome
  var nameEl = document.getElementById('pname-' + productId);
  if (nameEl) nameEl.textContent = p.name + ' – ' + v.label;

  // Marca dot ativo
  var container = document.getElementById('cv-' + productId);
  if (container) {
    container.querySelectorAll('.color-dot').forEach(function(d, i) {
      d.classList.toggle('active', i === variantIndex);
    });
  }
}

// ══════════════════════════════════════════
// FILTER / SEARCH
// ══════════════════════════════════════════
function filterCategory(cat) {
  var list = cat === 'all' ? PRODUCTS : PRODUCTS.filter(function(p) { return p.category === cat; });
  renderProducts(list.length ? list : PRODUCTS);
  setTimeout(function() {
    var g = document.getElementById('productsGrid');
    if (g) g.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function doSearch() {
  var q = ((document.getElementById('searchInput') || {}).value || '').toLowerCase().trim();
  if (!q) return renderProducts(PRODUCTS);
  var res = PRODUCTS.filter(function(p) {
    return p.name.toLowerCase().indexOf(q) >= 0 ||
           p.brand.toLowerCase().indexOf(q) >= 0 ||
           p.category.toLowerCase().indexOf(q) >= 0;
  });
  renderProducts(res.length ? res : PRODUCTS);
  setTimeout(function() {
    var g = document.getElementById('productsGrid');
    if (g) g.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

// ══════════════════════════════════════════
// HERO CAROUSEL
// ══════════════════════════════════════════
var slideIdx = 0;
var SLIDE_COUNT = 4;
function changeSlide(dir) { goSlide((slideIdx + dir + SLIDE_COUNT) % SLIDE_COUNT); }
function goSlide(n) {
  slideIdx = n;
  var s = document.getElementById('heroSlides');
  if (s) s.style.transform = 'translateX(-' + slideIdx * 100 + '%)';
  document.querySelectorAll('.dot').forEach(function(d, i) {
    d.classList.toggle('active', i === slideIdx);
  });
}

// ══════════════════════════════════════════
// COUNTDOWN
// ══════════════════════════════════════════
function startCountdown() {
  var end = parseInt(localStorage.getItem('cdEnd') || '0');
  if (!end || end < Date.now()) {
    end = Date.now() + 6 * 3600 * 1000;
    localStorage.setItem('cdEnd', String(end));
  }
  setInterval(function() {
    var diff = Math.max(0, end - Date.now());
    var h = String(Math.floor(diff / 3600000)).padStart(2, '0');
    var m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    var s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    var el = document.getElementById('countdown');
    if (el) el.textContent = h + ':' + m + ':' + s;
  }, 1000);
}

// ══════════════════════════════════════════
// INIT
// ══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function() {
  updateCartBadge();
  renderCart();
  renderProducts(PRODUCTS);
  startCountdown();
  setInterval(function() { changeSlide(1); }, 5000);

  var searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') doSearch();
    });
  }

  var cepInput = document.getElementById('cepInput');
  if (cepInput) {
    cepInput.addEventListener('input', function(e) {
      var v = e.target.value.replace(/\D/g, '');
      if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5, 8);
      e.target.value = v;
    });
  }
});
