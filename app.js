// ============================================================
// MAGALU CLONE - app.js v3.1
// Imagens reais via Unsplash (garantido) + descontos arrasadores
// ============================================================

const PRODUCTS = [
  // ══════ SMARTPHONES ══════
  {
    id:1,category:'smartphones',brand:'Apple',
    name:'iPhone 15 Pro Max 256GB Titânio Natural',
    sku:'MLU0001',price:3899,oldPrice:9499,discount:59,rating:4.9,reviews:3847,
    images:[
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&h=500&fit=crop&q=85',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&h=500&fit=crop&q=85'
    ],
    variants:['Titânio Natural','Titânio Preto','Titânio Branco','Titânio Azul'],
    highlights:['Chip A17 Pro (3nm)','Câmera 48MP zoom óptico 5x','Tela Super Retina XDR 6,7" 120Hz','Estrutura titânio grau aeroespacial','Botão de Ação personalizável','USB-C USB 3 (20Gb/s)','Bateria até 29h de vídeo'],
    description:'O iPhone 15 Pro Max traz o chip A17 Pro fabricado em 3nm, câmera com zoom óptico 5x inédita na linha Pro Max, estrutura de titânio grau aeroespacial e o novo Botão de Ação personalizável. USB-C com velocidade USB 3 transfere dados a até 20Gb/s.',
    specs:[['Tela','6,7" OLED 2796×1290px 460ppi 120Hz'],['CPU','Apple A17 Pro (3nm)'],['RAM','8GB'],['Armazenamento','256GB NVMe'],['Câmera','48MP f/1.78 + 12MP ultrawide + 12MP 5x'],['Bateria','4422mAh – 29h vídeo'],['Sistema','iOS 17'],['Proteção','IP68']],
    reviewsData:[{user:'Carlos M.',rating:5,date:'12/11/2024',comment:'Câmera zoom 5x incrível. Bateria dura 2 dias no meu uso!'},{user:'Ana Paula S.',rating:5,date:'03/11/2024',comment:'Produto original lacrado. Tela linda, titânio premium.'}]
  },
  {
    id:2,category:'smartphones',brand:'Samsung',
    name:'Samsung Galaxy S24 Ultra 256GB 5G Titânio Preto',
    sku:'MLU0002',price:2999,oldPrice:8299,discount:64,rating:4.8,reviews:2341,
    images:[
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=500&fit=crop&q=85',
      'https://images.unsplash.com/photo-1659107935946-50dfb8e31db4?w=500&h=500&fit=crop&q=85'
    ],
    variants:['Titânio Preto','Titânio Cinza','Titânio Violeta','Titânio Amarelo'],
    highlights:['S Pen com Galaxy AI','Câmera 200MP zoom 10x','Dynamic AMOLED 2X 6,8" 120Hz','Snapdragon 8 Gen 3','12GB RAM + 256GB UFS 4.0','Bateria 5000mAh 45W','IP68'],
    description:'Galaxy S24 Ultra com S Pen e Galaxy AI. Resuma documentos, traduza em tempo real e remova objetos de fotos. Câmera 200MP + zoom 10x captura cada detalhe com perfeição.',
    specs:[['Tela','6,8" AMOLED 3088×1440px 501ppi 120Hz'],['CPU','Snapdragon 8 Gen 3 (4nm)'],['RAM','12GB'],['Armazenamento','256GB UFS 4.0'],['Câmera','200MP+12MP+10MP 3x+50MP 5x'],['Bateria','5000mAh – 45W'],['Sistema','Android 14 / One UI 6.1'],['Proteção','IP68']],
    reviewsData:[{user:'Fernanda L.',rating:5,date:'15/11/2024',comment:'Câmera 200MP épica. S Pen com IA é diferencial enorme!'},{user:'Thiago B.',rating:5,date:'08/11/2024',comment:'Galaxy AI é surpreendentemente útil.'}]
  },
  {
    id:3,category:'smartphones',brand:'Motorola',
    name:'Motorola Edge 50 Pro 512GB 12GB RAM 5G Moonlight Pearl',
    sku:'MLU0003',price:1299,oldPrice:3499,discount:63,rating:4.7,reviews:1203,
    images:[
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop&q=85',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop&q=85'
    ],
    variants:['Moonlight Pearl','Black Beauty','Luxe Lavender'],
    highlights:['pOLED curva 6,7" 144Hz','Câmera 50MP Sony OIS','Snapdragon 7 Gen 3 (4nm)','TurboPower 125W – 100% em 22min','12GB RAM + 512GB','Dolby Atmos estéreo','IP68'],
    description:'Edge 50 Pro: carregamento TurboPower 125W vai de 0 a 100% em 22 minutos. Tela pOLED curva 144Hz e câmera Sony 50MP com estabilização óptica.',
    specs:[['Tela','6,7" pOLED 2712×1220px 144Hz'],['CPU','Snapdragon 7 Gen 3'],['RAM','12GB LPDDR5'],['Armazenamento','512GB UFS 3.1'],['Câmera','50MP OIS+13MP+10MP 3x'],['Bateria','4500mAh TurboPower 125W'],['Sistema','Android 14'],['Proteção','IP68']],
    reviewsData:[{user:'Lucas P.',rating:5,date:'20/11/2024',comment:'125W absurdo! 15 min e bateria para o dia todo.'}]
  },
  {
    id:4,category:'smartphones',brand:'Xiaomi',
    name:'Xiaomi 14 Ultra 512GB 16GB RAM Câmera Leica 5G Preto',
    sku:'MLU0004',price:2499,oldPrice:6999,discount:64,rating:4.8,reviews:876,
    images:[
      'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500&h=500&fit=crop&q=85',
      'https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=500&h=500&fit=crop&q=85'
    ],
    variants:['Titânio Preto','Titânio Branco'],
    highlights:['Sistema Leica Summilux 4 câmeras','Sensor Sony LYT-900 de 1 polegada','Snapdragon 8 Gen 3','HyperCharge 90W + sem fio 80W','AMOLED 6,73" 120Hz','16GB RAM + 512GB UFS 4.0'],
    description:'Xiaomi 14 Ultra co-desenvolvido com Leica. Sensor Sony de 1 polegada com abertura variável f/1.63–f/4.0. HyperCharge 90W carrega 5000mAh em 35 minutos.',
    specs:[['Tela','6,73" AMOLED 3200×1440px 120Hz'],['CPU','Snapdragon 8 Gen 3'],['RAM','16GB LPDDR5X'],['Armazenamento','512GB UFS 4.0'],['Câmera','4× 50MP – sensor 1" principal'],['Bateria','5000mAh 90W+sem fio 80W'],['Sistema','Android 14 HyperOS'],['Proteção','IP68']],
    reviewsData:[{user:'Pedro A.',rating:5,date:'10/11/2024',comment:'Leica faz diferença absurda à noite. Sensor 1 polegada é incrível.'}]
  },
  {
    id:5,category:'smartphones',brand:'Samsung',
    name:'Samsung Galaxy A55 5G 256GB 8GB RAM Azul Escuro',
    sku:'MLU0005',price:799,oldPrice:2199,discount:64,rating:4.6,reviews:2987,
    images:[
      'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop&q=85',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500&h=500&fit=crop&q=85'
    ],
    variants:['Azul Escuro','Amarelo Limão','Prata Gelo','Branco'],
    highlights:['Super AMOLED 6,6" 120Hz','Câmera 50MP OIS','5G alta velocidade','8GB RAM + 256GB','Bateria 5000mAh 25W','IP67 Gorilla Glass Victus+'],
    description:'Galaxy A55 5G: o custo-benefício premium da Samsung. Tela Super AMOLED 120Hz, câmera 50MP com OIS, conectividade 5G e proteção IP67.',
    specs:[['Tela','6,6" Super AMOLED 2340×1080px 120Hz'],['CPU','Exynos 1480 (4nm)'],['RAM','8GB'],['Armazenamento','256GB UFS 2.2'],['Câmera','50MP OIS+12MP+5MP'],['Bateria','5000mAh 25W'],['Sistema','Android 14 One UI 6.1'],['Proteção','IP67']],
    reviewsData:[{user:'Renata C.',rating:5,date:'22/11/2024',comment:'Melhor custo-benefício. Tela linda e câmera excelente!'}]
  },

  // ══════ NOTEBOOKS ══════
  {
    id:6,category:'notebooks',brand:'Dell',
    name:'Notebook Dell XPS 15 Core i9 32GB 1TB RTX 4070 OLED 15,6"',
    sku:'MLU0006',price:5999,oldPrice:16499,discount:64,rating:4.9,reviews:634,
    images:[
      'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&h=500&fit=crop&q=85',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop&q=85'
    ],
    variants:['Prata Platina','Preto Carbono'],
    highlights:['Intel Core i9-13900H 14 núcleos','RTX 4070 8GB GDDR6','32GB DDR5 5200MHz','SSD 1TB PCIe Gen 4','OLED 3.5K 15,6" 100% DCI-P3','Bateria 86Wh até 13h','1,86kg'],
    description:'Dell XPS 15 com tela OLED 3.5K 100% DCI-P3 para design, foto e vídeo com cores absolutamente precisas. Core i9 + RTX 4070 para renderização 3D e edição 4K.',
    specs:[['Tela','15,6" OLED 3456×2160px 60Hz 100% DCI-P3'],['CPU','Intel Core i9-13900H (5,4GHz)'],['RAM','32GB DDR5 5200MHz'],['Armazenamento','1TB NVMe PCIe Gen 4'],['GPU','RTX 4070 8GB GDDR6'],['Bateria','86Wh – até 13h'],['Sistema','Windows 11 Home'],['Peso','1,86kg']],
    reviewsData:[{user:'Renata M.',rating:5,date:'05/11/2024',comment:'OLED de fábrica perfeito para design gráfico.'},{user:'André S.',rating:5,date:'29/10/2024',comment:'Projetos 3D que levavam horas, agora minutos!'}]
  },
  {
    id:7,category:'notebooks',brand:'Apple',
    name:'MacBook Pro 14" M3 Pro 18GB 512GB SSD Preto Espacial',
    sku:'MLU0007',price:6499,oldPrice:17999,discount:64,rating:4.9,reviews:1247,
    images:[
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop&q=85',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&h=500&fit=crop&q=85'
    ],
    variants:['Preto Espacial','Prateado'],
    highlights:['Chip M3 Pro CPU 11 núcleos / GPU 14 núcleos','18GB memória unificada','SSD NVMe 512GB','Liquid Retina XDR 14,2" 120Hz ProMotion','Até 22h de bateria','HDMI 2.1 + SD + 3× Thunderbolt 4'],
    description:'MacBook Pro M3 Pro com 22h de autonomia e desempenho extraordinário. Tela Liquid Retina XDR brilha com 1600nits de pico. Novo acabamento Preto Espacial exclusivo.',
    specs:[['Tela','14,2" Liquid Retina XDR 3024×1964px 120Hz'],['CPU','Apple M3 Pro (11CPU/14GPU)'],['Memória','18GB unificada'],['Armazenamento','512GB NVMe'],['Bateria','até 22 horas'],['Portas','3×TB4, HDMI 2.1, SD, MagSafe 3'],['Sistema','macOS Sonoma'],['Peso','1,61kg']],
    reviewsData:[{user:'Carolina F.',rating:5,date:'18/11/2024',comment:'Compilações que levavam 40s agora levam 12s. Liquid Retina XDR incomparável.'}]
  },
  {
    id:8,category:'notebooks',brand:'Lenovo',
    name:'Notebook Lenovo Legion 5i Pro Core i7 32GB RTX 4060 165Hz 16"',
    sku:'MLU0008',price:3799,oldPrice:9999,discount:62,rating:4.8,reviews:891,
    images:[
      'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=500&h=500&fit=crop&q=85',
      'https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=500&h=500&fit=crop&q=85'
    ],
    variants:['Storm Grey'],
    highlights:['Intel Core i7-13700HX 16 núcleos','RTX 4060 8GB GDDR6','32GB DDR5 5600MHz','SSD 1TB PCIe Gen 4','IPS 16" 2560×1600 165Hz','ColdFront 5.0 resfriamento extremo'],
    description:'Legion 5i Pro: a besta do gaming. ColdFront 5.0 com 4 dissipadores. RTX 4060 + Core i7-13700HX garantem alto FPS nos jogos mais exigentes.',
    specs:[['Tela','16" IPS 2560×1600px 165Hz'],['CPU','Core i7-13700HX (16 núcleos)'],['RAM','32GB DDR5 5600MHz'],['Armazenamento','1TB NVMe Gen 4'],['GPU','RTX 4060 8GB GDDR6'],['Bateria','80Wh 135W'],['Sistema','Windows 11 Home']],
    reviewsData:[{user:'Diego M.',rating:5,date:'16/11/2024',comment:'Tudo no ultra sem engasgar. Resfriamento excepcional!'}]
  },

  // ══════ TVs ══════
  {
    id:9,category:'tvs',brand:'LG',
    name:'Smart TV LG OLED evo C3 65" 4K 120Hz Dolby Vision webOS 23',
    sku:'MLU0009',price:2799,oldPrice:7999,discount:65,rating:4.9,reviews:2134,
    images:[
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&h=500&fit=crop&q=85',
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=500&h=500&fit=crop&q=85'
    ],
    variants:['55"','65"','77"','83"'],
    highlights:['OLED auto-iluminado – preto absoluto','Processador α9 Gen6 AI','Dolby Vision IQ + Dolby Atmos','120Hz NVIDIA G-Sync','4× HDMI 2.1 (48Gbps)','webOS 23 ThinQ AI','Input lag 1ms gamer'],
    description:'LG OLED evo C3: a melhor TV segundo especialistas. Preto absoluto, contraste infinito. 4× HDMI 2.1 e 1ms input lag para PS5 e Xbox Series X.',
    specs:[['Tamanho','65 pol. (163cm)'],['Resolução','4K 3840×2160px'],['Painel','OLED evo auto-iluminado'],['Taxa','120Hz G-Sync FreeSync'],['HDR','Dolby Vision IQ, HDR10, HLG'],['Áudio','60W Dolby Atmos'],['Smart TV','webOS 23, ThinQ AI, AirPlay 2'],['HDMI','4× HDMI 2.1 48Gbps']],
    reviewsData:[{user:'Marcos R.',rating:5,date:'12/11/2024',comment:'PS5 nessa TV é transcendental. 1ms+120Hz perfeito.'},{user:'Silvia T.',rating:5,date:'05/11/2024',comment:'Preto absoluto OLED transforma qualquer filme.'}]
  },
  {
    id:10,category:'tvs',brand:'Samsung',
    name:'Smart TV Samsung Neo QLED 8K 75" QN900C 240Hz Atmos',
    sku:'MLU0010',price:4999,oldPrice:18999,discount:74,rating:4.8,reviews:432,
    images:[
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&h=500&fit=crop&q=85',
      'https://images.unsplash.com/photo-1571415060716-baff5f717c37?w=500&h=500&fit=crop&q=85'
    ],
    variants:['65"','75"','85"'],
    highlights:['8K 7680×4320px Neural Quantum IA','240Hz taxa de atualização','Neo QLED Mini LEDs','Dolby Atmos OTS+','Design Infinity One','Tizen OS + SmartThings'],
    description:'Samsung Neo QLED 8K com Neural Quantum 8K Gen2 que upscala conteúdo em tempo real. Mini LEDs criam contraste e brilho sem igual.',
    specs:[['Tamanho','75 polegadas'],['Resolução','8K 7680×4320px'],['Painel','Neo QLED Mini LED'],['Taxa','240Hz'],['Áudio','70W Dolby Atmos'],['Smart TV','Tizen, Bixby, Alexa, Google'],['HDMI','4× HDMI 2.1']],
    reviewsData:[{user:'Eduardo C.',rating:5,date:'20/11/2024',comment:'8K impressionante mesmo em 4K. Design deslumbrante.'}]
  },

  // ══════ GAMES ══════
  {
    id:11,category:'games',brand:'Sony',
    name:'PlayStation 5 Slim Console Disco 1TB SSD + Controle DualSense',
    sku:'MLU0011',price:2799,oldPrice:4799,discount:42,rating:4.9,reviews:5782,
    images:[
      'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=500&h=500&fit=crop&q=85',
      'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=500&h=500&fit=crop&q=85'
    ],
    variants:['Edição Disco','Edição Digital'],
    highlights:['SSD 825GB – carregamentos instantâneos','Resolução até 8K, 120fps','Ray Tracing em tempo real','DualSense feedback tátil + gatilhos adaptativos','Tempest 3D AudioTech','Retrocompatível com PS4','Design Slim 30% menor'],
    description:'PS5 Slim com carregamentos instantâneos, ray tracing e DualSense que transforma completamente a experiência de jogar com feedback háptico e gatilhos adaptativos.',
    specs:[['CPU','AMD Zen 2 – 8 núcleos 3,5GHz'],['GPU','AMD RDNA 2 – 10,3 TF'],['RAM','16GB GDDR6'],['Armazenamento','SSD NVMe 825GB'],['Resolução','até 8K / 120fps'],['Áudio','Tempest 3D AudioTech'],['Mídia','Blu-ray 4K Ultra HD']],
    reviewsData:[{user:'Gabriel N.',rating:5,date:'22/11/2024',comment:'Gatilhos adaptativos são revolucionários. Imersão total!'},{user:'Patricia O.',rating:5,date:'15/11/2024',comment:'Filho ficou radiante! Slim é mais fácil de encaixar no rack.'}]
  },
  {
    id:12,category:'games',brand:'Microsoft',
    name:'Xbox Series X Console 1TB SSD 4K 120fps HDR Preto',
    sku:'MLU0012',price:2599,oldPrice:4299,discount:40,rating:4.8,reviews:2341,
    images:[
      'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500&h=500&fit=crop&q=85',
      'https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?w=500&h=500&fit=crop&q=85'
    ],
    variants:['Preto'],
    highlights:['4K 60fps / 1080p 120fps','SSD NVMe 1TB Velocity Architecture','12 teraflops de poder gráfico','Quick Resume – múltiplos jogos','Retrocompat. 4 gerações Xbox','Auto HDR + FPS Boost automático'],
    description:'Xbox Series X: o console mais poderoso da Microsoft. Quick Resume troca entre jogos em segundos. Biblioteca de milhares de títulos com melhorias automáticas de HDR e framerate.',
    specs:[['CPU','AMD Zen 2 – 8 núcleos 3,8GHz'],['GPU','AMD RDNA 2 – 12 TF'],['RAM','16GB GDDR6'],['Armazenamento','SSD NVMe 1TB'],['Resolução','até 8K upscaling / 120fps'],['Mídia','UHD Blu-ray 4K'],['Conectividade','HDMI 2.1, USB×3, Wi-Fi 6']],
    reviewsData:[{user:'Rodrigo A.',rating:5,date:'18/11/2024',comment:'Quick Resume é funcionalidade que não vivo mais sem!'}]
  },
  {
    id:13,category:'games',brand:'Nintendo',
    name:'Nintendo Switch OLED 64GB Branco Tela OLED 7" Desbloqueado',
    sku:'MLU0013',price:1799,oldPrice:2999,discount:40,rating:4.9,reviews:6231,
    images:[
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=500&fit=crop&q=85',
      'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=500&h=500&fit=crop&q=85'
    ],
    variants:['Branco','Neon'],
    highlights:['Tela OLED 7" cores vibrantes','64GB armazenamento interno','Dock HDMI saída na TV','Autonomia até 9h portátil','Joy-Con HD Rumble','Suporte ajustável amplo','Compatível todos jogos Switch'],
    description:'Nintendo Switch OLED com tela 7" de cores vibrantes e preto profundo. 64GB de armazenamento e dock melhorado com porta LAN cabeada.',
    specs:[['Tela','7" OLED 1280×720px'],['Saída TV','1080p via HDMI'],['Armazenamento','64GB + microSDXC'],['Bateria','4310mAh – 4,5h a 9h'],['Conectividade','Wi-Fi 5, Bluetooth 4.1'],['Peso','320g (sem Joy-Con)']],
    reviewsData:[{user:'Felipe A.',rating:5,date:'23/11/2024',comment:'Tela OLED linda para jogar no portátil. Zelda é de tirar o fôlego!'}]
  },

  // ══════ ÁUDIO ══════
  {
    id:14,category:'audio',brand:'Sony',
    name:'Fone Sony WH-1000XM5 Bluetooth ANC 30h Noise Cancelling Preto',
    sku:'MLU0014',price:899,oldPrice:2499,discount:64,rating:4.9,reviews:3201,
    images:[
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&q=85',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop&q=85'
    ],
    variants:['Preto','Prata'],
    highlights:['Melhor ANC do mundo – 8 microfones','2 processadores dedicados ANC','Drivers 30mm exclusivos','30h bateria com ANC','Carga rápida: 3min = 3h uso','LDAC hi-res audio 990kbps','Estojo dobrável incluído'],
    description:'Sony WH-1000XM5: eleito melhor fone ANC do mundo. 8 microfones + 2 processadores eliminam virtualmente qualquer ruído. LDAC transmite áudio 3× mais detalhado que Bluetooth convencional.',
    specs:[['Driver','30mm circular'],['Frequência','4Hz – 40kHz'],['ANC','8 microfones + 2 processadores'],['Bateria','30h ANC / 40h sem ANC'],['Carga','USB-C – 3min=3h'],['Codecs','LDAC, AAC, SBC'],['Conexão','Bluetooth 5.2 + P2'],['Peso','250g']],
    reviewsData:[{user:'Amanda V.',rating:5,date:'14/11/2024',comment:'Em voos internacionais não ouço nada do motor. Épico!'},{user:'Henrique D.',rating:5,date:'07/11/2024',comment:'Trabalho em casa com filhos. Coloco e entro em outro mundo.'}]
  },
  {
    id:15,category:'audio',brand:'JBL',
    name:'Caixa de Som JBL Charge 5 Bluetooth 40W IPX7 20h Preta',
    sku:'MLU0015',price:699,oldPrice:1499,discount:53,rating:4.8,reviews:4821,
    images:[
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop&q=85',
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&h=500&fit=crop&q=85'
    ],
    variants:['Preta','Azul','Vermelha','Squad'],
    highlights:['40W RMS potência','Bluetooth 5.1 alcance 10m','20h de autonomia','Carrega dispositivos USB','IPX7 – 1m por 30min','PartyBoost múltiplas caixas'],
    description:'JBL Charge 5: 40W de som imersivo, 20h de bateria, IPX7 submersível e carrega seu celular via USB. PartyBoost conecta múltiplas caixas.',
    specs:[['Potência','40W RMS'],['Frequência','65Hz – 20kHz'],['Bluetooth','5.1 – 10m'],['Bateria','20 horas'],['Resistência','IPX7'],['Carga externa','USB-A 5V/2.4A'],['Dimensões','220×96×97mm, 960g']],
    reviewsData:[{user:'Camila S.',rating:5,date:'09/11/2024',comment:'Levei para a praia, submergi de bobeira e funcionou perfeitamente!'}]
  },
  {
    id:16,category:'audio',brand:'Apple',
    name:'AirPods Pro 2ª Geração USB-C ANC Áudio Espacial Branco',
    sku:'MLU0016',price:1299,oldPrice:2499,discount:48,rating:4.9,reviews:7812,
    images:[
      'https://images.unsplash.com/photo-1606741965429-02919b2e5b4c?w=500&h=500&fit=crop&q=85',
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&h=500&fit=crop&q=85'
    ],
    variants:['Branco'],
    highlights:['ANC chip H2 nível profissional','Modo Transparência adaptativa','Áudio Espacial Personalizado','30h total com case USB-C','IPX4 fone + IPX4 case','Volume adaptativo ao ambiente'],
    description:'AirPods Pro 2ª Geração com chip H2: ANC duas vezes mais potente. Modo Transparência adaptativa, Áudio Espacial com rastreamento de cabeça e case USB-C.',
    specs:[['Chip','Apple H2'],['Bateria','6h (fone) + 24h (case) = 30h'],['Resistência','IPX4 (fone + case)'],['Conectividade','Bluetooth 5.3'],['Case','USB-C + MagSafe + Apple Watch'],['Peso','5,3g/fone + 50,3g case']],
    reviewsData:[{user:'Tatiana R.',rating:5,date:'21/11/2024',comment:'ANC épico, melhor que qualquer TWS que já tive!'},{user:'Gustavo P.',rating:5,date:'14/11/2024',comment:'Modo Transparência adaptativa é mágico.'}]
  },

  // ══════ WEARABLES ══════
  {
    id:17,category:'wearables',brand:'Apple',
    name:'Apple Watch Series 9 GPS 45mm Alumínio Midnight Sport Band',
    sku:'MLU0017',price:2199,oldPrice:3999,discount:45,rating:4.8,reviews:4123,
    images:[
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&h=500&fit=crop&q=85',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&h=500&fit=crop&q=85'
    ],
    variants:['Midnight 41mm','Midnight 45mm','Starlight 41mm','Pink 41mm'],
    highlights:['Chip S9 – Siri 100% no dispositivo','Gesto Double Tap mão única','Always-On 2000 nits legível ao sol','Temperatura + ECG + SpO2','Detecção acidente e queda','Carregamento USB-C','WR50 – 50 metros'],
    description:'Apple Watch Series 9 com chip S9 que processa Siri on-device. Novo Double Tap controla o relógio com uma mão. ECG, SpO2 e temperatura do pulso.',
    specs:[['Tamanho','45mm'],['Chip','S9 SiP dual-core'],['Tela','LTPO OLED Always-On 2000nits'],['GPS','L1+L5 Dual-band'],['Sensores','ECG, SpO2, Temperatura, Altímetro'],['Bateria','18h / 36h Low Power'],['Carga','USB-C MagSafe'],['Resistência','WR50']],
    reviewsData:[{user:'Isabela C.',rating:5,date:'19/11/2024',comment:'Double Tap mudou tudo. Controlo músicas com uma mão!'},{user:'Bruno F.',rating:5,date:'11/11/2024',comment:'GPS L5 muito mais preciso para corridas.'}]
  },
  {
    id:18,category:'wearables',brand:'Samsung',
    name:'Galaxy Watch 6 Classic 47mm 4G LTE Preto NFC Bluetooth',
    sku:'MLU0018',price:1299,oldPrice:2799,discount:54,rating:4.7,reviews:1876,
    images:[
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop&q=85',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&h=500&fit=crop&q=85'
    ],
    variants:['Preto 43mm','Preto 47mm','Prata 43mm','Prata 47mm'],
    highlights:['Moldura giratória clássica','Super AMOLED 1,5" 480×480px','Monitoramento avançado de sono','ECG + pressão arterial','Bateria até 40h','4G LTE independente do celular','Wear OS + One UI Watch 5'],
    description:'Galaxy Watch 6 Classic com moldura giratória icônica. Monitoramento de sono com análise de fases, ECG e pressão arterial. 4G LTE funciona sem o smartphone.',
    specs:[['Tamanho','47mm'],['Tela','Super AMOLED 1,5" 480×480px'],['Bateria','425mAh – até 40h'],['Resistência','5ATM + IP68 + MIL-STD-810T'],['Conectividade','4G LTE, Wi-Fi, BT 5.3, NFC'],['Armazenamento','16GB']],
    reviewsData:[{user:'Marina L.',rating:5,date:'24/11/2024',comment:'Moldura giratória muito prática. Monitoramento de sono preciso e detalhado.'}]
  },

  // ══════ CÂMERAS ══════
  {
    id:19,category:'cameras',brand:'Sony',
    name:'Câmera Sony ZV-E10 APS-C 24.2MP Vlog 4K Branca + Lente 16-50mm',
    sku:'MLU0019',price:2399,oldPrice:4999,discount:52,rating:4.8,reviews:987,
    images:[
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=500&fit=crop&q=85',
      'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=500&h=500&fit=crop&q=85'
    ],
    variants:['Branca + 16-50mm','Preta + 16-50mm','Branca (corpo)'],
    highlights:['Sensor APS-C CMOS 24.2MP','4K 30fps sem crop','Bokeh fácil com um toque','Microfone 3 cápsulas direcional','Estabilização eletrônica','Autofoco rosto/olhos em tempo real','Compatível todas lentes Sony E-mount'],
    description:'Sony ZV-E10: câmera perfeita para criadores de conteúdo. Sensor APS-C 24.2MP, 4K sem crop, microfone direcional e modo de desenfoque automático.',
    specs:[['Sensor','APS-C CMOS 24.2MP'],['Vídeo','4K 30fps / 1080p 120fps'],['AF','Rastreamento rosto/olhos em tempo real'],['Microfone','3 cápsulas direcional + P2'],['Tela','3" touch articulada'],['ISO','100–32000'],['Bateria','NP-FW50 – 280 disparos'],['Peso','343g']],
    reviewsData:[{user:'Bruna F.',rating:5,date:'17/11/2024',comment:'Vídeo incrível para YouTube. Microfone muito melhor que smartphones.'}]
  },
  {
    id:20,category:'cameras',brand:'Canon',
    name:'Câmera Canon EOS R50 24.2MP Vídeo 4K Corpo Preto',
    sku:'MLU0020',price:3499,oldPrice:6999,discount:50,rating:4.8,reviews:654,
    images:[
      'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=500&h=500&fit=crop&q=85',
      'https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?w=500&h=500&fit=crop&q=85'
    ],
    variants:['Preta (corpo)','Branca (corpo)','Preta + RF-S 18-45mm'],
    highlights:['Sensor APS-C 24.2MP DIGIC X','4K 30fps com Dual Pixel AF II','AF em Sujeto/Olhos ultrarrápido','15 quadros por segundo rafaga','Wi-Fi + Bluetooth integrados','Tela touchscreen articulada 3"','Sistema RF-S compacto e leve'],
    description:'Canon EOS R50: a mirrorless mais leve e compacta da Canon. DIGIC X, 4K com Dual Pixel AF II e sistema de AF em sujeito dos mais rápidos do mercado.',
    specs:[['Sensor','APS-C CMOS 24.2MP'],['Processador','DIGIC X'],['Vídeo','4K UHD 30fps / 1080p 120fps'],['AF','Dual Pixel CMOS AF II – Sujeito/Olhos'],['Rafaga','15fps RAW/JPEG'],['Wi-Fi','802.11 b/g/n + Bluetooth 4.2'],['Bateria','LP-E17 – 370 disparos'],['Peso','375g com bateria']],
    reviewsData:[{user:'Rafael M.',rating:5,date:'15/11/2024',comment:'AF em sujeito é de outro mundo. Tracks tudo que move com precisão incrível.'}]
  },

  // ══════ ELETROS ══════
  {
    id:21,category:'eletros',brand:'Samsung',
    name:'Geladeira Samsung French Door 460L Inox SpaceMax RF44A',
    sku:'MLU0021',price:3799,oldPrice:7999,discount:52,rating:4.7,reviews:743,
    images:[
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500&h=500&fit=crop&q=85',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop&q=85'
    ],
    variants:['Inox','Branca'],
    highlights:['460L de capacidade total','SpaceMax – parede fina mais espaço','Digital Inverter – econômico e silencioso','All-Around Cooling uniforme','Gaveta FlexZone 4 temperaturas','Frost Free total','Classificação A+++'],
    description:'Samsung French Door com SpaceMax: isolamento de parede fina para maximizar espaço interno. Digital Inverter economiza até 46% de energia.',
    specs:[['Capacidade','460L (296L+164L)'],['Tipo','French Door + FlexZone'],['Compressor','Digital Inverter (10 anos)'],['Energético','A+++ – 391kWh/ano'],['Dimensões','178×91×71cm'],['Tensão','Bivolt']],
    reviewsData:[{user:'Lúcia M.',rating:5,date:'25/11/2024',comment:'Espaçosa demais. Temperatura uniforme. Silenciosíssima!'}]
  },
  {
    id:22,category:'eletros',brand:'Philips',
    name:'Aspirador Robô Philips HomeRun 7000 3000Pa Wi-Fi IA Câmera',
    sku:'MLU0022',price:1399,oldPrice:3499,discount:60,rating:4.6,reviews:1243,
    images:[
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop&q=85',
      'https://images.unsplash.com/photo-1588347818036-c4b47f68f295?w=500&h=500&fit=crop&q=85'
    ],
    variants:['Preto','Branco'],
    highlights:['Mapeamento IA por câmera visual','Sucção 3000Pa ultra-potente','Evita obstáculos com IA','Mopa integrada aspirar + lavar','120min autonomia por ciclo','App + Alexa + Google Home','Filtro HEPA 99,97%'],
    description:'Philips HomeRun 7000: IA mapeia sua casa, evita obstáculos e limpa sistematicamente. Sucção 3000Pa + mopa integrada. Controle por app com mapa interativo.',
    specs:[['Sucção','3000Pa'],['Mapeamento','Câmera visual com IA'],['Autonomia','120 minutos'],['Reservatório','500ml pó / 200ml água'],['Filtro','HEPA 99,97%'],['Conectividade','Wi-Fi + Alexa + Google'],['Altura','9,2cm']],
    reviewsData:[{user:'Sandra B.',rating:5,date:'26/11/2024',comment:'Mapeia perfeitamente e desvia de tudo. Nunca mais passo aspirador!'}]
  }
];

