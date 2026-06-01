import { Slide, Ingredient, UseCase, ManufacturingStep, TestDetail, GanttTask } from './types';

// Importing our high-quality generated assets
import aerodermBottle from './assets/images/aeroderm_bottle_1780323735341.png';
import aerodermIngredients from './assets/images/aeroderm_ingredients_1780323754959.png';
import aerodermProcess from './assets/images/aeroderm_process_1780323771040.png';
import aerodermTesting from './assets/images/aeroderm_testing_1780323790287.png';

export const IMAGES = {
  bottle: aerodermBottle,
  ingredients: aerodermIngredients,
  process: aerodermProcess,
  testing: aerodermTesting,
};

export const SLIDES: Slide[] = [
  {
    id: 1,
    title: "AeroDerm",
    subtitle: "Aerosol Protector Ecológico y Barrera Térmica Instantánea",
    type: "cover",
    speakerNotes: [
      "Dar la bienvenida a la presentación de AeroDerm.",
      "Destacar que AeroDerm es una respuesta innovadora, ecológica y biotecnológica a las quemaduras por calor extremo.",
      "Mencionar que el producto nace de la necesidad de ofrecer una barrera de primeros auxilios y protección inmediata ante incendios o accidentes."
    ]
  },
  {
    id: 2,
    title: "Introducción al Proyecto",
    subtitle: "La respuesta biotecnológica a la protección térmica",
    type: "intro",
    speakerNotes: [
      "Explicar que la idea surge al pensar en los riesgos cotidianos e industriales del calor extremo.",
      "AeroDerm no busca reemplazar trajes de protección específicos, sino añadir una capa extra y rápida.",
      "Enfatizar el doble enfoque: salvar vidas/piel y salvar el medio ambiente mediante envases biodegradables y compostables."
    ]
  },
  {
    id: 3,
    title: "¿Para qué sirve y quién lo usa?",
    subtitle: "Aplicaciones del aerosol en situaciones críticas",
    type: "use-cases",
    speakerNotes: [
      "Presentar los perfiles de uso: profesionales y civiles.",
      "Destacar que sirve para crear una capa protectora temporal antes o durante una emergencia térmica.",
      "Enfatizar que es crucial para bomberos o trabajadores industriales, pero también de uso doméstico y de primeros auxilios."
    ]
  },
  {
    id: 4,
    title: "¿Cómo funciona la barrera?",
    subtitle: "Fisiología y física detrás de la capa de AeroDerm",
    type: "how-works",
    speakerNotes: [
      "Explique el proceso físico: el hidrogel actúa como disipador y barrera aislante frente al calor externo.",
      "La duración varía según roce y temperatura extrema (entre 30 minutos y 2 horas).",
      "Es similar a un protector solar, absorbe y retrasa la transferencia térmica al tejido de la piel."
    ]
  },
  {
    id: 5,
    title: "Materiales y Composición",
    subtitle: "Ingredientes 100% biodegradables y renovables",
    type: "materials",
    speakerNotes: [
      "Exponer los tres pilares activos: Alginato de Sodio, Quitosano y Glicerol Vegetal.",
      "Explicar las algas marinas como reservorio de agua y el quitosano fúngico como antibacteriano regenerativo.",
      "Hablar sobre el sistema Bag-on-Valve (BoV) que no usa gases fluorados nocivos (libre de HFC), empleando solo aire comprimido o nitrógeno."
    ]
  },
  {
    id: 6,
    title: "Proceso de Fabricación",
    subtitle: "Estándares y formulación en el laboratorio",
    type: "manufacturing",
    speakerNotes: [
      "Detallar las 4 fases secuenciales de laboratorio.",
      "Destacar la química limpia de disolver el quitosano en un solvente suave y natural como el ácido láctico.",
      "Resaltar el envasado industrial controlado mediante el sistema ecológico Bag-on-Valve."
    ]
  },
  {
    id: 7,
    title: "Pruebas y Ensayos de Seguridad",
    subtitle: "Riguroso control de calidad y validación científica",
    type: "testing",
    speakerNotes: [
      "Comentar las pruebas de laboratorio necesarias para garantizar la consistencia (reología) y la estabilidad protectora.",
      "Importancia crucial de mantener la citotoxicidad estricta en 0% asegurando total biocompatibilidad.",
      "Explicar que de manera práctica se aplicó sobre piel sintética expuesta al fuego para monitorear el aislamiento en sensores."
    ]
  },
  {
    id: 8,
    title: "Cronograma de Desarrollo",
    subtitle: "Fases hacia la comercialización (Gantt)",
    type: "gantt",
    speakerNotes: [
      "Revisar el cronograma del proyecto de 12 meses.",
      "Investigación inicial y fórmula cubren el primer semestre.",
      "El diseño de envase y pruebas de ajuste se dan en el segundo semestre, preparando el lanzamiento de fin de año.",
      "Subrayar que es una planificación estructurada y realista."
    ]
  },
  {
    id: 9,
    title: "Simulador Interactivo de Eficacia",
    subtitle: "Demostración de la barrera de hidrogel en tiempo real",
    type: "simulator",
    speakerNotes: [
      "Invitar a la audiencia a interactuar con el simulador.",
      "Comprobar visualmente que la piel sin AeroDerm alcanza temperaturas de quemadura en segundos.",
      "Mostrar que la piel tratada con AeroDerm retiene agua disipando el calor y retrasando de forma segura quemaduras."
    ]
  }
];

