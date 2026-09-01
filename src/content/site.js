/**
 * Fuente única: TutoGo Sales Book 2026.
 * No agregar claims, cifras ni datos que no estén en el documento.
 */

import { markets as marketList } from "../data/markets.js";

export const site = {
  name: "TutoGo",
  wordmark: "TUTOGO",
  eyebrow: "Media & Advertising",
  definition:
    "Una comunidad femenina adulta que conecta, conversa y comparte.",
  followersLabel: "166,136 seguidores en TikTok",
  followers: 166136,
  followersFormatted: "166,136",
  footerLine: "Más que seguidores. Una comunidad.",
};

export const nav = [
  { href: "#audiencia", label: "Audiencia" },
  { href: "#comunidad", label: "Comunidad" },
  { href: "#publicidad", label: "Publicidad" },
  { href: "#por-que", label: "Por qué TutoGo" },
  { href: "#campana", label: "Contacto" },
];

export const hero = {
  ctaPrimary: { href: "#campana", label: "Anuncia tu marca" },
};

export const numbers = {
  kicker: "TutoGo en números",
  lead: "El tamaño y comportamiento real de la comunidad.",
  primary: { value: "166,136", label: "Seguidores" },
  items: [
    { value: "78%", label: "Mujeres" },
    { value: "84.4%", label: "Seguidores de 35 años a más" },
    { value: "61.8%", label: "Seguidores de 45 años a más" },
    { value: "9–10 PM", label: "Horario de mayor actividad" },
    { value: "+123", label: "Crecimiento neto último período" },
  ],
};

export const audience = {
  title: "¿Quién es la audiencia?",
  highlight: "La mujer latinoamericana de 40–60 años",
  body: "TutoGo conecta con una mujer adulta, digitalmente activa y con fuerte capacidad de decisión dentro de su entorno personal y familiar. No usa TikTok solo para consumir tendencias.",
  uses: [
    "Entretenerse y desconectar",
    "Identificarse con historias",
    "Descubrir productos y servicios",
    "Conversar y opinar",
  ],
  profileLabel: "Perfil central",
  profile: [
    "Mujer",
    "40–60 años",
    "Latinoamérica",
    "Digitalmente activa",
    "Consumidora y potencial decisora de compra",
  ],
  note: "Trabajadora dependiente, profesional, comerciante, emprendedora o dedicada al hogar: una decisora clave en el consumo familiar.",
};

export const age = {
  title: "Distribución por edad",
  bars: [
    { range: "18–24", value: 3.5, tone: "wine" },
    { range: "25–34", value: 12.1, tone: "wine" },
    { range: "35–44", value: 22.6, tone: "rose" },
    { range: "45–54", value: 36.3, tone: "gold" },
    { range: "55+", value: 25.5, tone: "rose" },
  ],
  highlightA: {
    value: "84.4%",
    text: "de los seguidores tiene 35 años o más",
  },
  highlightB: {
    value: "61.8%",
    text: "tiene 45 años o más — un segmento distinto al público adolescente típico de TikTok",
  },
};

export const gender = {
  title: "Género",
  women: 78,
  men: 22,
  womenLabel: "Mujeres",
  menLabel: "Hombres",
  note: "La consistencia entre seguidores y espectadores confirma que el posicionamiento femenino es estructural, no circunstancial.",
};

export const markets = {
  title: "Alcance regional",
  kicker: "Top 5 mercados",
  items: marketList.map((item) => ({
    country: item.country,
    value: item.percentage,
  })),
  concentration: "48.1%",
  concentrationText:
    "de la audiencia se concentra en estos 5 mercados — base para campañas locales, regionales o multimercado.",
};

export const defines = {
  title: "¿Qué define a esta audiencia?",
  steps: [
    {
      n: "01",
      title: "Identificación",
      text: "Responde a contenidos con los que puede sentirse representada.",
    },
    {
      n: "02",
      title: "Conexión",
      text: "Comunicación dirigida a experiencias reales de mujeres adultas.",
    },
    {
      n: "03",
      title: "Conversación",
      text: "El contenido genera comentarios y opiniones en la comunidad.",
    },
    {
      n: "04",
      title: "Compartibilidad",
      text: "El contenido emocional viaja de usuaria a usuaria.",
    },
    {
      n: "05",
      title: "Descubrimiento",
      text: "Funciona como vehículo para introducir marcas y productos.",
    },
  ],
};

export const categories = {
  title: "Mercado objetivo para publicidad",
  lead: "Categorías con especial afinidad comercial hacia mujeres adultas y hogares.",
  items: [
    "Belleza & Cuidado Personal",
    "Moda & Lifestyle",
    "Hogar",
    "Alimentación",
    "Servicios Financieros",
    "Viajes & Experiencias",
    "Automotriz",
    "Tecnología",
  ],
};

export const formats = {
  title: "Formatos publicitarios",
  items: [
    {
      n: "01",
      title: "Brand Video",
      text: "Contenido creado a medida para lanzamientos y campañas de awareness.",
    },
    {
      n: "02",
      title: "Product Integration",
      text: "El producto aparece integrado naturalmente en el contenido.",
    },
    {
      n: "03",
      title: "Brand Mention",
      text: "Integración táctica dentro de contenido de alto alcance.",
    },
    {
      n: "04",
      title: "Product Review",
      text: "Presentación o prueba de producto, ideal para explicar o demostrar.",
    },
  ],
  multiLabel: "Campañas multivideo",
  flow: ["Descubrimiento", "Experiencia", "Recomendación", "Recordación / CTA"],
};

export const why = {
  title: "¿Por qué TutoGo?",
  items: [
    {
      figure: "166K+",
      label: "Seguidores",
      text: "Una comunidad digital consolidada",
    },
    {
      figure: "78%",
      label: "Mujeres",
      text: "Audiencia claramente definida",
    },
    {
      figure: "84.4%",
      label: "Mayores de 35 años",
      text: "Acceso a un segmento adulto",
    },
    {
      figure: "LatAm",
      label: "",
      text: "Alcance regional distribuido en múltiples mercados",
    },
    {
      figure: "Escalable",
      label: "",
      text: "Campañas locales, regionales y multimercado",
    },
  ],
};

export const contactCta = {
  title: "Hablemos de tu campaña",
  lead: "¿Quieres llegar a una comunidad femenina latinoamericana?",
  body: "Diseñemos una campaña a la medida de tus objetivos.",
  formatLabel: "Tipo de colaboración",
  formats: formats.items.map((item) => item.title),
  reachLabel: "¿Qué alcance buscas?",
  reach: ["Local", "Regional", "Multimercado"],
  form: {
    name: "Nombre",
    company: "Empresa / Marca",
    email: "Correo electrónico",
    phone: "Teléfono / WhatsApp",
    country: "País",
    message: "Mensaje",
    submit: "Enviar solicitud",
    sending: "Enviando…",
    required: "Este campo es obligatorio.",
    emailInvalid: "Ingresa un correo electrónico válido.",
    successKicker: "Listo",
    successTitle: "Solicitud enviada",
    successBody: "Gracias. Ya tenemos tu propuesta de campaña.",
    successThanks: "Gracias, {name}. Ya tenemos tu propuesta de campaña.",
    successAgain: "Enviar otra solicitud",
  },
  categories: ["Publicidad", "Colaboraciones", "Campañas", "Contenido de Marca"],
};
