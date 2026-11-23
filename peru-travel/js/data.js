/* ============ DATOS DE LA APLICACIÓN ============
   Imágenes: cada elemento lleva una lista de candidatos "idioma:Título del artículo de Wikipedia".
   js/main.js (ImageLoader) consulta la API pública de Wikipedia (REST summary) y usa la primera
   fotografía disponible (Wikimedia Commons, licencias libres). Cada foto enlaza a su página de origen.
*/
const PERU = {};

PERU.regions = {
  costa: {
    key: "costa", name: "Costa", emoji: "🌊",
    tagline: "Desiertos, oasis y el Pacífico",
    cardDesc: "Desiertos junto al Pacífico, culturas precolombinas y la cuna del ceviche.",
    intro: "La costa peruana destaca por su litoral del Pacífico, sus desiertos, sus ciudades históricas, sus culturas precolombinas y una gastronomía basada principalmente en pescados y mariscos.",
    hero: ["es:Huacachina", "en:Huacachina"],
    heroAlt: "Dunas y oasis de Huacachina, en la costa de Ica",
    sections: [
      { key: "patrimonio", kind: "patrimonio", title: "Patrimonio cultural", lead: "Historia, civilizaciones y legado de los pueblos que habitaron el desierto costero mucho antes de la llegada de los españoles." },
      { key: "turismo", kind: "turismo", title: "Lugares turísticos", lead: "Experiencias y actividades para el visitante: dunas, playas y pueblos de pescadores." },
      { key: "gastronomia", kind: "plato", title: "Gastronomía típica", lead: "Tres platos imprescindibles de la cocina costeña y dónde probarlos." }
    ]
  },
  sierra: {
    key: "sierra", name: "Sierra", emoji: "⛰️",
    tagline: "Los Andes: imperio, altura y tradición",
    cardDesc: "La cordillera de los Andes, el legado inca y una cocina de altura.",
    intro: "La sierra peruana está marcada por la cordillera de los Andes, sus paisajes montañosos, las culturas ancestrales, los pueblos tradicionales y una gastronomía vinculada a los productos andinos.",
    hero: ["es:Machu_Picchu", "en:Machu_Picchu"],
    heroAlt: "Ciudadela inca de Machu Picchu entre montañas",
    sections: [
      { key: "patrimonio", kind: "patrimonio", title: "Patrimonio cultural", lead: "El mundo inca y otras culturas andinas: ciudades, fortalezas y formas de organizar el territorio." },
      { key: "turismo", kind: "turismo", title: "Lugares turísticos", lead: "Rutas, lagos y cañones para vivir los Andes." },
      { key: "gastronomia", kind: "plato", title: "Gastronomía típica", lead: "Cocina de altura con productos andinos y técnicas ancestrales." }
    ]
  },
  selva: {
    key: "selva", name: "Selva", emoji: "🌿",
    tagline: "Amazonía: biodiversidad y pueblos vivos",
    cardDesc: "Biodiversidad extraordinaria, ríos infinitos y culturas indígenas vivas.",
    intro: "La selva peruana representa una de las zonas con mayor biodiversidad del planeta. Destaca por sus ríos, bosques tropicales, comunidades indígenas, conocimientos ancestrales y gastronomía amazónica.",
    hero: ["es:Reserva_Nacional_Tambopata", "en:Tambopata_National_Reserve", "es:Amazonía_peruana"],
    heroAlt: "Bosque tropical amazónico de la Reserva Nacional Tambopata",
    sections: [
      { key: "patrimonio", kind: "patrimonio", title: "Patrimonio cultural", lead: "Tres pueblos indígenas amazónicos con lenguas, artes y conocimientos propios." },
      { key: "complementario", kind: "complementario", title: "Patrimonio histórico y cultural complementario", lead: "Otros testimonios históricos y culturales vinculados a la Amazonía y a su frontera andina." },
      { key: "turismo", kind: "turismo", title: "Lugares turísticos", lead: "Reservas naturales y cascadas para el ecoturismo responsable." },
      { key: "gastronomia", kind: "plato", title: "Gastronomía típica", lead: "Sabores amazónicos cocinados en hojas de bijao y a la brasa." }
    ]
  }
};

/* kinds: patrimonio | complementario | turismo | plato
   tags (para filtros): cultura | naturaleza | gastronomia | actividad */