export const INGREDIENTS: Ingredient[] = [
  {
    name: "Alginato de Sodio",
    source: "Algas Marinas Pardas",
    description: "Polisacárido natural que funciona como la matriz principal y formadora de gel. Crea la red tridimensional hidratada que bloquea el calor.",
    role: "Retención de agua extrema y disipación térmica",
    ecoFeature: "100% natural, renovable y biodegradable",
    color: "teal"
  },
  {
    name: "Quitosano (Chitosan)",
    source: "Pared fúngica (Hongos) o Crustáceos",
    description: "Polímero natural que proporciona adherencia tenaz a la piel humana y posee valiosas propiedades antibacterianas y regeneradoras celulares.",
    role: "Bioadherencia excelente, cicatrización y protección microbiana",
    ecoFeature: "Subproducto orgánico valorizado, no contamina",
    color: "blue"
  },
  {
    name: "Glicerol Vegetal",
    source: "Aceites Vegetales",
    description: "Agente humectante que retiene la humedad del hidrogel, evitando que la capa fina se seque y agriete demasiado rápido ante el calor.",
    role: "Preservación del agua, flexibilidad de la capa protectora",
    ecoFeature: "Compostable, orgánico y biocompatible",
    color: "amber"
  },
  {
    name: "Sistema Bag-on-Valve (BoV)",
    source: "Tecnología de Envasado Ecológico",
    description: "Bolsa flexible interna que separa el producto del propelente. Utiliza aire comprimido purificado o nitrógeno en lugar de gases HFC contaminantes.",
    role: "Propulsión limpia, spray continuo a 360 grados",
    ecoFeature: "Elimina gases de efecto invernadero perjudiciales",
    color: "sky"
  }
];

export const USE_CASES: UseCase[] = [
  {
    title: "Bomberos y rescatistas",
    items: [
      "Protección extra facial y en extremidades expuestas a ráfagas de calor",
      "Barrera protectora rápida antes de entrar a zonas calientes",
      "Seguridad añadida no-inflamable ante fallos del equipo"
    ],
    icon: "ShieldAlert"
  },
  {
    title: "Trabajadores Industriales",
    items: [
      "Operarios de metalurgia pesada, fundiciones y hornos de alta temperatura",
      "Evitación de quemaduras accidentales por salpicaduras leves de líquidos calientes",
      "Reducción sustancial del estrés térmico muscular y dérmico"
    ],
    icon: "Factory"
  },
  {
    title: "Cocinas Profesionales",
    items: [
      "Protección ante agua hirviendo, vapores de presión y aceites calientes",
      "Fácil de colocar en manos e interior del brazo durante picos de trabajo",
      "Acción antibacteriana segura para manipulación indirecta"
    ],
    icon: "Flame"
  },
  {
    title: "Uso Civil y Emergencias",
    items: [
      "Primeros auxilios rápidos en coches o casas ante incendios accidentales",
      "Evacuación de zonas de riesgo atravesando cortinas térmicas leves",
      "Protección recreativa para actividades al aire libre o cerca de fogatas"
    ],
    icon: "Sparkles"
  }
];

export const MANUFACTURING_STEPS: ManufacturingStep[] = [
  {
    stepNumber: 1,
    title: "Preparación del Solvente Ácido",
    description: "Se prepara una formulación estéril mezclando agua destilada purificada con ácido láctico en concentraciones controladas.",
    details: [
      "pH objetivo regulado para asegurar compatibilidad cutánea ideal",
      "El ácido láctico actúa como solvente ecológico catalizador",
      "Temperatura ambiente bajo ambiente estéril libre de patógenos"
    ],
    equipment: "Reactores encamisados de vidrio templado"
  },
  {
    stepNumber: 2,
    title: "Disolución del Quitosano",
    description: "El polvo ultrafino de quitosano purificado se añade lentamente al solvente ácido, activando sus propiedades biopoliméricas.",
    details: [
      "Agitación mecánica continua de alta velocidad (1200 RPM)",
      "Proceso que rompe los gránulos para obtener una solución viscosa traslúcida",
      "Filtros de control para evitar insolubles remanentes"
    ],
    equipment: "Agitador de hélice constante con monitoreo reológico"
  },
  {
    stepNumber: 3,
    title: "Incorporación de Alginato y Glicerol",
    description: "Se integran de forma precisa el alginato de sodio marino y el glicerol vegetal para dar plasticidad y cohesión al hidrogel final.",
    details: [
      "Mezclado lento al vacío para evitar la oclusión de burbujas de aire no deseadas",
      "Consistencia de hidrogel continuo, de textura agradable y frescura inmediata",
      "Mediciones de viscosidad en línea"
    ],
    equipment: "Mezclador homogeneizador al vacío de alta densidad"
  },
  {
    stepNumber: 4,
    title: "Envasado presurizado Bag-on-Valve",
    description: "El hidrogel se introduce en bolsas de aluminio soldadas dentro de la lata, presurizándose exteriormente con aire comprimido.",
    details: [
      "Aislamiento térmico y físico total entre el hidrogel purificado y el aire propelente",
      "Llenado y sellado automático hermético libre de contaminación",
      "Capacidad de pulverización continua desde cualquier ángulo"
    ],
    equipment: "Línea rotativa de envasado Bag-on-Valve estéril"
  }
];

