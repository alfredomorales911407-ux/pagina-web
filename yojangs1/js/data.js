// AgroGuía - Base de Datos Agronómica (Cultivos, Plagas, Enfermedades y Guías)

const AGRO_DATA = {
  crops: [
    {
      id: "maiz",
      name: "Maíz (Zea mays)",
      category: "cereales",
      icon: "🌽",
      family: "Poaceae",
      optimalTemp: "18°C - 30°C",
      idealPh: "5.8 - 7.0",
      soilType: "Franco-arenoso a franco-arcilloso, profundo y bien drenado",
      waterRequirement: "500 - 800 mm por ciclo (Medio-Alto)",
      cycleDays: "120 - 150 días",
      sowingDensity: "60,000 - 75,000 plantas/ha",
      rowSpacing: "75 - 90 cm",
      plantSpacing: "15 - 25 cm",
      depth: "3 - 5 cm",
      expectedYield: "6 - 12 ton/ha (según tecnología)",
      description: "Uno de los cultivos más importantes del mundo. Requiere buena radiación solar y nitrógeno durante su fase vegetativa activa.",
      keyCare: [
        "Monitorear gusano cogollero en etapas iniciales (V2-V6).",
        "Asegurar humedad crítica durante la floración y llenado de grano.",
        "Aplicar fertilización fraccionada: 30% en siembra, 70% en V6."
      ],
      npkRatio: "180 - 60 - 80 kg/ha"
    },
    {
      id: "tomate",
      name: "Tomate (Solanum lycopersicum)",
      category: "hortalizas",
      icon: "🍅",
      family: "Solanaceae",
      optimalTemp: "18°C - 27°C",
      idealPh: "6.0 - 6.8",
      soilType: "Franco a franco-arenoso, rico en materia orgánica",
      waterRequirement: "400 - 600 mm (Riego por goteo recomendado)",
      cycleDays: "90 - 130 días",
      sowingDensity: "20,000 - 28,000 plantas/ha",
      rowSpacing: "1.2 - 1.5 m",
      plantSpacing: "30 - 40 cm",
      depth: "0.5 - 1 cm (en semillero)",
      expectedYield: "40 - 90 ton/ha (invernadero hasta 150 ton)",
      description: "Hortaliza de alto valor comercial, muy sensible al exceso de humedad foliar y deficiencias de calcio.",
      keyCare: [
        "Tutorado obligatorio para evitar contacto del fruto con el suelo.",
        "Poda de chupones axilares semanalmente para mejorar ventilación.",
        "Control preventivo de Tizón tardío y mosca blanca."
      ],
      npkRatio: "200 - 100 - 250 kg/ha"
    },
    {
      id: "papa",
      name: "Papa / Patata (Solanum tuberosum)",
      category: "tuberculos",
      icon: "🥔",
      family: "Solanaceae",
      optimalTemp: "15°C - 20°C (climas templados a fríos)",
      idealPh: "5.2 - 6.5",
      soilType: "Suelto, aireado, franco-arenoso sin piedras",
      waterRequirement: "450 - 650 mm por ciclo",
      cycleDays: "100 - 140 días",
      sowingDensity: "35,000 - 45,000 tubérculos/ha",
      rowSpacing: "75 - 90 cm",
      plantSpacing: "25 - 35 cm",
      depth: "8 - 12 cm",
      expectedYield: "20 - 40 ton/ha",
      description: "Tubérculo fundamental en la seguridad alimentaria. Requiere aporques periódicos para favorecer la tuberización y evitar el verdeo.",
      keyCare: [
        "Realizar aporque a los 25-35 días después de emergencia.",
        "Evitar encharcamientos para prevenir pudriciones blandas (Erwinia).",
        "Suspender el riego 10-15 días antes de la cosecha para curar la piel."
      ],
      npkRatio: "160 - 140 - 200 kg/ha"
    },
    {
      id: "cafe",
      name: "Café (Coffea arabica)",
      category: "perennes",
      icon: "☕",
      family: "Rubiaceae",
      optimalTemp: "18°C - 23°C",
      idealPh: "5.5 - 6.2",
      soilType: "Profundo, volcánico o franco-arcilloso, alto drenaje",
      waterRequirement: "1200 - 1800 mm anuales bien distribuidos",
      cycleDays: "Cultivo perenne (primer cosecha a 2.5 - 3 años)",
      sowingDensity: "3,500 - 5,000 árboles/ha",
      rowSpacing: "2.0 - 2.5 m",
      plantSpacing: "1.0 - 1.2 m",
      depth: "En hoyo de 40x40x40 cm con materia orgánica",
      expectedYield: "15 - 30 quintales pergamino/ha",
      description: "Cultivo de alta calidad organoléptica que prospera bajo sombra regulada en pisos altitudinales de 800 a 2000 msnm.",
      keyCare: [
        "Manejo de sombra (30-40% cobertura con leguminosas).",
        "Monitoreo constante de broca del café y roya (Hemileia vastatrix).",
        "Poda de renovación / recepas cada 5-7 años según ciclo productivo."
      ],
      npkRatio: "250 - 50 - 220 kg/ha/año"
    },
    {
      id: "aguacate",
      name: "Aguacate / Palto (Persea americana)",
      category: "frutales",
      icon: "🥑",
      family: "Lauraceae",
      optimalTemp: "15°C - 28°C",
      idealPh: "6.0 - 7.0",
      soilType: "Muy permeable, franco-arenoso, libre de encharcamientos",
      waterRequirement: "800 - 1200 mm/año (muy sensible a asfixia radicular)",
      cycleDays: "Perenne (inicia producción comercial año 3-4)",
      sowingDensity: "200 - 400 árboles/ha (marco 6x6m a 5x4m)",
      rowSpacing: "5.0 - 6.0 m",
      plantSpacing: "4.0 - 6.0 m",
      depth: "Montículos elevados de 30-50 cm",
      expectedYield: "10 - 25 ton/ha en adultez",
      description: "Fruto de altísima demanda global. Extremadamente susceptible a la marchitez por Phytophthora cinnamomi si el drenaje es deficiente.",
      keyCare: [
        "Plantar sobre caballones o camellones altos para asegurar drenaje.",
        "Aplicar acolchado orgánico (mulch) alrededor de la zona de goteo.",
        "Monitorear trips y barrenador del hueso en floración y cuajado."
      ],
      npkRatio: "150 - 45 - 180 kg/ha/año"
    },
    {
      id: "frijol",
      name: "Frijol / Judía (Phaseolus vulgaris)",
      category: "leguminosas",
      icon: "🫘",
      family: "Fabaceae",
      optimalTemp: "16°C - 25°C",
      idealPh: "6.0 - 7.2",
      soilType: "Franco, suelto, con buen contenido de fósforo",
      waterRequirement: "300 - 500 mm por ciclo",
      cycleDays: "70 - 95 días (arbustivo) / 100 - 120 días (guiador)",
      sowingDensity: "180,000 - 250,000 plantas/ha",
      rowSpacing: "45 - 60 cm",
      plantSpacing: "8 - 12 cm",
      depth: "2 - 4 cm",
      expectedYield: "1.2 - 2.5 ton/ha (grano seco)",
      description: "Excelente cultivo para rotación ya que fija nitrógeno atmosférico mediante simbiosis con bacterias Rhizobium.",
      keyCare: [
        "Inocular semillas con Rhizobium leguminosarum antes de la siembra.",
        "Controlar conchuela del frijol y mosca blanca en brotes jóvenes.",
        "Cosechar cuando las vainas estén secas y quebradizas pero antes de dehiscencia."
      ],
      npkRatio: "40 - 60 - 60 kg/ha (bajo nitrógeno requerido)"
    },
    {
      id: "cebolla",
      name: "Cebolla (Allium cepa)",
      category: "hortalizas",
      icon: "🧅",
      family: "Amaryllidaceae",
      optimalTemp: "13°C - 24°C",
      idealPh: "6.2 - 6.8",
      soilType: "Franco-arenoso rico en humus, sin compactación",
      waterRequirement: "350 - 550 mm por ciclo",
      cycleDays: "120 - 160 días",
      sowingDensity: "250,000 - 350,000 plantas/ha",
      rowSpacing: "25 - 35 cm",
      plantSpacing: "10 - 15 cm",
      depth: "1.5 - 2 cm (trasplante a raíz limpia)",
      expectedYield: "30 - 60 ton/ha",
      description: "Bulbosa de gran consumo. El fotoperiodo (horas de luz) determina la formación y tamaño final del bulbo.",
      keyCare: [
        "Control estricto de malezas en los primeros 60 días (poca competencia).",
        "Riegos frecuentes pero ligeros; suspender 15 días antes de cosecha.",
        "Curado al sol durante 3-5 días tras la recolección."
      ],
      npkRatio: "140 - 70 - 180 kg/ha"
    },
    {
      id: "lechuga",
      name: "Lechuga (Lactuca sativa)",
      category: "hortalizas",
      icon: "🥬",
      family: "Asteraceae",
      optimalTemp: "14°C - 20°C",
      idealPh: "6.0 - 7.0",
      soilType: "Ligero, alto en materia orgánica, excelente retención hídrica",
      waterRequirement: "200 - 350 mm por ciclo",
      cycleDays: "45 - 75 días",
      sowingDensity: "60,000 - 80,000 plantas/ha",
      rowSpacing: "30 - 40 cm",
      plantSpacing: "25 - 30 cm",
      depth: "0.5 cm (semillero)",
      expectedYield: "20 - 35 ton/ha",
      description: "Hortaliza de hoja rápida y ciclo corto, ideal para hidroponía y agricultura protegida.",
      keyCare: [
        "Mantener humedad constante para evitar hojas amargas o floración prematura (espigado).",
        "Monitorear babosas, caracoles y pulgones.",
        "Cosechar a primeras horas de la mañana para máxima turgencia."
      ],
      npkRatio: "100 - 40 - 140 kg/ha"
    },
    {
      id: "citricos",
      name: "Cítricos / Limón & Naranja (Citrus spp.)",
      category: "frutales",
      icon: "🍋",
      family: "Rutaceae",
      optimalTemp: "22°C - 32°C",
      idealPh: "6.0 - 7.5",
      soilType: "Franco-arenoso profundo, tolera cierta salinidad moderada",
      waterRequirement: "900 - 1300 mm/año",
      cycleDays: "Perenne",
      sowingDensity: "300 - 500 árboles/ha",
      rowSpacing: "5.0 - 6.0 m",
      plantSpacing: "4.0 - 5.0 m",
      depth: "Hoyos de 50x50x50 cm",
      expectedYield: "25 - 50 ton/ha en plena producción",
      description: "Árboles perennes productores de frutos ricos en vitamina C y aceites esenciales. Alta respuesta a microelementos como Zinc y Magnesio.",
      keyCare: [
        "Poda de formación y aclareo de ramas internas para entrada de luz.",
        "Monitoreo del vector Diaphorina citri (transmisor del HLB / Huanglongbing).",
        "Aportes foliares regulares de Zinc, Manganeso y Boro."
      ],
      npkRatio: "180 - 60 - 200 kg/ha/año"
    },
    {
      id: "platano",
      name: "Plátano / Banano (Musa spp.)",
      category: "frutales",
      icon: "🍌",
      family: "Musaceae",
      optimalTemp: "24°C - 30°C",
      idealPh: "5.8 - 6.8",
      soilType: "Aluvial, rico en materia orgánica, más de 1m de profundidad",
      waterRequirement: "1500 - 2200 mm/año (Alto consumidor de agua y K)",
      cycleDays: "9 - 12 meses por racimo (rebrotes continuos)",
      sowingDensity: "1,400 - 1,800 matas/ha",
      rowSpacing: "2.5 - 3.0 m",
      plantSpacing: "2.0 - 2.5 m",
      depth: "Hoyos de 40x40x40 cm",
      expectedYield: "30 - 60 ton/ha/año",
      description: "Megaforbia de rapidísimo crecimiento vegetativo, con altísima demanda de Potasio para el llenado del racimo.",
      keyCare: [
        "Deshoje sanitario frecuente contra Sigatoka negra (Mycosphaerella fijiensis).",
        "Deshije selectivo dejando 'madre, hija y nieta' para ciclos continuos.",
        "Embolsado del racimo para proteger contra insectos y roces mecánicos."
      ],
      npkRatio: "250 - 60 - 450 kg/ha/año"
    }
  ],

  pestsAndDiseases: [
    {
      id: "cogollero",
      name: "Gusano Cogollero (Spodoptera frugiperda)",
      type: "plaga",
      category: "Insecto Lepidóptero",
      icon: "🐛",
      affectedCrops: ["Maíz", "Sorgo", "Arroz", "Pasto"],
      affectedParts: ["Hojas", "Cogollo / Meristemo apical"],
      symptoms: "Hojas perforadas en forma de perdigonada, presencia de aserrín o excremento fresco dentro del cogollo, defoliación rápida en plántulas.",
      organicTreatment: [
        "Aplicación de Bacillus thuringiensis (Bt) cepa kurstaki (1-2 g/L).",
        "Liberación de avispitas parasitoides Trichogramma spp.",
        "Uso de extractos de Neem (Azadiractina) al 1% en horas de la tarde.",
        "Aplicación de tierra de diatomeas o ceniza cernida al cogollo."
      ],
      chemicalTreatment: [
        "Clorantraniliprol (Coragen) a dosis recomendada por fabricante.",
        "Emamectina benzoato o Spinetoram en rotación para evitar resistencia.",
        "Aplicar con boquilla de cono dirigida directo al verticilo o cogollo."
      ],
      prevention: "Monitoreo con trampas de feromonas desde la siembra; evitar siembras tardías escalonadas."
    },
    {
      id: "tizon_tardio",
      name: "Tizón Tardío / Rancha (Phytophthora infestans)",
      type: "enfermedad",
      category: "Oomiceto / Hongo Falso",
      icon: "🍄",
      affectedCrops: ["Tomate", "Papa", "Berenjena"],
      affectedParts: ["Hojas", "Tallos", "Frutos / Tubérculos"],
      symptoms: "Manchas irregulares verde oscuras que se tornan pardas y necróticas con halo clorótico; micelio blanco algodonoso en el envés bajo alta humedad (>90%).",
      organicTreatment: [
        "Caldo Bordelés al 1% (Sulfato de cobre + Cal viva) como preventivo.",
        "Extracto de cola de caballo (Equisetum arvense) rico en sílice.",
        "Biofungicidas a base de Trichoderma harzianum y Bacillus subtilis.",
        "Eliminación y quema/entierro inmediato de material infectado."
      ],
      chemicalTreatment: [
        "Preventivos: Mancozeb, Clorotalonil o Propineb antes de lluvias.",
        "Sistémicos curativos tempranos: Metalaxil-M + Mancozeb, Cymoxanil o Dimetomorf.",
        "Rotar grupos químicos FRAC para evitar tolerancia."
      ],
      prevention: "Distanciamiento adecuado entre plantas para ventilación; evitar riego por aspersión que moje follaje; uso de variedades resistentes."
    },
    {
      id: "mosca_blanca",
      name: "Mosca Blanca (Bemisia tabaci / Trialeurodes)",
      type: "plaga",
      category: "Insecto Hemíptero",
      icon: "🪰",
      affectedCrops: ["Tomate", "Frijol", "Cucurbitáceas", "Algodón", "Cítricos"],
      affectedParts: ["Envés de hojas", "Brotes tiernos"],
      symptoms: "Clorosis y amarilleo general, fumagina negra por secreción de mielecilla, caída de hojas y transmisión de virus devastadores (Begomovirus).",
      organicTreatment: [
        "Jabón potásico (10-15 ml/L) + Aceite de Neem (5 ml/L) directo al envés.",
        "Hongos entomopatógenos: Beauveria bassiana y Paecilomyces fumosoroseus.",
        "Trampas cromáticas amarillas adhesivas distribuidas en el lote (1 cada 100 m²)."
      ],
      chemicalTreatment: [
        "Acetamiprid, Imidacloprid o Tiametoxam en aplicación focalizada.",
        "Spiromesifen o Piriproxifeno para romper ciclo de ninfas y huevos."
      ],
      prevention: "Eliminar malezas hospederas en bordes de la parcela; colocar mallas anti-áfidos en viveros."
    },
    {
      id: "roya_cafe",
      name: "Roya del Cafeto (Hemileia vastatrix)",
      type: "enfermedad",
      category: "Hongo Basidiomiceto",
      icon: "🍂",
      affectedCrops: ["Café"],
      affectedParts: ["Envés de las hojas"],
      symptoms: "Pústulas de color amarillo-anaranjado con aspecto polvoso en el envés de las hojas adultas; causa defoliación severa y pérdida de cosecha.",
      organicTreatment: [
        "Caldo Sulfocálcico o Caldo Viçosa aplicado en pre-floración.",
        "Foliar a base de biofermentos enriquecidos con sales minerales y Boro.",
        "Manejo de podas de aclareo para regular luz y aireación en el cafetal."
      ],
      chemicalTreatment: [
        "Preventivo: Oxicloruro de cobre o Hidróxido de cobre al inicio de lluvias.",
        "Curativo/Sistémico: Triazoles (Ciproconazol, Epoxiconazol) o Estrobilurinas en picos críticos."
      ],
      prevention: "Sembrar variedades tolerantes/resistentes (ej. Castillo, Catimor, Geisha); fertilización balanceada en potasio."
    },
    {
      id: "arana_roja",
      name: "Ácaro / Araña Roja (Tetranychus urticae)",
      type: "plaga",
      category: "Ácaro Fitófago",
      icon: "🕷️",
      affectedCrops: ["Tomate", "Fresa", "Cítricos", "Aguacate", "Hortalizas"],
      affectedParts: ["Hojas", "Frutos en formación"],
      symptoms: "Punteado fino blanquecino o amarillento en el haz; hojas bronceadas o quebradizas con telarañas finas en el envés bajo clima cálido y seco.",
      organicTreatment: [
        "Azufre elemental micronizado o mojable (no usar si temp > 32°C ni con aceites).",
        "Depredadores biológicos: Ácaro Phytoseiulus persimilis.",
        "Extracto alcohólico de ajo y chile picante macerado."
      ],
      chemicalTreatment: [
        "Abamectina, Bifenazato o Hexitiazox aplicando con alto volumen de agua para cubrir envés."
      ],
      prevention: "Mantener buena humedad ambiental; evitar estrés hídrico; no levantar polvo excesivo en caminos de la finca."
    },
    {
      id: "pudricion_raiz",
      name: "Pudrición Radicular (Phytophthora / Fusarium / Pythium)",
      type: "enfermedad",
      category: "Complejo de Hongos del Suelo",
      icon: "🌱",
      affectedCrops: ["Aguacate", "Cítricos", "Hortalizas", "Legumbres"],
      affectedParts: ["Raíces", "Cuello de la planta", "Sistema vascular"],
      symptoms: "Marchitez sin motivo aparente en horas de sol, raíces ennegrecidas y desintegradas, clorosis apical, cancros o exudados gomosos en la base.",
      organicTreatment: [
        "Inoculación masiva de Trichoderma asperellum + micorrizas al hoyo de siembra.",
        "Enmiendas de composta madura con microorganismos de montaña.",
        "Fosfito de potasio para inducir fitoalexinas y defensas naturales de la planta."
      ],
      chemicalTreatment: [
        "Fosetil-Aluminio o Metalaxil aplicado en drench al cuello de la raíz.",
        "Procloraz o Tebuconazol en caso de Fusarium vascular."
      ],
      prevention: "Siembra en camellones altos; zanjas de drenaje; nunca plantar en zonas anegables; desinfección de herramientas."
    }
  ],

  calculatorTemplates: {
    npkFormulas: [
      { name: "Urea (46-0-0)", n: 46, p: 0, k: 0 },
      { name: "DAP - Fosfato Diamónico (18-46-0)", n: 18, p: 46, k: 0 },
      { name: "Cloruro de Potasio - KCl (0-0-60)", n: 0, p: 0, k: 60 },
      { name: "Sulfato de Potasio (0-0-50 + 18S)", n: 0, p: 0, k: 50 },
      { name: "NPK Triple 15 (15-15-15)", n: 15, p: 15, k: 15 },
      { name: "Nitrato de Calcio (15.5-0-0 + 26CaO)", n: 15.5, p: 0, k: 0 }
    ],
    soilFactors: {
      arenoso: { infiltrationRate: "Alta", fieldCapacity: 12, waterFactor: 1.2, name: "Arenoso (Drenaje rápido, requiere riegos frecuentes)" },
      franco: { infiltrationRate: "Óptima", fieldCapacity: 24, waterFactor: 1.0, name: "Franco (Equilibrado, excelente retención y aireación)" },
      arcilloso: { infiltrationRate: "Lenta", fieldCapacity: 35, waterFactor: 0.85, name: "Arcilloso (Alta retención, riesgo de encharque)" }
    }
  },

  seasonalCalendar: [
    {
      season: "Primavera / Inicio de Lluvias",
      months: "Marzo - Mayo",
      icon: "🌱",
      focus: "Preparación de suelos, siembra de granos básicos y fertilización de fondo.",
      tasks: [
        "Análisis de suelos y aplicación de enmiendas calcáreas (Cal agrícola).",
        "Siembra principal de maíz, frijol y hortalizas de ciclo corto.",
        "Instalación de trampas de monitoreo para plagas tempranas.",
        "Inoculación de semillas y biofertilización con micorrizas."
      ]
    },
    {
      season: "Verano / Desarrollo Activo",
      months: "Junio - Agosto",
      icon: "☀️",
      focus: "Manejo fitosanitario, aporques, control de malezas y fertilización foliar.",
      tasks: [
        "Aporque de maíz y papa; tutorado y poda de tomates.",
        "Fertilización nitrogenada y potásica de desarrollo (reabono).",
        "Monitoreo intensivo de hongos foliares tras eventos de lluvia.",
        "Manejo integrado de insectos chupadores (mosca blanca, pulgones)."
      ]
    },
    {
      season: "Otoño / Maduración y Cosecha",
      months: "Septiembre - Noviembre",
      icon: "🌾",
      focus: "Recolección, secado, almacenamiento seguro y siembras de relevo.",
      tasks: [
        "Cosecha oportuna de granos con humedad menor al 14% para guardado.",
        "Corte y curado de tubérculos y bulbos (papa, cebolla).",
        "Podas sanitarias en frutales y cafetales al finalizar la cosecha.",
        "Siembra de cultivos de cobertura y abonos verdes para proteger el suelo."
      ]
    },
    {
      season: "Invierno / Descanso y Mantenimiento",
      months: "Diciembre - Febrero",
      icon: "❄️",
      focus: "Mantenimiento de infraestructura de riego, maquinaria y compostaje.",
      tasks: [
        "Limpieza y desinfección de reservorios, mangueras y goteros.",
        "Volteo y enriquecimiento de pilas de compost y lumbricompuesto.",
        "Planificación agronómica y compra anticipada de insumos certificados.",
        "Manejo de podas de estructura en frutales caducifolios y cítricos."
      ]
    }
  ]
};