PERU.items = [
  /* ---------------- COSTA · PATRIMONIO ---------------- */
  {
    id: "chan-chan", region: "costa", kind: "patrimonio", tags: ["cultura"], emoji: "🏺",
    title: "Chan Chan", place: "La Libertad (cerca de Trujillo)", lat: -8.1058, lng: -79.0742,
    img: ["es:Chan_Chan", "en:Chan_Chan"], alt: "Muros de adobe con relieves decorativos de la ciudad chimú de Chan Chan",
    desc: "Fue la capital del reino Chimú, que floreció aproximadamente entre los siglos IX y XV hasta su conquista por los incas hacia 1470. Es considerada una de las mayores ciudades de adobe del mundo y Patrimonio Mundial de la UNESCO desde 1986.",
    points: [
      "Organización social: una élite gobernante vivía en grandes recintos amurallados (ciudadelas o palacios), mientras artesanos y agricultores sostenían la economía.",
      "Arquitectura: muros de adobe decorados con relieves de peces, aves, olas y motivos geométricos, ligados al mar y a la pesca.",
      "Religión y técnica: el culto a la Luna y al mar; sistemas de pozos y reservorios para el agua. Las lluvias y El Niño son su mayor amenaza de conservación."
    ]
  },
  {
    id: "lineas-nazca", region: "costa", kind: "patrimonio", tags: ["cultura"], emoji: "🐒",
    title: "Líneas y geoglifos de Nazca", place: "Ica", lat: -14.739, lng: -75.13,
    img: ["es:Líneas_de_Nazca", "en:Nazca_Lines"], alt: "Vista aérea de un geoglifo de las Líneas de Nazca en el desierto de Ica",
    desc: "Conjunto de geoglifos monumentales trazados en la pampa desértica por la cultura Nazca, en un periodo que se sitúa aproximadamente entre el 500 a. C. y el 500 d. C. Son Patrimonio Mundial desde 1994.",
    points: [
      "Figuras: animales como el colibrí, el mono o la araña, además de líneas rectas y trapecios de gran longitud.",
      "Posibles funciones: rituales y ceremoniales (peticiones de agua), caminos procesionales y referencias astronómicas. No existe una única explicación aceptada.",
      "Legado: la investigadora Maria Reiche dedicó décadas a estudiarlas y protegerlas."
    ]
  },
  {
    id: "caral", region: "costa", kind: "patrimonio", tags: ["cultura"], emoji: "🔺",
    title: "Ciudad Sagrada de Caral", place: "Valle de Supe, Barranca (Lima)", lat: -10.893, lng: -77.52,
    img: ["es:Caral", "en:Caral"], alt: "Pirámides y plazas circulares de la ciudad sagrada de Caral",
    desc: "Uno de los centros urbanos más antiguos de América, con una antigüedad de unos 5000 años (hacia 3000–1800 a. C.). Fue declarada Patrimonio Mundial por la UNESCO en 2009.",
    points: [
      "Sociedad: una civilización temprana con jerarquías, especialización del trabajo e intercambio entre costa, sierra y selva.",
      "Arquitectura monumental: pirámides escalonadas, plazas circulares hundidas y áreas residenciales.",
      "Particularidad: se desarrolló sin cerámica, lo que la sitúa en el periodo llamado Arcaico Tardío."
    ]
  },
  /* ---------------- COSTA · TURISMO ---------------- */
  {
    id: "huacachina", region: "costa", kind: "turismo", tags: ["naturaleza", "actividad"], emoji: "🏜️",
    title: "Dunas de Ica – Huacachina", place: "Ica", lat: -14.0875, lng: -75.763,
    img: ["es:Huacachina", "en:Huacachina"], alt: "Oasis de Huacachina rodeado de grandes dunas",
    desc: "Un pequeño oasis natural rodeado de enormes dunas, a pocos minutos de la ciudad de Ica. Es uno de los lugares más fotogénicos del desierto peruano.",
    points: ["Paseos en buggy por las dunas.", "Sandboard.", "Atardeceres desde la cima de las dunas.", "Fotografía panorámica del oasis."]
  },
  {
    id: "mancora", region: "costa", kind: "turismo", tags: ["naturaleza", "actividad", "gastronomia"], emoji: "🏄",
    title: "Máncora", place: "Piura", lat: -4.103, lng: -81.0452,
    img: ["es:Máncora", "en:Máncora"], alt: "Playa de Máncora en el norte del Perú",
    desc: "El principal destino de playa del norte peruano, de clima cálido y olas constantes para el surf.",
    points: ["Surf y otras actividades acuáticas.", "Vida nocturna en el pueblo.", "Gastronomía marina fresca.", "Playas de aguas cálidas durante gran parte del año."]
  },
  {
    id: "huanchaco", region: "costa", kind: "turismo", tags: ["naturaleza", "actividad", "cultura"], emoji: "🛶",
    title: "Huanchaco", place: "La Libertad (cerca de Trujillo)", lat: -8.0775, lng: -79.1217,
    img: ["es:Huanchaco", "en:Huanchaco"], alt: "Caballitos de totora en la playa de Huanchaco",
    desc: "Playa tradicional famosa por sus caballitos de totora, embarcaciones de junco que los pescadores usan desde hace siglos y que enlazan con las antiguas tradiciones marítimas de la costa norte. Es un destino de surf reconocido.",
    points: ["Ver los caballitos de totora y la pesca artesanal.", "Surf para distintos niveles.", "Muy cerca de Chan Chan y Trujillo.", "Pueblo de pescadores con ambiente tranquilo."]
  },
  /* ---------------- COSTA · PLATOS ---------------- */
  {
    id: "ceviche", region: "costa", kind: "plato", tags: ["gastronomia"], emoji: "🐟",
    title: "Ceviche", place: "Plato nacional · cocina costeña", lat: null, lng: null,
    img: ["es:Ceviche", "en:Ceviche"], alt: "Plato de ceviche peruano con pescado, cebolla y maíz",
    desc: "Pescado fresco marinado en zumo de limón con cebolla y ají. Es el símbolo de la cocina peruana: su práctica fue declarada Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO en 2023.",
    ingredients: ["Pescado fresco", "Limón", "Cebolla roja", "Ají", "Cilantro"],
    origin: "Se sirve recién preparado y suele acompañarse de camote y choclo. Se come sobre todo al mediodía y es un orgullo nacional con su propio día de celebración (28 de junio).",
    restaurants: ["la-mar", "canta-rana"]
  },
  {
    id: "lomo-saltado", region: "costa", kind: "plato", tags: ["gastronomia"], emoji: "🥩",
    title: "Lomo saltado", place: "Cocina criolla · fusión chifa", lat: null, lng: null,
    img: ["es:Lomo_saltado", "en:Lomo_saltado"], alt: "Lomo saltado con carne, patatas fritas y arroz",
    desc: "Tiras de ternera salteadas a fuego muy vivo con cebolla y tomate, aliñadas con salsa de soja y acompañadas de patatas fritas y arroz.",
    ingredients: ["Carne de ternera", "Cebolla", "Tomate", "Salsa de soja", "Patatas fritas", "Arroz"],
    origin: "Muestra la influencia chino-peruana (cocina chifa), fruto de la inmigración china llegada al Perú desde el siglo XIX, que aportó el wok y la salsa de soja.",
    restaurants: ["panchita"]
  },
  {
    id: "aji-gallina", region: "costa", kind: "plato", tags: ["gastronomia"], emoji: "🍗",
    title: "Ají de gallina", place: "Cocina criolla limeña", lat: null, lng: null,
    img: ["es:Ají_de_gallina", "en:Aji_de_gallina"], alt: "Ají de gallina servido con arroz y papa",
    desc: "Pollo deshilachado en una cremosa salsa de ají amarillo, pan, leche y nueces, servido con arroz, papa y aceituna.",
    ingredients: ["Pollo deshilachado", "Ají amarillo", "Leche", "Pan", "Nueces"],
    origin: "Es un clásico de la cocina criolla, que mezcla herencias indígenas, españolas y africanas. Suele vincularse con recetas coloniales de manjar blanco.",
    restaurants: ["huaca-pucllana", "panchita"]
  },

  /* ---------------- SIERRA · PATRIMONIO ---------------- */
  {
    id: "machu-patrimonio", region: "sierra", kind: "patrimonio", tags: ["cultura"], emoji: "🏔️",
    title: "Machu Picchu (patrimonio inca)", place: "Cusco", lat: -13.1631, lng: -72.545,
    img: ["es:Machu_Picchu", "en:Machu_Picchu"], alt: "Vista clásica de la ciudadela inca de Machu Picchu",
    desc: "Ciudadela inca construida hacia mediados del siglo XV, en tiempos del emperador Pachacútec. Se cree que fue un complejo palaciego y religioso de la élite inca. Es Patrimonio Mundial desde 1983.",
    points: [
      "Función: política, religiosa y administrativa, vinculada al control del territorio y a la veneración de las montañas.",
      "Arquitectura: muros de piedra tallada ensamblada sin mortero, adaptados a la topografía.",
      "Ingeniería: terrazas agrícolas que estabilizan la ladera, y canales de agua y fuentes ceremoniales."
    ]
  },
  {
    id: "cusco", region: "sierra", kind: "patrimonio", tags: ["cultura"], emoji: "🏛️",
    title: "Cusco", place: "Cusco", lat: -13.5319, lng: -71.9675,
    img: ["es:Cuzco", "en:Cusco"], alt: "Plaza de Armas de Cusco con la catedral",
    desc: "Antigua capital del Imperio inca (Tawantinsuyu). Su trazado urbano se asocia en la tradición con la forma de un puma, y fue el centro político y religioso del imperio. Es Patrimonio Mundial desde 1983.",
    points: [
      "Religión: el Qorikancha, templo del Sol, era el principal centro ceremonial.",
      "Urbanismo: calles estrechas, muros incas de gran precisión y plazas ceremoniales como Haukaypata.",
      "Mestizaje: los españoles levantaron iglesias y casonas sobre cimientos incas; los muros incas resistieron los terremotos mejor que las construcciones coloniales."
    ]
  },
  {
    id: "kuelap-sierra", region: "sierra", kind: "patrimonio", tags: ["cultura"], emoji: "🧱",
    title: "Kuélap", place: "Amazonas", lat: -6.4183, lng: -77.9247,
    img: ["es:Kuélap", "en:Kuelap"], alt: "Murallas de piedra de la fortaleza de Kuélap",
    desc: "Complejo fortificado de la cultura Chachapoyas, situado a unos 3000 metros de altitud sobre el valle del Utcubamba. Su ocupación principal se sitúa a partir del siglo VI d. C.",
    points: [
      "Murallas monumentales de piedra de hasta unos 20 metros de altura.",
      "Arquitectura circular: cientos de viviendas y recintos de planta redonda.",
      "Valor arqueológico: ejemplo de una cultura andina distinta de la inca, que fue incorporada al imperio poco antes de la llegada de los españoles."
    ]
  },
  /* ---------------- SIERRA · TURISMO ---------------- */
  {
    id: "machu-turismo", region: "sierra", kind: "turismo", tags: ["actividad", "cultura", "naturaleza"], emoji: "🥾",
    title: "Visitar Machu Picchu", place: "Cusco", lat: -13.1631, lng: -72.545,
    img: ["es:Huayna_Picchu", "en:Huayna_Picchu", "es:Machu_Picchu"], alt: "Montaña Huayna Picchu junto a Machu Picchu",
    desc: "Experiencia de visita a la ciudadela: recorridos guiados por sus sectores, miradores y rutas de montaña. Es Patrimonio Mundial y una de las nuevas siete maravillas del mundo (2007).",
    points: ["Recorridos por la ciudadela por circuitos marcados.", "Paisajes de montaña y bosque de nubes.", "Rutas como el Camino Inca o ascensos a Huayna Picchu y a la montaña Machu Picchu.", "El acceso está regulado: consulta entradas y horarios en canales oficiales."]
  },
  {
    id: "titicaca", region: "sierra", kind: "turismo", tags: ["naturaleza", "cultura", "actividad"], emoji: "⛵",
    title: "Lago Titicaca", place: "Puno", lat: -15.8216, lng: -69.9686,
    img: ["es:Lago_Titicaca", "en:Lake_Titicaca"], alt: "Islas flotantes de los Uros en el lago Titicaca",
    desc: "Lago navegable a unos 3800 metros de altitud, compartido con Bolivia. Es uno de los lagos navegables más altos del mundo.",
    points: ["Islas flotantes de los Uros, hechas de totora.", "Visitas a comunidades tradicionales como las de Taquile y Amantaní.", "Cultura quechua y aimara viva.", "Paisajes altiplánicos y atardeceres sobre el agua."]
  },
  {
    id: "colca", region: "sierra", kind: "turismo", tags: ["naturaleza", "actividad"], emoji: "🦅",
    title: "Cañón del Colca", place: "Arequipa", lat: -15.6, lng: -71.89,
    img: ["es:Cañón_del_Colca", "en:Colca_Canyon"], alt: "Cañón del Colca con terrazas agrícolas",
    desc: "Uno de los cañones más profundos del mundo, con terrazas agrícolas prehispánicas todavía cultivadas.",
    points: ["Observación del cóndor andino, sobre todo a primera hora de la mañana en la Cruz del Cóndor.", "Rutas de senderismo.", "Pueblos tradicionales como Chivay.", "Aguas termales para descansar tras la caminata."]
  },
  /* ---------------- SIERRA · PLATOS ---------------- */
  {
    id: "pachamanca", region: "sierra", kind: "plato", tags: ["gastronomia", "cultura"], emoji: "🔥",
    title: "Pachamanca", place: "Andes centrales y sur", lat: null, lng: null,
    img: ["es:Pachamanca", "en:Pachamanca"], alt: "Pachamanca cocinada bajo tierra con piedras calientes",
    desc: "Carnes y productos andinos cocidos bajo tierra con piedras calientes. El nombre procede del quechua: pacha (tierra) y manka (olla).",
    ingredients: ["Cerdo, cordero o pollo", "Papa", "Camote", "Habas", "Choclo", "Hierbas andinas"],
    origin: "Se vincula con las tradiciones agrícolas y ceremoniales andinas: se prepara en celebraciones y en agradecimiento a la Pachamama (Madre Tierra).",
    restaurants: ["pachapapa"]
  },
  {
    id: "cuy-chactado", region: "sierra", kind: "plato", tags: ["gastronomia", "cultura"], emoji: "🍽️",
    title: "Cuy chactado", place: "Arequipa · Cusco · Andes", lat: null, lng: null,
    img: ["es:Cuy_chactado", "es:Cavia_porcellus", "en:Guinea_pig"], alt: "Cuy frito crujiente servido con papas",
    desc: "Cuy (conejillo de Indias) frito y aplastado con una piedra (chactado), de piel dorada y crujiente.",
    ingredients: ["Cuy", "Harina o sazón de ajo y comino", "Aceite", "Papas", "Ensalada"],
    origin: "El cuy se cría y consume en los Andes desde época prehispánica y está ligado a celebraciones y rituales. El chactado es una preparación muy arraigada en Arequipa.",
    restaurants: ["chicha-cusco", "chicha-arequipa"]
  },
  {
    id: "patasca", region: "sierra", kind: "plato", tags: ["gastronomia"], emoji: "🍲",
    title: "Patasca", place: "Andes centrales", lat: null, lng: null,
    img: ["es:Patasca", "en:Patasca", "es:Mote_(alimento)"], alt: "Sopa de patasca con mote",
    desc: "Sopa espesa y reconfortante de mote (maíz pelado) con carne y menudencias, pensada para el frío de la altura.",
    ingredients: ["Mote de maíz", "Carne de res o cerdo", "Menudencias", "Ají panca", "Hierbabuena"],
    origin: "Es un ejemplo de cocina de altura: platos calóricos basados en el maíz, tubérculos y carne, adaptados a las temperaturas bajas de los Andes.",
    restaurants: ["mercado-san-pedro"]
  },

  /* ---------------- SELVA · PATRIMONIO ---------------- */
  {
    id: "shipibo", region: "selva", kind: "patrimonio", tags: ["cultura"], emoji: "🎨",
    title: "Pueblo Shipibo-Konibo", place: "Ucayali (zona de Pucallpa)", lat: -8.3791, lng: -74.5539,
    img: ["es:Shipibo-conibo", "en:Shipibo-Conibo_people", "es:Pueblo_shipibo-konibo"], alt: "Arte textil y cerámica con diseños kené del pueblo Shipibo-Konibo",
    desc: "Pueblo indígena amazónico del río Ucayali, famoso por su arte textil y su cerámica con diseños geométricos llamados kené, reconocidos en el Perú como Patrimonio Cultural de la Nación.",
    points: [
      "Arte: los diseños kené expresan una visión del universo y se bordan y pintan sobre telas y cerámica.",
      "Lengua y tradiciones: hablan la lengua shipibo-konibo, de la familia pano.",
      "Relación espiritual con la naturaleza: el bosque y los ríos son parte de su cosmovisión."
    ]
  },
  {
    id: "ashaninka", region: "selva", kind: "patrimonio", tags: ["cultura"], emoji: "🌳",
    title: "Pueblo Asháninka", place: "Junín, Pasco, Cusco y Ucayali", lat: -11.2533, lng: -74.6378,
    img: ["es:Asháninka", "en:Asháninka"], alt: "Integrantes del pueblo Asháninka",
    desc: "Uno de los pueblos indígenas más numerosos de la Amazonía peruana, asentado sobre todo en la selva central, en cuencas como las de los ríos Ene y Tambo.",
    points: [
      "Lengua y organización: comunidades nativas con autoridades propias; su lengua pertenece a la familia arahuaca.",
      "Conocimientos ancestrales: amplio saber sobre plantas, caza, pesca y manejo del bosque.",
      "Territorio: su identidad está ligada al territorio y a la defensa de sus bosques."
    ]
  },
  {
    id: "awajun", region: "selva", kind: "patrimonio", tags: ["cultura"], emoji: "🏺",
    title: "Pueblo Awajún", place: "Amazonas, San Martín, Loreto y Cajamarca", lat: -4.5994, lng: -77.8575,
    img: ["es:Awajún", "en:Awajun_people", "es:Pueblo_awajún"], alt: "Mujeres y artesanía del pueblo Awajún",
    desc: "Pueblo indígena de la Amazonía norte, de la familia lingüística jíbara, asentado en las cuencas de los ríos Marañón, Santiago y Nieva. También se le conoce históricamente como Aguaruna.",
    points: [
      "Tradiciones: fuerte identidad cultural, cantos y relatos transmitidos oralmente.",
      "Cerámica y artesanía: vasijas decoradas y tejidos elaborados por las mujeres.",
      "Organización y relación con el entorno: comunidades con autoridades propias, vinculadas a ríos y bosques."
    ]
  },
  /* ---------------- SELVA · COMPLEMENTARIO ---------------- */
  {
    id: "kuelap-selva", region: "selva", kind: "complementario", tags: ["cultura"], emoji: "🌫️",
    title: "Kuélap (cultura Chachapoyas)", place: "Amazonas", lat: -6.4183, lng: -77.9247,
    img: ["en:Kuelap", "es:Kuélap"], alt: "Muralla de Kuélap rodeada de bosque de neblina",
    desc: "Ciudadela de la cultura Chachapoyas, con murallas de piedra de hasta unos 20 metros y casas circulares, rodeada de bosque de neblina.",
    points: [
      "Se encuentra en la región Amazonas, en la vertiente oriental de los Andes.",
      "Su clasificación como sierra o selva varía según el criterio: por altitud y cultura es andina; por ubicación en la vertiente amazónica y su clima, se la vincula con la selva alta. En esta guía aparece también en Sierra."
    ]
  },
  {
    id: "casa-fierro", region: "selva", kind: "complementario", tags: ["cultura"], emoji: "🏛️",
    title: "Casa de Fierro", place: "Iquitos, Loreto", lat: -3.7491, lng: -73.2476,
    img: ["es:Casa_de_Fierro", "en:Iron_House,_Iquitos", "es:Iquitos"], alt: "Edificio metálico de la Casa de Fierro en la Plaza de Armas de Iquitos",
    desc: "Edificación metálica prefabricada de finales del siglo XIX, ligada al auge del caucho, época que enriqueció a Iquitos y marcó su historia urbana.",
    points: [
      "Se suele atribuir su diseño a Gustave Eiffel, aunque esa autoría es discutida.",
      "Representa la llegada de materiales y gustos europeos a la Amazonía durante el boom del caucho.",
      "Se encuentra junto a la Plaza de Armas de Iquitos."
    ]
  },
  {
    id: "wayku", region: "selva", kind: "complementario", tags: ["cultura"], emoji: "🧵",
    title: "Comunidad Kechwa Wayku", place: "Lamas, San Martín", lat: -6.4217, lng: -76.5217,
    img: ["es:Lamas_(Perú)", "en:Lamas,_Peru", "es:Región_San_Martín"], alt: "Calles de Lamas, hogar de la comunidad quechua lamista",
    desc: "Barrio de Lamas donde vive la comunidad quechua lamista (Kechwa), que conserva su lengua, vestimenta, cerámica y costumbres comunitarias.",
    points: [
      "Tradición quechua lamista: una lengua quechua propia de la selva alta.",
      "Vestimenta y cerámica artesanal conservadas por las mujeres.",
      "Las visitas deben hacerse con respeto, preferiblemente con guías de la propia comunidad."
    ]
  },
  /* ---------------- SELVA · TURISMO ---------------- */
  {
    id: "pacaya", region: "selva", kind: "turismo", tags: ["naturaleza", "actividad"], emoji: "🛶",
    title: "Reserva Nacional Pacaya Samiria", place: "Loreto", lat: -5.25, lng: -74.5,
    img: ["es:Reserva_Nacional_Pacaya-Samiria", "en:Pacaya-Samiria_National_Reserve"], alt: "Río y bosque inundado en la Reserva Nacional Pacaya Samiria",
    desc: "Una de las mayores áreas protegidas del Perú, en la Amazonía de Loreto, con un enorme sistema de ríos, lagunas y bosques inundables.",
    points: ["Navegación en canoa y bote por ríos y lagunas.", "Observación de fauna como delfines de río, monos y aves.", "Biodiversidad excepcional.", "Ecoturismo responsable con guías autorizados."]
  },
  {
    id: "tambopata", region: "selva", kind: "turismo", tags: ["naturaleza", "actividad"], emoji: "🦜",
    title: "Reserva Nacional Tambopata", place: "Madre de Dios", lat: -12.95, lng: -69.4,
    img: ["es:Reserva_Nacional_Tambopata", "en:Tambopata_National_Reserve"], alt: "Guacamayos en una collpa de la Reserva Nacional Tambopata",
    desc: "Reserva en el sureste amazónico, cerca de Puerto Maldonado, famosa por su fauna y por sus collpas, afloramientos de arcilla donde acuden aves.",
    points: ["Bosques tropicales y lagos.", "Guacamayos en las collpas.", "Fauna amazónica.", "Observación de naturaleza desde lodges ecológicos."]
  },
  {
    id: "gocta", region: "selva", kind: "turismo", tags: ["naturaleza", "actividad"], emoji: "💧",
    title: "Catarata de Gocta", place: "Amazonas", lat: -6.0214, lng: -77.8939,
    img: ["es:Catarata_de_Gocta", "en:Gocta_Falls"], alt: "Catarata de Gocta cayendo entre el bosque",
    desc: "Una de las cascadas más altas del mundo (771 m), dada a conocer internacionalmente en 2006, en el bosque nuboso de Amazonas.",
    points: ["Senderismo hasta los miradores y hasta la base.", "Paisajes verdes de bosque nuboso.", "Biodiversidad de orquídeas, aves y fauna.", "Visitas con apoyo de comunidades locales, como Cocachimba."]
  },
  /* ---------------- SELVA · PLATOS ---------------- */
  {
    id: "juane", region: "selva", kind: "plato", tags: ["gastronomia", "cultura"], emoji: "🍃",
    title: "Juane", place: "Amazonía peruana", lat: null, lng: null,
    img: ["es:Juane", "en:Juane"], alt: "Juanes envueltos en hojas de bijao",
    desc: "Arroz con pollo, huevo y aceituna envuelto en hoja de bijao y hervido. Es un plato típico de la selva.",
    ingredients: ["Arroz", "Pollo", "Huevo", "Aceitunas", "Hojas de bijao"],
    origin: "Se asocia con la fiesta de San Juan (24 de junio), una de las celebraciones más importantes de la Amazonía.",
    restaurants: ["mercado-belen"]
  },
  {
    id: "tacacho", region: "selva", kind: "plato", tags: ["gastronomia"], emoji: "🍌",
    title: "Tacacho con cecina", place: "Amazonía peruana", lat: null, lng: null,
    img: ["es:Tacacho", "en:Tacacho"], alt: "Tacacho con cecina y chorizo regional",
    desc: "Bolas de plátano verde asado y machacado con manteca de cerdo, acompañadas de cecina (carne de cerdo seca y ahumada).",
    ingredients: ["Plátano verde", "Cecina", "Chicharrón", "Manteca"],
    origin: "Es uno de los desayunos y almuerzos más tradicionales de la Amazonía, que aprovecha el plátano como base de la cocina.",
    restaurants: ["al-frio-fuego", "mercado-belen"]
  },
  {
    id: "patarashca", region: "selva", kind: "plato", tags: ["gastronomia"], emoji: "🐠",
    title: "Patarashca", place: "Amazonía peruana", lat: null, lng: null,
    img: ["es:Patarashca", "en:Patarashca", "es:Gastronomía_del_Perú"], alt: "Pescado amazónico envuelto en hojas de bijao",
    desc: "Pescado de río envuelto en hojas de bijao con hierbas y condimentos amazónicos, y cocinado a la brasa.",
    ingredients: ["Pescado de río", "Hierbas amazónicas", "Hojas de bijao", "Ají y ajo"],
    origin: "Es una técnica tradicional ligada a las comunidades ribereñas, que pescan y cocinan en el propio río.",
    restaurants: ["al-frio-fuego"]
  }
];