export const TEST_DETAILS: TestDetail[] = [
  {
    title: "Viscosidad y Reología",
    category: "lab",
    description: "Verificación de que el gel posee la viscosidad perfecta para poder pulverizarse finamente como aerosol pero adherirse a la piel sin escurrir.",
    method: "Viscosímetro de rotación Brookfield",
    status: "Conforme"
  },
  {
    title: "Estabilidad Térmica",
    category: "lab",
    description: "Someter muestras del hidrogel a ciclos de calor de hasta 150°C para asegurar que el compuesto no se desnaturaliza ni pierde propiedades.",
    method: "Cámara de termoestabilidad controlada",
    status: "Conforme"
  },
  {
    title: "Citotoxicidad y Biocompatibilidad",
    category: "lab",
    description: "Evaluación biológica de cultivos celulares en contacto con el gel para ratificar la total ausencia de toxicidad dérmica.",
    method: "Normas ISO 10993 de biocompatibilidad",
    status: "Excelencia (0% Citotóxico)"
  },
  {
    title: "Barrera Térmica (Sensores)",
    category: "function",
    description: "Pruebas físicas sobre piel sintética equipada con termopares, midiendo minuciosamente el retardo en la transferencia térmica.",
    method: "Pistola soplete regulada y sensores térmicos",
    status: "Retardo de hasta 20 veces a 120°C"
  },
  {
    title: "Aislamiento de Intumescencia",
    category: "function",
    description: "Exposición directa de la película del gel a llama abierta para analizar la intumescencia (formación de una capa protectora carbonosa carbonizada que frena el fuego).",
    method: "Ensayo de pirólisis regulada",
    status: "Formación de microbarrera de agua evaporativa"
  }
];

export const GANTT_TASKS: GanttTask[] = [
  {
    id: 1,
    activity: "Investigación Inicial",
    startMonth: 1,
    endMonth: 2,
    color: "teal-500",
    milestones: ["Análisis bibliográfico", "Estadísticas de siniestralidad", "Estudio de patentes preexistentes"]
  },
  {
    id: 2,
    activity: "Definición del Producto",
    startMonth: 2,
    endMonth: 4,
    color: "teal-500",
    milestones: ["Identificación de requerimientos legales", "Viscosidad objetivo", "Especificación técnica"]
  },
  {
    id: 3,
    activity: "Búsqueda de Materiales Ecológicos",
    startMonth: 3,
    endMonth: 5,
    color: "lime-500",
    milestones: ["Selección de proveedores de alginato marino", "Certificación ecológica de quitosano"]
  },
  {
    id: 4,
    activity: "Desarrollo de Fórmula",
    startMonth: 4,
    endMonth: 7,
    color: "blue-500",
    milestones: ["Pruebas de gelificación a distintos pH", "Análisis de sinéresis del hidrogel"]
  },
  {
    id: 5,
    activity: "Pruebas de Eficacia y Seguridad",
    startMonth: 7,
    endMonth: 9,
    color: "amber-500",
    milestones: ["Estabilidad en horno", "Evaluación de biocompatibilidad ISO 10993"]
  },
  {
    id: 6,
    activity: "Diseño del Envase y Etiqueta",
    startMonth: 8,
    endMonth: 10,
    color: "orange-500",
    milestones: ["Modelado 3D del envase", "Validación ecológica de tintas solubles"]
  },
  {
    id: 7,
    activity: "Producción de Prueba",
    startMonth: 10,
    endMonth: 11,
    color: "indigo-500",
    milestones: ["Lote piloto de 500 unidades", "Calibración del envasado BoV"]
  },
  {
    id: 8,
    activity: "Pruebas Finales y Ajustes",
    startMonth: 11,
    endMonth: 12,
    color: "rose-500",
    milestones: ["Corrección de pulverización", "Validación mecánica de la boquilla"]
  },
  {
    id: 9,
    activity: "Lanzamiento y Difusión",
    startMonth: 11,
    endMonth: 12,
    color: "violet-500",
    milestones: ["Campaña informativa", "Demostraciones públicas de barrera térmica", "Registro nacional"]
  }
];

export const MONTH_NAMES = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
];
