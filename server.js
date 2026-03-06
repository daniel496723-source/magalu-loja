const http = require('http');
const url  = require('url');
const fs   = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

// ── CONFIG ──
const PORT = process.env.PORT || 3000;
const PAYMENT_LINKS = {
  cartao:'https://SEU-LINK-CARTAO-AQUI.com',
  pix:   'https://SEU-LINK-PIX-AQUI.com',
  boleto:'https://SEU-LINK-BOLETO-AQUI.com'
};

// ── FRETE ──
const FRETE = {
  SP:{pac:0,   sedex:19.9,prazo_pac:3, prazo_sedex:1},RJ:{pac:15.9,sedex:29.9,prazo_pac:4, prazo_sedex:2},
  MG:{pac:15.9,sedex:29.9,prazo_pac:4, prazo_sedex:2},ES:{pac:18.9,sedex:32.9,prazo_pac:5, prazo_sedex:2},
  PR:{pac:18.9,sedex:32.9,prazo_pac:5, prazo_sedex:2},SC:{pac:20.9,sedex:34.9,prazo_pac:5, prazo_sedex:2},
  RS:{pac:20.9,sedex:34.9,prazo_pac:6, prazo_sedex:3},DF:{pac:22.9,sedex:36.9,prazo_pac:6, prazo_sedex:3},
  GO:{pac:22.9,sedex:36.9,prazo_pac:6, prazo_sedex:3},MT:{pac:25.9,sedex:39.9,prazo_pac:7, prazo_sedex:3},
  MS:{pac:25.9,sedex:39.9,prazo_pac:7, prazo_sedex:3},BA:{pac:25.9,sedex:39.9,prazo_pac:7, prazo_sedex:4},
  PE:{pac:27.9,sedex:42.9,prazo_pac:8, prazo_sedex:4},CE:{pac:28.9,sedex:44.9,prazo_pac:9, prazo_sedex:4},
  PA:{pac:33.9,sedex:49.9,prazo_pac:11,prazo_sedex:5},AM:{pac:38.9,sedex:58.9,prazo_pac:14,prazo_sedex:7},
};

// ── USUÁRIOS (em memória — substitua por banco real) ──
const users = {};    // { email: {id,name,email,avatar,provider,createdAt} }
const sessions = {}; // { token: email }

// ── CARRINHO / PEDIDOS / FAVORITOS ──
const carts     = {};
const orders    = [];
const favorites = {}; // { sessionToken: [productId,...] }