/* ---------------- RESTAURANTES ----------------
   status "ok": establecimiento conocido; compruebe siempre dirección y horario en Google Maps.
   status "warn": referencia general sin verificar; se muestra el enlace de búsqueda en Maps.
   No se incluyen valoraciones ni precios. */
PERU.restaurants = [
  { id: "la-mar", region: "costa", name: "La Mar Cebichería", city: "Lima (Miraflores)", address: "Av. Mariscal La Mar 770, Miraflores", type: "Cevichería", specialty: "Ceviche y mariscos", dishes: ["ceviche"], status: "ok" },
  { id: "canta-rana", region: "costa", name: "Canta Rana", city: "Lima (Barranco)", address: "Génova 101, Barranco", type: "Cevichería", specialty: "Ceviche", dishes: ["ceviche"], status: "ok" },
  { id: "panchita", region: "costa", name: "Panchita", city: "Lima (Miraflores)", address: "Calle Dos de Mayo 298, Miraflores", type: "Cocina criolla", specialty: "Lomo saltado y ají de gallina", dishes: ["lomo-saltado", "aji-gallina"], status: "ok" },
  { id: "huaca-pucllana", region: "costa", name: "Restaurante Huaca Pucllana", city: "Lima (Miraflores)", address: "Calle General Borgoño, cuadra 8, Miraflores", type: "Cocina peruana contemporánea", specialty: "Ají de gallina y platos criollos", dishes: ["aji-gallina"], status: "ok" },
  { id: "pachapapa", region: "sierra", name: "Pachapapa", city: "Cusco", address: "Plaza San Blas 120", type: "Cocina andina", specialty: "Pachamanca", dishes: ["pachamanca"], status: "ok" },
  { id: "chicha-cusco", region: "sierra", name: "Chicha por Gastón Acurio", city: "Cusco", address: "Plaza Regocijo 261", type: "Cocina andina", specialty: "Cuy y platos andinos", dishes: ["cuy-chactado"], status: "ok" },
  { id: "chicha-arequipa", region: "sierra", name: "Chicha Arequipa", city: "Arequipa", address: "Calle Santa Catalina 210", type: "Cocina arequipeña", specialty: "Cuy chactado", dishes: ["cuy-chactado"], status: "ok" },
  { id: "mercado-san-pedro", region: "sierra", name: "Mercado Central de San Pedro (sector comidas)", city: "Cusco", address: "Calle Cascaparo, junto a la Plaza San Francisco", type: "Mercado tradicional", specialty: "Sopas y comida casera (sin verificar patasca concreta)", dishes: ["patasca"], status: "warn" },
  { id: "mercado-belen", region: "selva", name: "Mercado de Belén", city: "Iquitos", address: "Barrio de Belén, Iquitos", type: "Mercado tradicional", specialty: "Juane, tacacho y platos amazónicos (sin verificar puesto concreto)", dishes: ["juane", "tacacho"], status: "warn" },
  { id: "al-frio-fuego", region: "selva", name: "Al Frío y al Fuego", city: "Iquitos", address: "Río Itaya, Iquitos (restaurante flotante; confirme ubicación en Maps)", type: "Cocina amazónica", specialty: "Pescados de río, tacacho y platos amazónicos", dishes: ["tacacho", "patarashca"], status: "warn" }
];