// ── CART ──────────────────────────────────────────────────
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
function openCart() { document.getElementById('cartSidebar')?.classList.add('open'); document.getElementById('cartOverlay')?.classList.add('open'); }
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
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}</div>
        <div class="cart-item-qty">
          <button onclick="changeQty('${item.name.replace(/'/g, "\\'")}', -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty('${item.name.replace(/'/g, "\\'")}', 1)">+</button>
          <button class="cart-remove" onclick="removeFromCart('${item.name.replace(/'/g, "\\'")}')">🗑</button>
        </div>
      </div>
    </div>`).join('');
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  footer.innerHTML = `
    <div class="cart-total-row"><span>Subtotal:</span><strong>R$ ${total.toFixed(2).replace('.', ',')}</strong></div>
    <div class="cart-total-row pix"><span>💚 No Pix (-5%):</span><strong>R$ ${(total * 0.95).toFixed(2).replace('.', ',')}</strong></div>
    <button class="btn-checkout" onclick="alert('✅ Compra realizada com sucesso!\\nObrigado por comprar no Magalu!')">Finalizar Compra</button>`;
}

// ── RENDER PRODUCTS ───────────────────────────────────────
function renderProducts(list) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = list.map(p => `
    <div class="product-card" onclick="window.location.href='produto.html?id=${p.id}'">
      <div class="product-badge">-${p.discount}%</div>
      <button class="product-fav" onclick="event.stopPropagation();this.classList.toggle('active');this.textContent=this.classList.contains('active')?'♥':'♡'">♡</button>
      <div class="product-img-wrap">
        <img
          src="${p.images[0]}"
          alt="${p.name}"
          loading="lazy"
          onerror="this.onerror=null;this.src='https://picsum.photos/seed/prod${p.id}/300/300'">
      </div>
      <div class="product-info">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-stars">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5-Math.floor(p.rating))} <span>(${p.reviews.toLocaleString()})</span></div>
        <div class="product-price-old">De: R$ ${p.oldPrice.toFixed(2).replace('.', ',')}</div>
        <div class="product-price">R$ ${p.price.toFixed(2).replace('.', ',')}</div>
        <div class="product-installment">12x R$ ${(p.price/12).toFixed(2).replace('.', ',')} s/juros</div>
        <div class="product-pix">💚 R$ ${(p.price*0.95).toFixed(2).replace('.', ',')} no Pix</div>
        <button class="product-buy"
          onclick="event.stopPropagation();
            addToCart('${p.name.replace(/'/g,"\\'")}',${p.price},'${p.images[0]}');
            this.textContent='✓ Adicionado';
            this.style.background='#27ae60';
            setTimeout(()=>{this.textContent='Comprar';this.style.background=''},1600)">
          Comprar
        </button>
      </div>
    </div>`).join('');
}

function filterCategory(cat) {
  const list = cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === cat);
  renderProducts(list.length ? list : PRODUCTS);
  setTimeout(() => document.getElementById('productsGrid')?.scrollIntoView({ behavior:'smooth', block:'start' }), 100);
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
  setTimeout(() => document.getElementById('productsGrid')?.scrollIntoView({ behavior:'smooth', block:'start' }), 100);
}

// ── HERO ──────────────────────────────────────────────────
let slideIdx = 0;
const SLIDE_COUNT = 4;
function changeSlide(dir) { goSlide((slideIdx + dir + SLIDE_COUNT) % SLIDE_COUNT); }
function goSlide(n) {
  slideIdx = n;
  const s = document.getElementById('heroSlides');
  if (s) s.style.transform = `translateX(-${slideIdx * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === slideIdx));
}

// ── COUNTDOWN ─────────────────────────────────────────────
function startCountdown() {
  let end = parseInt(localStorage.getItem('cdEnd') || '0');
  if (!end || end < Date.now()) { end = Date.now() + 6*3600*1000; localStorage.setItem('cdEnd', end); }
  setInterval(() => {
    const diff = Math.max(0, end - Date.now());
    const h = String(Math.floor(diff/3600000)).padStart(2,'0');
    const m = String(Math.floor((diff%3600000)/60000)).padStart(2,'0');
    const s = String(Math.floor((diff%60000)/1000)).padStart(2,'0');
    const el = document.getElementById('countdown');
    if (el) el.textContent = `${h}:${m}:${s}`;
  }, 1000);
}

// ── INIT ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  renderCart();
  renderProducts(PRODUCTS);
  startCountdown();
  setInterval(() => changeSlide(1), 5000);
  document.getElementById('searchInput')?.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
  document.getElementById('cepInput')?.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g,'');
    if (v.length > 5) v = v.slice(0,5)+'-'+v.slice(5,8);
    e.target.value = v;
  });
});
