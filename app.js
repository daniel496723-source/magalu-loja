// ============================================================
// MAGALU CLONE — app.js v7.0
// Imagens: SVG inline gerado por JS como fallback garantido
// + CDNs confiáveis como fonte primária
// ============================================================

/* ── helper: gera SVG placeholder com ícone do produto ────── */
function makeProductSVG(brand, color1, color2, icon) {
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220">' +
    '<defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">' +
    '<stop offset="0%" style="stop-color:' + color1 + ';stop-opacity:1"/>' +
    '<stop offset="100%" style="stop-color:' + color2 + ';stop-opacity:1"/>' +
    '</linearGradient></defs>' +
    '<rect width="220" height="220" fill="url(#bg)" rx="12"/>' +
    '<text x="110" y="115" font-family="Arial,sans-serif" font-size="72" text-anchor="middle" dominant-baseline="middle">' + icon + '</text>' +
    '<text x="110" y="175" font-family="Arial,sans-serif" font-size="16" font-weight="bold" fill="rgba(255,255,255,0.9)" text-anchor="middle">' + brand + '</text>' +
    '</svg>';
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

/* ── Mapa de ícones por categoria ──────────────────────── */
var CAT_ICONS = {
  smartphones: '📱', notebooks: '💻', tvs: '📺',
  games: '🎮', audio: '🎧', wearables: '⌚',
  cameras: '📷', eletros: '🏠'
};
var CAT_COLORS = {
  smartphones: ['#1a1a2e','#16213e'],
  notebooks:   ['#0d1b2a','#1b263b'],
  tvs:         ['#1a0a2e','#2d1057'],
  games:       ['#0a1628','#1c3a6e'],
  audio:       ['#1a0a0a','#4a1515'],
  wearables:   ['#0a1a0a','#1a4a2e'],
  cameras:     ['#1a1000','#4a3800'],
  eletros:     ['#0a0a1a','#1a2a4a'],
};

/* ── Cria src de imagem com fallback em cadeia ─────────────
   Se a URL primária falhar → tenta secundária → SVG         */
function imgSrc(primary) { return primary; }

function setImgWithFallbacks(imgEl, primary, secondary, brand, category) {
  imgEl.src = primary;
  var tried = 0;
  imgEl.onerror = function() {
    tried++;
    if (tried === 1 && secondary) {
      imgEl.src = secondary;
    } else {
      var c = CAT_COLORS[category] || ['#1a1a2e','#16213e'];
      var icon = CAT_ICONS[category] || '🛍️';
      imgEl.src = makeProductSVG(brand, c[0], c[1], icon);
      imgEl.onerror = null;
    }
  };
}

// ══════════════════════════════════════════════════════════
// PRODUTOS — cada um com imagem primária + secundária
// Fontes: CDN oficial → GSMArena/Wikipedia → SVG gerado
// ══════════════════════════════════════════════════════════
var PRODUCTS = [

  // ─── SMARTPHONES ───────────────────────────────────────
  {
    id:1, category:'smartphones', brand:'Apple',
    name:'iPhone 16 128GB',
    sku:'MLU0001', price:4299, oldPrice:7999, discount:46,
    rating:4.9, reviews:5821,
    img1:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-ultramarine?wid=400&hei=400&fmt=p-jpg&qlt=95',
    img2:'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-01.jpg',
    variants:[
      {label:'Ultramarino',color:'#4f7dc2',img1:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-ultramarine?wid=400&hei=400&fmt=p-jpg&qlt=95',img2:'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-01.jpg'},
      {label:'Preto',color:'#1d1d1f',img1:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-black?wid=400&hei=400&fmt=p-jpg&qlt=95',img2:'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-02.jpg'},
      {label:'Branco',color:'#f0ede8',img1:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-white?wid=400&hei=400&fmt=p-jpg&qlt=95',img2:'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-04.jpg'},
      {label:'Rosa',color:'#f4b8c1',img1:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-pink?wid=400&hei=400&fmt=p-jpg&qlt=95',img2:'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-05.jpg'},
      {label:'Verde',color:'#cde8d0',img1:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-teal?wid=400&hei=400&fmt=p-jpg&qlt=95',img2:'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-03.jpg'},
    ],
    highlights:['Chip A18 (3nm)','Câmera Fusion 48MP','Controle de Câmera','Tela 6,1" Super Retina XDR','USB-C','Bateria 22h','IP68'],
    description:'iPhone 16 com chip A18 e Controle de Câmera. Câmera Fusion 48MP, 4K Dolby Vision 120fps.',
    specs:[['Tela','6,1" OLED 460ppi'],['CPU','Apple A18 (3nm)'],['RAM','8GB'],['Armazenamento','128GB'],['Câmera','48MP+12MP'],['Bateria','22h vídeo'],['Sistema','iOS 18'],['Proteção','IP68']],
    reviewsData:[{user:'Carla M.',rating:5,date:'20/11/2024',comment:'Controle de Câmera fantástico!'},{user:'Paulo R.',rating:5,date:'15/11/2024',comment:'Bateria muito melhor que o 14.'}]
  },
  {
    id:2, category:'smartphones', brand:'Apple',
    name:'iPhone 16 Pro Max 256GB',
    sku:'MLU0002', price:7299, oldPrice:10999, discount:34,
    rating:4.9, reviews:4203,
    img1:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=400&hei=400&fmt=p-jpg&qlt=95',
    img2:'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-pro-max-01.jpg',
    variants:[
      {label:'Titânio Deserto',color:'#c8a882',img1:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=400&hei=400&fmt=p-jpg&qlt=95',img2:'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-pro-max-01.jpg'},
      {label:'Titânio Preto',color:'#3a3a3c',img1:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-blacktitanium?wid=400&hei=400&fmt=p-jpg&qlt=95',img2:'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-pro-max-04.jpg'},
      {label:'Titânio Natural',color:'#e3d0be',img1:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-naturaltitanium?wid=400&hei=400&fmt=p-jpg&qlt=95',img2:'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-pro-max-02.jpg'},
      {label:'Titânio Branco',color:'#f5f0eb',img1:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-whitetitanium?wid=400&hei=400&fmt=p-jpg&qlt=95',img2:'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-pro-max-03.jpg'},
    ],
    highlights:['Chip A18 Pro','Câmera 48MP zoom 5x','Tela 6,9" ProMotion 120Hz','4K 120fps Dolby Vision','Botão de Ação','Titânio aeroespacial','IP68'],
    description:'iPhone 16 Pro Max: tela ProMotion 6,9", câmera zoom 5x Tetra-prism e chip A18 Pro.',
    specs:[['Tela','6,9" OLED 120Hz'],['CPU','Apple A18 Pro (3nm)'],['RAM','8GB'],['Armazenamento','256GB'],['Câmera','48MP+48MP+12MP 5x'],['Bateria','33h vídeo'],['Sistema','iOS 18'],['Proteção','IP68']],
    reviewsData:[{user:'Lucas F.',rating:5,date:'18/11/2024',comment:'Câmera zoom 5x absurda.'},{user:'Beatriz N.',rating:5,date:'12/11/2024',comment:'Tela ProMotion incomparável.'}]
  },
  {
    id:3, category:'smartphones', brand:'Samsung',
    name:'Samsung Galaxy S25 Ultra 256GB 5G',
    sku:'MLU0003', price:6499, oldPrice:9999, discount:35,
    rating:4.8, reviews:2891,
    img1:'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-ultra-sm-s938-sm-s938bzkcbro-thumb-544342679?$650_519_PNG$',
    img2:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s25-ultra-1.jpg',
    variants:[
      {label:'Titanium Black',color:'#2d2d2d',img1:'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-ultra-sm-s938-sm-s938bzkcbro-thumb-544342679?$650_519_PNG$',img2:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s25-ultra-1.jpg'},
      {label:'Titanium Silver Blue',color:'#8fa3b8',img1:'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-ultra-sm-s938-sm-s938bzsdbro-thumb-544342601?$650_519_PNG$',img2:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s25-ultra-4.jpg'},
      {label:'Titanium White Silver',color:'#e8e8e8',img1:'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-ultra-sm-s938-sm-s938bzsebro-thumb-544342605?$650_519_PNG$',img2:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s25-ultra-3.jpg'},
      {label:'Titanium Gray',color:'#8a8a8a',img1:'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-ultra-sm-s938-sm-s938bzaabro-thumb-544342593?$650_519_PNG$',img2:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s25-ultra-2.jpg'},
    ],
    highlights:['Snapdragon 8 Elite','S Pen + Galaxy AI','Câmera 200MP zoom 10x','AMOLED 2X 6,9"','12GB RAM','Bateria 5000mAh 45W','IP68'],
    description:'Galaxy S25 Ultra com S Pen e Galaxy AI. Snapdragon 8 Elite, câmera 200MP zoom 10x.',
    specs:[['Tela','6,9" AMOLED 2X 120Hz'],['CPU','Snapdragon 8 Elite'],['RAM','12GB'],['Armazenamento','256GB'],['Câmera','200MP+50MP+10MP+50MP'],['Bateria','5000mAh 45W'],['Sistema','Android 15 One UI 7'],['Proteção','IP68']],
    reviewsData:[{user:'Fernanda A.',rating:5,date:'22/01/2025',comment:'Galaxy AI incrível!'},{user:'Roberto C.',rating:5,date:'18/01/2025',comment:'S Pen com IA incomparável.'}]
  },
  {
    id:4, category:'smartphones', brand:'Samsung',
    name:'Samsung Galaxy S25+ 256GB 5G',
    sku:'MLU0004', price:4799, oldPrice:7499, discount:36,
    rating:4.8, reviews:1876,
    img1:'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-sm-s936-sm-s936bzkdbro-thumb-544342411?$650_519_PNG$',
    img2:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s25-plus-1.jpg',
    variants:[
      {label:'Phantom Black',color:'#1a1a1a',img1:'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-sm-s936-sm-s936bzkdbro-thumb-544342411?$650_519_PNG$',img2:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s25-plus-1.jpg'},
      {label:'Iceberg Blue',color:'#a8c4d4',img1:'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-sm-s936-sm-s936bzbdbro-thumb-544342403?$650_519_PNG$',img2:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s25-plus-3.jpg'},
      {label:'Mint',color:'#b2d8c8',img1:'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-sm-s936-sm-s936bzgdbro-thumb-544342407?$650_519_PNG$',img2:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s25-plus-4.jpg'},
      {label:'Silver Shadow',color:'#d4d4d4',img1:'https://images.samsung.com/is/image/samsung/p6pim/br/2501/gallery/br-galaxy-s25-sm-s936-sm-s936bzsdbro-thumb-544342415?$650_519_PNG$',img2:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s25-plus-2.jpg'},
    ],
    highlights:['Snapdragon 8 Elite','Câmera tripla 50MP OIS','AMOLED 2X 6,7" 120Hz','12GB RAM','Bateria 4900mAh 45W','IP68'],
    description:'Galaxy S25+ com Snapdragon 8 Elite, câmera tripla 50MP e AMOLED 2X 6,7".',
    specs:[['Tela','6,7" AMOLED 2X 120Hz'],['CPU','Snapdragon 8 Elite'],['RAM','12GB'],['Armazenamento','256GB'],['Câmera','50MP OIS+12MP+10MP 3x'],['Bateria','4900mAh 45W'],['Sistema','Android 15 One UI 7'],['Proteção','IP68']],
    reviewsData:[{user:'Thiago M.',rating:5,date:'20/01/2025',comment:'Design elegantíssimo. Tela linda!'}]
  },
  {
    id:5, category:'smartphones', brand:'Samsung',
    name:'Samsung Galaxy A56 5G 128GB 8GB RAM',
    sku:'MLU0005', price:1799, oldPrice:2999, discount:40,
    rating:4.7, reviews:3214,
    img1:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a56-5g-1.jpg',
    img2:'https://images.samsung.com/is/image/samsung/p6pim/br/sm-a566blbpzto/gallery/br-galaxy-a56-5g-sm-a566blbpzto-thumb?$650_519_PNG$',
    variants:[
      {label:'Azul',color:'#3d7abf',img1:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a56-5g-1.jpg',img2:'https://images.samsung.com/is/image/samsung/p6pim/br/sm-a566blbpzto/gallery/br-galaxy-a56-5g-sm-a566blbpzto-thumb?$650_519_PNG$'},
      {label:'Preto',color:'#1a1a1a',img1:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a56-5g-3.jpg',img2:'https://images.samsung.com/is/image/samsung/p6pim/br/sm-a566bzkpzto/gallery/br-galaxy-a56-5g-sm-a566bzkpzto-thumb?$650_519_PNG$'},
      {label:'Branco',color:'#f0f0f0',img1:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a56-5g-2.jpg',img2:'https://images.samsung.com/is/image/samsung/p6pim/br/sm-a566bzwpzto/gallery/br-galaxy-a56-5g-sm-a566bzwpzto-thumb?$650_519_PNG$'},
    ],
    highlights:['Super AMOLED+ 6,7" 120Hz','Exynos 1580 (4nm)','Câmera 50MP OIS','5G','8GB RAM','Bateria 5000mAh 45W','IP67'],
    description:'Galaxy A56 5G com Exynos 1580, AMOLED+ 120Hz e câmera 50MP OIS.',
    specs:[['Tela','6,7" Super AMOLED+ 120Hz'],['CPU','Exynos 1580 (4nm)'],['RAM','8GB'],['Armazenamento','128GB'],['Câmera','50MP OIS+12MP+5MP'],['Bateria','5000mAh 45W'],['Sistema','Android 15 One UI 7'],['Proteção','IP67']],
    reviewsData:[{user:'Camila S.',rating:5,date:'10/02/2025',comment:'Custo-benefício imbatível!'}]
  },
  {
    id:6, category:'smartphones', brand:'Motorola',
    name:'Motorola Edge 50 Pro 512GB 12GB RAM 5G',
    sku:'MLU0006', price:1899, oldPrice:3499, discount:46,
    rating:4.7, reviews:1543,
    img1:'https://fdn2.gsmarena.com/vv/pics/motorola/motorola-edge-50-pro-1.jpg',
    img2:'https://fdn2.gsmarena.com/vv/pics/motorola/motorola-edge-50-pro-2.jpg',
    variants:[
      {label:'Black Beauty',color:'#1a1a1a',img1:'https://fdn2.gsmarena.com/vv/pics/motorola/motorola-edge-50-pro-1.jpg',img2:'https://fdn2.gsmarena.com/vv/pics/motorola/motorola-edge-50-pro-2.jpg'},
      {label:'Moonlight Pearl',color:'#e8e4f0',img1:'https://fdn2.gsmarena.com/vv/pics/motorola/motorola-edge-50-pro-3.jpg',img2:'https://fdn2.gsmarena.com/vv/pics/motorola/motorola-edge-50-pro-4.jpg'},
      {label:'Luxe Lavender',color:'#c9b8d8',img1:'https://fdn2.gsmarena.com/vv/pics/motorola/motorola-edge-50-pro-5.jpg',img2:'https://fdn2.gsmarena.com/vv/pics/motorola/motorola-edge-50-pro-6.jpg'},
    ],
    highlights:['pOLED curva 6,7" 144Hz','Câmera 50MP Sony LYTIA OIS','Snapdragon 7 Gen 3','TurboPower 125W','12GB RAM + 512GB','IP68'],
    description:'Motorola Edge 50 Pro: pOLED curva 144Hz, câmera Sony LYTIA e TurboPower 125W.',
    specs:[['Tela','6,7" pOLED curva 144Hz'],['CPU','Snapdragon 7 Gen 3'],['RAM','12GB'],['Armazenamento','512GB'],['Câmera','50MP Sony+13MP+10MP 3x'],['Bateria','4500mAh 125W'],['Sistema','Android 14'],['Proteção','IP68']],
    reviewsData:[{user:'Lucas P.',rating:5,date:'14/11/2024',comment:'125W é absurdo! 20 minutos de carga.'}]
  },
  {
    id:7, category:'smartphones', brand:'Xiaomi',
    name:'Xiaomi 15 Ultra 512GB 16GB RAM Câmera Leica',
    sku:'MLU0007', price:4999, oldPrice:8999, discount:44,
    rating:4.9, reviews:987,
    img1:'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-15-ultra-1.jpg',
    img2:'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-15-ultra-2.jpg',
    variants:[
      {label:'Titanium Black',color:'#2a2a2a',img1:'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-15-ultra-1.jpg',img2:'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-15-ultra-2.jpg'},
      {label:'Titanium White',color:'#f0ede8',img1:'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-15-ultra-3.jpg',img2:'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-15-ultra-4.jpg'},
    ],
    highlights:['Snapdragon 8 Elite (3nm)','Leica Summilux 4 câmeras','Sensor Sony 1 polegada','HyperCharge 90W + sem fio 80W','16GB LPDDR5X','IP68'],
    description:'Xiaomi 15 Ultra co-desenvolvido com Leica. Sensor Sony 1" e Snapdragon 8 Elite.',
    specs:[['Tela','6,73" AMOLED 120Hz'],['CPU','Snapdragon 8 Elite (3nm)'],['RAM','16GB LPDDR5X'],['Armazenamento','512GB UFS 4.0'],['Câmera','50MP f/1.63 sensor 1"'],['Bateria','5500mAh 90W'],['Sistema','Android 15 HyperOS 2'],['Proteção','IP68']],
    reviewsData:[{user:'Pedro A.',rating:5,date:'25/01/2025',comment:'Sensor 1 polegada Leica é brutal!'}]
  },

  // ─── NOTEBOOKS ─────────────────────────────────────────
  {
    id:8, category:'notebooks', brand:'Apple',
    name:'MacBook Pro 14" M4 Pro 24GB 512GB SSD',
    sku:'MLU0008', price:14999, oldPrice:22999, discount:35,
    rating:4.9, reviews:1432,
    img1:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202410?wid=400&hei=400&fmt=jpeg&qlt=95',
    img2:'https://fdn2.gsmarena.com/vv/pics/apple/apple-macbook-pro-14-m4-pro-1.jpg',
    variants:[
      {label:'Preto Espacial',color:'#1d1d1f',img1:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202410?wid=400&hei=400&fmt=jpeg&qlt=95',img2:'https://fdn2.gsmarena.com/vv/pics/apple/apple-macbook-pro-14-m4-pro-1.jpg'},
      {label:'Prateado',color:'#e3e4e6',img1:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-silver-select-202410?wid=400&hei=400&fmt=jpeg&qlt=95',img2:'https://fdn2.gsmarena.com/vv/pics/apple/apple-macbook-pro-14-m4-pro-2.jpg'},
    ],
    highlights:['M4 Pro CPU 14n GPU 20n','24GB memória unificada','SSD NVMe 512GB','Liquid Retina XDR 14,2" 120Hz','24h bateria','3x Thunderbolt 5','1,62kg'],
    description:'MacBook Pro 14" M4 Pro: CPU 14 núcleos, GPU 20, 24h bateria e Thunderbolt 5.',
    specs:[['Tela','14,2" Retina XDR 120Hz'],['CPU','Apple M4 Pro'],['Memória','24GB unificada'],['Armazenamento','512GB NVMe'],['Bateria','até 24h'],['Portas','3x TB5, HDMI 2.1, SD'],['Sistema','macOS Sequoia'],['Peso','1,62kg']],
    reviewsData:[{user:'Carolina F.',rating:5,date:'02/12/2024',comment:'Edição 8K RAW sem soluços!'},{user:'Tiago L.',rating:5,date:'28/11/2024',comment:'24h de bateria confirmado!'}]
  },
  {
    id:9, category:'notebooks', brand:'Dell',
    name:'Dell XPS 16 Core Ultra 9 32GB RTX 4070 OLED',
    sku:'MLU0009', price:12999, oldPrice:20999, discount:38,
    rating:4.9, reviews:743,
    img1:'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-16-9640/media-gallery/silver/notebook-xps-16-9640-silver-gallery-3.psd?fmt=pjpeg&pscan=auto&scl=1&wid=400&hei=400&qlt=100',
    img2:'https://fdn2.gsmarena.com/vv/pics/dell/dell-xps-15-9530-01.jpg',
    variants:[
      {label:'Prata Platina',color:'#c8c8c8',img1:'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-16-9640/media-gallery/silver/notebook-xps-16-9640-silver-gallery-3.psd?fmt=pjpeg&pscan=auto&scl=1&wid=400&hei=400&qlt=100',img2:'https://fdn2.gsmarena.com/vv/pics/dell/dell-xps-15-9530-01.jpg'},
    ],
    highlights:['Core Ultra 9 185H 16n','RTX 4070 8GB GDDR6','32GB LPDDR5x','OLED 4K+ 16" 120Hz','SSD 1TB Gen 4','Bateria 99,5Wh'],
    description:'Dell XPS 16: OLED 4K+ 16" 100% DCI-P3. Core Ultra 9 + RTX 4070.',
    specs:[['Tela','16" OLED 4K+ 120Hz'],['CPU','Core Ultra 9 185H'],['RAM','32GB LPDDR5x'],['Armazenamento','1TB NVMe Gen 4'],['GPU','RTX 4070 8GB'],['Bateria','99,5Wh 130W'],['Sistema','Windows 11'],['Peso','1,96kg']],
    reviewsData:[{user:'André S.',rating:5,date:'10/12/2024',comment:'OLED 4K 100% DCI-P3 incrível!'}]
  },
  {
    id:10, category:'notebooks', brand:'Samsung',
    name:'Samsung Galaxy Book5 Pro 14" Intel Ultra 7 AMOLED',
    sku:'MLU0010', price:8999, oldPrice:13999, discount:36,
    rating:4.8, reviews:621,
    img1:'https://images.samsung.com/is/image/samsung/p6pim/br/np940xma-kb1br/gallery/br-galaxy-book5-pro-np940xma-np940xma-kb1br-thumb?$650_519_PNG$',
    img2:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-book5-pro-1.jpg',
    variants:[
      {label:'Moonstone Gray',color:'#5a5a5a',img1:'https://images.samsung.com/is/image/samsung/p6pim/br/np940xma-kb1br/gallery/br-galaxy-book5-pro-np940xma-np940xma-kb1br-thumb?$650_519_PNG$',img2:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-book5-pro-1.jpg'},
      {label:'Platinum Silver',color:'#c8c8c8',img1:'https://images.samsung.com/is/image/samsung/p6pim/br/np940xma-ks1br/gallery/br-galaxy-book5-pro-np940xma-np940xma-ks1br-thumb?$650_519_PNG$',img2:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-book5-pro-2.jpg'},
    ],
    highlights:['Core Ultra 7 258V (4nm)','16GB LPDDR5x','AMOLED 2K 14" 120Hz','SSD 512GB Gen 4','25h bateria','Galaxy AI + Copilot+','1,23kg'],
    description:'Galaxy Book5 Pro: AMOLED 2K 120Hz, Core Ultra 7 com NPU, 25h em 1,23kg.',
    specs:[['Tela','14" AMOLED 2880×1800px 120Hz'],['CPU','Intel Core Ultra 7 258V'],['RAM','16GB LPDDR5x'],['Armazenamento','512GB NVMe Gen 4'],['Bateria','até 25h'],['Sistema','Windows 11'],['Peso','1,23kg']],
    reviewsData:[{user:'Patricia M.',rating:5,date:'15/01/2025',comment:'1,23kg e bateria que dura o dia!'}]
  },
  {
    id:11, category:'notebooks', brand:'Lenovo',
    name:'Lenovo Legion 5i Pro Core i7 32GB RTX 4060 165Hz',
    sku:'MLU0011', price:5999, oldPrice:9999, discount:40,
    rating:4.8, reviews:1123,
    img1:'https://fdn2.gsmarena.com/vv/pics/lenovo/lenovo-legion-5-pro-gen-7-01.jpg',
    img2:'https://fdn2.gsmarena.com/vv/pics/lenovo/lenovo-legion-5-pro-gen-7-02.jpg',
    variants:[
      {label:'Storm Grey',color:'#555',img1:'https://fdn2.gsmarena.com/vv/pics/lenovo/lenovo-legion-5-pro-gen-7-01.jpg',img2:'https://fdn2.gsmarena.com/vv/pics/lenovo/lenovo-legion-5-pro-gen-7-02.jpg'},
    ],
    highlights:['Core i7-13700HX 16 núcleos','RTX 4060 8GB GDDR6','32GB DDR5','SSD 1TB Gen 4','IPS 16" 165Hz','ColdFront 5.0','RGB por tecla'],
    description:'Legion 5i Pro: RTX 4060 + Core i7-13700HX com ColdFront 5.0. Gaming máximo.',
    specs:[['Tela','16" IPS 2560×1600px 165Hz'],['CPU','Core i7-13700HX'],['RAM','32GB DDR5'],['Armazenamento','1TB Gen 4'],['GPU','RTX 4060 8GB'],['Bateria','80Wh 135W'],['Sistema','Windows 11']],
    reviewsData:[{user:'Diego M.',rating:5,date:'16/11/2024',comment:'Tudo no ultra. Resfriamento excepcional!'}]
  },

  // ─── TVs ───────────────────────────────────────────────
  {
    id:12, category:'tvs', brand:'LG',
    name:'Smart TV LG OLED evo C4 65" 4K 120Hz webOS 24',
    sku:'MLU0012', price:5499, oldPrice:9999, discount:45,
    rating:4.9, reviews:2876,
    img1:'https://www.lg.com/br/images/tvs/md08007749/gallery/medium01.jpg',
    img2:'https://fdn2.gsmarena.com/vv/pics/lg/lg-oled65c4psa-01.jpg',
    variants:[
      {label:'55"',color:'#444',img1:'https://www.lg.com/br/images/tvs/md08007749/gallery/medium01.jpg',img2:'https://fdn2.gsmarena.com/vv/pics/lg/lg-oled65c4psa-01.jpg'},
      {label:'65"',color:'#555',img1:'https://www.lg.com/br/images/tvs/md08007749/gallery/medium01.jpg',img2:'https://fdn2.gsmarena.com/vv/pics/lg/lg-oled65c4psa-01.jpg'},
      {label:'77"',color:'#666',img1:'https://www.lg.com/br/images/tvs/md08007749/gallery/medium01.jpg',img2:'https://fdn2.gsmarena.com/vv/pics/lg/lg-oled65c4psa-01.jpg'},
      {label:'83"',color:'#777',img1:'https://www.lg.com/br/images/tvs/md08007749/gallery/medium01.jpg',img2:'https://fdn2.gsmarena.com/vv/pics/lg/lg-oled65c4psa-01.jpg'},
    ],
    highlights:['OLED evo – preto absoluto','a9 Gen7 AI','Dolby Vision IQ + Atmos','120Hz NVIDIA G-Sync','4x HDMI 2.1','webOS 24','1ms input lag'],
    description:'LG OLED evo C4: melhor OLED. Preto absoluto, contraste infinito, 4x HDMI 2.1.',
    specs:[['Tamanho','65 pol.'],['Resolução','4K 3840×2160'],['Painel','OLED evo'],['Taxa','120Hz G-Sync+FreeSync'],['HDR','Dolby Vision IQ, HDR10'],['Áudio','60W Dolby Atmos'],['Smart TV','webOS 24, ThinQ AI'],['HDMI','4x HDMI 2.1 48Gbps']],
    reviewsData:[{user:'Marcos V.',rating:5,date:'05/11/2024',comment:'PS5 no OLED C4 é outro nível!'},{user:'Silvia T.',rating:5,date:'01/11/2024',comment:'Melhor TV da minha vida.'}]
  },
  {
    id:13, category:'tvs', brand:'Samsung',
    name:'Smart TV Samsung OLED S90D 65" 4K 144Hz QD-OLED',
    sku:'MLU0013', price:6999, oldPrice:11999, discount:42,
    rating:4.8, reviews:1243,
    img1:'https://images.samsung.com/is/image/samsung/p6pim/br/qe65s90daexzd/gallery/br-oled-s90d-qe65s90daexzd-thumb-539897046?$650_519_PNG$',
    img2:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-qe65s90d-01.jpg',
    variants:[
      {label:'55"',color:'#333',img1:'https://images.samsung.com/is/image/samsung/p6pim/br/qe65s90daexzd/gallery/br-oled-s90d-qe65s90daexzd-thumb-539897046?$650_519_PNG$',img2:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-qe65s90d-01.jpg'},
      {label:'65"',color:'#444',img1:'https://images.samsung.com/is/image/samsung/p6pim/br/qe65s90daexzd/gallery/br-oled-s90d-qe65s90daexzd-thumb-539897046?$650_519_PNG$',img2:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-qe65s90d-01.jpg'},
      {label:'77"',color:'#555',img1:'https://images.samsung.com/is/image/samsung/p6pim/br/qe65s90daexzd/gallery/br-oled-s90d-qe65s90daexzd-thumb-539897046?$650_519_PNG$',img2:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-qe65s90d-01.jpg'},
    ],
    highlights:['QD-OLED Samsung','Neural Quantum Processor 4K','144Hz VRR','HDR10+ e Dolby Vision','Gaming Hub','4x HDMI 2.1'],
    description:'Samsung OLED S90D QD-OLED: pontos quânticos + OLED. 144Hz para gaming.',
    specs:[['Tamanho','65 pol.'],['Resolução','4K 3840×2160'],['Painel','QD-OLED'],['Taxa','144Hz VRR'],['HDR','HDR10+, Dolby Vision'],['Áudio','60W OTS+'],['Smart TV','Tizen, Gaming Hub, Bixby'],['HDMI','4x HDMI 2.1']],
    reviewsData:[{user:'Eduardo B.',rating:5,date:'18/11/2024',comment:'QD-OLED: cores mais vivas!'}]
  },

  // ─── GAMES ─────────────────────────────────────────────
  {
    id:14, category:'games', brand:'Sony',
    name:'PlayStation 5 Pro Console 2TB SSD + DualSense',
    sku:'MLU0014', price:4999, oldPrice:7499, discount:33,
    rating:4.9, reviews:3892,
    img1:'https://fdn2.gsmarena.com/vv/pics/sony/sony-playstation-5-pro-01.jpg',
    img2:'https://gmedia.playstation.com/is/image/SIEPDC/ps5-pro-product-thumbnail-01-en-14oct24?$facebook$',
    variants:[
      {label:'Branco',color:'#f0f0f0',img1:'https://fdn2.gsmarena.com/vv/pics/sony/sony-playstation-5-pro-01.jpg',img2:'https://gmedia.playstation.com/is/image/SIEPDC/ps5-pro-product-thumbnail-01-en-14oct24?$facebook$'},
    ],
    highlights:['GPU 67% mais rápida','SSD 2TB','PSSR upscaling IA','Ray Tracing aprimorado','Wi-Fi 7','DualSense tátil','Retrocompat. PS4'],
    description:'PS5 Pro: GPU 67% mais rápida, PSSR por IA, SSD 2TB e Wi-Fi 7.',
    specs:[['CPU','AMD Zen 2 8n 3,85GHz'],['GPU','AMD RDNA – 67% mais rápida'],['RAM','16GB GDDR6'],['Armazenamento','SSD NVMe 2TB'],['Resolução','4K 60/120fps'],['Wi-Fi','Wi-Fi 7']],
    reviewsData:[{user:'Felipe G.',rating:5,date:'15/11/2024',comment:'PSSR impressionante. 60fps em tudo!'},{user:'Juliana K.',rating:5,date:'10/11/2024',comment:'GPU 67% mais rápida é perceptível.'}]
  },
  {
    id:15, category:'games', brand:'Microsoft',
    name:'Xbox Series X Console 1TB SSD 4K 120fps + Game Pass 3 meses',
    sku:'MLU0015', price:2999, oldPrice:4999, discount:40,
    rating:4.8, reviews:2671,
    img1:'https://fdn2.gsmarena.com/vv/pics/microsoft/microsoft-xbox-series-x-01.jpg',
    img2:'https://fdn2.gsmarena.com/vv/pics/microsoft/microsoft-xbox-series-x-02.jpg',
    variants:[
      {label:'Preto',color:'#1a1a1a',img1:'https://fdn2.gsmarena.com/vv/pics/microsoft/microsoft-xbox-series-x-01.jpg',img2:'https://fdn2.gsmarena.com/vv/pics/microsoft/microsoft-xbox-series-x-02.jpg'},
    ],
    highlights:['12 teraflops','SSD NVMe 1TB Velocity','Quick Resume','Retrocompat. 4 gerações','Auto HDR + FPS Boost','Game Pass 3 meses','4K 120fps'],
    description:'Xbox Series X + Game Pass 3 meses. 12 TF, Quick Resume, 4K 120fps.',
    specs:[['CPU','AMD Zen 2 8n 3,8GHz'],['GPU','AMD RDNA 2 12TF'],['RAM','16GB GDDR6'],['Armazenamento','SSD NVMe 1TB'],['Resolução','4K/120fps'],['Mídia','UHD Blu-ray 4K']],
    reviewsData:[{user:'Rodrigo C.',rating:5,date:'20/11/2024',comment:'Quick Resume é indispensável!'}]
  },
  {
    id:16, category:'games', brand:'Nintendo',
    name:'Nintendo Switch 2 Standard + Joy-Con 2',
    sku:'MLU0016', price:2799, oldPrice:3999, discount:30,
    rating:4.9, reviews:4231,
    img1:'https://fdn2.gsmarena.com/vv/pics/nintendo/nintendo-switch-2-01.jpg',
    img2:'https://fdn2.gsmarena.com/vv/pics/nintendo/nintendo-switch-2-02.jpg',
    variants:[
      {label:'Branco+Preto',color:'#f5f5f5',img1:'https://fdn2.gsmarena.com/vv/pics/nintendo/nintendo-switch-2-01.jpg',img2:'https://fdn2.gsmarena.com/vv/pics/nintendo/nintendo-switch-2-02.jpg'},
    ],
    highlights:['Tela LCD 7,9" 1080p','Saída 4K TV via HDMI 2.0','Joy-Con 2 com botão C','GameChat integrado','Retrocompat. Switch','256GB armazenamento'],
    description:'Nintendo Switch 2: maior, mais potente, Joy-Con 2 como mouse. 4K na TV.',
    specs:[['Tela','7,9" LCD 1920×1080'],['TV','4K via HDMI 2.0'],['Armazenamento','256GB+microSDXC'],['Conectividade','Wi-Fi 6, BT 5.0, USB-C']],
    reviewsData:[{user:'Sofia B.',rating:5,date:'10/04/2025',comment:'Joy-Con 2 como mouse é genial!'}]
  },

  // ─── ÁUDIO ─────────────────────────────────────────────
  {
    id:17, category:'audio', brand:'Sony',
    name:'Fone Sony WH-1000XM5 Bluetooth ANC 30h Hi-Res',
    sku:'MLU0017', price:1399, oldPrice:2499, discount:44,
    rating:4.9, reviews:5312,
    img1:'https://fdn2.gsmarena.com/vv/pics/sony/sony-wh-1000xm5-01.jpg',
    img2:'https://fdn2.gsmarena.com/vv/pics/sony/sony-wh-1000xm5-02.jpg',
    variants:[
      {label:'Preto',color:'#1a1a1a',img1:'https://fdn2.gsmarena.com/vv/pics/sony/sony-wh-1000xm5-01.jpg',img2:'https://fdn2.gsmarena.com/vv/pics/sony/sony-wh-1000xm5-02.jpg'},
      {label:'Prata',color:'#c8c8c8',img1:'https://fdn2.gsmarena.com/vv/pics/sony/sony-wh-1000xm5-03.jpg',img2:'https://fdn2.gsmarena.com/vv/pics/sony/sony-wh-1000xm5-04.jpg'},
    ],
    highlights:['Melhor ANC – 8 microfones','2 processadores V1+QN1','Driver 30mm exclusivo','30h com ANC','Carga 3min=3h','LDAC 990kbps','Multi-point'],
    description:'Sony WH-1000XM5: melhor ANC do mundo. 8 microfones + processadores V1+QN1. LDAC hi-res.',
    specs:[['Driver','30mm circular'],['Frequência','4Hz – 40kHz'],['ANC','8 microfones + V1+QN1'],['Bateria','30h ANC'],['Carga','USB-C 3min=3h'],['Codecs','LDAC, AAC, SBC'],['Bluetooth','5.2 Multi-point'],['Peso','250g']],
    reviewsData:[{user:'Amanda V.',rating:5,date:'14/11/2024',comment:'ANC cancela motor de avião!'},{user:'Henrique D.',rating:5,date:'07/11/2024',comment:'Entro em outro mundo com ele.'}]
  },
  {
    id:18, category:'audio', brand:'Apple',
    name:'AirPods Pro 2 USB-C ANC Áudio Espacial 30h',
    sku:'MLU0018', price:1699, oldPrice:2999, discount:43,
    rating:4.9, reviews:8234,
    img1:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MXK73?wid=400&hei=400&fmt=jpeg&qlt=95',
    img2:'https://fdn2.gsmarena.com/vv/pics/apple/apple-airpods-pro-2nd-gen-usb-c-01.jpg',
    variants:[
      {label:'Branco',color:'#f5f5f0',img1:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MXK73?wid=400&hei=400&fmt=jpeg&qlt=95',img2:'https://fdn2.gsmarena.com/vv/pics/apple/apple-airpods-pro-2nd-gen-usb-c-01.jpg'},
    ],
    highlights:['Chip H2 – ANC 2x mais potente','Transparência Adaptativa','Áudio Espacial Personalizado','30h total USB-C','IPX4 fone + case','Volume adaptativo'],
    description:'AirPods Pro 2 chip H2: ANC 2x mais potente, Áudio Espacial Personalizado, 30h.',
    specs:[['Chip','Apple H2'],['Bateria','6h+24h case=30h'],['Resistência','IPX4'],['Conectividade','Bluetooth 5.3'],['Case','USB-C+MagSafe'],['Peso','5,3g/fone']],
    reviewsData:[{user:'Tatiana R.',rating:5,date:'21/11/2024',comment:'Melhor TWS de todas!'},{user:'Gustavo P.',rating:5,date:'14/11/2024',comment:'Transparência Adaptativa é mágica.'}]
  },
  {
    id:19, category:'audio', brand:'JBL',
    name:'Caixa JBL Charge 5 Bluetooth 40W IPX7 20h',
    sku:'MLU0019', price:699, oldPrice:1499, discount:53,
    rating:4.8, reviews:4821,
    img1:'https://fdn2.gsmarena.com/vv/pics/jbl/jbl-charge-5-01.jpg',
    img2:'https://fdn2.gsmarena.com/vv/pics/jbl/jbl-charge-5-02.jpg',
    variants:[
      {label:'Preta',color:'#1a1a1a',img1:'https://fdn2.gsmarena.com/vv/pics/jbl/jbl-charge-5-01.jpg',img2:'https://fdn2.gsmarena.com/vv/pics/jbl/jbl-charge-5-02.jpg'},
      {label:'Azul',color:'#2255aa',img1:'https://fdn2.gsmarena.com/vv/pics/jbl/jbl-charge-5-03.jpg',img2:'https://fdn2.gsmarena.com/vv/pics/jbl/jbl-charge-5-04.jpg'},
      {label:'Vermelha',color:'#cc2222',img1:'https://fdn2.gsmarena.com/vv/pics/jbl/jbl-charge-5-05.jpg',img2:'https://fdn2.gsmarena.com/vv/pics/jbl/jbl-charge-5-06.jpg'},
    ],
    highlights:['40W RMS','Bluetooth 5.1','20h de autonomia','Carrega USB','IPX7 – 1m/30min','PartyBoost'],
    description:'JBL Charge 5: 40W, 20h, IPX7 submersível e carrega seu celular via USB.',
    specs:[['Potência','40W RMS'],['Frequência','65Hz–20kHz'],['Bluetooth','5.1 – 10m'],['Bateria','20 horas'],['Resistência','IPX7'],['Carga externa','USB-A 5V/2.4A']],
    reviewsData:[{user:'Camila S.',rating:5,date:'09/11/2024',comment:'Submergi na praia e funcionou!'}]
  },

  // ─── WEARABLES ─────────────────────────────────────────
  {
    id:20, category:'wearables', brand:'Apple',
    name:'Apple Watch Series 10 GPS 46mm Alumínio',
    sku:'MLU0020', price:3499, oldPrice:5499, discount:36,
    rating:4.9, reviews:3421,
    img1:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s10-case-unselect-gallery-2-202409?wid=400&hei=400&fmt=jpeg&qlt=95',
    img2:'https://fdn2.gsmarena.com/vv/pics/apple/apple-watch-series-10-1.jpg',
    variants:[
      {label:'Jet Black 46mm',color:'#1d1d1f',img1:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s10-case-unselect-gallery-2-202409?wid=400&hei=400&fmt=jpeg&qlt=95',img2:'https://fdn2.gsmarena.com/vv/pics/apple/apple-watch-series-10-1.jpg'},
      {label:'Rose Gold 46mm',color:'#d4a090',img1:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s10-rosegold-unselect-gallery-2-202409?wid=400&hei=400&fmt=jpeg&qlt=95',img2:'https://fdn2.gsmarena.com/vv/pics/apple/apple-watch-series-10-2.jpg'},
      {label:'Silver 42mm',color:'#e3e4e6',img1:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s10-silver-unselect-gallery-2-202409?wid=400&hei=400&fmt=jpeg&qlt=95',img2:'https://fdn2.gsmarena.com/vv/pics/apple/apple-watch-series-10-3.jpg'},
    ],
    highlights:['Mais fino – 9,7mm','Chip S10','Tela Super Retina XDR','Mergulho + apneia','ECG + SpO2 + Temp','Detecção acidente','USB-C'],
    description:'Apple Watch Series 10: o mais fino, 9,7mm. Mergulho, apneia, ECG, SpO2.',
    specs:[['Tamanho','46mm'],['Chip','S10 SiP'],['Espessura','9,7mm'],['Tela','LTPO OLED Always-On'],['Sensores','ECG, SpO2, Temperatura'],['Bateria','18h/36h Low Power'],['Resistência','WR50 + mergulho']],
    reviewsData:[{user:'Isabela F.',rating:5,date:'28/10/2024',comment:'Mais fino e bonito. Mergulho perfeito!'}]
  },
  {
    id:21, category:'wearables', brand:'Samsung',
    name:'Galaxy Watch Ultra 47mm 4G LTE Titanium',
    sku:'MLU0021', price:2999, oldPrice:5499, discount:45,
    rating:4.8, reviews:1432,
    img1:'https://images.samsung.com/is/image/samsung/p6pim/br/sm-l705fzmazto/gallery/br-galaxy-watch-ultra-sm-l705-sm-l705fzmazto-thumb-541209088?$650_519_PNG$',
    img2:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-watch-ultra-1.jpg',
    variants:[
      {label:'Titanium White',color:'#e8e8e6',img1:'https://images.samsung.com/is/image/samsung/p6pim/br/sm-l705fzmazto/gallery/br-galaxy-watch-ultra-sm-l705-sm-l705fzmazto-thumb-541209088?$650_519_PNG$',img2:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-watch-ultra-1.jpg'},
      {label:'Titanium Black',color:'#2a2a2a',img1:'https://images.samsung.com/is/image/samsung/p6pim/br/sm-l705fzkszto/gallery/br-galaxy-watch-ultra-sm-l705-sm-l705fzkszto-thumb-541209080?$650_519_PNG$',img2:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-watch-ultra-2.jpg'},
      {label:'Titanium Silver',color:'#c8c8c8',img1:'https://images.samsung.com/is/image/samsung/p6pim/br/sm-l705fzsszto/gallery/br-galaxy-watch-ultra-sm-l705-sm-l705fzsszto-thumb-541209084?$650_519_PNG$',img2:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-watch-ultra-3.jpg'},
    ],
    highlights:['Titanium ultrarresistente','AMOLED 1,5" 3000nits','Mergulho 100m','ECG + pressão + SpO2','Bateria 60h','4G LTE','MIL-STD-810U'],
    description:'Galaxy Watch Ultra: Titanium, mergulho 100m, 60h bateria, 4G LTE independente.',
    specs:[['Tamanho','47mm'],['Material','Titanium Grade 4'],['Tela','AMOLED 1,5" 3000nits'],['Bateria','590mAh – 60h'],['Resistência','10ATM + MIL-STD-810U'],['Conectividade','4G LTE, BT 5.3, NFC']],
    reviewsData:[{user:'Carlos B.',rating:5,date:'20/07/2024',comment:'Titanium, 4G, mergulho. Perfeito!'}]
  },

  // ─── CÂMERAS ───────────────────────────────────────────
  {
    id:22, category:'cameras', brand:'Sony',
    name:'Câmera Sony Alpha ZV-E10 II APS-C 26MP 4K 120fps',
    sku:'MLU0022', price:3499, oldPrice:5999, discount:42,
    rating:4.8, reviews:1243,
    img1:'https://fdn2.gsmarena.com/vv/pics/sony/sony-zv-e10-ii-01.jpg',
    img2:'https://fdn2.gsmarena.com/vv/pics/sony/sony-zv-e10-ii-02.jpg',
    variants:[
      {label:'Preta',color:'#1a1a1a',img1:'https://fdn2.gsmarena.com/vv/pics/sony/sony-zv-e10-ii-01.jpg',img2:'https://fdn2.gsmarena.com/vv/pics/sony/sony-zv-e10-ii-02.jpg'},
      {label:'Branca',color:'#f0f0f0',img1:'https://fdn2.gsmarena.com/vv/pics/sony/sony-zv-e10-ii-03.jpg',img2:'https://fdn2.gsmarena.com/vv/pics/sony/sony-zv-e10-ii-04.jpg'},
    ],
    highlights:['APS-C Exmor R BSI 26.1MP','4K 60fps / 4K 120fps','Eye AF tempo real','Vídeo vertical nativo','Microfone 3 cápsulas','Tela touch articulada 3"'],
    description:'Sony ZV-E10 II: vlog 2ª geração com BSI 26MP, 4K 120fps e vertical nativo.',
    specs:[['Sensor','APS-C Exmor R BSI 26.1MP'],['Vídeo','4K 60fps / 4K 120fps'],['AF','Eye AF Tempo Real'],['Microfone','3 cápsulas + P2'],['Tela','3" touch articulada'],['ISO','100–51200'],['Bateria','NP-FW50 – 340 disparos'],['Peso','291g']],
    reviewsData:[{user:'Bruna F.',rating:5,date:'20/12/2024',comment:'4K 120fps para slow motion é brutal!'}]
  },

  // ─── ELETROS ───────────────────────────────────────────
  {
    id:23, category:'eletros', brand:'Samsung',
    name:'Geladeira Samsung French Door 460L Inox SpaceMax',
    sku:'MLU0023', price:4299, oldPrice:7999, discount:46,
    rating:4.7, reviews:1243,
    img1:'https://images.samsung.com/is/image/samsung/p6pim/br/rf44a5202s9-bz/gallery/br-rf44a5202s9-bz-rf44a5202s9-bz-531851246?$650_519_PNG$',
    img2:'https://images.samsung.com/is/image/samsung/p6pim/br/rf44a5202s9-bz/gallery/br-rf44a5202s9-bz-thumb-531851248?$650_519_PNG$',
    variants:[
      {label:'Inox',color:'#b0b0b0',img1:'https://images.samsung.com/is/image/samsung/p6pim/br/rf44a5202s9-bz/gallery/br-rf44a5202s9-bz-rf44a5202s9-bz-531851246?$650_519_PNG$',img2:'https://images.samsung.com/is/image/samsung/p6pim/br/rf44a5202s9-bz/gallery/br-rf44a5202s9-bz-thumb-531851248?$650_519_PNG$'},
      {label:'Branca',color:'#f5f5f5',img1:'https://images.samsung.com/is/image/samsung/p6pim/br/rf44a5202ww-bz/gallery/br-rf44a5202ww-bz-rf44a5202ww-bz-531851254?$650_519_PNG$',img2:'https://images.samsung.com/is/image/samsung/p6pim/br/rf44a5202ww-bz/gallery/br-rf44a5202ww-bz-thumb-531851256?$650_519_PNG$'},
    ],
    highlights:['460L total','SpaceMax parede fina','Digital Inverter 10 anos','All-Around Cooling','FlexZone 4 temperaturas','Frost Free total','Classe A+++'],
    description:'Samsung French Door 460L SpaceMax: Digital Inverter econômico, 10 anos garantia.',
    specs:[['Capacidade','460L (296L+164L)'],['Compressor','Digital Inverter 10 anos'],['Classe','A+++'],['Tipo','French Door + FlexZone'],['Dimensões','178×91×71cm'],['Tensão','Bivolt']],
    reviewsData:[{user:'Lúcia R.',rating:5,date:'10/11/2024',comment:'Espaçosa e silenciosíssima!'}]
  },
  {
    id:24, category:'eletros', brand:'Philips',
    name:'Aspirador Robô Philips HomeRun 7000 3000Pa Wi-Fi',
    sku:'MLU0024', price:2499, oldPrice:4999, discount:50,
    rating:4.7, reviews:987,
    img1:'https://www.philips.com.br/c-dam/b2c/category-pages/vacuum-cleaner/robot-vacuum-cleaner/XU3110-01.png',
    img2:'https://fdn2.gsmarena.com/vv/pics/philips/philips-homerun-7000-01.jpg',
    variants:[
      {label:'Preto',color:'#1a1a1a',img1:'https://www.philips.com.br/c-dam/b2c/category-pages/vacuum-cleaner/robot-vacuum-cleaner/XU3110-01.png',img2:'https://fdn2.gsmarena.com/vv/pics/philips/philips-homerun-7000-01.jpg'},
    ],
    highlights:['Mapeamento IA câmera visual','Sucção 3000Pa','Estação auto-esvaziamento 60 dias','Mopa aspira+lava','120min autonomia','Alexa + Google Home','Filtro HEPA 99,97%'],
    description:'Philips HomeRun 7000 + estação auto-esvaziamento 60 dias. IA, 3000Pa, mopa.',
    specs:[['Sucção','3000Pa'],['Mapeamento','Câmera visual IA'],['Autonomia','120 minutos'],['Reservatório','500ml pó/200ml água'],['Estação','60 dias sem esvaziar'],['Filtro','HEPA 99,97%']],
    reviewsData:[{user:'Sandra B.',rating:5,date:'05/11/2024',comment:'Nunca mais passo aspirador!'}]
  },
];

// ══════════════════════════════════════════
// CART
// ══════════════════════════════════════════
var cart = JSON.parse(localStorage.getItem('magaluCart') || '[]');
function saveCart() { localStorage.setItem('magaluCart', JSON.stringify(cart)); }

function addToCart(id) {
  var p = PRODUCTS.find(function(x) { return x.id === id; });
  if (!p) return;
  var imgEl = document.getElementById('pimg-' + id);
  var currentImg = imgEl ? imgEl.src : p.img1;
  var ex = cart.find(function(i) { return i.id === id; });
  if (ex) ex.qty++;
  else cart.push({ id:id, name:p.name, price:p.price, qty:1, img:currentImg });
  saveCart(); updateCartBadge(); renderCart(); openCart();
}
function removeFromCart(id) {
  cart = cart.filter(function(i) { return i.id !== id; });
  saveCart(); updateCartBadge(); renderCart();
}
function changeQty(id, delta) {
  var item = cart.find(function(i) { return i.id === id; });
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else { saveCart(); renderCart(); updateCartBadge(); }
}
function updateCartBadge() {
  var total = cart.reduce(function(s, i) { return s + i.qty; }, 0);
  document.querySelectorAll('#cartBadge').forEach(function(b) {
    b.textContent = total;
    b.style.display = total > 0 ? 'flex' : 'none';
  });
}
function openCart()  { var s=document.getElementById('cartSidebar'),o=document.getElementById('cartOverlay'); if(s)s.classList.add('open'); if(o)o.classList.add('open'); }
function closeCart() { var s=document.getElementById('cartSidebar'),o=document.getElementById('cartOverlay'); if(s)s.classList.remove('open'); if(o)o.classList.remove('open'); }

function renderCart() {
  var el=document.getElementById('cartItems'), footer=document.getElementById('cartFooter');
  if (!el) return;
  if (!cart.length) {
    el.innerHTML='<div class="cart-empty">🛒<p>Seu carrinho está vazio</p><a href="index.html">Continuar comprando</a></div>';
    if (footer) footer.innerHTML=''; return;
  }
  el.innerHTML = cart.map(function(item) {
    return '<div class="cart-item">' +
      (item.img ? '<img src="'+item.img+'" style="width:52px;height:52px;object-fit:contain;border-radius:6px;background:#f5f5f5;flex-shrink:0" onerror="this.style.display=\'none\'">' : '') +
      '<div class="cart-item-info">'+
        '<div class="cart-item-name">'+item.name+'</div>'+
        '<div class="cart-item-price">R$ '+(item.price*item.qty).toFixed(2).replace('.',',')+'</div>'+
        '<div class="cart-item-qty">'+
          '<button onclick="changeQty('+item.id+',-1)">−</button>'+
          '<span>'+item.qty+'</span>'+
          '<button onclick="changeQty('+item.id+',1)">+</button>'+
          '<button class="cart-remove" onclick="removeFromCart('+item.id+')">🗑</button>'+
        '</div>'+
      '</div></div>';
  }).join('');
  var total = cart.reduce(function(s,i){ return s+i.price*i.qty; },0);
  if (footer) footer.innerHTML =
    '<div class="cart-total-row"><span>Subtotal:</span><strong>R$ '+total.toFixed(2).replace('.',',')+'</strong></div>'+
    '<div class="cart-total-row pix"><span>💚 No Pix (-5%):</span><strong>R$ '+(total*.95).toFixed(2).replace('.',',')+'</strong></div>'+
    '<button class="btn-checkout" onclick="alert(\'✅ Compra realizada!\\nObrigado por comprar no Magalu!\')">Finalizar Compra</button>';
}

// ══════════════════════════════════════════
// RENDER PRODUCTS — imagem com fallback em cadeia
// ══════════════════════════════════════════
function renderProducts(list) {
  var grid = document.getElementById('productsGrid');
  if (!grid) return;
  var html = '';
  for (var i = 0; i < list.length; i++) {
    var p = list[i];
    var varHTML = '';
    if (p.variants && p.variants.length > 0) {
      varHTML = '<div class="color-variants" id="cv-'+p.id+'">';
      for (var j = 0; j < p.variants.length; j++) {
        var v = p.variants[j];
        var lightC = ['#f5f5f0','#e3e4e6','#f0f0f0','#e8e8e8','#f0ede8','#f5f5f5','#e3d0be','#f5f0eb','#d4d4d4','#e8e8e6','#c8c8c8'];
        var brd = lightC.indexOf(v.color)>=0 ? 'border:2px solid #bbb;' : 'border:2px solid transparent;';
        varHTML += '<button class="color-dot'+(j===0?' active':'')+'" title="'+v.label+'" style="background:'+v.color+';'+brd+'" onclick="event.stopPropagation();selectVariant('+p.id+','+j+')"></button>';
      }
      varHTML += '</div>';
    }
    html += '<div class="product-card" id="card-'+p.id+'" onclick="window.location.href=\'produto.html?id='+p.id+'\'">' +
      '<div class="product-badge">-'+p.discount+'%</div>' +
      '<button class="product-fav" onclick="event.stopPropagation();this.classList.toggle(\'active\');this.textContent=this.classList.contains(\'active\')?\'♥\':\'♡\'">♡</button>' +
      '<div class="product-img-wrap">' +
        '<img id="pimg-'+p.id+'" alt="'+p.name+'" loading="lazy">' +
      '</div>' +
      '<div class="product-info">' +
        '<div class="product-brand">'+p.brand+'</div>' +
        '<div class="product-name" id="pname-'+p.id+'">'+p.name+'</div>' +
        varHTML +
        '<div class="product-stars">'+'★'.repeat(Math.floor(p.rating))+'☆'.repeat(5-Math.floor(p.rating))+' <span>('+p.reviews.toLocaleString('pt-BR')+')</span></div>' +
        '<div class="product-price-old">De: R$ '+p.oldPrice.toFixed(2).replace('.',',')+'</div>' +
        '<div class="product-price">R$ '+p.price.toFixed(2).replace('.',',')+'</div>' +
        '<div class="product-installment">12x R$ '+(p.price/12).toFixed(2).replace('.',',')+' s/juros</div>' +
        '<div class="product-pix">💚 R$ '+(p.price*.95).toFixed(2).replace('.',',')+'no Pix</div>' +
        '<button class="product-buy" id="pbuy-'+p.id+'" onclick="event.stopPropagation();handleBuy('+p.id+')">Comprar</button>' +
      '</div>' +
    '</div>';
  }
  grid.innerHTML = html;
  // Aplica fallback em cadeia APÓS o HTML ser inserido no DOM
  for (var k = 0; k < list.length; k++) {
    (function(prod) {
      var imgEl = document.getElementById('pimg-'+prod.id);
      if (imgEl) setImgWithFallbacks(imgEl, prod.img1, prod.img2, prod.brand, prod.category);
    })(list[k]);
  }
}

function handleBuy(id) {
  addToCart(id);
  var btn = document.getElementById('pbuy-'+id);
  if (!btn) return;
  btn.textContent = '✓ Adicionado';
  btn.style.background = '#27ae60';
  setTimeout(function() { btn.textContent='Comprar'; btn.style.background=''; }, 1600);
}

function selectVariant(productId, variantIndex) {
  var p = PRODUCTS.find(function(x){ return x.id===productId; });
  if (!p || !p.variants[variantIndex]) return;
  var v = p.variants[variantIndex];
  var imgEl = document.getElementById('pimg-'+productId);
  if (imgEl) {
    imgEl.style.opacity='0';
    imgEl.style.transition='opacity 0.2s ease';
    setTimeout(function(){
      setImgWithFallbacks(imgEl, v.img1, v.img2, p.brand, p.category);
      imgEl.style.opacity='1';
    }, 180);
  }
  var nameEl = document.getElementById('pname-'+productId);
  if (nameEl) nameEl.textContent = p.name+' – '+v.label;
  var container = document.getElementById('cv-'+productId);
  if (container) container.querySelectorAll('.color-dot').forEach(function(d,i){ d.classList.toggle('active',i===variantIndex); });
}

// ══════════════════════════════════════════
// FILTER / SEARCH
// ══════════════════════════════════════════
function filterCategory(cat) {
  var list = cat==='all' ? PRODUCTS : PRODUCTS.filter(function(p){ return p.category===cat; });
  renderProducts(list.length ? list : PRODUCTS);
  setTimeout(function(){ var g=document.getElementById('productsGrid'); if(g)g.scrollIntoView({behavior:'smooth',block:'start'}); },100);
}
function doSearch() {
  var input=document.getElementById('searchInput');
  var q=input ? input.value.toLowerCase().trim() : '';
  if (!q) return renderProducts(PRODUCTS);
  var res=PRODUCTS.filter(function(p){
    return p.name.toLowerCase().indexOf(q)>=0||p.brand.toLowerCase().indexOf(q)>=0||p.category.toLowerCase().indexOf(q)>=0;
  });
  renderProducts(res.length ? res : PRODUCTS);
  setTimeout(function(){ var g=document.getElementById('productsGrid'); if(g)g.scrollIntoView({behavior:'smooth',block:'start'}); },100);
}

// ══════════════════════════════════════════
// HERO CAROUSEL
// ══════════════════════════════════════════
var slideIdx=0, SLIDE_COUNT=4;
function changeSlide(dir){ goSlide((slideIdx+dir+SLIDE_COUNT)%SLIDE_COUNT); }
function goSlide(n){
  slideIdx=n;
  var s=document.getElementById('heroSlides');
  if(s) s.style.transform='translateX(-'+(slideIdx*100)+'%)';
  document.querySelectorAll('.dot').forEach(function(d,i){ d.classList.toggle('active',i===slideIdx); });
}

// ══════════════════════════════════════════
// COUNTDOWN
// ══════════════════════════════════════════
function startCountdown(){
  var end=parseInt(localStorage.getItem('cdEnd')||'0');
  if(!end||end<Date.now()){ end=Date.now()+6*3600*1000; localStorage.setItem('cdEnd',String(end)); }
  setInterval(function(){
    var diff=Math.max(0,end-Date.now());
    var h=String(Math.floor(diff/3600000)).padStart(2,'0');
    var m=String(Math.floor((diff%3600000)/60000)).padStart(2,'0');
    var s=String(Math.floor((diff%60000)/1000)).padStart(2,'0');
    var el=document.getElementById('countdown');
    if(el) el.textContent=h+':'+m+':'+s;
  },1000);
}

// ══════════════════════════════════════════
// INIT
// ══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function(){
  updateCartBadge(); renderCart(); renderProducts(PRODUCTS); startCountdown();
  setInterval(function(){ changeSlide(1); }, 5000);
  var si=document.getElementById('searchInput');
  if(si) si.addEventListener('keydown',function(e){ if(e.key==='Enter') doSearch(); });
  var ci=document.getElementById('cepInput');
  if(ci) ci.addEventListener('input',function(e){
    var v=e.target.value.replace(/\D/g,'');
    if(v.length>5) v=v.slice(0,5)+'-'+v.slice(5,8);
    e.target.value=v;
  });
});