PERU.festivals = [
  { id: "inti-raymi", name: "Inti Raymi", region: "Sierra · Cusco", when: "24 de junio", img: ["es:Inti_Raymi", "en:Inti_Raymi"], alt: "Escenificación del Inti Raymi en Cusco", text: "Fiesta del Sol de origen inca, que hoy se representa en Cusco con ceremonias en el Qorikancha y en la explanada de Sacsayhuamán." },
  { id: "candelaria", name: "Fiesta de la Candelaria", region: "Sierra · Puno", when: "Febrero (festividad principal el 2 de febrero)", img: ["es:Festividad_de_la_Virgen_de_la_Candelaria", "en:Virgen_de_la_Candelaria"], alt: "Danzas de la Fiesta de la Candelaria en Puno", text: "Gran celebración religiosa y folclórica de Puno en honor a la Virgen de la Candelaria, con danzas y trajes coloridos. Fue inscrita por la UNESCO como Patrimonio Cultural Inmaterial en 2014." },
  { id: "senor-milagros", name: "Señor de los Milagros", region: "Costa · Lima", when: "Octubre", img: ["es:Señor_de_los_Milagros", "en:Lord_of_Miracles"], alt: "Procesión del Señor de los Milagros en Lima", text: "Mayor procesión religiosa del país: miles de devotos vestidos de morado acompañan al Cristo de Pachacamilla por las calles de Lima." },
  { id: "san-juan", name: "Fiesta de San Juan", region: "Selva · Amazonía", when: "24 de junio", img: ["es:Fiesta_de_San_Juan", "en:Saint_John's_Eve"], alt: "Celebración de San Juan en la Amazonía", text: "Celebración amazónica en honor a San Juan Bautista, con música, baños en el río y platos típicos como el juane." }
];

PERU.regionLabels = { costa: "Costa", sierra: "Sierra", selva: "Selva" };
PERU.kindLabels = { patrimonio: "Patrimonio", complementario: "Patrimonio", turismo: "Turismo", plato: "Gastronomía" };
PERU.agencyUrl = "https://alesstravels.com/";