// ── CATÁLOGO COMPLETO ──
const CATALOG = [
  // ── CELULARES ──
  {id:'C001',name:'Apple iPhone 15 128GB',brand:'Apple',cat:'Celulares',price:2899.99,orig:5499.99,
   colors:['azul','preto','rosa','amarelo','verde'],storages:['128','256','512'],
   imgs:{azul:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue?wid=800&hei=800&fmt=jpeg&qlt=90',preto:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-black?wid=800&hei=800&fmt=jpeg&qlt=90',rosa:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-pink?wid=800&hei=800&fmt=jpeg&qlt=90',amarelo:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-yellow?wid=800&hei=800&fmt=jpeg&qlt=90',verde:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-green?wid=800&hei=800&fmt=jpeg&qlt=90'},
   img:'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop',
   rating:4.8,reviews:12470,stock:15,tags:'iphone apple celular smartphone ios 15',
   specs:{'Tela':'6,1" Super Retina XDR OLED','Chip':'Apple A16 Bionic','Câmera Principal':'48 MP f/1.6 + 12 MP ultrawide','Câmera Frontal':'12 MP TrueDepth','Bateria':'3279 mAh — até 20h de uso','Conectividade':'5G, Wi-Fi 6, Bluetooth 5.3, USB-C','Sistema':'iOS 17','Resistência':'IP68 (até 6m por 30 min)','Peso':'171 g','Dimensões':'147,6 × 71,6 × 7,8 mm','Garantia':'12 meses Apple'}},

  {id:'C002',name:'Apple iPhone 15 Pro 256GB',brand:'Apple',cat:'Celulares',price:5499.99,orig:9999.99,
   colors:['titanio','azul','branco','preto'],storages:['128','256','512','1TB'],
   imgs:{titanio:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=800&hei=800&fmt=jpeg&qlt=90',azul:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-bluetitanium?wid=800&hei=800&fmt=jpeg&qlt=90',branco:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-whitetitanium?wid=800&hei=800&fmt=jpeg&qlt=90',preto:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-blacktitanium?wid=800&hei=800&fmt=jpeg&qlt=90'},
   img:'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop',
   rating:4.9,reviews:8341,stock:8,tags:'iphone apple celular pro titanio 15 pro',
   specs:{'Tela':'6,1" Super Retina XDR ProMotion 120Hz','Chip':'Apple A17 Pro (3nm)','Câmera Principal':'48 MP f/1.78 + 12 MP ultrawide + 12 MP teleobjetiva 3x','Câmera Frontal':'12 MP TrueDepth','Bateria':'3274 mAh — até 23h','Conectividade':'5G, Wi-Fi 6E, Bluetooth 5.3, USB-C 3.0','Dynamic Island':'Sim','Botão de Ação':'Sim','Sistema':'iOS 17','Resistência':'IP68 (até 6m por 30 min)','Peso':'187 g','Garantia':'12 meses Apple'}},

  {id:'C003',name:'Apple iPhone 14 128GB',brand:'Apple',cat:'Celulares',price:2199.99,orig:4299.99,
   colors:['azul','preto','roxo','amarelo','vermelho'],storages:['128','256','512'],
   imgs:{azul:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-blue?wid=800&hei=800&fmt=jpeg&qlt=90',preto:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-midnight?wid=800&hei=800&fmt=jpeg&qlt=90',roxo:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-purple?wid=800&hei=800&fmt=jpeg&qlt=90',amarelo:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-14-finish-select-202303-6-1inch-yellow?wid=800&hei=800&fmt=jpeg&qlt=90',vermelho:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-productred?wid=800&hei=800&fmt=jpeg&qlt=90'},
   img:'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
   rating:4.7,reviews:18210,stock:20,tags:'iphone apple celular 14',
   specs:{'Tela':'6,1" Super Retina XDR OLED','Chip':'Apple A15 Bionic','Câmera Principal':'12 MP f/1.5 + 12 MP ultrawide','Câmera Frontal':'12 MP TrueDepth (autofoco)','Bateria':'3279 mAh — até 20h','Crash Detection':'Sim','SOS de Emergência via Satélite':'Sim','Conectividade':'5G, Wi-Fi 6, Bluetooth 5.3, Lightning','Sistema':'iOS 17','Resistência':'IP68','Peso':'172 g','Garantia':'12 meses Apple'}},

  {id:'C004',name:'Apple iPhone 13 128GB',brand:'Apple',cat:'Celulares',price:1799.99,orig:3799.99,
   colors:['meia-noite','estelar','azul','rosa','vermelho','verde'],storages:['128','256','512'],
   imgs:{'meia-noite':'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-13-finish-select-202207-6-1inch-midnight?wid=800&hei=800&fmt=jpeg&qlt=90',estelar:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-13-finish-select-202207-6-1inch-starlight?wid=800&hei=800&fmt=jpeg&qlt=90',azul:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-13-finish-select-202207-6-1inch-blue?wid=800&hei=800&fmt=jpeg&qlt=90',rosa:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-13-finish-select-202207-6-1inch-pink?wid=800&hei=800&fmt=jpeg&qlt=90',vermelho:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-13-finish-select-202207-6-1inch-productred?wid=800&hei=800&fmt=jpeg&qlt=90',verde:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-13-finish-select-202207-6-1inch-green?wid=800&hei=800&fmt=jpeg&qlt=90'},
   img:'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop',
   rating:4.7,reviews:32100,stock:14,tags:'iphone apple celular 13',
   specs:{'Tela':'6,1" Super Retina XDR OLED','Chip':'Apple A15 Bionic','Câmera Principal':'12 MP f/1.6 + 12 MP ultrawide','Câmera Frontal':'12 MP TrueDepth','Bateria':'3227 mAh — até 19h','Conectividade':'5G, Wi-Fi 6, Bluetooth 5.0, Lightning','Sistema':'iOS 17','Resistência':'IP68 (até 6m por 30 min)','Peso':'174 g','Dimensões':'146,7 × 71,5 × 7,65 mm','Garantia':'12 meses Apple'}},

  {id:'C005',name:'Samsung Galaxy S24 256GB',brand:'Samsung',cat:'Celulares',price:2799.99,orig:4999.99,
   colors:['preto','violeta','amarelo','cinza'],storages:['128','256'],
   imgs:{preto:'https://images.samsung.com/is/image/samsung/p6pim/br/2401/gallery/br-galaxy-s24-s921-sm-s921bzkezbr-thumb-539493439?$650_519_PNG$',violeta:'https://images.samsung.com/is/image/samsung/p6pim/br/2401/gallery/br-galaxy-s24-s921-sm-s921bzvpzbr-thumb-539493442?$650_519_PNG$',amarelo:'https://images.samsung.com/is/image/samsung/p6pim/br/2401/gallery/br-galaxy-s24-s921-sm-s921bzyezbr-thumb-539493433?$650_519_PNG$',cinza:'https://images.samsung.com/is/image/samsung/p6pim/br/2401/gallery/br-galaxy-s24-s921-sm-s921bzagebr-thumb-539513560?$650_519_PNG$'},
   img:'https://images.unsplash.com/photo-1583394293214-b6f3aa50e994?w=400&h=400&fit=crop',
   rating:4.8,reviews:7893,stock:15,tags:'samsung galaxy s24 celular android',
   specs:{'Tela':'6,2" Dynamic AMOLED 2X 120Hz','Chip':'Exynos 2400 / Snapdragon 8 Gen 3','RAM':'8 GB','Câmera Principal':'50 MP f/1.8 + 12 MP ultrawide + 10 MP zoom 3x','Câmera Frontal':'12 MP','Bateria':'4000 mAh — carregamento 25W','Conectividade':'5G, Wi-Fi 7, Bluetooth 5.3, USB-C','Galaxy AI':'Sim','Sistema':'Android 14 / One UI 6.1','Resistência':'IP68','Peso':'167 g','Garantia':'12 meses Samsung'}},

  {id:'C006',name:'Samsung Galaxy S24 Ultra 512GB',brand:'Samsung',cat:'Celulares',price:4999.99,orig:8999.99,
   colors:['preto','cinza','violeta','laranja'],storages:['256','512','1TB'],
   imgs:{preto:'https://images.samsung.com/is/image/samsung/p6pim/br/sm-s928bzkpzto/gallery/br-galaxy-s24-ultra-sm-s928-sm-s928bzkpzto-thumb-539169041?$650_519_PNG$',cinza:'https://images.samsung.com/is/image/samsung/p6pim/br/sm-s928bzapzto/gallery/br-galaxy-s24-ultra-sm-s928-sm-s928bzapzto-thumb-539169044?$650_519_PNG$',violeta:'https://images.samsung.com/is/image/samsung/p6pim/br/sm-s928bzvpzto/gallery/br-galaxy-s24-ultra-sm-s928-sm-s928bzvpzto-thumb-539169047?$650_519_PNG$',laranja:'https://images.samsung.com/is/image/samsung/p6pim/br/sm-s928bzypzto/gallery/br-galaxy-s24-ultra-sm-s928-sm-s928bzypzto-thumb-539169050?$650_519_PNG$'},
   img:'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=400&fit=crop',
   rating:4.9,reviews:5430,stock:6,tags:'samsung galaxy s24 ultra celular android',
   specs:{'Tela':'6,8" Dynamic AMOLED 2X 120Hz 2600 nits','Chip':'Snapdragon 8 Gen 3 for Galaxy','RAM':'12 GB','S Pen':'Integrada','Câmera Principal':'200 MP f/1.7 + 12 MP ultrawide + 10 MP zoom 3x + 50 MP zoom 5x','Câmera Frontal':'12 MP','Bateria':'5000 mAh — carregamento 45W','Conectividade':'5G, Wi-Fi 7, Bluetooth 5.3, USB-C 3.2','Galaxy AI':'Sim','Sistema':'Android 14 / One UI 6.1','Resistência':'IP68 + Armação de Titânio','Peso':'232 g','Garantia':'12 meses Samsung'}},

  {id:'C007',name:'Samsung Galaxy A55 5G 128GB',brand:'Samsung',cat:'Celulares',price:1299.99,orig:2499.99,
   colors:['azul','lilás','preto'],storages:['128','256'],
   imgs:{azul:'https://images.samsung.com/is/image/samsung/p6pim/br/sm-a556ezkazbr/gallery/br-galaxy-a55-5g-sm-a556-sm-a556ezkazbr-thumb-539697505?$650_519_PNG$',lilás:'https://images.samsung.com/is/image/samsung/p6pim/br/sm-a556elvpzbr/gallery/br-galaxy-a55-5g-sm-a556-sm-a556elvpzbr-thumb-539697508?$650_519_PNG$',preto:'https://images.samsung.com/is/image/samsung/p6pim/br/sm-a556ezkpzbr/gallery/br-galaxy-a55-5g-sm-a556-sm-a556ezkpzbr-thumb-539697502?$650_519_PNG$'},
   img:'https://images.samsung.com/is/image/samsung/p6pim/br/sm-a556ezkazbr/gallery/br-galaxy-a55-5g-sm-a556-sm-a556ezkazbr-thumb-539697505?$650_519_PNG$',
   rating:4.6,reviews:4987,stock:22,tags:'samsung galaxy a55 celular android 5g',
   specs:{'Tela':'6,6" Super AMOLED 120Hz','Chip':'Exynos 1480 (4nm)','RAM':'8 GB','Câmera Principal':'50 MP f/1.8 + 12 MP ultrawide + 5 MP macro','Câmera Frontal':'32 MP','Bateria':'5000 mAh — carregamento 25W','Conectividade':'5G, Wi-Fi 6, Bluetooth 5.3, USB-C','NFC':'Sim','Sistema':'Android 14 / One UI 6.1','Resistência':'IP67','Peso':'213 g','Garantia':'12 meses Samsung'}},

  {id:'C008',name:'Samsung Galaxy A35 5G 128GB',brand:'Samsung',cat:'Celulares',price:899.99,orig:1799.99,
   colors:['azul','lilás','preto'],storages:['128','256'],
   imgs:{azul:'https://images.samsung.com/is/image/samsung/p6pim/br/sm-a356ezkazbr/gallery/br-galaxy-a35-5g-sm-a356-sm-a356ezkazbr-thumb-539169002?$650_519_PNG$',lilás:'https://images.samsung.com/is/image/samsung/p6pim/br/sm-a356elvpzbr/gallery/br-galaxy-a35-5g-sm-a356-sm-a356elvpzbr-thumb-539169005?$650_519_PNG$',preto:'https://images.samsung.com/is/image/samsung/p6pim/br/sm-a356ezkpzbr/gallery/br-galaxy-a35-5g-sm-a356-sm-a356ezkpzbr-thumb-539168999?$650_519_PNG$'},
   img:'https://images.samsung.com/is/image/samsung/p6pim/br/sm-a356ezkazbr/gallery/br-galaxy-a35-5g-sm-a356-sm-a356ezkazbr-thumb-539169002?$650_519_PNG$',
   rating:4.5,reviews:8210,stock:28,tags:'samsung galaxy a35 celular android 5g barato',
   specs:{'Tela':'6,6" Super AMOLED 120Hz','Chip':'Exynos 1380 (5nm)','RAM':'6 GB','Câmera Principal':'50 MP f/1.8 + 8 MP ultrawide + 5 MP macro','Câmera Frontal':'13 MP','Bateria':'5000 mAh — carregamento 25W','Conectividade':'5G, Wi-Fi 6, Bluetooth 5.3, USB-C','Sistema':'Android 14 / One UI 6.1','Resistência':'IP67','Peso':'210 g','Garantia':'12 meses Samsung'}},

  {id:'C009',name:'Xiaomi 14T Pro 512GB',brand:'Xiaomi',cat:'Celulares',price:2499.99,orig:4999.99,
   colors:['preto','titan-gray','titan-blue'],storages:['256','512','1TB'],
   imgs:{preto:'https://fdn2.mobgsm.com/vv/pics/xiaomi/xiaomi-14t-pro-1.jpg','titan-gray':'https://fdn2.mobgsm.com/vv/pics/xiaomi/xiaomi-14t-pro-2.jpg','titan-blue':'https://fdn2.mobgsm.com/vv/pics/xiaomi/xiaomi-14t-pro-3.jpg'},
   img:'https://fdn2.mobgsm.com/vv/pics/xiaomi/xiaomi-14t-pro-1.jpg',
   rating:4.7,reviews:2134,stock:10,tags:'xiaomi 14t pro celular android flagship 5g',
   specs:{'Tela':'6,67" AMOLED 144Hz 4000 nits','Chip':'MediaTek Dimensity 9300+','RAM':'12 GB LPDDR5X','Câmera Leica':'50 MP f/1.6 + 50 MP teleobjetiva 2,6x + 12 MP ultrawide','Câmera Frontal':'32 MP','Bateria':'5000 mAh — carregamento 120W HyperCharge','Conectividade':'5G, Wi-Fi 7, Bluetooth 5.4, USB-C 3.2','Sistema':'Android 14 / HyperOS','Resistência':'IP68','Peso':'209 g','Garantia':'12 meses Xiaomi'}},

  {id:'C010',name:'Xiaomi Redmi Note 13 Pro 256GB',brand:'Xiaomi',cat:'Celulares',price:999.99,orig:1999.99,
   colors:['preto','verde','roxo'],storages:['128','256'],
   imgs:{preto:'https://fdn2.mobgsm.com/vv/pics/xiaomi/xiaomi-redmi-note-13-pro-5g-1.jpg',verde:'https://fdn2.mobgsm.com/vv/pics/xiaomi/xiaomi-redmi-note-13-pro-5g-2.jpg',roxo:'https://fdn2.mobgsm.com/vv/pics/xiaomi/xiaomi-redmi-note-13-pro-5g-3.jpg'},
   img:'https://fdn2.mobgsm.com/vv/pics/xiaomi/xiaomi-redmi-note-13-pro-5g-1.jpg',
   rating:4.5,reviews:9421,stock:30,tags:'xiaomi redmi note 13 pro android 5g barato',
   specs:{'Tela':'6,67" AMOLED 120Hz 1800 nits','Chip':'Qualcomm Snapdragon 7s Gen 2','RAM':'8 GB','Câmera Principal':'200 MP f/1.65 + 8 MP ultrawide + 2 MP macro','Câmera Frontal':'16 MP','Bateria':'5100 mAh — carregamento 67W','Conectividade':'5G, Wi-Fi 6, Bluetooth 5.2, USB-C 2.0','NFC':'Sim','Sistema':'Android 13 / MIUI 14','Resistência':'IP54','Peso':'187 g','Garantia':'12 meses Xiaomi'}},

  {id:'C011',name:'Motorola Edge 50 Pro 256GB',brand:'Motorola',cat:'Celulares',price:1499.99,orig:2999.99,
   colors:['preto','azul','bege'],storages:['256','512'],
   imgs:{preto:'https://fdn2.mobgsm.com/vv/pics/motorola/motorola-edge-50-pro-1.jpg',azul:'https://fdn2.mobgsm.com/vv/pics/motorola/motorola-edge-50-pro-2.jpg',bege:'https://fdn2.mobgsm.com/vv/pics/motorola/motorola-edge-50-pro-3.jpg'},
   img:'https://fdn2.mobgsm.com/vv/pics/motorola/motorola-edge-50-pro-1.jpg',
   rating:4.4,reviews:3756,stock:18,tags:'motorola edge 50 pro celular android 5g',
   specs:{'Tela':'6,7" pOLED 144Hz','Chip':'Qualcomm Snapdragon 7 Gen 3','RAM':'12 GB','Câmera Principal':'50 MP f/1.4 OIS + 13 MP ultrawide + 10 MP tele 3x','Câmera Frontal':'50 MP','Bateria':'4500 mAh — carregamento 125W TurboPower','Wireless Charging':'50W','Conectividade':'5G, Wi-Fi 7, Bluetooth 5.4, USB-C','Sistema':'Android 14 / Hello UI','Resistência':'IP68','Peso':'186 g','Garantia':'12 meses Motorola'}},

  {id:'C012',name:'Motorola Moto G85 5G 256GB',brand:'Motorola',cat:'Celulares',price:699.99,orig:1499.99,
   colors:['preto','prata','azul'],storages:['128','256'],
   imgs:{preto:'https://fdn2.mobgsm.com/vv/pics/motorola/motorola-moto-g85-5g-1.jpg',prata:'https://fdn2.mobgsm.com/vv/pics/motorola/motorola-moto-g85-5g-2.jpg',azul:'https://fdn2.mobgsm.com/vv/pics/motorola/motorola-moto-g85-5g-3.jpg'},
   img:'https://fdn2.mobgsm.com/vv/pics/motorola/motorola-moto-g85-5g-1.jpg',
   rating:4.3,reviews:6210,stock:25,tags:'motorola moto g85 celular android barato 5g',
   specs:{'Tela':'6,67" pOLED 120Hz','Chip':'Qualcomm Snapdragon 6s Gen 3','RAM':'8 GB','Câmera Principal':'50 MP f/1.79 OIS + 8 MP ultrawide','Câmera Frontal':'32 MP','Bateria':'5000 mAh — carregamento 33W TurboPower','Conectividade':'5G, Wi-Fi 5, Bluetooth 5.1, USB-C','Sistema':'Android 14','Resistência':'IP52','Peso':'172 g','Garantia':'12 meses Motorola'}},

  // ── ELETRODOMÉSTICOS ──
  {id:'E001',name:'Geladeira Samsung French Door 536L Inox',brand:'Samsung',cat:'Eletrodomésticos',price:3999.99,orig:7999.99,
   colors:['inox'],storages:['536L'],
   imgs:{inox:'https://images.samsung.com/is/image/samsung/p6pim/br/rf27cg5910sraz/gallery/br-french-door-rf27cg5910s-rf27cg5910sraza-thumb-536089552?$650_519_PNG$'},
   img:'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&h=400&fit=crop',
   rating:4.7,reviews:1432,stock:5,tags:'geladeira samsung french door inox cozinha',
   specs:{'Capacidade Total':'536 litros','Tipo':'French Door','Acabamento':'Inox com Metal Cooling','Freezer':'202 L (gaveta inferior)','Prateleiras':'Temperadas ajustáveis','Eficiência Energética':'A (Inmetro)','Voltagem':'Bivolt (110V/220V)','Dispenser de Água':'Sim (sem gelo)','Tecnologia':'Twin Cooling Plus, All Around Cooling','Dimensões':'H 177,5 × L 91,2 × P 71,6 cm','Peso':'120 kg','Garantia':'12 meses Samsung'}},

  {id:'E002',name:'Geladeira Brastemp Frost Free 375L',brand:'Brastemp',cat:'Eletrodomésticos',price:2299.99,orig:3999.99,
   colors:['branco','inox'],storages:['375L'],
   imgs:{branco:'https://images.samsung.com/is/image/samsung/p6pim/br/rb50dg600es9az/gallery/br-bottom-mount-freezer-rb50dg600es9-rb50dg600es9azs-thumb-539048791?$650_519_PNG$',inox:'https://images.samsung.com/is/image/samsung/p6pim/br/rb50dg600es9az/gallery/br-bottom-mount-freezer-rb50dg600es9-rb50dg600es9azs-thumb-539048791?$650_519_PNG$'},
   img:'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&h=400&fit=crop',
   rating:4.6,reviews:5670,stock:8,tags:'geladeira brastemp frost free 375l cozinha',
   specs:{'Capacidade Total':'375 litros','Tipo':'Frost Free (duas portas)','Freezer':'99 L','Prateleiras':'Fixas em vidro temperado','Gavetas':'3 gavetas ClearView','Eficiência Energética':'A (Inmetro)','Voltagem':'Bivolt (110V/220V)','Tecnologia':'Compressor Inverter, Fresh Zone','Dimensões':'H 167 × L 60 × P 67,5 cm','Peso':'72 kg','Garantia':'12 meses Brastemp'}},

  {id:'E003',name:'Lava e Seca Samsung 11kg Inox',brand:'Samsung',cat:'Eletrodomésticos',price:2499.99,orig:4999.99,
   colors:['inox'],storages:['11kg'],
   imgs:{inox:'https://images.samsung.com/is/image/samsung/p6pim/br/wd11bb744dgazs/gallery/br-combo-wd11bb744dgb-wd11bb744dgazs-thumb-539374892?$650_519_PNG$'},
   img:'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&h=400&fit=crop',
   rating:4.8,reviews:2134,stock:7,tags:'lava seca samsung 11kg inox eletrodomestico',
   specs:{'Capacidade de Lavagem':'11 kg','Capacidade de Secagem':'7 kg','Tipo':'Lava e Seca (frente)','Eficiência Energética':'A (Inmetro)','Programas':'14 programas de lavagem','Centrifugação':'Até 1400 RPM','Tecnologia':'EcoBubble, AI Control, WD Flex','Consumo de Água':'Até 69% menos','Voltagem':'220V','Dimensões':'H 85 × L 60 × P 60 cm','Peso':'78 kg','Garantia':'12 meses Samsung'}},

  {id:'E004',name:'Máquina de Lavar LG 13kg TurboWash',brand:'LG',cat:'Eletrodomésticos',price:1699.99,orig:2999.99,
   colors:['branco'],storages:['13kg'],
   imgs:{branco:'https://images.samsung.com/is/image/samsung/p6pim/br/ww11db8b25gxaz/gallery/br-front-loading-ww11db8b25g-ww11db8b25gxazs-thumb-539813651?$650_519_PNG$'},
   img:'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&h=400&fit=crop',
   rating:4.7,reviews:3890,stock:10,tags:'maquina lavar lg 13kg turbowash eletrodomestico',
   specs:{'Capacidade':'13 kg','Tipo':'Carga frontal','Eficiência Energética':'A+ (Inmetro)','Centrifugação':'Até 1200 RPM','Programas':'14 programas','Tecnologia':'TurboWash 360°, AI Direct Drive, Steam+','Tempo de Lavagem':'A partir de 39 min (TurboWash)','Voltagem':'Bivolt (110V/220V)','Dimensões':'H 85 × L 60 × P 62 cm','Peso':'72 kg','Garantia':'12 meses LG'}},

  {id:'E005',name:'Ar Condicionado LG Dual Inverter 12000 BTU',brand:'LG',cat:'Eletrodomésticos',price:1899.99,orig:3499.99,
   colors:['branco'],storages:['12000 BTU'],
   imgs:{branco:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_split_ac_unit&usqp=CAU'},
   img:'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop',
   rating:4.8,reviews:8134,stock:8,tags:'ar condicionado lg dual inverter 12000 btu split',
   specs:{'Capacidade':'12000 BTU/h','Tipo':'Split Hi Wall','Operação':'Frio e Quente','Eficiência':'INVERTER (A+++)','Filtro':'UVnano + PM1.0','Tensão':'220V','Condensadora':'Operação silenciosa 44 dB','Temperatura':'18 a 30°C','Wi-Fi':'Sim (app LG ThinQ)','Dimensões Evaporadora':'H 30 × L 84 × P 20,5 cm','Garantia':'5 anos no compressor, 12 meses geral'}},

  {id:'E006',name:'Air Fryer Philips Walita Avance 4.1L',brand:'Philips',cat:'Eletrodomésticos',price:299.99,orig:599.99,
   colors:['preto'],storages:['4.1L'],
   imgs:{preto:'https://www.philips.com.br/c-dam/b2c/en_AA/experience/content/images/HD9251_90/Philips-HD9252_90-AirFryer-Product-Image.jpg'},
   img:'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop',
   rating:4.7,reviews:15432,stock:25,tags:'air fryer fritadeira philips walita cozinha',
   specs:{'Capacidade':'4,1 litros','Potência':'1400W','Temperatura':'80°C a 200°C','Tecnologia':'Rapid Air (circulação de ar quente)','Timer':'Até 30 minutos','Uso de Óleo':'Até 90% menos gordura','Bandeja':'Antiaderente, lavável na lava-louças','Voltagem':'220V','Dimensões':'H 31 × L 28 × P 38 cm','Peso':'3 kg','Garantia':'12 meses Philips'}},

  {id:'E007',name:'Cafeteira Nespresso Vertuo Pop',brand:'Nespresso',cat:'Eletrodomésticos',price:399.99,orig:799.99,
   colors:['preto','branco','vermelho','azul'],storages:['único'],
   imgs:{preto:'https://www.nespresso.com/shared_res/agility/n-components/pdp/sku-main-info/coffee-machine-imgs/vertuo/ENV90_B_A3D_001_B1_PNG_CMYK_1.png',branco:'https://www.nespresso.com/shared_res/agility/n-components/pdp/sku-main-info/coffee-machine-imgs/vertuo/ENV90_B_A3D_001_B1_PNG_CMYK_1.png',vermelho:'https://www.nespresso.com/shared_res/agility/n-components/pdp/sku-main-info/coffee-machine-imgs/vertuo/ENV90_B_A3D_001_B1_PNG_CMYK_1.png',azul:'https://www.nespresso.com/shared_res/agility/n-components/pdp/sku-main-info/coffee-machine-imgs/vertuo/ENV90_B_A3D_001_B1_PNG_CMYK_1.png'},
   img:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
   rating:4.8,reviews:7654,stock:30,tags:'cafeteira nespresso vertuo pop cafe capsula',
   specs:{'Tecnologia':'Centrifusion (leitura de código de barras)','Pressão':'19 bar','Tamanhos':'Espresso (40ml), Double Espresso (80ml), Gran Lungo (150ml), Mug (230ml), Alto (414ml)','Aquecimento':'Pronto em 30 segundos','Tanque de Água':'560ml removível','Saída':'Ajustável (40–560ml)','Potência':'1500W','Descalcificação':'Automática','Voltagem':'220V','Dimensões':'H 32 × L 13 × P 28 cm','Garantia':'12 meses Nespresso'}},

  {id:'E008',name:'Micro-ondas LG 30L Smart Inverter',brand:'LG',cat:'Eletrodomésticos',price:449.99,orig:899.99,
   colors:['inox'],storages:['30L'],
   imgs:{inox:'https://images.samsung.com/is/image/samsung/p6pim/br/ms23t5018ak/gallery/br-microwave-ms23t5018ak-ms23t5018akbz-thumb-487416079?$650_519_PNG$'},
   img:'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop',
   rating:4.5,reviews:5243,stock:20,tags:'micro ondas microondas lg 30l inverter cozinha',
   specs:{'Capacidade':'30 litros','Potência':'1200W','Tecnologia':'Smart Inverter (potência contínua)','Programas':'17 opções automáticas','Função Grill':'Não','Função Crisp':'Não','Prato Giratório':'31,5 cm em vidro','Voltagem':'220V','Dimensões':'H 31 × L 51,7 × P 45,5 cm','Peso':'14 kg','Garantia':'12 meses LG'}},

  {id:'E009',name:'Aspirador Robô iRobot Roomba j7+',brand:'iRobot',cat:'Eletrodomésticos',price:1299.99,orig:2999.99,
   colors:['preto'],storages:['único'],
   imgs:{preto:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVpCMiuL5_roomba_robot_vacuum&usqp=CAU'},
   img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
   rating:4.7,reviews:3421,stock:12,tags:'aspirador robo irobot roomba j7 limpeza casa',
   specs:{'Tecnologia':'PrecisionVision Navigation (evita obstáculos)','Base Autoesvaziadora':'Clean Base (60 dias sem esvaziar)','Sensores':'Câmera frontal + sensores de queda','Mapeamento':'Inteligente com app iRobot Home','Sucção':'10× mais potente','Filtros':'Allergen Lock (alérgenos)','Bateria':'75 minutos de autonomia','Compatibilidade':'Alexa, Google Home','Voltagem':'110–240V','Dimensões':'Diâmetro 34 cm, H 8,7 cm','Garantia':'12 meses iRobot'}},

  {id:'E010',name:'Batedeira KitchenAid Artisan 4,8L',brand:'KitchenAid',cat:'Eletrodomésticos',price:1799.99,orig:3499.99,
   colors:['vermelho','preto','prata','branco'],storages:['4.8L'],
   imgs:{vermelho:'https://www.kitchenaid.com.br/medias/KSM150PSER-Hero.png?context=bWFzdGVyfGltYWdlc3wxMjM0NTZ8aW1hZ2UvcG5nfA',preto:'https://www.kitchenaid.com.br/medias/KSM150PSER-Hero.png?context=bWFzdGVyfGltYWdlc3wxMjM0NTZ8aW1hZ2UvcG5nfA',prata:'https://www.kitchenaid.com.br/medias/KSM150PSER-Hero.png?context=bWFzdGVyfGltYWdlc3wxMjM0NTZ8aW1hZ2UvcG5nfA',branco:'https://www.kitchenaid.com.br/medias/KSM150PSER-Hero.png?context=bWFzdGVyfGltYWdlc3wxMjM0NTZ8aW1hZ2UvcG5nfA'},
   img:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
   rating:4.9,reviews:6780,stock:7,tags:'batedeira kitchenaid artisan 4.8l cozinha confeitaria',
   specs:{'Capacidade':'4,8 litros','Potência':'325W','Velocidades':'10 velocidades + pulsar','Acessórios':'Batedor globo, gancho para pão, raquete para mistura','Acionamento':'Planetário (67 pontos de contato)','Material':'Inox polido','Pé de borracha':'Antiderrapante','Voltagem':'127V ou 220V','Dimensões':'H 35,3 × L 21,9 × P 37,5 cm','Peso':'11,7 kg','Garantia':'12 meses KitchenAid'}},

  // ── TV E VÍDEO ──
  {id:'T001',name:'Smart TV Samsung 55" QLED 4K 120Hz',brand:'Samsung',cat:'TV e Vídeo',price:2299.99,orig:4999.99,
   colors:['preto'],storages:['55"'],
   imgs:{preto:'https://images.samsung.com/is/image/samsung/p6pim/br/qn55q60dagxzd/gallery/br-qled-q60d-qn55q60dagxzd-thumb-539892890?$650_519_PNG$'},
   img:'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=400&fit=crop',
   rating:4.8,reviews:8421,stock:7,tags:'tv smart samsung qled 4k 55 polegadas 120hz',
   specs:{'Tela':'55" QLED 4K (3840×2160)','Taxa de Atualização':'120Hz','Brilho':'Quantum HDR+','Processador':'Quantum Processor 4K','Smart TV':'Tizen OS 8.0','Controle de Voz':'Alexa, Google, Bixby integrados','Conexões':'HDMI 2.1 (×4), USB (×2), Wi-Fi 5, Bluetooth 5.2','Game Mode Pro':'120fps, VRR, ALLM','Áudio':'40W — Object Tracking Sound Lite','Dimensões (sem suporte)':'H 71,2 × L 123,3 × P 5,7 cm','Garantia':'12 meses Samsung'}},

  {id:'T002',name:'Smart TV LG OLED 55" 4K 120Hz',brand:'LG',cat:'TV e Vídeo',price:3499.99,orig:7999.99,
   colors:['preto'],storages:['55"'],
   imgs:{preto:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_LG_OLED_TV_black&usqp=CAU'},
   img:'https://images.unsplash.com/photo-1571415060716-baff5f717c37?w=400&h=400&fit=crop',
   rating:4.9,reviews:4876,stock:4,tags:'tv smart lg oled 4k 55 polegadas 120hz',
   specs:{'Tela':'55" OLED evo 4K (3840×2160)','Taxa de Atualização':'120Hz + α9 AI Processor 4K Gen6','Preto Perfeito':'Pixel auto-iluminado — infinito contraste','HDR':'Dolby Vision IQ, HDR10, HLG','Smart TV':'webOS 23 com ThinQ AI','HDMI 2.1':'4 portas (48Gbps cada)','G-Sync Compatible':'Sim','FreeSync Premium':'Sim','Áudio':'60W — Dolby Atmos, AI Sound Pro','Dimensões (sem suporte)':'H 70,1 × L 121,9 × P 2,8 cm','Garantia':'12 meses LG'}},

  {id:'T003',name:'Smart TV TCL 50" QLED 4K Google TV',brand:'TCL',cat:'TV e Vídeo',price:1499.99,orig:2999.99,
   colors:['preto'],storages:['50"'],
   imgs:{preto:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_TCL_TV_50_inch&usqp=CAU'},
   img:'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400&h=400&fit=crop',
   rating:4.7,reviews:6543,stock:9,tags:'tv smart tcl 50 qled 4k google tv',
   specs:{'Tela':'50" QLED 4K (3840×2160)','Sistema':'Google TV (Android 11)','Certificação':'Netflix HDR, Disney+ 4K','HDR':'HDR10, Dolby Vision, HLG','Áudio':'20W — Dolby Atmos','Conexões':'HDMI (×3), USB (×2), Wi-Fi 5, Bluetooth','Google Assistant':'Integrado','Chromecast':'Integrado 4K','Dimensões (sem suporte)':'H 64 × L 112,6 × P 7,5 cm','Garantia':'12 meses TCL'}},

  {id:'T004',name:'Smart TV Philips 65" OLED+ 4K Ambilight',brand:'Philips',cat:'TV e Vídeo',price:4499.99,orig:8999.99,
   colors:['preto'],storages:['65"'],
   imgs:{preto:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_Philips_OLED_Ambilight_65&usqp=CAU'},
   img:'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=400&fit=crop',
   rating:4.8,reviews:2130,stock:3,tags:'tv philips oled ambilight 65 4k premium',
   specs:{'Tela':'65" OLED+ 4K — brilho 30% superior ao OLED convencional','Ambilight':'4 lados com 44 LEDs sincronizados','Processador':'P5 AI Perfect Picture Gen7','HDR':'Perfect Natural Reality, Dolby Vision IQ, HDR10+','Áudio':'70W — Bowers & Wilkins, Dolby Atmos','Smart TV':'Google TV (Android 12)','HDMI 2.1':'4 portas','VRR/ALLM/G-Sync':'Sim','Dimensões (sem suporte)':'H 82,4 × L 144,4 × P 4,7 cm','Garantia':'12 meses Philips'}},

  {id:'T005',name:'Soundbar Samsung HW-Q600C 3.1.2',brand:'Samsung',cat:'TV e Vídeo',price:999.99,orig:1999.99,
   colors:['preto'],storages:['único'],
   imgs:{preto:'https://images.samsung.com/is/image/samsung/p6pim/br/hw-q600cgxzd/gallery/br-soundbar-hw-q600c-hw-q600cgxzd-thumb-536243498?$650_519_PNG$'},
   img:'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=400&h=400&fit=crop',
   rating:4.6,reviews:2154,stock:14,tags:'soundbar samsung dolby atmos 3.1 bluetooth',
   specs:{'Canais':'3.1.2 (subwoofer sem fio + upfiring)','Potência Total':'360W','Áudio':'Dolby Atmos, DTS:X, SpaceFit Sound+','Conectividade':'HDMI eARC, Optical, Bluetooth, Wi-Fi','Subwoofer':'Sem fio — graves profundos','Game Mode':'Sim','SpaceFit Sound':'Calibração automática pelo ambiente','Dimensões Barra':'H 5,8 × L 98,4 × P 13,6 cm','Garantia':'12 meses Samsung'}},

  {id:'T006',name:'Chromecast Google TV 4K',brand:'Google',cat:'TV e Vídeo',price:299.99,orig:499.99,
   colors:['snow','hazel','sky'],storages:['único'],
   imgs:{snow:'https://lh3.googleusercontent.com/K9_7ELn7j2cV8TjKBZiHIXJsFBr1SZ0LOz_FIB0Qjlj2Ux8bFMj3bZB7LIQJxsQmj7hE5F4iXw=s1280',hazel:'https://lh3.googleusercontent.com/K9_7ELn7j2cV8TjKBZiHIXJsFBr1SZ0LOz_FIB0Qjlj2Ux8bFMj3bZB7LIQJxsQmj7hE5F4iXw=s1280',sky:'https://lh3.googleusercontent.com/K9_7ELn7j2cV8TjKBZiHIXJsFBr1SZ0LOz_FIB0Qjlj2Ux8bFMj3bZB7LIQJxsQmj7hE5F4iXw=s1280'},
   img:'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400&h=400&fit=crop',
   rating:4.7,reviews:18900,stock:20,tags:'chromecast google tv 4k streaming',
   specs:{'Resolução':'4K HDR (60fps)','HDR':'HDR10, HDR10+, HLG, Dolby Vision','Processador':'Amlogic S905X3 (4 núcleos Cortex-A55 1,9GHz)','RAM':'2 GB / 8 GB de armazenamento','Sistema':'Google TV (apps integrados: Netflix, YouTube, Disney+...)','Controle Remoto':'Com microfone para Google Assistente','Wi-Fi':'Wi-Fi 6 (802.11ax), dual-band','Bluetooth':'5.0','Alimentação':'USB-C (fonte incluída)','Garantia':'12 meses Google'}},

  // ── INFORMÁTICA ──
  {id:'I001',name:'MacBook Air M2 13" 256GB',brand:'Apple',cat:'Informática',price:6999.99,orig:11999.99,
   colors:['meia-noite','estelar','cinza','prata'],storages:['256','512','1TB'],
   imgs:{'meia-noite':'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=800&hei=800&fmt=jpeg&qlt=90',estelar:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/macbook-air-starlight-select-20220606?wid=800&hei=800&fmt=jpeg&qlt=90',cinza:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/macbook-air-spacegray-select-20220606?wid=800&hei=800&fmt=jpeg&qlt=90',prata:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/macbook-air-silver-select-20220606?wid=800&hei=800&fmt=jpeg&qlt=90'},
   img:'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&h=400&fit=crop',
   rating:4.9,reviews:7341,stock:6,tags:'macbook air apple notebook m2 mac',
   specs:{'Chip':'Apple M2 (8 núcleos CPU, 8/10 núcleos GPU)','Memória Unificada':'8 GB LPDDR5 (até 24 GB)','Armazenamento':'SSD 256 GB (até 2 TB)','Tela':'13,6" Liquid Retina 2560×1664 500 nits P3','Bateria':'até 18 horas — carregamento MagSafe 35W','Câmera FaceTime':'1080p com ISP do M2','Áudio':'Microfone array 3 canais, alto-falantes Spatial Audio','Conexões':'2× USB-C Thunderbolt/USB 4, MagSafe 3, fone 3,5mm','Wi-Fi':'Wi-Fi 6 (802.11ax), Bluetooth 5.3','Peso':'1,24 kg','Garantia':'12 meses Apple'}},

  {id:'I002',name:'MacBook Pro M3 14" 512GB',brand:'Apple',cat:'Informática',price:11999.99,orig:19999.99,
   colors:['preto','prata'],storages:['512','1TB','2TB'],
   imgs:{preto:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311054290',prata:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-silver-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311054345'},
   img:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
   rating:4.9,reviews:3210,stock:3,tags:'macbook pro apple notebook m3 mac',
   specs:{'Chip':'Apple M3 Pro (11 núcleos CPU, 14 núcleos GPU)','Memória Unificada':'18 GB LPDDR5 (até 36 GB)','Armazenamento':'SSD 512 GB (até 4 TB)','Tela':'14,2" Liquid Retina XDR 3024×1964 ProMotion 120Hz 1600 nits','Bateria':'até 18 horas — carregamento MagSafe 96W','Câmera':'1080p com ISP Neural Engine','Conexões':'3× Thunderbolt 4, HDMI 2.1, SD, MagSafe 3, Fone 3,5mm','Wi-Fi':'Wi-Fi 6E (802.11ax), Bluetooth 5.3','Peso':'1,61 kg','Garantia':'12 meses Apple'}},

  {id:'I003',name:'Notebook Dell Inspiron 15 i7 16GB',brand:'Dell',cat:'Informática',price:2999.99,orig:5999.99,
   colors:['preto','prata'],storages:['512','1TB'],
   imgs:{preto:'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/inspiron-notebooks/15-3535/pdp/laptop-inspiron-15-3535-pdp-black.psd?fmt=pjpg&pscan=auto&scl=1&wid=4000&hei=3000&qlt=100,1&resMode=sharp2&size=4000,3000',prata:'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/inspiron-notebooks/15-3535/pdp/laptop-inspiron-15-3535-pdp-black.psd?fmt=pjpg&pscan=auto&scl=1&wid=4000&hei=3000&qlt=100,1&resMode=sharp2&size=4000,3000'},
   img:'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
   rating:4.7,reviews:3987,stock:12,tags:'notebook dell inspiron i7 16gb 512gb windows',
   specs:{'Processador':'Intel Core i7-1355U (10 núcleos, até 5,0GHz)','Memória RAM':'16 GB DDR4 3200MHz','Armazenamento':'SSD NVMe 512 GB','Tela':'15,6" Full HD IPS (1920×1080) antirreflexo','Placa de Vídeo':'Intel Iris Xe Graphics integrada','Sistema':'Windows 11 Home','Bateria':'54 Whr — até 8 horas','Câmera':'HD 720p com obturador de privacidade','Conexões':'USB-A (×3), USB-C, HDMI 1.4, SD, Fone','Wi-Fi':'Wi-Fi 6, Bluetooth 5.2','Peso':'1,71 kg','Garantia':'12 meses Dell'}},

  {id:'I004',name:'Notebook Lenovo IdeaPad 3i i5 8GB',brand:'Lenovo',cat:'Informática',price:1799.99,orig:3499.99,
   colors:['cinza','azul'],storages:['256','512'],
   imgs:{cinza:'https://p3-ofp.static.pub//fes/cms/2022/09/22/r2l5bk0mq0zq8wlgifrmw7xpk1cqoh657826.png',azul:'https://p3-ofp.static.pub//fes/cms/2022/09/22/r2l5bk0mq0zq8wlgifrmw7xpk1cqoh657826.png'},
   img:'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=400&fit=crop',
   rating:4.5,reviews:9870,stock:15,tags:'notebook lenovo ideapad i5 8gb barato windows',
   specs:{'Processador':'Intel Core i5-1235U (10 núcleos, até 4,4GHz)','Memória RAM':'8 GB DDR4','Armazenamento':'SSD NVMe 256 GB','Tela':'15,6" Full HD IPS (1920×1080)','Placa de Vídeo':'Intel UHD Graphics integrada','Sistema':'Windows 11 Home','Bateria':'45 Whr — até 7,5 horas','Câmera':'720p com obturador físico','Conexões':'USB-A (×2), USB-C, HDMI, SD, Fone','Wi-Fi':'Wi-Fi 5, Bluetooth 5.0','Peso':'1,65 kg','Garantia':'12 meses Lenovo'}},

  {id:'I005',name:'Monitor Samsung 27" Odyssey 165Hz',brand:'Samsung',cat:'Informática',price:899.99,orig:1799.99,
   colors:['preto'],storages:['27"'],
   imgs:{preto:'https://images.samsung.com/is/image/samsung/p6pim/br/ls27cg552euxen/gallery/br-odyssey-g55c-ls27cg552eu-ls27cg552euxen-thumb-539015875?$650_519_PNG$'},
   img:'https://images.unsplash.com/photo-1593640408182-31c228eb7b8f?w=400&h=400&fit=crop',
   rating:4.7,reviews:4543,stock:18,tags:'monitor samsung 27 165hz gamer curvo',
   specs:{'Tela':'27" VA Curvo (1000R) QHD 2560×1440','Taxa de Atualização':'165Hz','Tempo de Resposta':'1ms (MPRT)','HDR':'HDR10','FreeSync Premium':'Sim','G-Sync Compatible':'Sim','Conexões':'HDMI 2.0 (×2), DisplayPort 1.2, USB Hub (×2)','Regulagem':'Altura, inclinação, rotação (pivot 90°)','Consumo':'27W','Dimensões (sem suporte)':'H 40,7 × L 61,2 × P 7,2 cm','Garantia':'12 meses Samsung'}},

  {id:'I006',name:'SSD Samsung 990 Pro 1TB NVMe',brand:'Samsung',cat:'Informática',price:349.99,orig:699.99,
   colors:['único'],storages:['1TB','2TB'],
   imgs:{'único':'https://images.samsung.com/is/image/samsung/p6pim/br/mz-v9p1t0bw/gallery/br-990-pro-mz-v9p1t0b-mz-v9p1t0bw-thumb-536684809?$650_519_PNG$'},
   img:'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=400&h=400&fit=crop',
   rating:4.9,reviews:12876,stock:30,tags:'ssd samsung 1tb nvme m.2 990 pro rapido',
   specs:{'Interface':'PCIe 4.0 NVMe M.2 2280','Capacidade':'1 TB','Leitura Sequencial':'até 7.450 MB/s','Escrita Sequencial':'até 6.900 MB/s','IOPS Leitura':'1.600.000 IOPS','IOPS Escrita':'1.550.000 IOPS','TBW':'600 TBW (1TB)','Cache':'Samsung V-NAND TLC + DRAM cache','Criptografia':'AES 256-bit','Garantia':'5 anos Samsung'}},

  {id:'I007',name:'Teclado Mecânico Redragon Kumara RGB',brand:'Redragon',cat:'Informática',price:179.99,orig:399.99,
   colors:['preto'],storages:['único'],
   imgs:{preto:'https://redragon.com.br/pub/media/catalog/product/cache/96d52c92ee041085c72e73d9c773b2e3/t/e/teclado_mecanico_gamer_redragon_kumara_k552_rgb_switch_red_abnt2_k552r_rgb-1.png'},
   img:'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
   rating:4.6,reviews:28743,stock:40,tags:'teclado mecanico redragon kumara rgb gamer pc',
   specs:{'Layout':'ABNT2 (Português BR)','Switches':'Red / Blue / Brown (mecânico)','Retroiluminação':'RGB 16,8 milhões de cores','Anti-Ghosting':'N-key rollover 100%','Teclas':'104 teclas','Construção':'Base de metal + teclas ABS','Conexão':'USB 1.8m trançado','Polling Rate':'1000Hz','Software':'Redragon DRACONIC (macros)','Dimensões':'L 44 × P 13,5 × A 4 cm','Garantia':'12 meses Redragon'}},

  {id:'I008',name:'Mouse Gamer Logitech G502 HERO 25K',brand:'Logitech',cat:'Informática',price:249.99,orig:499.99,
   colors:['preto'],storages:['único'],
   imgs:{preto:'https://resource.logitech.com/content/dam/gaming/en/products/g502-x/g502-x-gallery-1.png'},
   img:'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
   rating:4.8,reviews:34560,stock:22,tags:'mouse gamer logitech g502 hero 25k pc rgb',
   specs:{'Sensor':'HERO 25K (100–25.600 DPI)','Botões Programáveis':'11 botões','Roda de Rolagem':'Dual-mode (clicada e livre)','Pesos':'5 pesos de 3,6g cada','RGB':'Lightsync RGB (5 zonas)','Conexão':'USB com cabo trançado (2,1m)','Polling Rate':'1000Hz','Aceleração':'Até 40G','Velocidade':'Até 400 IPS','Peso':'121g (sem pesos)','Garantia':'24 meses Logitech'}},

  // ── MÓVEIS ──
  {id:'M001',name:'Sofá Retrátil 3 Lugares Veludo Cinza',brand:'Mobly',cat:'Móveis',price:1299.99,orig:2999.99,
   colors:['cinza','bege','preto'],storages:['3 lugares'],
   imgs:{cinza:'https://d2bojnz7h1ulut.cloudfront.net/produtos/sofas-e-poltronas/sofa-3-lugares-retratil-e-reclinavel-cinza-turku-mobly-2.jpg',bege:'https://d2bojnz7h1ulut.cloudfront.net/produtos/sofas-e-poltronas/sofa-3-lugares-retratil-e-reclinavel-cinza-turku-mobly-2.jpg',preto:'https://d2bojnz7h1ulut.cloudfront.net/produtos/sofas-e-poltronas/sofa-3-lugares-retratil-e-reclinavel-cinza-turku-mobly-2.jpg'},
   img:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
   rating:4.5,reviews:2321,stock:4,tags:'sofa retratil 3 lugares veludo cinza sala',
   specs:{'Assentos':'3 lugares retrácteis','Tecido':'Veludo de alta resistência','Estrutura':'Madeira maciça + MDF','Pés':'Madeira, altura 10cm','Densidade':'D33 (conforto premium)','Profundidade retrátil':'50 → 90 cm','Dimensões':'L 200 × P 50/90 × A 85 cm','Peso suportado':'Até 300 kg','Montagem':'Requer montagem (parafusos inclusos)','Garantia':'12 meses Mobly'}},

  {id:'M002',name:'Cadeira Gamer ThunderX3 EC3 Preta',brand:'ThunderX3',cat:'Móveis',price:799.99,orig:1799.99,
   colors:['preto','vermelho','azul'],storages:['único'],
   imgs:{preto:'https://thunderx3.com/image/cache/catalog/EC3-N/ec3_n_main-1170x870.jpg',vermelho:'https://thunderx3.com/image/cache/catalog/EC3-N/ec3_n_main-1170x870.jpg',azul:'https://thunderx3.com/image/cache/catalog/EC3-N/ec3_n_main-1170x870.jpg'},
   img:'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=400&fit=crop',
   rating:4.7,reviews:8765,stock:10,tags:'cadeira gamer thunderx3 ec3 ergonomica escritorio',
   specs:{'Encosto':'Reclinável 85°–175°','Apoio Lombar':'Almofada ajustável','Apoio de Cabeça':'Almofada removível','Braços':'4D ajustáveis','Assento':'Espuma fria moldada de alta densidade','Revestimento':'PU couro antisuor permeável','Mecanismo':'Rockingback + trava','Capacidade':'Até 150 kg','Altura da cadeira':'44–54 cm do chão','Dimensões':'L 68 × P 70 × A 120–130 cm','Garantia':'24 meses ThunderX3'}},

  {id:'M003',name:'Mesa Gamer Rise Mode 1,50m LED',brand:'Rise Mode',cat:'Móveis',price:499.99,orig:999.99,
   colors:['preto'],storages:['1,50m'],
   imgs:{preto:'https://risemode.com.br/image/cache/catalog/mesa/desk-gamer-1-5-platinum-capa-1-1170x870.jpg'},
   img:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
   rating:4.5,reviews:4321,stock:8,tags:'mesa gamer rise mode led home office escritorio',
   specs:{'Tampo':'MDF 15mm revestido (1500 × 600mm)','Estrutura':'Aço carbono zincado','LED':'Fita LED RGB (controlador embutido)','Peso suportado':'Até 50 kg','Regulagem de altura':'Pés niveladores','Passagem de Cabo':'Porta-cabo integrado','Furo para Monitor':'Rosca para suporte de monitor','Montagem':'Fácil montagem com chave inclusa','Dimensões':'L 150 × P 60 × A 76 cm','Peso':'24 kg','Garantia':'12 meses Rise Mode'}},

  {id:'M004',name:'Cama Box Queen Mola Ensacada Ortobom',brand:'Ortobom',cat:'Móveis',price:1799.99,orig:3999.99,
   colors:['branco'],storages:['Queen 158×198cm'],
   imgs:{branco:'https://www.ortobom.com.br/media/catalog/product/cache/1/small_image/600x600/9df78eab33525d08d6e5fb8d27136e95/c/o/conjunto-box-casal-queen-molas-ensacadas-1.jpg'},
   img:'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=400&fit=crop',
   rating:4.6,reviews:3456,stock:5,tags:'cama box queen mola ensacada ortobom quarto',
   specs:{'Tamanho':'Queen Size (158 × 198 cm)','Altura Total':'64 cm (box 27cm + colchão 37cm)','Molas':'Individually Pocketed Springs (ensacadas)','Espuma':'HR30 + espuma de conforto','Pillow Top':'Soft Pillow Top costurado','Densidade':'D45','Carga':'Até 180 kg por pessoa','Tecido':'Matelasse com borda bordada','Base Box':'Ortobom Premium — resistência à umidade','Garantia':'10 anos Ortobom'}},

  // ── FONES ──
  {id:'F001',name:'AirPods Pro 2ª Geração USB-C',brand:'Apple',cat:'Fones',price:1199.99,orig:2399.99,
   colors:['branco'],storages:['único'],
   imgs:{branco:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1694014784468'},
   img:'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
   rating:4.9,reviews:18521,stock:12,tags:'airpods pro apple fone bluetooth earbuds usb-c',
   specs:{'Chip':'Apple H2','Cancelamento de Ruído':'Ativo Adaptativo (ANC)','Áudio Espacial':'Personalizado com rastreamento de cabeça','Transparência':'Modo de transparência adaptativo','Autonomia':'6h (ANC ativo) + 30h (case)','Resistência':'IP54 (fones + estojo)','Conectividade':'Bluetooth 5.3, H2 chip, USB-C','Compatibilidade':'iPhone, iPad, Mac, Apple Watch','Controles':'Touch + Movimento de cabeça','Find My':'Localização precisa integrada','Garantia':'12 meses Apple'}},

  {id:'F002',name:'Sony WH-1000XM5 Fone Bluetooth',brand:'Sony',cat:'Fones',price:1299.99,orig:2599.99,
   colors:['preto','prata'],storages:['único'],
   imgs:{preto:'https://www.sony.com/en/articles/introducing-the-wh-1000xm5-wireless-noise-cancelling-headphones/_jcr_content/root/responsivegrid/snap/image.img.jpg/1655186769516.jpg',prata:'https://www.sony.com/en/articles/introducing-the-wh-1000xm5-wireless-noise-cancelling-headphones/_jcr_content/root/responsivegrid/snap/image.img.jpg/1655186769516.jpg'},
   img:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
   rating:4.9,reviews:24310,stock:8,tags:'sony wh1000xm5 headphone bluetooth cancelamento ruido',
   specs:{'Tipo':'Over-Ear (circum-aural)','Cancelamento de Ruído':'Industry-leading (8 microfones + 2 chips)','Autonomia':'30 horas (ANC ativo) / 40h (sem ANC)','Carregamento Rápido':'3 min = 3h de uso','Codecs':'LDAC, AAC, SBC (Hi-Res Wireless)','Multipoint':'Conexão simultânea a 2 dispositivos','Speak-to-Chat':'Pausa automática ao falar','Peso':'250 g','Dobrável':'Não (design minimalista)','Acessórios':'Case rígido, cabo USB-C, adaptador avião','Garantia':'12 meses Sony'}},

  {id:'F003',name:'JBL Tune 770NC Bluetooth',brand:'JBL',cat:'Fones',price:399.99,orig:799.99,
   colors:['preto','branco','azul','roxo'],storages:['único'],
   imgs:{preto:'https://www.jbl.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw7d9765fa/JBL_TUNE770NC_Product%20Image_Hero_Black.png?sw=537&sh=402',branco:'https://www.jbl.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw7d9765fa/JBL_TUNE770NC_Product%20Image_Hero_Black.png?sw=537&sh=402',azul:'https://www.jbl.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw7d9765fa/JBL_TUNE770NC_Product%20Image_Hero_Black.png?sw=537&sh=402',roxo:'https://www.jbl.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw7d9765fa/JBL_TUNE770NC_Product%20Image_Hero_Black.png?sw=537&sh=402'},
   img:'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
   rating:4.6,reviews:9876,stock:20,tags:'jbl tune 770nc headphone bluetooth over ear',
   specs:{'Tipo':'Over-Ear','Cancelamento de Ruído':'ANC Adaptativo','Autonomia':'44h (sem ANC) / 24h (com ANC)','Carregamento Rápido':'5 min = 2h de uso','Codecs':'AAC, SBC','Multipoint':'Sim (2 dispositivos)','App':'JBL Headphones (equalização, modos)','Dobrável':'Sim','Peso':'218 g','Resistência':'Sem certificação IP','Garantia':'12 meses JBL'}},

  {id:'F004',name:'Samsung Galaxy Buds3 Pro ANC',brand:'Samsung',cat:'Fones',price:799.99,orig:1599.99,
   colors:['preto','prata'],storages:['único'],
   imgs:{preto:'https://images.samsung.com/is/image/samsung/p6pim/br/sm-r630nzabzto/gallery/br-galaxy-buds3-pro-sm-r630-sm-r630nzabzto-thumb-539889430?$650_519_PNG$',prata:'https://images.samsung.com/is/image/samsung/p6pim/br/sm-r630nzspzto/gallery/br-galaxy-buds3-pro-sm-r630-sm-r630nzspzto-thumb-539889433?$650_519_PNG$'},
   img:'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
   rating:4.7,reviews:6540,stock:14,tags:'samsung galaxy buds3 pro anc fone bluetooth in ear',
   specs:{'Tipo':'In-Ear (Blade design)','Cancelamento de Ruído':'ANC com 2 microfones por fone','Autonomia':'6h (ANC) + 30h (case) / 7h (sem ANC) + 35h','Codecs':'SSC HiFi, AAC, SBC','Galaxy AI':'Live Translate, Interpreter','Resistência':'IPX7 (fones) + IPX4 (case)','Conectividade':'Bluetooth 5.4 com LE Audio','360 Audio':'Sim','Peso':'5,5g cada fone / 53g case','Compatibilidade':'Android 8.0+ / iOS (funções limitadas)','Garantia':'12 meses Samsung'}},

  // ── SMARTWATCHES ──
  {id:'W001',name:'Apple Watch Series 9 GPS 45mm',brand:'Apple',cat:'Smartwatches',price:2199.99,orig:3999.99,
   colors:['meia-noite','estelar','rosa','prata','vermelho'],storages:['45mm','41mm'],
   imgs:{'meia-noite':'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MQDY3ref_VW_34FR+watch-case-41-aluminum-midnight-nc-s9_VW_34FR?wid=800&hei=800&fmt=jpeg&qlt=90',estelar:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MR8T3ref_VW_34FR+watch-case-41-aluminum-starlight-nc-s9_VW_34FR?wid=800&hei=800&fmt=jpeg&qlt=90',rosa:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MRHN3ref_VW_34FR+watch-case-41-aluminum-pink-nc-s9_VW_34FR?wid=800&hei=800&fmt=jpeg&qlt=90',prata:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MR9N3ref_VW_34FR+watch-case-41-aluminum-silver-nc-s9_VW_34FR?wid=800&hei=800&fmt=jpeg&qlt=90',vermelho:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MRXL3ref_VW_34FR+watch-case-41-aluminum-productred-nc-s9_VW_34FR?wid=800&hei=800&fmt=jpeg&qlt=90'},
   img:'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop',
   rating:4.8,reviews:9134,stock:6,tags:'apple watch series 9 gps smartwatch',
   specs:{'Chip':'Apple S9 SiP (duplo núcleo 64-bit)','Tela':'Always-On Retina LTPO OLED — 2000 nits','GPS':'GPS + GLONASS + Galileo + BeiDou + L5','Sensores':'Frequência cardíaca, SpO2, temperatura, acelerômetro, ECG','Double Tap':'Gesto de toque com 2 dedos','Bateria':'Até 18 horas (36h modo economizador)','Resistência':'WR50 (50 metros)','Carga':'Cabo USB-C magnético','Compatibilidade':'iPhone com iOS 17+','Conectividade':'Wi-Fi 4, Bluetooth 5.3, Ultra Wideband','Garantia':'12 meses Apple'}},

  {id:'W002',name:'Samsung Galaxy Watch 7 44mm',brand:'Samsung',cat:'Smartwatches',price:1299.99,orig:2499.99,
   colors:['preto','verde','prata'],storages:['40mm','44mm'],
   imgs:{preto:'https://images.samsung.com/is/image/samsung/p6pim/br/sm-l315fzsazto/gallery/br-galaxy-watch7-44mm-sm-l315-sm-l315fzsazto-thumb-539900280?$650_519_PNG$',verde:'https://images.samsung.com/is/image/samsung/p6pim/br/sm-l315fzgazto/gallery/br-galaxy-watch7-44mm-sm-l315-sm-l315fzgazto-thumb-539900283?$650_519_PNG$',prata:'https://images.samsung.com/is/image/samsung/p6pim/br/sm-l315fzsazto/gallery/br-galaxy-watch7-44mm-sm-l315-sm-l315fzsazto-thumb-539900280?$650_519_PNG$'},
   img:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
   rating:4.7,reviews:4321,stock:9,tags:'samsung galaxy watch 7 44mm smartwatch',
   specs:{'Chip':'Exynos W1000 (3nm — 50% mais rápido)','Tela':'Super AMOLED 1,5" 480×480 — 2000 nits','GPS':'GPS + GLONASS + BeiDou + Galileo + L5 Dual','Sensores':'BioActive Sensor (frequência cardíaca, SpO2, composição corporal), temperatura, ECG','Bateria':'425mAh — até 40h (sem LTE)','Resistência':'MIL-STD-810H + 5ATM + IP68','Sistema':'Wear OS 5 / One UI Watch 6.0','Galaxy AI':'Advanced Sleep Coaching, AI Energy Score','Conectividade':'Wi-Fi 6, Bluetooth 5.3, NFC, UWB','Garantia':'12 meses Samsung'}},

  {id:'W003',name:'Amazfit GTR 4 GPS 1,43" AMOLED',brand:'Amazfit',cat:'Smartwatches',price:599.99,orig:1299.99,
   colors:['preto','prata'],storages:['único'],
   imgs:{preto:'https://cdn-ak.f.st-hatena.com/images/fotolife/t/tech_blog_japan/20221001/20221001120000.jpg',prata:'https://cdn-ak.f.st-hatena.com/images/fotolife/t/tech_blog_japan/20221001/20221001120000.jpg'},
   img:'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop',
   rating:4.5,reviews:6789,stock:15,tags:'amazfit gtr 4 gps amoled smartwatch barato',
   specs:{'Tela':'1,43" AMOLED HD 466×466 — 1000 nits','Chip':'Amazfit Helio 1.0','GPS':'Quadruple-band 5-system GPS','Frequência Cardíaca':'Optical BioTracker 4.0 PPG','Sensores':'SpO2, temperatura cutânea, acelerômetro 6 eixos','Modos Esportivos':'150+','Bateria':'475mAh — até 14 dias','Carregamento':'Magnético 5W','Resistência':'5 ATM','Conectividade':'Bluetooth 5.0, Wi-Fi 2.4GHz','Sistema':'Zepp OS 2.0 (Zepp App)','Garantia':'12 meses Amazfit'}},

  // ── TABLETS ──
  {id:'TB01',name:'iPad 10ª Geração 64GB Wi-Fi',brand:'Apple',cat:'Tablets',price:2499.99,orig:4999.99,
   colors:['azul','rosa','amarelo','prata'],storages:['64','256'],
   imgs:{azul:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-10th-gen-finish-select-202212-blue-wifi?wid=800&hei=800&fmt=jpeg&qlt=90',rosa:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-10th-gen-finish-select-202212-pink-wifi?wid=800&hei=800&fmt=jpeg&qlt=90',amarelo:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-10th-gen-finish-select-202212-yellow-wifi?wid=800&hei=800&fmt=jpeg&qlt=90',prata:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-10th-gen-finish-select-202212-silver-wifi?wid=800&hei=800&fmt=jpeg&qlt=90'},
   img:'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
   rating:4.8,reviews:8654,stock:5,tags:'ipad apple tablet ios 10 geracao',
   specs:{'Chip':'Apple A14 Bionic (5nm)','Tela':'10,9" Liquid Retina (2360×1640) 500 nits True Tone','Câmera Traseira':'12 MP f/1.8 (landscape para videochamadas)','Câmera Frontal':'12 MP ultrawide (Center Stage)','Bateria':'28,65 Whr — até 10 horas','Conector':'USB-C','Apple Pencil':'1ª geração (adaptador incluído)','Magic Keyboard Folio':'Compatível','Wi-Fi':'Wi-Fi 6 (802.11ax), Bluetooth 5.2','Peso':'477 g','Dimensões':'H 248,6 × L 179,5 × P 7 mm','Garantia':'12 meses Apple'}},

  {id:'TB02',name:'iPad Air M2 11" 128GB Wi-Fi',brand:'Apple',cat:'Tablets',price:4499.99,orig:7999.99,
   colors:['azul','roxo','estelar','cinza'],storages:['128','256','512','1TB'],
   imgs:{azul:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-air-finish-select-gallery-202405-11inch-blue?wid=800&hei=800&fmt=jpeg&qlt=90',roxo:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-air-finish-select-gallery-202405-11inch-purple?wid=800&hei=800&fmt=jpeg&qlt=90',estelar:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-air-finish-select-gallery-202405-11inch-starlight?wid=800&hei=800&fmt=jpeg&qlt=90',cinza:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-air-finish-select-gallery-202405-11inch-spaceGray?wid=800&hei=800&fmt=jpeg&qlt=90'},
   img:'https://images.unsplash.com/photo-1589739900266-43b2843f4c12?w=400&h=400&fit=crop',
   rating:4.9,reviews:4210,stock:4,tags:'ipad air m2 apple tablet 11 polegadas',
   specs:{'Chip':'Apple M2 (8 núcleos CPU, 9 núcleos GPU)','Tela':'11" Liquid Retina (2388×1668) 500 nits True Tone P3','Câmera Traseira':'12 MP f/1.8 4K 60fps','Câmera Frontal':'12 MP ultrawide (Center Stage landscape)','Bateria':'28,65 Whr — até 10 horas','Conector':'USB-C (USB 3)','Apple Pencil Pro':'Compatível','Magic Keyboard':'Compatível (11")','Wi-Fi':'Wi-Fi 6E (802.11ax), Bluetooth 5.3','Peso':'462 g','Garantia':'12 meses Apple'}},

  {id:'TB03',name:'Samsung Galaxy Tab S9 FE 128GB',brand:'Samsung',cat:'Tablets',price:1799.99,orig:3499.99,
   colors:['grafite','prata','verde','lavanda'],storages:['128','256'],
   imgs:{grafite:'https://images.samsung.com/is/image/samsung/p6pim/br/sm-x510nzaazto/gallery/br-galaxy-tab-s9-fe-sm-x510-sm-x510nzaazto-thumb-538270428?$650_519_PNG$',prata:'https://images.samsung.com/is/image/samsung/p6pim/br/sm-x510nzspzto/gallery/br-galaxy-tab-s9-fe-sm-x510-sm-x510nzspzto-thumb-538270431?$650_519_PNG$',verde:'https://images.samsung.com/is/image/samsung/p6pim/br/sm-x510nzgpzto/gallery/br-galaxy-tab-s9-fe-sm-x510-sm-x510nzgpzto-thumb-538270434?$650_519_PNG$',lavanda:'https://images.samsung.com/is/image/samsung/p6pim/br/sm-x510nzlpzto/gallery/br-galaxy-tab-s9-fe-sm-x510-sm-x510nzlpzto-thumb-538270437?$650_519_PNG$'},
   img:'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop',
   rating:4.7,reviews:3892,stock:9,tags:'samsung galaxy tab s9 fe 128gb tablet android',
   specs:{'Tela':'10,9" TFT LCD 2304×1440 90Hz','Chip':'Exynos 1380 (5nm)','RAM':'6 GB','Câmera Traseira':'8 MP','Câmera Frontal':'10 MP','S Pen':'Incluída (sem Bluetooth)','Bateria':'8000 mAh — carregamento 45W','Resistência':'IP68','Conectividade':'Wi-Fi 6, Bluetooth 5.3, USB-C','Sistema':'Android 13 / One UI 5.1','Peso':'523 g','Garantia':'12 meses Samsung'}},

  {id:'TB04',name:'Tablet Lenovo Tab M11 4GB 128GB',brand:'Lenovo',cat:'Tablets',price:899.99,orig:1799.99,
   colors:['cinza','azul'],storages:['64','128'],
   imgs:{cinza:'https://p1-ofp.static.pub/medias/bWFzdGVyfGltYWdlc3w0MjY0OTF8aW1hZ2UvcG5nfGltYWdlcy9oMzQvaGU2Lzk3MDQ0NTQyNDExODI/ZA1028F_1_ZF_Platinum_Grey.png',azul:'https://p1-ofp.static.pub/medias/bWFzdGVyfGltYWdlc3w0MjY0OTF8aW1hZ2UvcG5nfGltYWdlcy9oMzQvaGU2Lzk3MDQ0NTQyNDExODI/ZA1028F_1_ZF_Platinum_Grey.png'},
   img:'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
   rating:4.4,reviews:5670,stock:15,tags:'tablet lenovo tab m11 4gb 128gb android barato',
   specs:{'Tela':'11" IPS LCD (1920×1200) 90Hz','Chip':'MediaTek Helio G88 (12nm)','RAM':'4 GB LPDDR4X','Armazenamento':'128 GB eMMC (expansível até 2TB)','Câmera Traseira':'8 MP','Câmera Frontal':'8 MP','Bateria':'7040 mAh — carregamento 20W','Conector':'USB-C','Leitor de Impressão Digital':'Sim (lateral)','Conectividade':'Wi-Fi 5, Bluetooth 5.1','Sistema':'Android 13','Peso':'465 g','Garantia':'12 meses Lenovo'}},

  // ── GAMES ──
  {id:'G001',name:'PlayStation 5 Slim 1TB Digital',brand:'Sony',cat:'Games',price:2999.99,orig:4999.99,
   colors:['branco'],storages:['1TB'],
   imgs:{branco:'https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21'},
   img:'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=400&fit=crop',
   rating:4.9,reviews:32100,stock:3,tags:'ps5 playstation 5 slim digital sony console',
   specs:{'CPU':'AMD Zen 2 — 8 núcleos / 16 threads (3,5GHz)','GPU':'AMD RDNA 2 — 10,28 TFLOPS (2,23GHz)','RAM':'16 GB GDDR6','Armazenamento':'1 TB SSD NVMe (Custom)','Resolução':'4K 120fps / 8K (suporte)','Ray Tracing':'Sim (hardware acelerado)','Áudio':'Tempest 3D AudioTech','Leitor de Disco':'Não (Digital Edition — Blu-ray add-on opcional)','Conectividade':'Wi-Fi 6, Bluetooth 5.1, USB-A, USB-C, HDMI 2.1','Dimensões':'H 34,8 × L 21,6 × P 9,6 cm','Garantia':'12 meses Sony'}},

  {id:'G002',name:'Xbox Series S 512GB Branco',brand:'Microsoft',cat:'Games',price:1799.99,orig:2999.99,
   colors:['branco','preto'],storages:['512'],
   imgs:{branco:'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4mRni?ver=d0bc&q=90&m=6&h=705&w=1253&b=%23FFFFFFFF&f=jpg&o=f&p=140&aim=true',preto:'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4mRni?ver=d0bc&q=90&m=6&h=705&w=1253&b=%23FFFFFFFF&f=jpg&o=f&p=140&aim=true'},
   img:'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&h=400&fit=crop',
   rating:4.8,reviews:18760,stock:8,tags:'xbox series s microsoft console games',
   specs:{'CPU':'AMD Zen 2 — 8 núcleos (3,6GHz)','GPU':'AMD RDNA 2 — 4 TFLOPS (1,565GHz)','RAM':'10 GB GDDR6','Armazenamento':'512 GB SSD NVMe (Custom)','Resolução':'1440p 120fps / 4K upscaling','Game Pass Ultimate':'Compatível (Xbox + PC + Cloud)','Leitor de Disco':'Não (100% digital)','Retrocompatibilidade':'Sim (Xbox One, 360, original)','Conectividade':'Wi-Fi 5, Bluetooth 5.0, USB-A (×3), HDMI 2.1','Dimensões':'H 27,5 × L 6,5 × P 15,1 cm','Garantia':'12 meses Microsoft'}},

  {id:'G003',name:'Nintendo Switch OLED Branco',brand:'Nintendo',cat:'Games',price:1999.99,orig:3499.99,
   colors:['branco','neon'],storages:['64'],
   imgs:{branco:'https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_2.0/c_scale,w_400/ncom/en_US/products/hardware/nintendo-switch-oled-model/119570-nintendo-switch-oled-model-white-set',neon:'https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_2.0/c_scale,w_400/ncom/en_US/products/hardware/nintendo-switch-oled-model/119570-nintendo-switch-oled-model-white-set'},
   img:'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop',
   rating:4.9,reviews:45600,stock:5,tags:'nintendo switch oled branco console games portatil',
   specs:{'Tela':'7" OLED (1280×720 portátil) / 1080p TV','CPU/GPU':'NVIDIA Custom Tegra','RAM':'4 GB LPDDR4','Armazenamento':'64 GB (expansível via microSD)','Bateria':'4310 mAh — 4,5 a 9h','Dock':'HDMI + USB-A + USB-C Ethernet integrada','Controles':'Joy-Con destacáveis + modo mesa','Modos':'Portátil, Mesa, TV','Wi-Fi':'802.11ac (Wi-Fi 5), Bluetooth 4.1','Dimensões':'H 102 × L 242 × P 13,9 mm (com Joy-Con)','Garantia':'12 meses Nintendo'}},

  {id:'G004',name:'Controle PS5 DualSense Branco',brand:'Sony',cat:'Games',price:349.99,orig:699.99,
   colors:['branco','preto','rosa','roxo','vermelho','azul'],storages:['único'],
   imgs:{branco:'https://gmedia.playstation.com/is/image/SIEPDC/dualsense-pdp-01-en-14sep21',preto:'https://gmedia.playstation.com/is/image/SIEPDC/dualsense-pdp-01-en-14sep21',rosa:'https://gmedia.playstation.com/is/image/SIEPDC/dualsense-pdp-01-en-14sep21',roxo:'https://gmedia.playstation.com/is/image/SIEPDC/dualsense-pdp-01-en-14sep21',vermelho:'https://gmedia.playstation.com/is/image/SIEPDC/dualsense-pdp-01-en-14sep21',azul:'https://gmedia.playstation.com/is/image/SIEPDC/dualsense-pdp-01-en-14sep21'},
   img:'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=400&fit=crop',
   rating:4.8,reviews:28900,stock:20,tags:'controle dualsense ps5 sony games wireless',
   specs:{'Gatilhos Adaptáveis':'Tensão variável (feedback de resistência)','Haptic Feedback':'Motor de baixa latência HD (sentir texturas, impactos)','Microfone':'Integrado + cancelamento de ruído','Alto-falante':'Integrado','Touchpad':'Capacitivo + clicável','Giroscópio':'6 eixos','Create Button':'Substituiu o Share','Bateria':'Li-Ion 1560mAh — até 12h','Carregamento':'USB-C (incluso) ou cradle (não incluso)','Conectividade':'Bluetooth 5.1 / USB-C com fio','Garantia':'12 meses Sony'}},

  {id:'G005',name:'Headset HyperX Cloud III Wireless',brand:'HyperX',cat:'Games',price:599.99,orig:1299.99,
   colors:['preto','branco'],storages:['único'],
   imgs:{preto:'https://hyperx.com/cdn/shop/files/735L8AA-main.png?v=1689119296&width=800',branco:'https://hyperx.com/cdn/shop/files/735L8AA-main.png?v=1689119296&width=800'},
   img:'https://images.unsplash.com/photo-1593640408182-31c228eb7b8f?w=400&h=400&fit=crop',
   rating:4.7,reviews:12430,stock:14,tags:'headset hyperx cloud iii wireless gamer pc ps5',
   specs:{'Tipo':'Over-Ear sem fio','Drivers':'53mm com câmara de neodímio','Resposta de Frequência':'10–21.000 Hz','Autonomia':'60 horas de bateria','Microfone':'Removível — cardiod, -40 dBV (cancelamento de ruído)','Latência':'Sem fio 2,4GHz ultra baixa latência','Plataformas':'PC, PS5, PS4, Nintendo Switch, USB-C','DTS Headphone:X':'Sim (áudio espacial)','Peso':'332 g','Conexão':'Dongle USB-A 2,4GHz + cabo USB-C','Garantia':'24 meses HyperX'}},

  {id:'G006',name:'Cadeira Gamer Razer Iskur V2',brand:'Razer',cat:'Games',price:1999.99,orig:3999.99,
   colors:['preto','verde'],storages:['único'],
   imgs:{preto:'https://assets3.razerzone.com/IpSoNPWZz7kCZkgH1f3lXX4kCpM=/1500x1000/https://hybrismediaprod.blob.core.windows.net/sys-master-phoenix-images-container/haa/h33/9080851644446/iskur-v2-gallery-3-1500x1000.jpg',verde:'https://assets3.razerzone.com/IpSoNPWZz7kCZkgH1f3lXX4kCpM=/1500x1000/https://hybrismediaprod.blob.core.windows.net/sys-master-phoenix-images-container/haa/h33/9080851644446/iskur-v2-gallery-3-1500x1000.jpg'},
   img:'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=400&fit=crop',
   rating:4.8,reviews:5430,stock:6,tags:'cadeira gamer razer iskur v2 ergonomica lumbar',
   specs:{'Suporte Lombar':'Ajustável integrado ao encosto (sem almofada separada)','Inclinação do Encosto':'85°–135°','Apoio de Cabeça':'Almofada com memória de forma','Braços':'4D (altura, largura, profundidade, ângulo)','Mecanismo':'Tilt com bloqueio em múltiplos ângulos','Revestimento':'Couro sintético respirável premium','Espuma':'Alta densidade 60D','Capacidade':'Até 136 kg','Rodízios':'Nylon de dupla camada 60mm','Altura':'49,5–58,5 cm (ajustável)','Garantia':'36 meses Razer'}},

  // ── CÂMERAS ──
  {id:'K001',name:'Sony Alpha ZV-E10 Kit 16-50mm',brand:'Sony',cat:'Câmeras',price:2999.99,orig:5499.99,
   colors:['preto','branco'],storages:['único'],
   imgs:{preto:'https://www.sony.com/en/articles/introducing-the-zv-e10/_jcr_content/root/responsivegrid/snap/image.img.jpg/1626337153726.jpg',branco:'https://www.sony.com/en/articles/introducing-the-zv-e10/_jcr_content/root/responsivegrid/snap/image.img.jpg/1626337153726.jpg'},
   img:'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop',
   rating:4.8,reviews:4320,stock:6,tags:'camera sony alpha zv-e10 mirrorless vlog',
   specs:{'Sensor':'APS-C Exmor CMOS 24,2 MP','Processador':'BIONZ X','Lente':'E 16-50mm f/3.5-5.6 OSS (equivalente 24-75mm)','Vídeo':'4K 30fps (crop) / Full HD 120fps','Estabilização':'Óptica na lente (OSS)','Autofoco':'Eye AF / Rastreamento em tempo real','Tela':'LCD 3" articulada 180° (vlogging)','Flash':'Sem flash embutido (sapata Hot Shoe)','Conexão':'Wi-Fi, Bluetooth, Micro-HDMI, USB-C','Peso':'343 g (com lente)','Garantia':'12 meses Sony'}},

  {id:'K002',name:'GoPro HERO12 Black 5.3K',brand:'GoPro',cat:'Câmeras',price:1599.99,orig:2999.99,
   colors:['preto'],storages:['único'],
   imgs:{preto:'https://community.gopro.com/t5/image/serverpage/image-id/115882i82E1CDAE499DEA91?v=v2'},
   img:'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
   rating:4.7,reviews:8765,stock:10,tags:'gopro hero12 camera acao 5k prova dagua action',
   specs:{'Vídeo':'5,3K 60fps / 4K 120fps / 2,7K 240fps','Foto':'27 MP (RAW + JPEG)','Estabilização':'HyperSmooth 6.0 (sem horizon lock)','Resistência':'Impermeável até 10m (sem case)','Tela':'Frontal + traseira touchscreen','Áudio':'Wind Noise Reduction + entrada jack 3,5mm','Bateria':'1720mAh — até 70min (5,3K 60fps)','Carregamento':'USB-C','Wi-Fi':'5GHz + Bluetooth 5.0 (Quik App)','Dimensões':'H 71 × L 55 × P 34 mm','Peso':'154 g','Garantia':'12 meses GoPro'}},

  {id:'K003',name:'DJI Mini 4 Pro Drone 4K HDR',brand:'DJI',cat:'Câmeras',price:3999.99,orig:6999.99,
   colors:['cinza'],storages:['único'],
   imgs:{cinza:'https://dji-official-fe.djicdn.com/dps/4bf6b88f09bfe6234fe0cd75ba65cd34.jpg'},
   img:'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=400&h=400&fit=crop',
   rating:4.9,reviews:3210,stock:4,tags:'dji mini 4 pro drone 4k hdr camera voo',
   specs:{'Câmera':'1/1,3" CMOS 48MP — vídeo 4K 100fps HDR','Estabilização':'3 eixos gimbal mecânico + EIS digital','Alcance':'Até 20km (RC2) / FCC','Autonomia':'34 minutos por bateria','Peso':'249 g (não requer cadastro no DECEA abaixo de 250g)','Obstáculos':'APAS 5.0 — detecção omnidirecional','Velocidade Máxima':'16 m/s (57,6 km/h)','ActiveTrack 360°':'Sim','Waypoints':'Sim (missões automatizadas)','App':'DJI Fly (iOS/Android)','Garantia':'12 meses DJI'}},
];



function searchCatalog(q, cat) {
  let list = CATALOG;
  if (cat && cat.trim()) list = list.filter(p => p.cat.toLowerCase().includes(cat.toLowerCase()));
  if (!q || !q.trim()) return list;
  const terms = q.toLowerCase().trim().split(/\s+/);
  return list.filter(p => {
    const text = (p.name+' '+p.brand+' '+p.cat+' '+p.tags).toLowerCase();
    return terms.every(t => text.includes(t)) || terms.some(t => t.length>2 && text.includes(t));
  });
}

// ── HELPERS ──
function getCookie(req, name) {
  const cookies = req.headers['cookie']||'';
  const match = cookies.split(';').map(c=>c.trim()).find(c=>c.startsWith(name+'='));
  return match ? match.split('=')[1] : '';
}
function getToken(req) {
  const auth = req.headers['authorization']||'';
  return auth.replace('Bearer ','').trim() || getCookie(req,'magalu_token');
}

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE');
  res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
}
function jsonResp(res, data, status=200) {
  cors(res); res.writeHead(status,{'Content-Type':'application/json; charset=utf-8'});
  res.end(JSON.stringify(data));
}
function htmlResp(res, html) {
  cors(res); res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'}); res.end(html);
}
function readBody(req) {
  return new Promise(resolve=>{
    let b=''; req.on('data',c=>b+=c);
    req.on('end',()=>{try{resolve(JSON.parse(b));}catch{resolve({});}});
  });
}
function genToken() { return crypto.randomBytes(24).toString('hex'); }
function getUserByToken(token) {
  const email = sessions[token];
  return email ? users[email] : null;
}

const LU_B64 = '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';


function baseStyles() {
  return `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800;900&display=swap');
  :root{
    --blue:#0086ff;--blue-dk:#0053a0;--blue-md:#0070d1;--blue-lt:#e8f3ff;
    --green:#00a650;--green-dk:#007a3b;--green-lt:#e8f7ee;
    --orange:#ff6500;--red:#e53935;--yellow:#ffe55c;
    --text:#1e2428;--muted:#666;--border:#e0e0e0;--bg:#f0f3f6;--white:#fff;
    --radius:8px;--shadow:0 2px 8px rgba(0,0,0,.08);
  }
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Nunito',sans-serif;background:var(--bg);color:var(--text);font-size:14px;line-height:1.4}
  a{text-decoration:none;color:inherit}
  img{display:block}
  button{font-family:inherit}
  .ticker-bar{background:var(--orange);height:34px;overflow:hidden;display:flex;align-items:center;position:relative}
  .ticker-bar::before,.ticker-bar::after{content:'';position:absolute;top:0;bottom:0;width:60px;z-index:2;pointer-events:none}
  .ticker-bar::before{left:0;background:linear-gradient(to right,var(--orange),transparent)}
  .ticker-bar::after{right:0;background:linear-gradient(to left,var(--orange),transparent)}
  .ticker-track{display:flex;animation:tick 40s linear infinite;white-space:nowrap}
  .ticker-track:hover{animation-play-state:paused}
  .ti{display:inline-flex;align-items:center;gap:6px;padding:0 28px;font-size:12px;font-weight:800;color:#fff}
  .tbadge{background:rgba(255,255,255,.25);border:1px solid rgba(255,255,255,.5);border-radius:3px;padding:1px 7px;font-size:10px}
  @keyframes tick{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
  header{background:var(--blue);height:60px;display:flex;align-items:center;padding:0 16px;gap:10px;position:sticky;top:0;z-index:400;box-shadow:0 2px 12px rgba(0,0,0,.2)}
  .logo{color:#fff;font-size:1.55rem;font-weight:900;letter-spacing:-1px;flex-shrink:0;line-height:1}.logo span{color:var(--yellow)}
  .lu-wr{width:58px;height:68px;overflow:visible;flex-shrink:0;display:flex;align-items:flex-end;justify-content:center;position:relative;margin-top:-12px}
  .lu-wr img{width:100%;object-fit:contain;object-position:bottom;position:absolute;bottom:0}
  .loc-btn{display:flex;align-items:center;gap:4px;color:rgba(255,255,255,.88);font-size:11px;cursor:pointer;white-space:nowrap;background:none;border:none;font-family:inherit;flex-shrink:0;padding:0 2px}
  .search-bar{flex:1;max-width:560px;display:flex;height:40px;border-radius:10px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,.25)}
  .search-bar input{flex:1;border:none;padding:0 16px;font-family:inherit;font-size:14px;outline:none;color:var(--text)}
  .search-bar button{background:var(--blue-dk);border:none;padding:0 20px;cursor:pointer;font-size:18px;color:#fff;transition:background .15s}
  .search-bar button:hover{background:#003e80}
  .hdr-r{margin-left:auto;display:flex;align-items:center;gap:10px}
  .hico{display:flex;flex-direction:column;align-items:center;gap:1px;color:#fff;background:none;border:none;cursor:pointer;font-family:inherit;font-size:10px;font-weight:700;padding:4px 6px;border-radius:6px;transition:background .15s;white-space:nowrap}
  .hico:hover{background:rgba(255,255,255,.15)}
  .hico .ico{font-size:20px;line-height:1;display:block}
  .cart-wr{position:relative}
  .cbadge{position:absolute;top:-4px;right:-6px;background:var(--yellow);color:var(--text);border-radius:50%;width:16px;height:16px;font-size:9px;font-weight:900;display:flex;align-items:center;justify-content:center;border:1.5px solid var(--blue)}
  .btn-in{background:rgba(255,255,255,.15);border:1.5px solid rgba(255,255,255,.4);border-radius:8px;padding:5px 12px;color:#fff;font-size:12px;font-weight:800;cursor:pointer;line-height:1.35;transition:background .15s}
  .btn-in:hover{background:rgba(255,255,255,.28)}.btn-in small{display:block;font-weight:600;opacity:.85;font-size:10px}
  nav.main-nav{background:#005bbf;display:flex;align-items:center;padding:0 16px;height:38px;overflow-x:auto;border-bottom:1px solid rgba(255,255,255,.1)}
  nav.main-nav::-webkit-scrollbar{display:none}
  .na{color:rgba(255,255,255,.92);font-size:13px;font-weight:700;padding:0 14px;height:38px;display:flex;align-items:center;cursor:pointer;white-space:nowrap;border-radius:4px;transition:background .15s;border:none;background:none;font-family:inherit}
  .na:hover,.na.act{background:rgba(255,255,255,.18)}.na.hl{color:var(--yellow)}
  .wrap{max-width:1240px;margin:0 auto;padding:20px 16px}
  .wrap-full{max-width:1240px;margin:0 auto;padding:0 16px}
  .hero-banner{border-radius:14px;overflow:hidden;position:relative;height:340px;margin-bottom:0;cursor:pointer;user-select:none}
  .hero-content{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:40px;background:linear-gradient(90deg,rgba(0,0,0,.75) 0%,rgba(0,0,0,.3) 60%,transparent 100%)}
  .hero-tag{background:var(--yellow);color:var(--text);font-size:11px;font-weight:900;padding:3px 10px;border-radius:4px;display:inline-block;margin-bottom:12px;letter-spacing:.5px;text-transform:uppercase}
  .hero-title{color:#fff;font-size:2.2rem;font-weight:900;line-height:1.15;margin-bottom:8px;max-width:420px}
  .hero-sub{color:rgba(255,255,255,.85);font-size:1rem;margin-bottom:16px;max-width:360px}
  .hero-price{color:#fff;font-size:1.6rem;font-weight:900;margin-bottom:16px}
  .hero-btn{background:var(--yellow);color:var(--text);border:none;border-radius:10px;padding:12px 28px;font-size:14px;font-weight:900;cursor:pointer;font-family:inherit;transition:transform .15s,box-shadow .15s}
  .hero-btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.25)}
  .hero-dots{position:absolute;bottom:14px;left:50%;transform:translateX(-50%);display:flex;gap:6px;z-index:10}
  .hdot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.4);cursor:pointer;transition:background .2s,width .2s;border:none}
  .hdot.act{background:#fff;width:22px;border-radius:4px}
  .qcat-row{display:flex;gap:10px;overflow-x:auto;padding:4px 0 12px;scrollbar-width:none}
  .qcat-row::-webkit-scrollbar{display:none}
  .qcat{display:flex;flex-direction:column;align-items:center;gap:6px;min-width:72px;cursor:pointer;flex-shrink:0}
  .qcat-icon{width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;transition:transform .2s,box-shadow .2s;box-shadow:0 2px 8px rgba(0,0,0,.1)}
  .qcat:hover .qcat-icon{transform:translateY(-4px);box-shadow:0 6px 18px rgba(0,0,0,.18)}
  .qcat span{font-size:11px;font-weight:800;color:var(--text);text-align:center;line-height:1.2}
  .sec-hdr{display:flex;align-items:center;justify-content:space-between;margin:28px 0 16px;flex-wrap:wrap;gap:10px}
  .sec-hdr-l{display:flex;flex-direction:column;gap:2px}
  .sec-title{font-size:20px;font-weight:900;color:var(--text);display:flex;align-items:center;gap:8px}
  .sec-title .pill{background:var(--red);color:#fff;font-size:10px;font-weight:900;padding:2px 8px;border-radius:20px;letter-spacing:.3px}
  .sec-sub{font-size:13px;color:var(--muted)}
  .see-all{font-size:13px;font-weight:800;color:var(--blue);cursor:pointer;white-space:nowrap;border:1.5px solid var(--blue);border-radius:8px;padding:6px 14px;transition:background .15s;background:none;font-family:inherit}
  .see-all:hover{background:var(--blue-lt)}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(196px,1fr));gap:16px}
  .pitem{background:#fff;border-radius:12px;box-shadow:var(--shadow);overflow:hidden;cursor:pointer;transition:box-shadow .25s,transform .2s;color:inherit;display:block;border:1.5px solid #eee}
  .pitem:hover{box-shadow:0 10px 32px rgba(0,0,0,.14);transform:translateY(-4px);border-color:#ddd}
  .pimg{width:100%;height:184px;display:flex;align-items:center;justify-content:center;background:#fafafa;position:relative;overflow:hidden;border-bottom:1px solid #f0f0f0}
  .pimg img{width:156px;height:156px;object-fit:contain;transition:transform .35s ease}
  .pitem:hover .pimg img{transform:scale(1.1)}
  .disc-badge{position:absolute;top:8px;left:8px;background:var(--red);color:#fff;font-size:10px;font-weight:900;padding:3px 8px;border-radius:5px;letter-spacing:.3px;z-index:2}
  .fav-icon{position:absolute;top:8px;right:8px;background:#fff;border:1.5px solid #e8e8e8;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:15px;box-shadow:0 1px 6px rgba(0,0,0,.1);transition:border-color .15s,transform .15s;padding:0}
  .fav-icon:hover{border-color:#e91e63;transform:scale(1.15)}
  .pinfo{padding:12px 14px 16px;display:flex;flex-direction:column;gap:2px}
  .pbrand{font-size:10px;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.6px;margin-bottom:2px}
  .pname{font-size:13px;font-weight:800;line-height:1.35;margin-bottom:6px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;color:var(--text)}
  .pstars{color:#ffa726;font-size:11px;margin-bottom:5px;display:flex;align-items:center;gap:4px}
  .pstars span{color:var(--muted);font-size:11px;font-weight:600}
  .porig{font-size:11px;color:#bbb;text-decoration:line-through}
  .ppix-tag{font-size:10px;background:var(--green-lt);color:var(--green-dk);font-weight:900;border-radius:4px;padding:2px 7px;display:inline-block;margin:4px 0 2px}
  .pprice{font-size:21px;font-weight:900;letter-spacing:-.5px;color:#1a1a2e;line-height:1}
  .pprice small{font-size:13px;font-weight:800;vertical-align:top;margin-top:3px;display:inline-block;margin-right:1px}
  .pinst{font-size:11px;color:var(--muted);margin-top:3px}
  .pbtn{display:block;width:100%;background:var(--green);color:#fff;border:none;border-radius:9px;padding:10px;font-family:inherit;font-size:13px;font-weight:800;cursor:pointer;margin-top:10px;transition:background .15s,transform .1s;text-align:center}
  .pbtn:hover{background:var(--green-dk)}.pbtn:active{transform:scale(.97)}
  .pbtn-buy{display:block;width:100%;background:var(--blue-lt);color:var(--blue);border:none;border-radius:9px;padding:9px;font-family:inherit;font-size:12px;font-weight:800;cursor:pointer;margin-top:6px;text-align:center;transition:background .15s}
  .pbtn-buy:hover{background:#d0e8ff}
  .promo-strip{background:linear-gradient(135deg,#0053a0,#0086ff);border-radius:14px;padding:24px 32px;display:flex;align-items:center;justify-content:space-between;gap:20px;margin:28px 0;overflow:hidden;position:relative}
  .promo-strip::before{content:'';position:absolute;right:-40px;top:-40px;width:200px;height:200px;background:rgba(255,255,255,.06);border-radius:50%}
  .ps-txt h3{color:#fff;font-size:1.4rem;font-weight:900;margin-bottom:6px}
  .ps-txt p{color:rgba(255,255,255,.82);font-size:13px}
  .ps-btn{background:var(--yellow);color:var(--text);border:none;border-radius:10px;padding:12px 28px;font-size:14px;font-weight:900;cursor:pointer;font-family:inherit;white-space:nowrap;flex-shrink:0;transition:transform .15s}
  .ps-btn:hover{transform:scale(1.04)}
  .mini-banners{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:20px 0}
  .mbanner{border-radius:12px;overflow:hidden;position:relative;height:160px;cursor:pointer;display:flex;align-items:flex-end}
  .mbanner-content{position:relative;z-index:2;padding:18px;background:linear-gradient(0deg,rgba(0,0,0,.72) 0%,transparent 100%);width:100%}
  .mbanner-content h4{color:#fff;font-size:15px;font-weight:900;margin-bottom:2px}
  .mbanner-content p{color:rgba(255,255,255,.8);font-size:12px}
  .rh{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px}
  .rt{font-size:15px;font-weight:800}.rt span{color:var(--blue)}
  select{border:1.5px solid var(--border);border-radius:8px;padding:7px 12px;font-family:inherit;font-size:13px;outline:none;cursor:pointer;background:#fff}
  .empty{text-align:center;padding:60px 20px;color:var(--muted);grid-column:1/-1}
  .ei{font-size:3rem;margin-bottom:12px}.empty h3{font-size:18px;font-weight:800;color:var(--text);margin-bottom:8px}
  .toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(90px);background:#1e2428;color:#fff;padding:11px 22px;border-radius:10px;font-size:13px;font-weight:700;box-shadow:0 4px 20px rgba(0,0,0,.25);transition:transform .3s;z-index:9999;pointer-events:none}
  .toast.show{transform:translateX(-50%) translateY(0)}.toast.ok{background:var(--green)}.toast.err{background:var(--red)}
  footer{background:#003a7a;color:rgba(255,255,255,.65);padding:40px 16px 24px;margin-top:40px}
  .footer-inner{max-width:1240px;margin:0 auto}
  .footer-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:24px;margin-bottom:32px}
  .footer-col h4{color:#fff;font-size:13px;font-weight:900;margin-bottom:12px;text-transform:uppercase;letter-spacing:.5px}
  .footer-col a{display:block;color:rgba(255,255,255,.6);font-size:12px;margin-bottom:8px;transition:color .15s}
  .footer-col a:hover{color:#fff}
  .footer-bottom{border-top:1px solid rgba(255,255,255,.1);padding-top:20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}
  .footer-logo{color:#fff;font-size:1.4rem;font-weight:900;letter-spacing:-1px}.footer-logo span{color:var(--yellow)}
  .footer-copy{font-size:12px}
  .footer-pay{display:flex;gap:8px;flex-wrap:wrap}
  .pay-badge{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);border-radius:5px;padding:4px 10px;font-size:11px;font-weight:800;color:rgba(255,255,255,.8)}
  @media(max-width:768px){
    .hero-banner{height:220px}.hero-title{font-size:1.5rem}.hero-sub{display:none}
    .mini-banners{grid-template-columns:1fr}.promo-strip{flex-direction:column;text-align:center}
    .grid{grid-template-columns:repeat(auto-fill,minmax(156px,1fr));gap:12px}
    .footer-grid{grid-template-columns:1fr 1fr}
    header{height:52px;padding:0 10px;gap:8px}
    .loc-btn{display:none}
  }`;
}


// ── HTML SHARED COMPONENTS ──
function headerHTML(active='', userToken='') {
  const user = getUserByToken(userToken);
  const cats = ['Celulares','TV e Vídeo','Eletrodomésticos','Informática','Games','Câmeras','Fones','Smartwatches','Tablets','Móveis'];
  const navItems = cats.map(c=>`<button class="na${active===c?' act':''}" onclick="navGo('${c}')">${c}</button>`).join('');
  return `
  <div class="ticker-bar"><div class="ticker-track" id="ticker"></div></div>
  <header>
    <div class="lu-wr"><img src="data:image/png;base64,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" alt="Lu" style="height:64px;width:auto"/></div>
    <a class="logo" href="/">magalu<span>.</span></a>
    <button class="loc-btn" onclick="void(0)">
      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
      <span>SP Capital</span>
    </button>
    <div class="search-bar">
      <input id="sq" type="text" placeholder="Buscar produtos, marcas e muito mais..." value="${active}" onkeydown="if(event.key==='Enter')goSearch()"/>
      <button onclick="goSearch()">🔍</button>
    </div>
    <div class="hdr-r">
      ${user
        ? `<button class="btn-in" onclick="location.href='/conta'">Olá, ${user.name.split(' ')[0]}<small>Minha Conta</small></button>`
        : `<button class="btn-in" onclick="location.href='/login'">Entre ou<small>Cadastre-se</small></button>`
      }
      <button class="hico" onclick="location.href='/favoritos'">
        <span class="ico">♡</span>Favoritos
      </button>
      <div class="cart-wr">
        <button class="hico" onclick="location.href='/sacola'">
          <span class="ico">🛒</span>Sacola
        </button>
        <span class="cbadge" id="cart-badge">0</span>
      </div>
    </div>
  </header>
  <nav class="main-nav">
    ${navItems}
    <button class="na hl" onclick="navGo('Ofertas')">🔥 Ofertas</button>
  </nav>`;
}


function baseScripts(userToken='') {
  return `
  const OFFERS=['⚡ OFERTA RELÂMPAGO — 10% OFF no PIX','🔥 FRETE GRÁTIS acima de R$ 299','💳 ATÉ 12X SEM JUROS no cartão','📦 ENTREGA FULL — Rápida e segura','🎁 CUPOM: MAGALU10 — 10% na 1ª compra','⏰ PROMOÇÃO POR TEMPO LIMITADO','🛡️ COMPRA 100% GARANTIDA','↩️ DEVOLUÇÃO GRATUITA em 7 dias'];
  (function(){const el=document.getElementById('ticker');if(!el)return;const all=[...OFFERS,...OFFERS];el.innerHTML=all.map(o=>'<span class="ti">'+o+'<span class="tbadge">MAGALU</span></span>').join('');})();
  function goSearch(){const v=document.getElementById('sq')?.value?.trim();if(v)location.href='/busca?q='+encodeURIComponent(v);}
  function navGo(cat){location.href='/busca?cat='+encodeURIComponent(cat);}
  const TOKEN = '${userToken}';
  async function getCartCount(){
    if(!TOKEN)return;
    try{const r=await fetch('/api/cart/'+TOKEN);const d=await r.json();const n=d.cart.reduce((s,i)=>s+i.qty,0);const b=document.getElementById('cart-badge');if(b)b.textContent=n;}catch(e){}
  }
  getCartCount();
  async function addToCart(productId,e){
    e.preventDefault();e.stopPropagation();
    if(!TOKEN){location.href='/login';return;}
    try{
      const r=await fetch('/api/cart/add',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:TOKEN,productId})});
      const d=await r.json();
      if(d.success){toast('✓ Adicionado à sacola!','ok');getCartCount();}else toast(d.error,'err');
    }catch(e){toast('Erro ao adicionar','err');}
  }
  async function toggleFav(productId,e){
    e.preventDefault();e.stopPropagation();
    if(!TOKEN){location.href='/login';return;}
    try{
      const r=await fetch('/api/fav/toggle',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:TOKEN,productId})});
      const d=await r.json();
      const btn=e.currentTarget;
      btn.textContent=d.added?'❤️':'🤍';
      toast(d.added?'❤️ Adicionado aos favoritos!':'Removido dos favoritos','ok');
    }catch(e){}
  }
  let tt;function toast(m,t=''){const el=document.getElementById('_toast');if(!el)return;el.textContent=m;el.className='toast show '+(t||'');clearTimeout(tt);tt=setTimeout(()=>el.className='toast',3000);}
  `;
}

function productCard(p) {
  const pix  = (Math.round(p.price * 0.9 * 100)/100).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
  const inst = (Math.round(p.price / 10 * 100)/100).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
  const disc = Math.round((1 - p.price / p.orig) * 100);
  // Use real product image with fallback to locally-generated SVG (always works)
  const localImg = '/pimg/' + p.id;
  const parts = [];
  parts.push('<a class="pitem" href="/produto.html?id=' + p.id + '">');
  parts.push('  <div class="pimg">');
  parts.push('    <span class="disc-badge">-' + disc + '%</span>');
  parts.push('    <img src="' + localImg + '" alt="' + p.name + '" loading="lazy"/>');
  parts.push('    <button class="fav-icon" onclick="toggleFav(\'' + p.id + '\',event)">🤍</button>');
  parts.push('  </div>');
  parts.push('  <div class="pinfo">');
  parts.push('    <div class="pbrand">' + p.brand + '</div>');
  parts.push('    <div class="pname">' + p.name + '</div>');
  parts.push('    <div class="pstars">★★★★★ <span>' + p.rating + ' (' + p.reviews.toLocaleString('pt-BR') + ')</span></div>');
  parts.push('    <div class="porig">De R$ ' + p.orig.toLocaleString('pt-BR',{minimumFractionDigits:2}) + '</div>');
  parts.push('    <span class="ppix-tag">10% OFF no Pix</span>');
  parts.push('    <div class="pprice"><small>R$</small> ' + pix + '</div>');
  parts.push('    <div class="pinst">ou 10x de R$ ' + inst + ' <b>sem juros</b></div>');
  parts.push('    <button class="pbtn" onclick="addToCart(\'' + p.id + '\',event)">🛒 Adicionar à sacola</button>');
  parts.push('    <a class="pbtn-buy" href="/produto.html?id=' + p.id + '">⚡ Comprar agora</a>');
  parts.push('  </div>');
  parts.push('</a>');
  return parts.join('\n');
}

// ────────────────────────────────────────────────
// PÁGINAS
// ────────────────────────────────────────────────

function pageHome(userToken) {
  const cats = [
    {name:'Celulares',   icon:'📱', bg:'#e3f2fd', color:'#1565c0'},
    {name:'TV e Vídeo',  icon:'📺', bg:'#f3e5f5', color:'#7b1fa2'},
    {name:'Eletrodomésticos', icon:'🏠', bg:'#e8f5e9', color:'#2e7d32'},
    {name:'Informática', icon:'💻', bg:'#fff3e0', color:'#e65100'},
    {name:'Games',       icon:'🎮', bg:'#fce4ec', color:'#c62828'},
    {name:'Câmeras',     icon:'📷', bg:'#f1f8e9', color:'#33691e'},
    {name:'Fones',       icon:'🎧', bg:'#e0f7fa', color:'#00695c'},
    {name:'Smartwatches',icon:'⌚', bg:'#ede7f6', color:'#4527a0'},
    {name:'Tablets',     icon:'📱', bg:'#fbe9e7', color:'#bf360c'},
    {name:'Móveis',      icon:'🛋️', bg:'#efebe9', color:'#4e342e'},
  ];
  const qcats = cats.map(c=>`
    <div class="qcat" onclick="navGo('${c.name}')">
      <div class="qcat-icon" style="background:${c.bg};color:${c.color}">${c.icon}</div>
      <span>${c.name}</span>
    </div>`).join('');

  const featured = CATALOG.slice(0,10);
  const ofertas  = CATALOG.filter(p=>Math.round((1-p.price/p.orig)*100)>=40).slice(0,10);
  const topRated = [...CATALOG].sort((a,b)=>b.rating-a.rating).slice(0,10);

  const heroBanners = [
    {tag:'MEGA OFERTA', title:'iPhone 15 com até 47% OFF', sub:'Parcele em até 12x sem juros no cartão', price:'R$ 2.899', btn:'Ver oferta', bg:'linear-gradient(135deg,#0d1b4b 0%,#1a3a8c 50%,#0086ff 100%)', emoji:'📱'},
    {tag:'BLACK FRIDAY', title:'Smart TV 4K até 60% OFF', sub:'As melhores TVs com entrega rápida', price:'a partir de R$ 899', btn:'Aproveitar', bg:'linear-gradient(135deg,#1a0533 0%,#4a0080 50%,#7b1fa2 100%)', emoji:'📺'},
    {tag:'SUPER DEALS', title:'Notebook para trabalho', sub:'Processadores de última geração', price:'a partir de R$ 1.499', btn:'Ver modelos', bg:'linear-gradient(135deg,#002d1a 0%,#00701e 50%,#00a650 100%)', emoji:'💻'},
  ];

  return `<!DOCTYPE html><html lang="pt-br"><head>
  <meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Magazine Luiza | Magalu — Celular, TV, Geladeira com as melhores ofertas</title>
  <style>${baseStyles()}</style></head><body>
  ${headerHTML('', userToken)}
  <div style="background:#fff;border-bottom:1px solid var(--border)">
    <div class="wrap-full" style="padding-top:20px;padding-bottom:20px">

      <!-- HERO CAROUSEL -->
      <div class="hero-banner" id="hero" onclick="location.href='/busca?cat=Celulares'" style="background:${heroBanners[0].bg}">
        <div class="hero-content" id="hero-content">
          <div class="hero-tag" id="htag">${heroBanners[0].tag}</div>
          <div class="hero-title" id="htitle">${heroBanners[0].title}</div>
          <div class="hero-sub" id="hsub">${heroBanners[0].sub}</div>
          <div class="hero-price" id="hprice">${heroBanners[0].emoji} ${heroBanners[0].price}</div>
          <button class="hero-btn" style="margin-top:16px">${heroBanners[0].btn} →</button>
        </div>
        <div class="hero-dots">
          <div class="hdot act" onclick="setHero(0,event)"></div>
          <div class="hdot" onclick="setHero(1,event)"></div>
          <div class="hdot" onclick="setHero(2,event)"></div>
        </div>
      </div>

      <!-- QUICK CATEGORIES -->
      <div class="qcat-row" style="margin-top:20px">${qcats}</div>
    </div>
  </div>

  <div class="wrap">

    <!-- PROMO STRIP 1 -->
    <div class="promo-strip">
      <div class="ps-txt">
        <h3>⚡ Frete Grátis em compras acima de R$ 299</h3>
        <p>Entrega em todo o Brasil · Pedidos Full entregues em até 24h</p>
      </div>
      <button class="ps-btn" onclick="location.href='/busca?cat=Celulares'">Ver ofertas →</button>
    </div>

    <!-- OFERTAS DO DIA -->
    <div class="sec-hdr">
      <div class="sec-hdr-l">
        <div class="sec-title">🔥 Ofertas do Dia <span class="pill">ATÉ 60% OFF</span></div>
        <div class="sec-sub">Promoções por tempo limitado — aproveite!</div>
      </div>
      <button class="see-all" onclick="location.href='/busca?cat=Celulares'">Ver todas →</button>
    </div>
    <div class="grid">${ofertas.map(p=>productCard(p,userToken)).join('')}</div>

    <!-- MINI BANNERS -->
    <div class="mini-banners" style="margin-top:32px">
      <div class="mbanner" onclick="location.href='/busca?cat=Games'" style="background:linear-gradient(135deg,#1a0533,#6200ea)">
        <div class="mbanner-content"><h4>🎮 Games com até 50% OFF</h4><p>PS5, Xbox Series X, Nintendo Switch</p></div>
      </div>
      <div class="mbanner" onclick="location.href='/busca?cat=Eletrodomésticos'" style="background:linear-gradient(135deg,#002d1a,#00a650)">
        <div class="mbanner-content"><h4>🏠 Casa & Eletros</h4><p>Geladeiras, Máquinas de Lavar e mais</p></div>
      </div>
    </div>

    <!-- MAIS VENDIDOS -->
    <div class="sec-hdr">
      <div class="sec-hdr-l">
        <div class="sec-title">⭐ Mais Vendidos</div>
        <div class="sec-sub">Os produtos favoritos dos brasileiros</div>
      </div>
      <button class="see-all" onclick="location.href='/busca'">Ver catálogo →</button>
    </div>
    <div class="grid">${featured.map(p=>productCard(p,userToken)).join('')}</div>

    <!-- PROMO STRIP 2 -->
    <div class="promo-strip" style="background:linear-gradient(135deg,#5d4037,#8d6e63);margin-top:32px">
      <div class="ps-txt">
        <h3>🛋️ Renove sua casa com parcelas</h3>
        <p>Móveis e decoração em até 24x sem juros · Frete especial</p>
      </div>
      <button class="ps-btn" onclick="location.href='/busca?cat=Móveis'">Ver móveis →</button>
    </div>

    <!-- MELHOR AVALIADOS -->
    <div class="sec-hdr">
      <div class="sec-hdr-l">
        <div class="sec-title">🏆 Melhor Avaliados</div>
        <div class="sec-sub">Produtos com 4.8+ estrelas pelos clientes</div>
      </div>
      <button class="see-all" onclick="location.href='/busca'">Ver todos →</button>
    </div>
    <div class="grid">${topRated.map(p=>productCard(p,userToken)).join('')}</div>

  </div>

  ${footerHTML()}
  <div class="toast" id="_toast"></div>
  <script>
  ${baseScripts(userToken)}
  const BANNERS=${JSON.stringify(heroBanners)};
  let _hi=0,_ht;
  function setHero(i,e){if(e){e.preventDefault();e.stopPropagation();}
    _hi=i;const b=BANNERS[i];
    const el=document.getElementById('hero');
    if(el)el.style.background=b.bg;
    document.getElementById('htag').textContent=b.tag;
    document.getElementById('htitle').textContent=b.title;
    document.getElementById('hsub').textContent=b.sub;
    document.getElementById('hprice').textContent=b.emoji+' '+b.price;
    document.querySelectorAll('.hdot').forEach((d,j)=>d.classList.toggle('act',j===i));
    clearInterval(_ht);_ht=setInterval(()=>setHero((_hi+1)%BANNERS.length),5000);
  }
  _ht=setInterval(()=>setHero((_hi+1)%BANNERS.length),5000);
  </script></body></html>`;
}

function footerHTML() {
  return `
  <footer>
    <div class="footer-inner">
      <div class="footer-grid">
        <div class="footer-col">
          <h4>Atendimento</h4>
          <a href="#">Central de Atendimento</a>
          <a href="#">Trocas e Devoluções</a>
          <a href="#">Cancelar Pedido</a>
          <a href="#">Reclamações</a>
        </div>
        <div class="footer-col">
          <h4>Institucional</h4>
          <a href="#">Quem Somos</a>
          <a href="#">Trabalhe Conosco</a>
          <a href="#">Lojas Físicas</a>
          <a href="#">Franquias</a>
        </div>
        <div class="footer-col">
          <h4>Serviços</h4>
          <a href="#">Rastrear Pedido</a>
          <a href="#">Assistência Técnica</a>
          <a href="#">Magalu Entrega</a>
          <a href="#">Cartão Magalu</a>
        </div>
        <div class="footer-col">
          <h4>Parceiros</h4>
          <a href="#">Vender no Magalu</a>
          <a href="#">Programa de Afiliados</a>
          <a href="#">Magalu Ads</a>
          <a href="#">API Magalu</a>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-logo">magalu<span>.</span></div>
        <div class="footer-pay">
          <span class="pay-badge">Visa</span>
          <span class="pay-badge">Master</span>
          <span class="pay-badge">PIX</span>
          <span class="pay-badge">Boleto</span>
          <span class="pay-badge">Elo</span>
          <span class="pay-badge">AmEx</span>
        </div>
        <div class="footer-copy">© ${new Date().getFullYear()} Magazine Luiza S.A. — CNPJ 47.960.950/1828-79</div>
      </div>
    </div>
  </footer>`;
}

function pageBusca(q, cat, userToken) {
  const results = searchCatalog(q, cat);
  const title = cat ? cat : (q ? ('"'+q+'"') : 'Todos os produtos');
  return `<!DOCTYPE html><html lang="pt-br"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${title} | Magalu</title><style>${baseStyles()}
  .filter-bar{background:#fff;border-radius:12px;padding:16px 20px;margin-bottom:20px;display:flex;align-items:center;justify-content:space-between;box-shadow:var(--shadow);border:1.5px solid #eee;flex-wrap:wrap;gap:12px}
  .filter-bar .rt{font-size:15px;font-weight:800;color:var(--text)}.filter-bar .rt span{color:var(--blue)}
  .breadcrumb{font-size:12px;color:var(--muted);margin-bottom:16px;display:flex;align-items:center;gap:6px}
  .breadcrumb a{color:var(--blue);font-weight:700}.breadcrumb span{color:var(--muted)}
  </style></head><body>
  ${headerHTML(q||cat||'', userToken)}
  <div class="wrap">
    <div class="breadcrumb">
      <a href="/">Início</a><span>›</span>
      ${cat ? `<a href="/busca?cat=${encodeURIComponent(cat)}">${cat}</a>` : `<span>${q||'Todos'}</span>`}
    </div>
    <div class="filter-bar">
      <div class="rt"><span>${results.length}</span> resultado(s) ${cat?'em <b>'+cat+'</b>':q?'para <b>'+q+'</b>':'no catálogo'}</div>
      <select onchange="sortGrid(this.value)">
        <option value="rel">Mais relevantes</option>
        <option value="pa">Menor preço</option>
        <option value="pd">Maior preço</option>
        <option value="rt">Melhor avaliados</option>
        <option value="ds">Maior desconto</option>
      </select>
    </div>
    <div class="grid" id="grid">
      ${results.length ? results.map(p=>productCard(p,userToken)).join('') : '<div class="empty"><div class="ei">🔍</div><h3>Nenhum resultado</h3><p>Tente outro termo de busca.</p></div>'}
    </div>
  </div>
  ${footerHTML()}
  <div class="toast" id="_toast"></div>
  <script>
  ${baseScripts(userToken)}
  const DATA = ${JSON.stringify(results)};
  function sortGrid(v){
    let s=[...DATA];
    if(v==='pa') s.sort((a,b)=>a.price-b.price);
    else if(v==='pd') s.sort((a,b)=>b.price-a.price);
    else if(v==='rt') s.sort((a,b)=>b.rating-a.rating);
    else if(v==='ds') s.sort((a,b)=>(1-b.price/b.orig)-(1-a.price/a.orig));
    document.getElementById('grid').innerHTML=s.map(p=>{
      const pix=(p.price*.9).toLocaleString('pt-BR',{minimumFractionDigits:2});
      const inst=(p.price/10).toLocaleString('pt-BR',{minimumFractionDigits:2});
      const disc=Math.round((1-p.price/p.orig)*100);
      return '<a class="pitem" href="/produto.html?id='+p.id+'">'
        +'<div class="pimg">'
        +'<span class="disc-badge">-'+disc+'%</span>'
        +'<img src="/pimg/'+p.id+'" alt="'+p.name+'" loading="lazy"/>'
        +'<button class="fav-icon" onclick="toggleFav(\''+p.id+'\',event)">🤍</button>'
        +'</div>'
        +'<div class="pinfo">'
        +'<div class="pbrand">'+p.brand+'</div>'
        +'<div class="pname">'+p.name+'</div>'
        +'<div class="pstars">★★★★★ <span>'+p.rating+' ('+p.reviews.toLocaleString('pt-BR')+')</span></div>'
        +'<div class="porig">De R$ '+p.orig.toLocaleString('pt-BR',{minimumFractionDigits:2})+'</div>'
        +'<span class="ppix-tag">10% OFF no Pix</span>'
        +'<div class="pprice"><small>R$</small> '+pix+'</div>'
        +'<div class="pinst">ou 10x de R$ '+inst+' sem juros</div>'
        +'<button class="pbtn" onclick="addToCart(\''+p.id+'\',event)">🛒 Adicionar à sacola</button>'
        +'<a class="pbtn-buy" href="/produto.html?id='+p.id+'">⚡ Comprar agora</a>'
        +'</div></a>';
    }).join('');
  }
  </script></body></html>`;
}

function pageLogin(msg='') {
  return `<!DOCTYPE html><html lang="pt-br"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Identificação | Magalu</title>
  <style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Helvetica Neue',Arial,sans-serif;background:#f0f3f8;min-height:100vh}
  .lhdr{background:#0086ff;padding:14px 24px;display:flex;align-items:center;gap:12px}
  .lhdr .logo{color:#fff;font-size:1.6rem;font-weight:900;letter-spacing:-1px;text-decoration:none}
  .lhdr .logo span{color:#ffe55c}
  .lhdr .back{margin-left:auto;color:rgba(255,255,255,.85);font-size:13px;font-weight:700;text-decoration:none;display:flex;align-items:center;gap:4px}
  .lhdr .back:hover{color:#fff}
  .lwrap{display:flex;align-items:center;justify-content:center;min-height:calc(100vh - 52px);padding:24px 16px}
  .lcard{background:#fff;border-radius:16px;box-shadow:0 4px 32px rgba(0,0,0,.1);width:100%;max-width:420px;overflow:hidden}
  .ltabs{display:flex;border-bottom:2px solid #f0f3f8}
  .ltab{flex:1;padding:16px;font-size:14px;font-weight:800;text-align:center;cursor:pointer;color:#666;border:none;background:none;border-bottom:3px solid transparent;margin-bottom:-2px;transition:all .2s}
  .ltab.active{color:#0086ff;border-bottom-color:#0086ff}
  .ltab:hover:not(.active){background:#f7f9fc;color:#0086ff}
  .lpanel{padding:28px;display:none}.lpanel.active{display:block}
  .lp-title{font-size:20px;font-weight:900;color:#222;margin-bottom:6px}
  .lp-sub{font-size:13px;color:#888;margin-bottom:24px}
  .fgrp{display:flex;flex-direction:column;gap:6px;margin-bottom:16px}
  .fgrp label{font-size:11px;font-weight:800;color:#666;text-transform:uppercase;letter-spacing:.5px}
  .fgrp input{border:1.5px solid #ddd;border-radius:10px;padding:12px 14px;font-size:14px;font-family:inherit;outline:none;transition:border-color .2s,box-shadow .2s}
  .fgrp input:focus{border-color:#0086ff;box-shadow:0 0 0 3px rgba(0,134,255,.1)}
  .eyw{position:relative}.eyw input{padding-right:44px}
  .eybtn{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;font-size:17px;color:#aaa}
  .eybtn:hover{color:#666}
  .btnverde{width:100%;background:#00a650;color:#fff;border:none;border-radius:12px;padding:14px;font-size:15px;font-weight:900;cursor:pointer;transition:background .15s;letter-spacing:.2px}
  .btnverde:hover{background:#008f44}
  .btnverde:active{transform:scale(.99)}
  .sep{display:flex;align-items:center;gap:10px;margin:18px 0;color:#ccc;font-size:12px}
  .sep::before,.sep::after{content:'';flex:1;border-top:1px solid #eee}
  .btngoogle{width:100%;background:#fff;color:#333;border:1.5px solid #ddd;border-radius:12px;padding:13px;font-size:14px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;transition:all .2s;font-family:inherit}
  .btngoogle:hover{border-color:#4285f4;box-shadow:0 2px 12px rgba(66,133,244,.15);color:#4285f4}
  .lnkp{font-size:12px;color:#0086ff;cursor:pointer;margin-top:10px;display:block;text-align:center}
  .lnkp:hover{text-decoration:underline}
  .msgbox{padding:11px 14px;border-radius:10px;font-size:13px;font-weight:700;margin-bottom:16px;display:flex;align-items:center;gap:8px}
  .msgbox.ok{background:#e6f9ef;color:#007a3b;border:1px solid #b2e8c8}
  .msgbox.err{background:#fdf0f0;color:#c62828;border:1px solid #f8c4c4}
  .passrules{font-size:11px;color:#aaa;margin-top:-10px;margin-bottom:14px;padding-left:2px}
  @media(max-width:480px){.lcard{border-radius:12px}.lpanel{padding:20px}}
  </style></head><body>
  <div class="lhdr">
    <a class="logo" href="/">ma<span>ga</span>lu</a>
    <span style="color:rgba(255,255,255,.6);font-size:13px">/ Identificação</span>
    <a class="back" href="/">← Voltar à loja</a>
  </div>
  <div class="lwrap">
    <div class="lcard">
      <div class="ltabs">
        <button class="ltab active" id="tab-reg" onclick="switchTab('reg')">Criar conta</button>
        <button class="ltab" id="tab-login" onclick="switchTab('login')">Já tenho conta</button>
      </div>

      <!-- CRIAR CONTA -->
      <div class="lpanel active" id="panel-reg">
        <div class="lp-title">Criar minha conta</div>
        <div class="lp-sub">Cadastre-se e aproveite as melhores ofertas</div>
        <div id="msg-reg"></div>
        <div class="fgrp"><label>Nome completo</label><input type="text" id="reg-name" placeholder="Seu nome completo" autocomplete="name"/></div>
        <div class="fgrp"><label>E-mail</label><input type="email" id="reg-email" placeholder="seuemail@exemplo.com" autocomplete="email"/></div>
        <div class="fgrp"><label>CPF</label><input type="text" id="reg-cpf" placeholder="000.000.000-00" maxlength="14" oninput="maskCPF(this)"/></div>
        <div class="fgrp"><label>Senha</label>
          <div class="eyw"><input type="password" id="reg-pass" placeholder="Mínimo 6 caracteres" autocomplete="new-password"/><button class="eybtn" onclick="togglePwd('reg-pass')">👁</button></div>
        </div>
        <div class="passrules">🔒 Use pelo menos 6 caracteres com letras e números</div>
        <button class="btnverde" onclick="doRegister()">Criar conta</button>
        <div class="sep">ou</div>
        <button class="btngoogle" onclick="googleAuth('reg')">
          <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.08 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-3.59-13.46-8.83l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
          Cadastrar com Google
        </button>
        <a class="lnkp" onclick="switchTab('login')">Já tenho conta? Entrar →</a>
      </div>

      <!-- LOGIN -->
      <div class="lpanel" id="panel-login">
        <div class="lp-title">Bem-vindo(a) de volta!</div>
        <div class="lp-sub">Entre com seu e-mail e senha</div>
        <div id="msg-login"></div>
        <div class="fgrp"><label>E-mail</label><input type="email" id="login-email" placeholder="seuemail@exemplo.com" autocomplete="email"/></div>
        <div class="fgrp"><label>Senha</label>
          <div class="eyw"><input type="password" id="login-pass" placeholder="Sua senha" autocomplete="current-password"/><button class="eybtn" onclick="togglePwd('login-pass')">👁</button></div>
        </div>
        <button class="btnverde" onclick="doLogin()">Entrar</button>
        <div class="sep">ou</div>
        <button class="btngoogle" onclick="googleAuth('login')">
          <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.08 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-3.59-13.46-8.83l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
          Entrar com Google
        </button>
        <a class="lnkp" onclick="showMsg('login','ok','📧 Enviamos um link de recuperação para seu e-mail!')">Esqueci minha senha</a>
        <a class="lnkp" onclick="switchTab('reg')" style="color:#666;margin-top:4px">Não tenho conta → Criar agora</a>
      </div>
    </div>
  </div>
  <div id="_toast" style="position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#333;color:#fff;padding:12px 24px;border-radius:50px;font-size:14px;font-weight:700;opacity:0;transition:opacity .3s;z-index:9999;pointer-events:none"></div>
  <script>
  function switchTab(t){
    document.querySelectorAll('.ltab,.lpanel').forEach(e=>e.classList.remove('active'));
    document.getElementById('tab-'+t).classList.add('active');
    document.getElementById('panel-'+t).classList.add('active');
  }
  function togglePwd(id){const i=document.getElementById(id);i.type=i.type==='password'?'text':'password';}
  function maskCPF(el){let v=el.value.replace(/\D/g,'').slice(0,11);if(v.length>9)v=v.slice(0,3)+'.'+v.slice(3,6)+'.'+v.slice(6,9)+'-'+v.slice(9);else if(v.length>6)v=v.slice(0,3)+'.'+v.slice(3,6)+'.'+v.slice(6);else if(v.length>3)v=v.slice(0,3)+'.'+v.slice(3);el.value=v;}
  function showMsg(panel,type,text){const el=document.getElementById('msg-'+panel);el.innerHTML='<div class="msgbox '+type+'">'+text+'</div>';}
  function toast(msg){const el=document.getElementById('_toast');el.textContent=msg;el.style.opacity='1';setTimeout(()=>el.style.opacity='0',3000);}
  function saveToken(t){document.cookie='magalu_token='+t+';path=/;max-age=2592000';try{localStorage.setItem('magalu_token',t);}catch(e){}}
  async function doRegister(){
    const name=document.getElementById('reg-name').value.trim();
    const email=document.getElementById('reg-email').value.trim();
    const pass=document.getElementById('reg-pass').value;
    if(!name){showMsg('reg','err','⚠️ Digite seu nome completo');return;}
    if(!email||!email.includes('@')){showMsg('reg','err','⚠️ Digite um e-mail válido');return;}
    if(pass.length<6){showMsg('reg','err','⚠️ Senha deve ter pelo menos 6 caracteres');return;}
    const btn=document.querySelector('#panel-reg .btnverde');
    btn.textContent='Criando conta...';btn.disabled=true;
    try{
      const r=await fetch('/api/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email,password:pass})});
      const d=await r.json();
      if(d.success){saveToken(d.token);showMsg('reg','ok','✅ Conta criada! Redirecionando...');setTimeout(()=>location.href='/',1000);}
      else showMsg('reg','err','⚠️ '+(d.error||'Erro ao criar conta'));
    }catch(e){showMsg('reg','err','⚠️ Erro de conexão');}
    btn.textContent='Criar conta';btn.disabled=false;
  }
  async function doLogin(){
    const email=document.getElementById('login-email').value.trim();
    const pass=document.getElementById('login-pass').value;
    if(!email||!pass){showMsg('login','err','⚠️ Preencha e-mail e senha');return;}
    const btn=document.querySelector('#panel-login .btnverde');
    btn.textContent='Entrando...';btn.disabled=true;
    try{
      const r=await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password:pass})});
      const d=await r.json();
      if(d.success){saveToken(d.token);showMsg('login','ok','✅ Bem-vindo(a)! Redirecionando...');setTimeout(()=>location.href='/',1000);}
      else showMsg('login','err','⚠️ '+(d.error||'E-mail ou senha incorretos'));
    }catch(e){showMsg('login','err','⚠️ Erro de conexão');}
    btn.textContent='Entrar';btn.disabled=false;
  }
  async function googleAuth(type){
    const name=type==='reg'?prompt('Nome completo:'):null;
    const email=prompt('E-mail Google:');
    if(!email)return;
    try{
      const r=await fetch('/api/auth/google',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:name||email.split('@')[0],email,provider:'google'})});
      const d=await r.json();
      if(d.success){saveToken(d.token);toast('✅ Login realizado!');setTimeout(()=>location.href='/',900);}
      else showMsg(type==='reg'?'reg':'login','err','⚠️ '+(d.error||'Erro'));
    }catch(e){showMsg(type==='reg'?'reg':'login','err','⚠️ Erro de conexão');}
  }
  // Auto-focus
  document.getElementById('reg-name').focus();
  </script></body></html>`;
}

function pageSacola(userToken) {
  const user = getUserByToken(userToken);
  const cart = carts[userToken] || [];
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  return `<!DOCTYPE html><html lang="pt-br"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Sacola | Magalu</title><style>
  ${baseStyles()}
  .cart-layout{max-width:900px;margin:24px auto;padding:0 20px;display:grid;grid-template-columns:1fr 320px;gap:20px}
  @media(max-width:700px){.cart-layout{grid-template-columns:1fr}}
  .cart-card,.sum-card{background:#fff;border-radius:12px;box-shadow:0 1px 5px rgba(0,0,0,.08);padding:20px}
  .cart-title{font-size:18px;font-weight:900;margin-bottom:16px}
  .ci-row{display:flex;gap:14px;padding:14px 0;border-bottom:1px solid var(--border);align-items:center}
  .ci-img{width:80px;height:80px;object-fit:contain;flex-shrink:0}
  .ci-info{flex:1}.ci-name{font-size:13px;font-weight:800;margin-bottom:4px}
  .ci-var{font-size:12px;color:var(--muted)}
  .ci-price{font-size:16px;font-weight:900;color:var(--blue)}
  .ci-qty{display:flex;align-items:center;gap:8px;margin-top:8px}
  .qty-btn{width:28px;height:28px;border-radius:6px;border:1.5px solid var(--border);background:#fff;font-size:16px;font-weight:900;cursor:pointer;display:flex;align-items:center;justify-content:center}
  .qty-n{font-size:14px;font-weight:800;min-width:20px;text-align:center}
  .ci-rm{background:none;border:none;cursor:pointer;color:var(--muted);font-size:12px;font-weight:700;margin-left:auto}
  .ci-rm:hover{color:var(--red)}
  .sum-row{display:flex;justify-content:space-between;font-size:14px;padding:6px 0}
  .sum-row.total{font-size:17px;font-weight:900;border-top:1.5px solid var(--border);margin-top:8px;padding-top:14px}
  .btn-checkout{width:100%;background:var(--green);color:#fff;border:none;border-radius:10px;padding:14px;font-family:inherit;font-size:15px;font-weight:900;cursor:pointer;margin-top:14px;transition:background .15s}
  .btn-checkout:hover{background:var(--green-dk)}
  .empty-cart{text-align:center;padding:40px;color:var(--muted)}
  </style></head><body>
  ${headerHTML('', userToken)}
  <div class="cart-layout">
    <div class="cart-card">
      <div class="cart-title">🛒 Minha Sacola ${cart.length ? `(${cart.reduce((s,i)=>s+i.qty,0)} item(s))` : ''}</div>
      <div id="cart-items">
      ${cart.length===0 ? '<div class="empty-cart"><div style="font-size:3rem">🛒</div><p style="margin-top:12px;font-weight:800">Sua sacola está vazia</p><a href="/" style="color:var(--blue);font-weight:700;margin-top:8px;display:inline-block">Continuar comprando →</a></div>' :
        cart.map((item,i)=>`
        <div class="ci-row" id="ci-${i}">
          <img class="ci-img" src="${item.img}" alt="${item.name}" onerror="this.src='https://placehold.co/80x80?text=?'"/>
          <div class="ci-info">
            <div class="ci-name">${item.name}</div>
            <div class="ci-var">${item.color||''} ${item.storage||''}</div>
            <div class="ci-price">R$ ${(item.price*item.qty).toLocaleString('pt-BR',{minimumFractionDigits:2})}</div>
            <div class="ci-qty">
              <button class="qty-btn" onclick="changeQty(${i},-1)">−</button>
              <span class="qty-n">${item.qty}</span>
              <button class="qty-btn" onclick="changeQty(${i},1)">+</button>
              <button class="ci-rm" onclick="removeItem(${i})">🗑 Remover</button>
            </div>
          </div>
        </div>`).join('')
      }
      </div>
    </div>
    <div>
      <div class="sum-card">
        <div class="cart-title">Resumo</div>
        <div class="sum-row"><span>Subtotal</span><span id="subtotal">R$ ${total.toLocaleString('pt-BR',{minimumFractionDigits:2})}</span></div>
        <div class="sum-row"><span>Frete</span><span style="color:var(--green)">Calcule no próximo passo</span></div>
        <div class="sum-row total"><span>Total</span><span>R$ ${total.toLocaleString('pt-BR',{minimumFractionDigits:2})}</span></div>
        <button class="btn-checkout" onclick="checkout()">Finalizar compra</button>
      </div>
    </div>
  </div>
  <div class="toast" id="_toast"></div>
  <script>
  ${baseScripts(userToken)}
  const TOKEN='${userToken}';
  let cartData=${JSON.stringify(cart)};
  function changeQty(i,d){
    fetch('/api/cart/qty',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:TOKEN,index:i,delta:d})})
      .then(r=>r.json()).then(res=>{if(res.success)location.reload();});
  }
  function removeItem(i){
    fetch('/api/cart/remove',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:TOKEN,index:i})})
      .then(r=>r.json()).then(res=>{if(res.success)location.reload();});
  }
  async function checkout(){
    if(!TOKEN){location.href='/login';return;}
    const r=await fetch('/api/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:TOKEN})});
    const d=await r.json();
    if(d.success){toast('✓ Pedido criado! Redirecionando...','ok');setTimeout(()=>location.href='/pay/'+d.order.id,1000);}
    else toast(d.error||'Erro','err');
  }
  </script></body></html>`;
}

function pageFavoritos(userToken) {
  const favIds = favorites[userToken] || [];
  const favProducts = CATALOG.filter(p=>favIds.includes(p.id));
  return `<!DOCTYPE html><html lang="pt-br"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Favoritos | Magalu</title><style>${baseStyles()}</style></head><body>
  ${headerHTML('', userToken)}
  <div class="wrap">
    <div class="sec-title">❤️ Meus Favoritos</div>
    <div class="sec-sub">${favProducts.length} produto(s) salvos</div>
    <div class="grid">
      ${favProducts.length ? favProducts.map(p=>productCard(p,userToken)).join('') :
        '<div class="empty"><div class="ei">🤍</div><h3>Nenhum favorito ainda</h3><p>Clique no 🤍 em qualquer produto para salvar.</p><a href="/" style="color:var(--blue);font-weight:700;margin-top:12px;display:inline-block">Ver produtos →</a></div>'}
    </div>
  </div>
  <div class="toast" id="_toast"></div>
  <script>${baseScripts(userToken)}</script></body></html>`;
}

function pageConta(userToken) {
  const user = getUserByToken(userToken);
  if (!user) return '<script>location.href="/login"</script>';
  const userOrders = orders.filter(o=>o.userToken===userToken);
  return `<!DOCTYPE html><html lang="pt-br"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Minha Conta | Magalu</title><style>
  ${baseStyles()}
  .conta-layout{max-width:900px;margin:24px auto;padding:0 20px;display:grid;grid-template-columns:260px 1fr;gap:20px}
  @media(max-width:700px){.conta-layout{grid-template-columns:1fr}}
  .side-card,.main-card{background:#fff;border-radius:12px;box-shadow:0 1px 5px rgba(0,0,0,.08);padding:20px}
  .user-avatar{width:80px;height:80px;border-radius:50%;object-fit:cover;margin:0 auto 12px;display:block;background:#e0e0e0}
  .user-name{font-size:16px;font-weight:900;text-align:center;margin-bottom:4px}
  .user-email{font-size:12px;color:var(--muted);text-align:center;margin-bottom:16px}
  .side-menu{display:flex;flex-direction:column;gap:4px}
  .side-item{padding:10px 12px;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;transition:background .15s}
  .side-item:hover{background:#f0f3f8}.side-item.act{background:#e8f3ff;color:var(--blue)}
  .order-row{display:flex;gap:12px;padding:14px 0;border-bottom:1px solid var(--border);align-items:center}
  .order-id{font-size:12px;font-weight:900;color:var(--blue)}
  .order-status{font-size:11px;font-weight:800;padding:2px 8px;border-radius:4px;background:#e8f7ee;color:#007a3b}
  .btn-logout{width:100%;margin-top:16px;background:none;border:1.5px solid var(--red);color:var(--red);border-radius:8px;padding:10px;font-family:inherit;font-size:13px;font-weight:800;cursor:pointer}
  .btn-logout:hover{background:#fce8e8}
  </style></head><body>
  ${headerHTML('', userToken)}
  <div class="conta-layout">
    <div class="side-card">
      ${user.avatar ? `<img class="user-avatar" src="${user.avatar}" alt="${user.name}"/>` : `<div class="user-avatar" style="display:flex;align-items:center;justify-content:center;font-size:2rem">👤</div>`}
      <div class="user-name">${user.name}</div>
      <div class="user-email">${user.email}</div>
      <div class="side-menu">
        <div class="side-item act">📦 Meus Pedidos</div>
        <div class="side-item" onclick="location.href='/favoritos'">❤️ Favoritos</div>
        <div class="side-item" onclick="location.href='/sacola'">🛒 Sacola</div>
      </div>
      <button class="btn-logout" onclick="logout()">Sair da conta</button>
    </div>
    <div class="main-card">
      <div class="sec-title" style="margin-bottom:16px">📦 Meus Pedidos</div>
      ${userOrders.length===0 ? '<div class="empty" style="grid-column:unset"><div class="ei">📦</div><h3>Nenhum pedido ainda</h3><p>Quando você finalizar uma compra, ela aparece aqui.</p></div>' :
        userOrders.map(o=>`<div class="order-row">
          <div><div class="order-id">${o.id}</div>
          <div style="font-size:12px;color:var(--muted);margin-top:2px">${new Date(o.createdAt).toLocaleDateString('pt-BR')} — ${o.items.length} item(s)</div></div>
          <span class="order-status">Confirmado</span>
          <div style="margin-left:auto;font-size:15px;font-weight:900">R$ ${o.total.toLocaleString('pt-BR',{minimumFractionDigits:2})}</div>
        </div>`).join('')}
    </div>
  </div>
  <div class="toast" id="_toast"></div>
  <script>
  ${baseScripts(userToken)}
  function logout(){
    document.cookie='magalu_token=;path=/;max-age=0';
    localStorage.removeItem('magalu_token');
    location.href='/';
  }
  </script></body></html>`;
}

// ────────────────────────────────────────────────
// SERVIDOR
// ────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  const p      = parsed.pathname;
  const q      = parsed.query;
  const method = req.method;
  const token  = getToken(req);

  cors(res);
  if (method==='OPTIONS') { res.writeHead(204); res.end(); return; }

  // ── IMAGE PROXY (evita bloqueio de hotlink) ──
  if (method==='GET' && p==='/img') {
    const imgUrl = q.url;
    if (!imgUrl) { res.writeHead(400); res.end('Missing url'); return; }
    try {
      const parsed2 = new URL(imgUrl);
      const isHttps = parsed2.protocol === 'https:';
      const lib = isHttps ? https : require('http');
      const opts = {
        hostname: parsed2.hostname,
        path: parsed2.pathname + parsed2.search,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
          'Accept-Language': 'pt-BR,pt;q=0.9',
          'Referer': 'https://www.google.com/',
          'Cache-Control': 'no-cache',
        }
      };
      const proxyReq = lib.get(opts, (proxyRes) => {
        const ct = proxyRes.headers['content-type'] || 'image/jpeg';
        if (proxyRes.statusCode === 301 || proxyRes.statusCode === 302) {
          // Follow redirect once
          const redir = proxyRes.headers['location'];
          if (redir) {
            res.writeHead(302, { 'Location': '/img?url=' + encodeURIComponent(redir) });
            res.end(); return;
          }
        }
        if (proxyRes.statusCode !== 200) {
          res.writeHead(404); res.end('Not found'); return;
        }
        cors(res);
        res.writeHead(200, {
          'Content-Type': ct,
          'Cache-Control': 'public, max-age=86400',
          'Access-Control-Allow-Origin': '*'
        });
        proxyRes.pipe(res);
      });
      proxyReq.on('error', () => { res.writeHead(502); res.end('Proxy error'); });
    } catch(e) { res.writeHead(400); res.end('Bad URL'); }
    return;
  }

  // ── SVG PRODUCT IMAGE GENERATOR ──
  if (method==='GET' && p.startsWith('/pimg/')) {
    const pid = p.split('/')[2];
    const item = CATALOG.find(c=>c.id===pid);
    if (!item) { res.writeHead(404); res.end('not found'); return; }

    const disc     = Math.round((1 - item.price/item.orig)*100);
    const pixPrice = (Math.round(item.price*0.9*100)/100).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
    const safeN    = (item.name.length>36 ? item.name.slice(0,35)+'…' : item.name).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    const safeB    = item.brand.replace(/&/g,'&amp;');
    const cat      = item.cat || '';
    const pid2     = pid;

    // ── Detect specific products for custom art ──
    const isIphone  = pid2.startsWith('C') && item.brand==='Apple';
    const isSamsung = pid2.startsWith('C') && item.brand==='Samsung';
    const isXiaomi  = pid2.startsWith('C') && item.brand==='Xiaomi';
    const isMotorola= pid2.startsWith('C') && item.brand==='Motorola';
    const isMacbook = pid2.startsWith('I') && item.brand==='Apple' && item.name.includes('MacBook');
    const isPS5     = pid2==='G001';
    const isXbox    = pid2==='G002';
    const isSwitch  = pid2==='G003';
    const isSonyHP  = pid2==='F002';
    const isAirPods = pid2==='F001';

    // ── Color themes ──
    const T = {
      'Celulares':        {bg1:'#0A1628',bg2:'#0D2140',frame:'#1E3A5F',screen:'#0066CC',acc:'#4DA6FF',text:'#FFFFFF'},
      'Eletrodomésticos': {bg1:'#E8EDF2',bg2:'#D0D8E4',frame:'#B0BEC5',screen:'#90A4AE',acc:'#1565C0',text:'#0D1B2A'},
      'TV e Vídeo':       {bg1:'#0A0A14',bg2:'#12003A',frame:'#1A0040',screen:'#0D0028',acc:'#BB86FC',text:'#FFFFFF'},
      'Informática':      {bg1:'#0A1A18',bg2:'#0D2620',frame:'#1B3A2A',screen:'#004D40',acc:'#4DB6AC',text:'#FFFFFF'},
      'Games':            {bg1:'#0D001A',bg2:'#1A0028',frame:'#250040',screen:'#12001F',acc:'#EA80FC',text:'#FFFFFF'},
      'Câmeras':          {bg1:'#1A0A00',bg2:'#2A1000',frame:'#2A1500',screen:'#1A0A00',acc:'#FF8A65',text:'#FFFFFF'},
      'Móveis':           {bg1:'#FFF8F0',bg2:'#EFEBE9',frame:'#D7CCC8',screen:'#BCAAA4',acc:'#5D4037',text:'#3E2723'},
      'Fones':            {bg1:'#001A1F',bg2:'#002830',frame:'#003040',screen:'#002030',acc:'#80DEEA',text:'#FFFFFF'},
      'Smartwatches':     {bg1:'#1A0010',bg2:'#280018',frame:'#380022',screen:'#0A000A',acc:'#F48FB1',text:'#FFFFFF'},
      'Tablets':          {bg1:'#0A1628',bg2:'#0D2040',frame:'#1A3060',screen:'#002080',acc:'#64B5F6',text:'#FFFFFF'},
    };
    const th = T[cat] || {bg1:'#0A1020',bg2:'#0D1830',frame:'#1A2840',screen:'#001040',acc:'#4DA6FF',text:'#FFFFFF'};

    // ── BRAND COLORS ──
    const brandColors = {
      'Apple':   {primary:'#1D1D1F',secondary:'#F5F5F7',accent:'#0071E3',logo:'#555'},
      'Samsung': {primary:'#1428A0',secondary:'#FFFFFF',accent:'#1428A0',logo:'#1428A0'},
      'Xiaomi':  {primary:'#FF6900',secondary:'#FFFFFF',accent:'#FF6900',logo:'#FF6900'},
      'Motorola':{primary:'#ED1C24',secondary:'#FFFFFF',accent:'#ED1C24',logo:'#ED1C24'},
      'Sony':    {primary:'#000000',secondary:'#FFFFFF',accent:'#00439C',logo:'#000'},
      'LG':      {primary:'#A50034',secondary:'#FFFFFF',accent:'#A50034',logo:'#A50034'},
      'default': {primary:'#333333',secondary:'#FFFFFF',accent:'#0086FF',logo:'#333'},
    };
    const bc = brandColors[item.brand] || brandColors['default'];

    // ── Per-category product illustrations ──
    // CELULAR - desenho super detalhado de smartphone
    const celularSVG = `
      <!-- Sombra -->
      <ellipse cx="200" cy="330" rx="72" ry="10" fill="#00000033"/>
      <!-- Corpo do celular -->
      <rect x="138" y="38" width="124" height="272" rx="22" fill="${bc.primary}" stroke="${bc.primary}" stroke-width="1"/>
      <!-- Borda lateral metálica -->
      <rect x="140" y="40" width="120" height="268" rx="21" fill="none" stroke="#ffffff22" stroke-width="2"/>
      <!-- Tela -->
      <rect x="146" y="60" width="108" height="214" rx="12" fill="#050510"/>
      <!-- Conteúdo da tela - gradiente colorido -->
      <defs>
        <linearGradient id="scrG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bc.accent}"/>
          <stop offset="50%" stop-color="${bc.accent}88"/>
          <stop offset="100%" stop-color="#000033"/>
        </linearGradient>
        <linearGradient id="wallG" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${bc.accent}cc"/>
          <stop offset="100%" stop-color="#000022"/>
        </linearGradient>
      </defs>
      <rect x="146" y="60" width="108" height="214" rx="12" fill="url(#wallG)"/>
      <!-- Barra de status -->
      <rect x="146" y="60" width="108" height="20" rx="12" fill="#00000055"/>
      <rect x="146" y="72" width="108" height="8" rx="0" fill="#00000055"/>
      <!-- Notch / Dynamic Island -->
      <rect x="178" y="63" width="44" height="12" rx="6" fill="#000"/>
      <!-- Camera no notch -->
      <circle cx="214" cy="69" r="4" fill="#1a1a2e"/>
      <circle cx="214" cy="69" r="2" fill="#050510"/>
      <!-- Ícones na tela -->
      <rect x="154" y="86" width="20" height="20" rx="6" fill="#FF3B30dd"/>
      <rect x="180" y="86" width="20" height="20" rx="6" fill="#34C759dd"/>
      <rect x="206" y="86" width="20" height="20" rx="6" fill="#007AFFdd"/>
      <rect x="232" y="86" width="14" height="20" rx="6" fill="#FF9500dd"/>
      <rect x="154" y="112" width="20" height="20" rx="6" fill="#5856D6dd"/>
      <rect x="180" y="112" width="20" height="20" rx="6" fill="#FF2D55dd"/>
      <rect x="206" y="112" width="20" height="20" rx="6" fill="#00C7BEdd"/>
      <rect x="232" y="112" width="14" height="20" rx="6" fill="#FFD60Add"/>
      <!-- Linha divisória -->
      <line x1="154" y1="140" x2="246" y2="140" stroke="#ffffff22" stroke-width="1"/>
      <!-- Widget grande -->
      <rect x="154" y="148" width="92" height="50" rx="10" fill="#ffffff15"/>
      <rect x="158" y="152" width="50" height="8" rx="4" fill="#ffffff88"/>
      <rect x="158" y="164" width="34" height="6" rx="3" fill="#ffffff44"/>
      <text x="200" y="185" font-family="Arial" font-size="14" font-weight="900" fill="white" text-anchor="middle" opacity="0.9">📷</text>
      <!-- Hora na tela -->
      <text x="200" y="225" font-family="Arial" font-size="22" font-weight="900" fill="white" text-anchor="middle">12:00</text>
      <text x="200" y="242" font-family="Arial" font-size="9" fill="#ffffffaa" text-anchor="middle">Seg, 6 de Março</text>
      <!-- Barra inferior -->
      <rect x="154" y="256" width="92" height="12" rx="6" fill="#ffffff22"/>
      <!-- Home indicator -->
      <rect x="179" y="266" width="42" height="4" rx="2" fill="#ffffff66"/>
      <!-- Câmera traseira -->
      <rect x="152" y="54" width="40" height="40" rx="12" fill="${bc.primary}"/>
      <circle cx="168" cy="66" r="9" fill="#1a1a1a" stroke="#333" stroke-width="1.5"/>
      <circle cx="168" cy="66" r="5" fill="#0a0a1a"/>
      <circle cx="165" cy="63" r="2" fill="white" opacity="0.4"/>
      <circle cx="182" cy="66" r="8" fill="#1a1a1a" stroke="#333" stroke-width="1.5"/>
      <circle cx="182" cy="66" r="4" fill="#0a0a1a"/>
      <circle cx="180" cy="64" r="1.5" fill="white" opacity="0.3"/>
      <!-- Flash -->
      <circle cx="172" cy="81" r="3" fill="#FFD60A" opacity="0.8"/>
      <!-- Botões laterais -->
      <rect x="136" y="120" width="4" height="32" rx="2" fill="#ffffff33"/>
      <rect x="260" y="108" width="4" height="22" rx="2" fill="#ffffff33"/>
      <rect x="260" y="136" width="4" height="22" rx="2" fill="#ffffff33"/>`;

    // ELETRODOMÉSTICO - geladeira realista
    const geladeiraSVG = `
      <defs><linearGradient id="acoG" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#CFD8DC"/>
        <stop offset="40%" stop-color="#ECEFF1"/>
        <stop offset="100%" stop-color="#B0BEC5"/>
      </linearGradient></defs>
      <!-- Sombra -->
      <ellipse cx="200" cy="340" rx="90" ry="12" fill="#00000022"/>
      <!-- Corpo principal -->
      <rect x="108" y="36" width="184" height="294" rx="16" fill="url(#acoG)"/>
      <!-- Reflexo lateral -->
      <rect x="108" y="36" width="20" height="294" rx="16" fill="#ffffff44"/>
      <!-- Divisória freezer/geladeira -->
      <rect x="112" y="166" width="176" height="6" rx="3" fill="#90A4AE"/>
      <!-- Porta superior (freezer) -->
      <rect x="114" y="40" width="172" height="122" rx="12" fill="url(#acoG)"/>
      <rect x="118" y="44" width="164" height="114" rx="10" fill="#B0BEC5" opacity="0.3"/>
      <!-- Puxador freezer -->
      <rect x="238" y="80" width="12" height="42" rx="6" fill="#78909C"/>
      <rect x="240" y="82" width="8" height="38" rx="4" fill="#90A4AE"/>
      <!-- Porta inferior -->
      <rect x="114" y="176" width="172" height="150" rx="12" fill="url(#acoG)"/>
      <rect x="118" y="180" width="164" height="142" rx="10" fill="#B0BEC5" opacity="0.3"/>
      <!-- Puxador geladeira -->
      <rect x="238" y="230" width="12" height="56" rx="6" fill="#78909C"/>
      <rect x="240" y="232" width="8" height="52" rx="4" fill="#90A4AE"/>
      <!-- Display LCD -->
      <rect x="128" y="56" width="72" height="44" rx="8" fill="#1A237E"/>
      <rect x="131" y="59" width="66" height="38" rx="6" fill="#0D1B6E"/>
      <text x="164" y="78" font-family="Arial" font-size="13" font-weight="900" fill="#00BCD4" text-anchor="middle">-18°C</text>
      <text x="164" y="92" font-family="Arial" font-size="9" fill="#4DD0E1" text-anchor="middle">FROST FREE</text>
      <!-- Logomarca area -->
      <rect x="128" y="106" width="72" height="18" rx="5" fill="#90A4AE55"/>
      <text x="164" y="119" font-family="Arial" font-size="10" font-weight="900" fill="#546E7A" text-anchor="middle">${safeB.toUpperCase()}</text>
      <!-- Pés -->
      <rect x="128" y="330" width="22" height="14" rx="4" fill="#78909C"/>
      <rect x="250" y="330" width="22" height="14" rx="4" fill="#78909C"/>`;

    // TV - televisão moderna
    const tvSVG = `
      <defs>
        <linearGradient id="tvG" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#1a1a2e"/>
          <stop offset="100%" stop-color="#050510"/>
        </linearGradient>
        <linearGradient id="tvScreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6200EA44"/>
          <stop offset="30%" stop-color="#BB86FC22"/>
          <stop offset="70%" stop-color="#03DAC611"/>
          <stop offset="100%" stop-color="#CF6679"/>
        </linearGradient>
      </defs>
      <!-- Sombra no chão -->
      <ellipse cx="200" cy="346" rx="100" ry="8" fill="#00000033"/>
      <!-- Moldura externa -->
      <rect x="44" y="58" width="312" height="222" rx="14" fill="#111"/>
      <!-- Moldura interna (bisel fino) -->
      <rect x="48" y="62" width="304" height="210" rx="11" fill="#1a1a1a"/>
      <!-- Tela principal -->
      <rect x="52" y="66" width="296" height="202" rx="9" fill="url(#tvG)"/>
      <!-- Conteúdo na tela -->
      <rect x="52" y="66" width="296" height="202" rx="9" fill="url(#tvScreen)"/>
      <!-- Conteúdo simulando vídeo -->
      <rect x="60" y="74" width="180" height="100" rx="4" fill="#ffffff08"/>
      <text x="200" y="178" font-size="52" text-anchor="middle" fill="white" opacity="0.5">▶</text>
      <!-- Barra inferior da tela (info) -->
      <rect x="52" y="242" width="296" height="26" rx="0" fill="#000000aa"/>
      <rect x="64" y="250" width="100" height="8" rx="4" fill="#ffffff44"/>
      <rect x="64" y="262" width="64" height="5" rx="2.5" fill="#ffffff22"/>
      <rect x="274" y="248" width="60" height="12" rx="6" fill="#BB86FC88"/>
      <!-- Logo da marca na TV -->
      <text x="200" y="258" font-family="Arial" font-size="11" font-weight="900" fill="#ffffffcc" text-anchor="middle">${safeB.toUpperCase()}</text>
      <!-- LED power -->
      <circle cx="196" cy="275" r="3" fill="#BB86FC" opacity="0.9"/>
      <!-- Pedestal -->
      <rect x="178" y="280" width="44" height="32" rx="4" fill="#111"/>
      <rect x="140" y="310" width="120" height="12" rx="6" fill="#0d0d0d"/>
      <rect x="140" y="322" width="120" height="8" rx="4" fill="#111"/>
      <!-- Reflexo na tela -->
      <rect x="52" y="66" width="50" height="202" rx="9" fill="#ffffff04"/>`;

    // COMPUTADOR / NOTEBOOK
    const notebookSVG = `
      <defs>
        <linearGradient id="nbG" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#2a2a2a"/>
          <stop offset="100%" stop-color="#1a1a1a"/>
        </linearGradient>
        <linearGradient id="nbScreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bc.accent}55"/>
          <stop offset="100%" stop-color="#001a00"/>
        </linearGradient>
      </defs>
      <!-- Sombra -->
      <ellipse cx="200" cy="326" rx="110" ry="8" fill="#00000033"/>
      <!-- Tela - tampa -->
      <rect x="68" y="52" width="264" height="180" rx="12" fill="url(#nbG)"/>
      <!-- Bezel -->
      <rect x="74" y="58" width="252" height="168" rx="9" fill="#111"/>
      <!-- Display -->
      <rect x="78" y="62" width="244" height="160" rx="7" fill="#0a0a14"/>
      <rect x="78" y="62" width="244" height="160" rx="7" fill="url(#nbScreen)"/>
      <!-- Barra de tarefas -->
      <rect x="78" y="62" width="244" height="16" rx="7" fill="#000000aa"/>
      <circle cx="90" cy="70" r="5" fill="#FF5F57"/>
      <circle cx="104" cy="70" r="5" fill="#FEBC2E"/>
      <circle cx="118" cy="70" r="5" fill="#28C840"/>
      <rect x="140" y="65" width="80" height="10" rx="5" fill="#ffffff22"/>
      <rect x="280" y="65" width="30" height="10" rx="5" fill="#ffffff11"/>
      <!-- Janela do app -->
      <rect x="86" y="84" width="230" height="130" rx="5" fill="#ffffff08"/>
      <rect x="86" y="84" width="230" height="20" rx="5" fill="#ffffff11"/>
      <rect x="94" y="92" width="80" height="6" rx="3" fill="#ffffff55"/>
      <rect x="94" y="110" width="210" height="5" rx="2.5" fill="#ffffff22"/>
      <rect x="94" y="120" width="170" height="5" rx="2.5" fill="#ffffff22"/>
      <rect x="94" y="130" width="190" height="5" rx="2.5" fill="#ffffff22"/>
      <rect x="94" y="140" width="140" height="5" rx="2.5" fill="#ffffff22"/>
      <rect x="94" y="158" width="100" height="18" rx="5" fill="${bc.accent}aa"/>
      <!-- Logo Apple na tampa -->
      <text x="200" y="160" font-size="28" text-anchor="middle" fill="${bc.accent}" opacity="0.3">⌘</text>
      <!-- Camera -->
      <circle cx="200" cy="66" r="4" fill="#1a1a1a"/>
      <circle cx="200" cy="66" r="2" fill="#050510"/>
      <!-- Base/teclado -->
      <rect x="52" y="232" width="296" height="84" rx="10" fill="#D8D8D8"/>
      <rect x="64" y="240" width="272" height="60" rx="7" fill="#C8C8C8"/>
      <!-- Teclas simuladas -->
      <rect x="70" y="246" width="16" height="10" rx="2" fill="#B0B0B0"/>
      <rect x="90" y="246" width="16" height="10" rx="2" fill="#B0B0B0"/>
      <rect x="110" y="246" width="16" height="10" rx="2" fill="#B0B0B0"/>
      <rect x="130" y="246" width="16" height="10" rx="2" fill="#B0B0B0"/>
      <rect x="150" y="246" width="16" height="10" rx="2" fill="#B0B0B0"/>
      <rect x="170" y="246" width="16" height="10" rx="2" fill="#B0B0B0"/>
      <rect x="190" y="246" width="16" height="10" rx="2" fill="#B0B0B0"/>
      <rect x="210" y="246" width="16" height="10" rx="2" fill="#B0B0B0"/>
      <rect x="230" y="246" width="16" height="10" rx="2" fill="#B0B0B0"/>
      <rect x="250" y="246" width="16" height="10" rx="2" fill="#B0B0B0"/>
      <rect x="270" y="246" width="50" height="10" rx="2" fill="#B0B0B0"/>
      <rect x="74" y="260" width="22" height="10" rx="2" fill="#B0B0B0"/>
      <rect x="100" y="260" width="14" height="10" rx="2" fill="#B0B0B0"/>
      <rect x="118" y="260" width="14" height="10" rx="2" fill="#B0B0B0"/>
      <rect x="136" y="260" width="80" height="10" rx="2" fill="#B0B0B0"/>
      <rect x="220" y="260" width="14" height="10" rx="2" fill="#B0B0B0"/>
      <rect x="238" y="260" width="14" height="10" rx="2" fill="#B0B0B0"/>
      <!-- Trackpad -->
      <rect x="160" y="274" width="80" height="20" rx="5" fill="#BDBDBD"/>`;

    // GAMES - console PS5 / Xbox
    const gamesSVG = `
      <defs>
        <linearGradient id="consoleG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1a1a2e"/>
          <stop offset="100%" stop-color="#0d0d1a"/>
        </linearGradient>
      </defs>
      <!-- Sombra -->
      <ellipse cx="200" cy="316" rx="90" ry="10" fill="#00000044"/>
      <!-- Corpo do controle -->
      <path d="M128 210 Q108 200 102 176 Q96 152 110 136 Q124 120 148 118 L170 118 Q180 108 200 108 Q220 108 230 118 L252 118 Q276 120 290 136 Q304 152 298 176 Q292 200 272 210 L248 228 Q224 248 200 250 Q176 248 152 228 Z" fill="#1a1a1a" stroke="#2a2a2a" stroke-width="2"/>
      <!-- Painel esquerdo (analógico + D-pad) -->
      <circle cx="152" cy="172" r="20" fill="#111" stroke="#333" stroke-width="1.5"/>
      <circle cx="152" cy="172" r="12" fill="#1e1e1e"/>
      <circle cx="152" cy="172" r="5" fill="#333"/>
      <!-- D-pad -->
      <rect x="126" y="196" width="28" height="9" rx="2" fill="#111" stroke="#333" stroke-width="1"/>
      <rect x="134" y="188" width="9" height="28" rx="2" fill="#111" stroke="#333" stroke-width="1"/>
      <circle cx="140.5" cy="200.5" r="5" fill="#1e1e1e"/>
      <!-- Painel direito - botões coloridos -->
      <circle cx="256" cy="175" r="11" fill="#E53935" stroke="#c62828" stroke-width="1"/>
      <text x="256" y="179" font-size="9" text-anchor="middle" fill="white" font-weight="bold">○</text>
      <circle cx="238" cy="193" r="11" fill="#43A047" stroke="#2e7d32" stroke-width="1"/>
      <text x="238" y="197" font-size="9" text-anchor="middle" fill="white" font-weight="bold">△</text>  
      <circle cx="274" cy="193" r="11" fill="#1E88E5" stroke="#1565c0" stroke-width="1"/>
      <text x="274" y="197" font-size="9" text-anchor="middle" fill="white" font-weight="bold">□</text>
      <circle cx="256" cy="211" r="11" fill="#FB8C00" stroke="#e65100" stroke-width="1"/>
      <text x="256" y="215" font-size="9" text-anchor="middle" fill="white" font-weight="bold">✕</text>
      <!-- Analógico direito -->
      <circle cx="228" cy="163" r="20" fill="#111" stroke="#333" stroke-width="1.5"/>
      <circle cx="228" cy="163" r="12" fill="#1e1e1e"/>
      <circle cx="228" cy="163" r="5" fill="#333"/>
      <!-- Botões centrais -->
      <rect x="183" y="158" width="16" height="10" rx="3" fill="#111" stroke="#333" stroke-width="1"/>
      <rect x="201" y="158" width="16" height="10" rx="3" fill="#111" stroke="#333" stroke-width="1"/>
      <circle cx="200" cy="148" r="10" fill="#EA80FC44" stroke="#EA80FC" stroke-width="1.5"/>
      <!-- Gatilhos -->
      <path d="M128 136 Q120 128 118 116 Q120 108 130 110 L150 118" fill="#111" stroke="#333" stroke-width="1.5"/>
      <path d="M272 136 Q280 128 282 116 Q280 108 270 110 L250 118" fill="#111" stroke="#333" stroke-width="1.5"/>
      <!-- LED -->
      <rect x="164" y="200" width="72" height="4" rx="2" fill="${bc.accent}66"/>`;

    // FONE DE OUVIDO
    const fonesSVG = `
      <defs>
        <linearGradient id="foneG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1a2a2a"/>
          <stop offset="100%" stop-color="#001520"/>
        </linearGradient>
      </defs>
      <!-- Sombra -->
      <ellipse cx="200" cy="308" rx="70" ry="10" fill="#00000033"/>
      <!-- Arco headband -->
      <path d="M120 200 Q120 80 200 72 Q280 80 280 200" fill="none" stroke="#1a1a1a" stroke-width="30" stroke-linecap="round"/>
      <path d="M120 200 Q120 80 200 72 Q280 80 280 200" fill="none" stroke="${bc.primary}" stroke-width="26" stroke-linecap="round"/>
      <path d="M120 200 Q120 80 200 72 Q280 80 280 200" fill="none" stroke="${bc.accent}33" stroke-width="20" stroke-linecap="round"/>
      <!-- Almofada headband -->
      <path d="M152 148 Q200 128 248 148" fill="none" stroke="#2a2a2a" stroke-width="12" stroke-linecap="round"/>
      <!-- Driver esquerdo -->
      <ellipse cx="108" cy="212" rx="36" ry="52" fill="${bc.primary}" stroke="#333" stroke-width="2"/>
      <ellipse cx="108" cy="212" rx="28" ry="42" fill="#1a1a1a" stroke="#222" stroke-width="1"/>
      <ellipse cx="108" cy="212" rx="20" ry="30" fill="#111"/>
      <ellipse cx="108" cy="212" rx="12" ry="18" fill="#0a0a0a"/>
      <circle cx="102" cy="204" r="5" fill="${bc.accent}44"/>
      <!-- Driver direito -->
      <ellipse cx="292" cy="212" rx="36" ry="52" fill="${bc.primary}" stroke="#333" stroke-width="2"/>
      <ellipse cx="292" cy="212" rx="28" ry="42" fill="#1a1a1a" stroke="#222" stroke-width="1"/>
      <ellipse cx="292" cy="212" rx="20" ry="30" fill="#111"/>
      <ellipse cx="292" cy="212" rx="12" ry="18" fill="#0a0a0a"/>
      <circle cx="286" cy="204" r="5" fill="${bc.accent}44"/>
      <!-- Logo na orelha direita -->
      <text x="292" y="218" font-size="16" text-anchor="middle" fill="${bc.accent}" opacity="0.7">${safeB.slice(0,1)}</text>
      <!-- Controles no driver esquerdo -->
      <circle cx="94" cy="232" r="5" fill="#333"/>
      <circle cx="106" cy="238" r="5" fill="#333"/>
      <circle cx="118" cy="232" r="5" fill="#333"/>
      <!-- Cabo -->
      <path d="M144 258 Q200 280 200 300" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/>`;

    // SMARTWATCH
    const smartwatchSVG = `
      <defs>
        <linearGradient id="watchG" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${bc.accent}cc"/>
          <stop offset="50%" stop-color="${bc.accent}44"/>
          <stop offset="100%" stop-color="#110010"/>
        </linearGradient>
      </defs>
      <!-- Pulseira superior -->
      <rect x="168" y="36" width="64" height="60" rx="14" fill="${bc.primary}"/>
      <rect x="172" y="40" width="56" height="52" rx="12" fill="#1a1a1a"/>
      <!-- Pulseira inferior -->
      <rect x="168" y="270" width="64" height="72" rx="14" fill="${bc.primary}"/>
      <rect x="172" y="274" width="56" height="64" rx="12" fill="#1a1a1a"/>
      <!-- Coroa do relógio -->
      <rect x="248" y="162" width="14" height="44" rx="7" fill="${bc.primary}"/>
      <rect x="250" y="164" width="10" height="40" rx="5" fill="#2a2a2a"/>
      <!-- Corpo do relógio -->
      <rect x="134" y="96" width="132" height="166" rx="34" fill="${bc.primary}" stroke="${bc.primary}" stroke-width="2"/>
      <!-- Bezel interno -->
      <rect x="138" y="100" width="124" height="158" rx="32" fill="#1a1a1a"/>
      <!-- Tela -->
      <rect x="142" y="104" width="116" height="150" rx="30" fill="#050510"/>
      <rect x="142" y="104" width="116" height="150" rx="30" fill="url(#watchG)"/>
      <!-- Conteúdo da tela -->
      <!-- Hora grande -->
      <text x="200" y="170" font-family="Arial" font-size="36" font-weight="900" fill="white" text-anchor="middle">12:00</text>
      <!-- Data -->
      <text x="200" y="188" font-family="Arial" font-size="11" fill="#ffffffaa" text-anchor="middle">SEG, 6 MAR</text>
      <!-- Linha divisória -->
      <line x1="156" y1="198" x2="244" y2="198" stroke="#ffffff22" stroke-width="1"/>
      <!-- Métricas -->
      <text x="168" y="218" font-family="Arial" font-size="10" fill="${bc.accent}cc" text-anchor="middle">❤️ 72</text>
      <text x="200" y="218" font-family="Arial" font-size="10" fill="${bc.accent}cc" text-anchor="middle">🔥 340</text>
      <text x="232" y="218" font-family="Arial" font-size="10" fill="${bc.accent}cc" text-anchor="middle">👟 8k</text>
      <!-- Indicadores -->
      <rect x="156" y="228" width="88" height="8" rx="4" fill="#ffffff22"/>
      <rect x="156" y="228" width="62" height="8" rx="4" fill="${bc.accent}99"/>
      <text x="252" y="235" font-family="Arial" font-size="9" fill="#ffffff88" text-anchor="middle">70%</text>`;

    // CÂMERA
    const cameraSVG = `
      <defs>
        <radialGradient id="lensG" cx="38%" cy="35%">
          <stop offset="0%" stop-color="#90CAF9"/>
          <stop offset="30%" stop-color="#1565C0"/>
          <stop offset="70%" stop-color="#0D47A1"/>
          <stop offset="100%" stop-color="#01579B"/>
        </radialGradient>
        <radialGradient id="lensR" cx="30%" cy="30%">
          <stop offset="0%" stop-color="#ffffff55"/>
          <stop offset="100%" stop-color="transparent"/>
        </radialGradient>
      </defs>
      <!-- Sombra -->
      <ellipse cx="200" cy="316" rx="90" ry="10" fill="#00000033"/>
      <!-- Corpo da câmera -->
      <rect x="88" y="100" width="224" height="166" rx="16" fill="#1a1a1a" stroke="#2a2a2a" stroke-width="2"/>
      <!-- Grip -->
      <rect x="88" y="100" width="54" height="166" rx="16" fill="#111"/>
      <rect x="92" y="116" width="12" height="134" rx="6" fill="#222"/>
      <rect x="108" y="116" width="8" height="134" rx="4" fill="#1a1a1a"/>
      <!-- Topo da câmera -->
      <rect x="142" y="90" width="80" height="20" rx="8" fill="#111" stroke="#222" stroke-width="1"/>
      <!-- Hot shoe -->
      <rect x="168" y="86" width="32" height="8" rx="2" fill="#222"/>
      <!-- Flash popup -->
      <rect x="196" y="70" width="44" height="28" rx="6" fill="#111" stroke="#222" stroke-width="1"/>
      <rect x="200" y="74" width="36" height="20" rx="4" fill="#FFE0B2" opacity="0.6"/>
      <!-- Lente principal - círculos concêntricos -->
      <circle cx="214" cy="178" r="64" fill="#111" stroke="#333" stroke-width="3"/>
      <circle cx="214" cy="178" r="58" fill="#0a0a0a" stroke="#222" stroke-width="2"/>
      <circle cx="214" cy="178" r="50" fill="url(#lensG)"/>
      <circle cx="214" cy="178" r="50" fill="url(#lensR)"/>
      <circle cx="214" cy="178" r="36" fill="#0D47A1"/>
      <circle cx="214" cy="178" r="24" fill="#0a1a3a"/>
      <circle cx="214" cy="178" r="12" fill="#050a14"/>
      <!-- Reflexo na lente -->
      <ellipse cx="200" cy="164" rx="12" ry="8" fill="white" opacity="0.15"/>
      <!-- Botão disparador -->
      <circle cx="118" cy="108" r="14" fill="#333" stroke="#444" stroke-width="1"/>
      <circle cx="118" cy="108" r="10" fill="#2a2a2a"/>
      <!-- Modo dial -->
      <circle cx="262" cy="108" r="16" fill="#222" stroke="#333" stroke-width="1"/>
      <circle cx="262" cy="108" r="10" fill="#1a1a1a"/>
      <text x="262" y="112" font-size="8" text-anchor="middle" fill="#888">M</text>
      <!-- Visor -->
      <rect x="218" y="100" width="62" height="32" rx="6" fill="#111"/>
      <rect x="222" y="104" width="54" height="24" rx="4" fill="#050510"/>
      <!-- LCD traseiro simulado no corpo -->
      <rect x="148" y="140" width="54" height="40" rx="6" fill="#111"/>
      <rect x="152" y="144" width="46" height="32" rx="4" fill="#001a00"/>
      <text x="175" y="163" font-family="Arial" font-size="9" fill="#00FF00" text-anchor="middle">1/250s</text>
      <text x="175" y="173" font-family="Arial" font-size="9" fill="#00FF00" text-anchor="middle">f/1.8</text>`;

    // MÓVEL - sofá/cadeira gamer
    const movelisSVG = `
      <defs>
        <linearGradient id="sofaG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#8D6E63"/>
          <stop offset="100%" stop-color="#6D4C41"/>
        </linearGradient>
      </defs>
      <!-- Sombra -->
      <ellipse cx="200" cy="326" rx="110" ry="10" fill="#00000033"/>
      <!-- Pés traseiros -->
      <rect x="108" y="272" width="18" height="58" rx="6" fill="#5D4037"/>
      <rect x="274" y="272" width="18" height="58" rx="6" fill="#5D4037"/>
      <!-- Base do assento -->
      <rect x="92" y="192" width="216" height="80" rx="16" fill="url(#sofaG)"/>
      <!-- Almofada do assento -->
      <rect x="100" y="186" width="200" height="72" rx="14" fill="#A1887F"/>
      <rect x="108" y="190" width="80" height="60" rx="10" fill="#9E8070"/>
      <rect x="212" y="190" width="80" height="60" rx="10" fill="#9E8070"/>
      <!-- Divisória do assento -->
      <rect x="196" y="192" width="8" height="68" rx="4" fill="#795548"/>
      <!-- Encosto -->
      <rect x="88" y="114" width="224" height="98" rx="18" fill="url(#sofaG)"/>
      <!-- Almofada do encosto -->
      <rect x="96" y="120" width="208" height="86" rx="14" fill="#A1887F"/>
      <rect x="104" y="126" width="80" height="72" rx="10" fill="#9E8070"/>
      <rect x="216" y="126" width="80" height="72" rx="10" fill="#9E8070"/>
      <!-- Cabeçote -->
      <rect x="108" y="92" width="80" height="44" rx="14" fill="#BCAAA4"/>
      <rect x="212" y="92" width="80" height="44" rx="14" fill="#BCAAA4"/>
      <!-- Braços do sofá -->
      <rect x="80" y="152" width="36" height="116" rx="16" fill="#8D6E63"/>
      <rect x="284" y="152" width="36" height="116" rx="16" fill="#8D6E63"/>
      <!-- Pés dianteiros -->
      <rect x="110" y="272" width="18" height="44" rx="6" fill="#5D4037"/>
      <rect x="272" y="272" width="18" height="44" rx="6" fill="#5D4037"/>
      <!-- Textura -->
      <line x1="100" y1="145" x2="100" y2="265" stroke="#6D4C41" stroke-width="1" opacity="0.4"/>
      <line x1="300" y1="145" x2="300" y2="265" stroke="#6D4C41" stroke-width="1" opacity="0.4"/>`;

    // TABLET
    const tabletSVG = `
      <defs>
        <linearGradient id="tabScreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bc.accent}55"/>
          <stop offset="100%" stop-color="#001030"/>
        </linearGradient>
      </defs>
      <!-- Sombra -->
      <ellipse cx="200" cy="340" rx="82" ry="8" fill="#00000033"/>
      <!-- Corpo do tablet -->
      <rect x="118" y="36" width="164" height="298" rx="20" fill="${bc.primary}"/>
      <!-- Borda interna -->
      <rect x="122" y="40" width="156" height="290" rx="18" fill="#111"/>
      <!-- Tela -->
      <rect x="128" y="54" width="144" height="262" rx="12" fill="#050510"/>
      <rect x="128" y="54" width="144" height="262" rx="12" fill="url(#tabScreen)"/>
      <!-- Status bar -->
      <rect x="128" y="54" width="144" height="18" rx="12" fill="#00000066"/>
      <circle cx="200" cy="63" r="4" fill="#1a1a1a"/>
      <circle cx="200" cy="63" r="2" fill="#050510"/>
      <!-- App grid -->
      <rect x="136" y="80" width="28" height="28" rx="8" fill="#FF3B30cc"/>
      <rect x="172" y="80" width="28" height="28" rx="8" fill="#34C759cc"/>
      <rect x="208" y="80" width="28" height="28" rx="8" fill="#007AFFcc"/>
      <rect x="244" y="80" width="20" height="28" rx="8" fill="#FF9500cc"/>
      <rect x="136" y="116" width="28" height="28" rx="8" fill="#5856D6cc"/>
      <rect x="172" y="116" width="28" height="28" rx="8" fill="#FF2D55cc"/>
      <rect x="208" y="116" width="28" height="28" rx="8" fill="#00C7BEcc"/>
      <rect x="244" y="116" width="20" height="28" rx="8" fill="#FFD60Acc"/>
      <!-- Widget -->
      <rect x="136" y="152" width="128" height="70" rx="12" fill="#ffffff11"/>
      <rect x="144" y="160" width="70" height="10" rx="5" fill="#ffffff55"/>
      <rect x="144" y="176" width="50" height="8" rx="4" fill="#ffffff33"/>
      <text x="200" y="210" font-family="Arial" font-size="26" font-weight="900" fill="white" text-anchor="middle" opacity="0.8">12:00</text>
      <!-- Dock inferior -->
      <rect x="136" y="284" width="128" height="24" rx="12" fill="#ffffff11"/>
      <rect x="144" y="288" width="20" height="16" rx="5" fill="#007AFFcc"/>
      <rect x="168" y="288" width="20" height="16" rx="5" fill="#34C759cc"/>
      <rect x="192" y="288" width="20" height="16" rx="5" fill="#FF9500cc"/>
      <rect x="216" y="288" width="20" height="16" rx="5" fill="#5856D6cc"/>
      <!-- Home bar -->
      <rect x="172" y="310" width="56" height="4" rx="2" fill="#ffffff66"/>
      <!-- Botão power -->
      <rect x="280" y="138" width="5" height="48" rx="2.5" fill="#ffffff44"/>
      <!-- Volume -->
      <rect x="118" y="112" width="5" height="32" rx="2.5" fill="#ffffff33"/>
      <rect x="118" y="150" width="5" height="32" rx="2.5" fill="#ffffff33"/>`;

    // Seleciona o drawing correto baseado na categoria
    const catDrawings = {
      'Celulares': celularSVG,
      'Eletrodomésticos': geladeiraSVG,
      'TV e Vídeo': tvSVG,
      'Informática': notebookSVG,
      'Games': gamesSVG,
      'Fones': fonesSVG,
      'Smartwatches': smartwatchSVG,
      'Câmeras': cameraSVG,
      'Móveis': movelisSVG,
      'Tablets': tabletSVG,
    };
    const drawing = catDrawings[cat] || celularSVG;

    // Word-wrap  
    const words = safeN.split(' ');
    let lines = ['','',''];
    let li = 0;
    for(const w of words){
      if(li < 2 && (lines[li]+' '+w).trim().length > 28){ li++; }
      if(li < 3) lines[li] = (lines[li]+' '+w).trim();
    }
    lines = lines.filter(Boolean);
    if(lines[2] && lines[2].length > 24) lines[2] = lines[2].slice(0,23)+'…';
    const baseY = 288;
    const nameLines = lines.map((ln,i)=>
      `<text x="200" y="${baseY+i*16}" font-family="Arial,sans-serif" font-size="${i===0?13:12}" font-weight="${i===0?'800':'600'}" fill="${i===0?'#fff':'#bbb'}" text-anchor="middle">${ln}</text>`
    ).join('');

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
<rect width="400" height="400" fill="${th.bg1}"/>
<defs>
  <radialGradient id="bgG" cx="50%" cy="40%">
    <stop offset="0%" stop-color="${th.acc}18"/>
    <stop offset="100%" stop-color="${th.bg1}"/>
  </radialGradient>
</defs>
<rect width="400" height="400" fill="url(#bgG)"/>
${drawing}
<rect x="0" y="270" width="400" height="130" fill="${th.bg1}F0"/>
<line x1="0" y1="271" x2="400" y2="271" stroke="${th.acc}44" stroke-width="1"/>
<text x="200" y="285" font-family="Arial,sans-serif" font-size="10" font-weight="900" fill="${th.acc}" text-anchor="middle" letter-spacing="3" opacity="0.9">${safeB.toUpperCase()}</text>
${nameLines}
<rect x="104" y="${baseY + lines.length*16 + 6}" width="192" height="36" rx="18" fill="${th.acc}22" stroke="${th.acc}66" stroke-width="1.5"/>
<text x="200" y="${baseY + lines.length*16 + 28}" font-family="Arial,sans-serif" font-size="15" font-weight="900" fill="${th.acc}" text-anchor="middle">R$ ${pixPrice}</text>
<rect x="300" y="8" width="88" height="30" rx="10" fill="#E53935" opacity="0.95"/>
<text x="344" y="27" font-family="Arial,sans-serif" font-size="14" font-weight="900" fill="white" text-anchor="middle">-${disc}%</text>
</svg>`;

    cors(res);
    res.writeHead(200,{'Content-Type':'image/svg+xml','Cache-Control':'public,max-age=3600'});
    res.end(svg);
    return;
  }


  // ── IMAGE PROXY ──
  if (method==='GET' && p==='/img') {
    const imgUrl = q.url;
    if (!imgUrl) { res.writeHead(400); res.end('no url'); return; }
    try {
      const pu = new URL(imgUrl);
      const lib = pu.protocol==='https:' ? https : require('http');
      const opts = {
        hostname: pu.hostname, path: pu.pathname + pu.search,
        headers: { 'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120', 'Accept':'image/*,*/*', 'Referer':'https://www.google.com/' }
      };
      const pr = lib.get(opts, (ps) => {
        if (ps.statusCode===301||ps.statusCode===302) {
          res.writeHead(302,{'Location':'/img?url='+encodeURIComponent(ps.headers['location']||'')});
          res.end(); return;
        }
        cors(res);
        res.writeHead(ps.statusCode===200?200:404, {'Content-Type': ps.headers['content-type']||'image/jpeg','Cache-Control':'public,max-age=86400'});
        if (ps.statusCode===200) ps.pipe(res); else res.end();
      });
      pr.on('error', ()=>{ res.writeHead(502); res.end(); });
    } catch(e) { res.writeHead(400); res.end('bad url'); }
    return;
  }

  // ── CATALOG API ──
  if (method==='GET' && p.startsWith('/api/catalog/')) {
    const cid = p.split('/')[3];
    const item = CATALOG.find(c=>c.id===cid);
    if (!item) return jsonResp(res,{error:'Não encontrado'},404);

    const pr  = Math.round(item.price * 100)/100;
    const or2 = Math.round(item.orig  * 100)/100;

    // Use real per-product colors and storages from catalog
    const colors   = item.colors   || ['único'];
    const storages = item.storages || ['único'];

    // Category-specific labels
    const catLabels = {
      'Celulares':{'colorLabel':'Cor','storageLabel':'Armazenamento interno'},
      'Eletrodomésticos':{'colorLabel':'Cor / Acabamento','storageLabel':'Capacidade'},
      'TV e Vídeo':{'colorLabel':'Cor','storageLabel':'Tamanho'},
      'Informática':{'colorLabel':'Cor','storageLabel':'Armazenamento'},
      'Games':{'colorLabel':'Cor','storageLabel':'Edição'},
      'Câmeras':{'colorLabel':'Cor','storageLabel':'Kit'},
      'Móveis':{'colorLabel':'Cor','storageLabel':'Tamanho'},
      'Fones':{'colorLabel':'Cor','storageLabel':'Versão'},
      'Smartwatches':{'colorLabel':'Cor','storageLabel':'Tamanho'},
      'Tablets':{'colorLabel':'Cor','storageLabel':'Armazenamento'},
    };
    const lbl = catLabels[item.cat] || {colorLabel:'Cor',storageLabel:'Versão'};

    // Build variants with correct price rounding
    const variants = {};
    colors.forEach((col,ci) => {
      storages.forEach((sto,si) => {
        const mult = 1 + (ci*0.02) + (si*0.10);
        variants[col+'-'+sto] = {
          price:         Math.round(pr  * mult * 100)/100,
          originalPrice: Math.round(or2 * mult * 100)/100,
          stock:         Math.max(1, item.stock - ci),
          sku:           cid+'-'+col.slice(0,2).toUpperCase()+'-'+sto
        };
      });
    });

    // Build images: use item.imgs[color] if available, fallback to item.img
    const images = {};
    colors.forEach(col => {
      storages.forEach(sto => {
        const colorImg = (item.imgs && item.imgs[col]) ? item.imgs[col] : item.img;
        images[col+'-'+sto] = colorImg;
      });
    });

    // Also expose flat color->image map for quick lookup
    const colorImgs = {};
    colors.forEach(col => {
      colorImgs[col] = (item.imgs && item.imgs[col]) ? item.imgs[col] : item.img;
    });

    return jsonResp(res,{
      id:item.id, name:item.name, brand:item.brand, category:item.cat,
      colorLabel:lbl.colorLabel, storageLabel:lbl.storageLabel,
      images, colorImgs, colors, storages, variants,
      rating:item.rating, reviewCount:item.reviews,
      specs: item.specs || {'Marca':item.brand,'Categoria':item.cat,'Garantia':'12 meses'}
    });
  }

  // ── HEALTH CHECK (Railway) ──
  if (p==='/health'||p==='/healthz'||p==='/ping') {
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('OK'); return;
  }

  // ── ROTAS HTML ──
  if (method==='GET' && p==='/login')      return htmlResp(res, pageLogin());
  if (method==='GET' && p==='/favoritos')  return htmlResp(res, pageFavoritos(token));
  if (method==='GET' && p==='/sacola')     return htmlResp(res, pageSacola(token));
  if (method==='GET' && p==='/conta')      return htmlResp(res, pageConta(token));
  if (method==='GET' && (p==='/busca' || p==='/busca/')) {
    return htmlResp(res, pageBusca(q.q||'', q.cat||'', token));
  }

  // ── AUTH ROUTES ──
  if (method==='POST' && p==='/api/auth/register') {
    const body = await readBody(req);
    const {name,email,password} = body;
    if (!name||!email||!password) return jsonResp(res,{error:'Preencha todos os campos'},400);
    if (users[email]) return jsonResp(res,{error:'E-mail já cadastrado'},400);
    const id = 'U-'+Date.now();
    const t  = genToken();
    users[email] = {id,name,email,password,provider:'email',avatar:'',createdAt:new Date().toISOString()};
    sessions[t]  = email;
    carts[t]     = [];
    favorites[t] = [];
    return jsonResp(res,{success:true,token:t,user:{id,name,email}});
  }

  if (method==='POST' && p==='/api/auth/login') {
    const body = await readBody(req);
    const {email,password} = body;
    const user = users[email];
    if (!user||user.password!==password) return jsonResp(res,{error:'E-mail ou senha incorretos'},401);
    const t = genToken();
    sessions[t] = email;
    if (!carts[t])     carts[t]=[];
    if (!favorites[t]) favorites[t]=[];
    return jsonResp(res,{success:true,token:t,user:{id:user.id,name:user.name,email}});
  }

  if (method==='GET' && p==='/api/auth/me') {
    const token = getToken(req);
    const user = getUserByToken(token);
    if(!user) return jsonResp(res,{error:'Não autenticado'},401);
    return jsonResp(res,{user:{name:user.name,email:user.email,avatar:user.avatar||''}});
  }

    if (method==='POST' && p==='/api/auth/google') {
    const body = await readBody(req);
    const {name,email,avatar} = body;
    if (!name||!email) return jsonResp(res,{error:'Dados incompletos'},400);
    if (!users[email]) {
      users[email] = {id:'G-'+Date.now(),name,email,password:'',provider:'google',avatar:avatar||'',createdAt:new Date().toISOString()};
    }
    const t = genToken();
    sessions[t]  = email;
    if (!carts[t])     carts[t]=[];
    if (!favorites[t]) favorites[t]=[];
    return jsonResp(res,{success:true,token:t,user:{id:users[email].id,name,email}});
  }

  // ── FAVORITOS ──
  if (method==='POST' && p==='/api/fav/toggle') {
    const body = await readBody(req);
    const {token:tk,productId} = body;
    if (!tk||!productId) return jsonResp(res,{error:'Dados incompletos'},400);
    if (!favorites[tk]) favorites[tk]=[];
    const idx = favorites[tk].indexOf(productId);
    let added;
    if (idx===-1) { favorites[tk].push(productId); added=true; }
    else          { favorites[tk].splice(idx,1);    added=false; }
    return jsonResp(res,{success:true,added});
  }

  // ── CARRINHO ──
  if (method==='GET' && p.startsWith('/api/cart/')) {
    const tk = p.split('/')[3];
    const cart = carts[tk]||[];
    return jsonResp(res,{cart});
  }
  if (method==='POST' && p==='/api/cart/add') {
    const body = await readBody(req);
    const {token:tk,productId,color,storage} = body;
    if (!tk) return jsonResp(res,{error:'Não autenticado'},401);
    if (!carts[tk]) carts[tk]=[];
    const prod = CATALOG.find(p=>p.id===productId);
    if (!prod) return jsonResp(res,{error:'Produto não encontrado'},404);
    const existing = carts[tk].find(i=>i.id===productId);
    if (existing) existing.qty++;
    else carts[tk].push({id:prod.id,name:prod.name,price:prod.price,img:prod.img,color:color||'',storage:storage||'',qty:1});
    return jsonResp(res,{success:true,cart:carts[tk]});
  }
  if (method==='POST' && p==='/api/cart/qty') {
    const body = await readBody(req);
    const {token:tk,index,delta} = body;
    if (!carts[tk]||carts[tk][index]===undefined) return jsonResp(res,{error:'Não encontrado'},404);
    carts[tk][index].qty = Math.max(1, carts[tk][index].qty + delta);
    return jsonResp(res,{success:true,cart:carts[tk]});
  }
  if (method==='POST' && p==='/api/cart/remove') {
    const body = await readBody(req);
    const {token:tk,index} = body;
    if (!carts[tk]) return jsonResp(res,{error:'Não encontrado'},404);
    carts[tk].splice(index,1);
    return jsonResp(res,{success:true,cart:carts[tk]});
  }

  // ── CHECKOUT ──
  if (method==='POST' && p==='/api/checkout') {
    const body = await readBody(req);
    const tk   = body.token || token;
    const cart = carts[tk];
    if (!cart||cart.length===0) return jsonResp(res,{error:'Carrinho vazio'},400);
    const total    = cart.reduce((s,i)=>s+i.price*i.qty,0);
    const orderId  = 'ORD-'+Date.now();
    const order    = {id:orderId,userToken:tk,items:[...cart],total,status:'pending',createdAt:new Date().toISOString(),paymentLink:`/pay/${orderId}`};
    orders.push(order);
    carts[tk] = [];
    return jsonResp(res,{success:true,order});
  }

  // ── PAY PAGE ──
  if (method==='GET' && p.startsWith('/pay/')) {
    const orderId = p.split('/')[2];
    const order   = orders.find(o=>o.id===orderId);
    if (!order) { htmlResp(res,'<h2>Pedido não encontrado</h2>'); return; }
    const isDemo = PAYMENT_LINKS.cartao.includes('SEU-LINK');
    htmlResp(res,`<!DOCTYPE html><html lang="pt-br"><head><meta charset="utf-8"/><title>Pagamento | Magalu</title>
    <style>@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}body{font-family:'Nunito',sans-serif;background:#f0f3f6;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:20px}
    .card{background:#fff;border-radius:16px;padding:32px;max-width:480px;width:100%;box-shadow:0 4px 24px rgba(0,0,0,.1)}
    h2{color:#0086ff;margin-bottom:16px;font-size:1.3rem}
    .item{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #eee;font-size:14px}
    .total{font-weight:900;font-size:1.1rem;padding:14px 0;display:flex;justify-content:space-between}
    .methods{display:flex;flex-direction:column;gap:10px;margin-top:16px}
    button{width:100%;border:none;border-radius:10px;padding:14px;font-family:inherit;font-size:15px;font-weight:800;cursor:pointer;transition:opacity .2s}
    button:hover{opacity:.88}.btn-card{background:#0086ff;color:#fff}.btn-pix{background:#00a650;color:#fff}.btn-boleto{background:#fff;color:#333;border:2px solid #ddd!important}
    .msg{text-align:center;color:#00a650;font-weight:800;margin-top:16px;display:none}.pid{font-size:12px;color:#767676;margin-bottom:16px}</style></head>
    <body><div class="card">
    <h2>🛒 Resumo do Pedido</h2>
    <div class="pid">Pedido: <strong>${order.id}</strong></div>
    ${order.items.map(i=>`<div class="item"><span>${i.name} ×${i.qty}</span><span>R$ ${(i.price*i.qty).toLocaleString('pt-BR',{minimumFractionDigits:2})}</span></div>`).join('')}
    <div class="total"><span>Total</span><span>R$ ${order.total.toLocaleString('pt-BR',{minimumFractionDigits:2})}</span></div>
    <div class="methods">
      <button class="btn-card" onclick="pay('cartao')">💳 Cartão — até 12x sem juros</button>
      <button class="btn-pix" onclick="pay('pix')">⚡ PIX — 5% de desconto</button>
      <button class="btn-boleto" onclick="pay('boleto')">📄 Boleto Bancário</button>
    </div><div class="msg" id="msg"></div></div>
    <script>
    const L=${JSON.stringify(PAYMENT_LINKS)};
    function pay(m){
      if(!L[m].includes('SEU-LINK')){location.href=L[m];return;}
      const msgs={cartao:'✅ Pagamento no cartão confirmado!',pix:'✅ PIX recebido! Pedido em preparo.',boleto:'📄 Boleto gerado!'};
      document.getElementById('msg').textContent=msgs[m];document.getElementById('msg').style.display='block';
      document.querySelectorAll('button').forEach(b=>b.disabled=true);
    }
    </script></body></html>`);
    return;
  }

  // ── PRODUCT API ──
  if (method==='GET' && p==='/api/search') {
    return jsonResp(res,{results:searchCatalog(q.q||'',q.cat||''),total:CATALOG.length});
  }

  // ── FRETE ──
  if (method==='POST' && p==='/api/frete') {
    const body = await readBody(req);
    const cepLimpo = (body.cep||'').replace(/\D/g,'');
    if (cepLimpo.length!==8) return jsonResp(res,{error:'CEP inválido'},400);
    try {
      const viaCep = await new Promise((resolve,reject)=>{
        https.get(`https://viacep.com.br/ws/${cepLimpo}/json/`,(r)=>{
          let d=''; r.on('data',c=>d+=c);
          r.on('end',()=>{try{resolve(JSON.parse(d));}catch{reject(new Error('parse'));}});
        }).on('error',reject);
      });
      if (viaCep.erro) return jsonResp(res,{error:'CEP não encontrado'},404);
      const tab = FRETE[viaCep.uf]||{pac:35.9,sedex:55.9,prazo_pac:12,prazo_sedex:6};
      const total = parseFloat(body.total)||0;
      const gratis = total>=299;
      return jsonResp(res,{success:true,
        endereco:{cep:viaCep.cep,logradouro:viaCep.logradouro,bairro:viaCep.bairro,cidade:viaCep.localidade,uf:viaCep.uf},
        opcoes:[
          {tipo:'PAC',     descricao:'PAC (Correios)',     preco:gratis?0:tab.pac,  prazo:tab.prazo_pac,   gratis, icone:'📦'},
          {tipo:'SEDEX',   descricao:'SEDEX',              preco:tab.sedex,         prazo:tab.prazo_sedex, gratis:false, icone:'⚡'},
          {tipo:'SEDEX10', descricao:'SEDEX 10 (até 10h)',preco:tab.sedex*1.6,     prazo:tab.prazo_sedex, gratis:false, icone:'🚀'},
        ]
      });
    } catch(e) { return jsonResp(res,{error:'Erro ao consultar CEP'},500); }
  }

  // ── HOME ──
  if (method==='GET' && p==='/') {
    return htmlResp(res, pageHome(token));
  }
  // ── PRODUTO PRINCIPAL (produto.html) ──
  if (method==='GET' && (p==='/produto.html'||p==='/index.html')) {
    const file = path.join(__dirname,'produto.html');
    if (fs.existsSync(file)) {
      cors(res); res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
      fs.createReadStream(file).pipe(res); return;
    }
  }

  // ── ARQUIVOS ESTÁTICOS ──
  const mimes2={'.html':'text/html;charset=utf-8','.css':'text/css','.js':'application/javascript','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.ico':'image/x-icon','.json':'application/json'};
  const fullPath = path.join(__dirname, p==='/'?'produto.html':p);
  const ext2 = path.extname(fullPath);
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
    cors(res); res.writeHead(200,{'Content-Type':mimes2[ext2]||'application/octet-stream'});
    fs.createReadStream(fullPath).pipe(res); return;
  }

  jsonResp(res,{error:'Rota não encontrada'},404);
});

server.listen(PORT, '0.0.0.0', ()=>{
  console.log('');
  console.log('✅ Servidor rodando em http://localhost:'+PORT);
  console.log('');
  console.log('📄 Produto:    http://localhost:'+PORT+'/produto.html');
  console.log('🔍 Busca:      http://localhost:'+PORT+'/busca?q=iphone');
  console.log('📦 Categorias: http://localhost:'+PORT+'/busca?cat=Celulares');
  console.log('🛒 Sacola:     http://localhost:'+PORT+'/sacola');
  console.log('❤️  Favoritos:  http://localhost:'+PORT+'/favoritos');
  console.log('👤 Login:      http://localhost:'+PORT+'/login');
  console.log('');
});
