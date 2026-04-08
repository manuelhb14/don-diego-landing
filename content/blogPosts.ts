import {
    culturaVinedoEn,
    guiaSma2026En,
    huertoMesaEn,
    mejorCiudadEn,
    sustentabilidadEn,
    type BlogLocaleBlock,
} from "./blogPostsEn";

export type BlogPostView = {
    slug: string;
    publishedAt: string;
    title: string;
    kicker: string;
    tags: string[];
    likes: number;
    views: number;
    comments: number;
    imageSrc: string;
    imageAlt: string;
    intro: string;
    body: string;
};

export type BlogPost = {
    slug: string;
    publishedAt: string;
    likes: number;
    views: number;
    comments: number;
    imageSrc: string;
    locales: {
        es: BlogLocaleBlock;
        en: BlogLocaleBlock;
    };
};

const posts: BlogPost[] = [
    {
        slug: "sustentabilidad-como-habitat",
        publishedAt: "2026-03-21",
        comments: 33,
        likes: 412,
        views: 920,
        imageSrc: "/final/sustentabilidad.webp",
        locales: {
            es: {
                title: "Sustentabilidad como hábitat",
                kicker: "Don Diego",
                tags: ["Sustentabilidad", "Paisaje vivo", "Comunidad"],
                imageAlt: "Vegetación y paisaje en Don Diego",
                intro: "Un máster plan donde el agua, la tierra y la producción orgánica dialogan en el día a día del desarrollo.",
                body: `La sustentabilidad dejó hace tiempo de ser un adjetivo de marketing para convertirse en una forma de habitar el territorio. En Don Diego, esa idea no se resume en una lista de buenas intenciones: se traduce en un trazado que entiende el predio como lo que siempre fue —un paisaje con vocación agrícola— y lo proyecta hacia adelante con una visión ambiental integrada.

El desarrollo se estructura en torno a cuatro componentes con identidad propia —Club Residencial, Organic Farm & Flowers, Wellness Center y la Presa de la Cantera— pero comparten un mismo principio: **convivir con el agua, la tierra y lo que la tierra produce**, en lugar de empujarlos al fondo del plano.

### El paisaje productivo

Organic Farm & Flowers recupera la lógica de un campo que vuelve a alimentar al proyecto. **Huertos orgánicos, frutales y flores de temporada** no son solo escenografía: son ciclos reales que mantienen vivo el ecosistema durante todo el año. La idea es sencilla y poderosa: una comunidad más conectada a **lo que se siembra, se cosecha y llega a la mesa**, con menos intermediarios y más conciencia de origen.

Esa filosofía se refuerza con **invernaderos, andadores y ciclorutas** que invitan a recorrer la producción de cerca —el mismo criterio que ya anima talleres y experiencias en torno al cultivo—, de modo que la sostenibilidad se experimenta, no solo se declara.

### Agua, vegetación y clima

En una región de altitud y estaciones marcadas, el diseño del paisaje no puede ignorar el clima local. Los **criterios de plantación y mantenimiento** buscan alinearse con el entorno: especies que soportan bien el sol del Bajío, riego eficiente y una lectura del suelo que evita soluciones genéricas importadas de otros climas.

La **Presa de la Cantera** y el entorno hídrico no son un fondo decorativo: forman parte del mismo sistema. El desarrollo dialoga con ese espejo de agua como pieza de un ecosistema compartido —un recordatorio de que el lujo responsable pasa también por **cuidar el vínculo con el recurso** y con el paisaje que lo rodea.

### Un club que respeta el territorio

En el Club Residencial, la sustentabilidad se expresa en la forma en que se ordenan los espacios comunes, la circulación y el paisaje. No se trata de “verde” como capa final, sino de **un máster plan con visión ambiental**: recorridos que priorizan la convivencia tranquila, vistas que abren el horizonte hacia el campo y materiales que envejecen con dignidad frente al sol.

En la vida cotidiana, esa visión se cruza con la producción orgánica del proyecto: **alimentos frescos y ciclos de la tierra** que acercan lo saludable a lo cotidiano —desde la cocina hasta los hábitos de quienes habitan aquí.

### Hacia una comunidad que mide lo invisible

Mirando en perspectiva, Don Diego apuesta por prácticas que hoy son casi de sentido común en proyectos de alto nivel, pero que aquí tienen nombre propio: **reducir la huella alimentaria** acortando cadenas, favorecer el compostaje y la reutilización orgánica en el circuito agrícola, y **educar de forma continua** —charlas, cosechas compartidas, encuentros alrededor del huerto— para que la sostenibilidad sea un hábito colectivo.

No se promete un mundo perfecto; se propone uno **coherente con el lugar**: menos extractivo, más relacional. Un hábitat donde el lujo no compite con la tierra, sino que aprende a medirse con ella.

> **En síntesis:** la sustentabilidad en Don Diego es un sistema —paisaje, agua, cultivo y comunidad— que se refuerza cada vez que alguien elige caminar el huerto, mirar la presa al atardecer o llevarse a casa lo que ayer estaba en el suelo.`,
            },
            en: sustentabilidadEn,
        },
    },
    {
        slug: "mejor-ciudad-pequena",
        publishedAt: "2026-03-20",
        comments: 40,
        likes: 297,
        views: 850,
        imageSrc: "/babylon/sma.mp4",
        locales: {
            es: {
                title: "La Mejor Ciudad Pequeña del Mundo",
                kicker: "San Miguel de Allende",
                tags: ["Patrimonio Cultural"],
                imageAlt: "San Miguel de Allende [cite: 10]",
                intro: "Premios internacionales, calles empedradas y una calidad de vida que une historia colonial y lujo contemporáneo.",
                body: `No es casualidad que San Miguel de Allende encabece constantemente las listas de publicaciones internacionales como *Condé Nast Traveler* y *Travel + Leisure*. Sin embargo, el título de "La Mejor Ciudad Pequeña del Mundo" no se gana únicamente con premios; se respira en sus calles empedradas, se refleja en sus fachadas coloridas y se vive en su vibrante escena cultural.

Ubicada en el corazón de México, esta joya colonial ofrece una calidad de vida que equilibra el encanto histórico con el lujo contemporáneo. A continuación, exploramos las razones por las que San Miguel de Allende sigue cautivando a visitantes y residentes por igual.

### Arquitectura que Cuenta Historias

Caminar por San Miguel es recorrer un museo al aire libre. La ciudad es un triunfo de la preservación histórica, donde las restricciones de construcción han mantenido intacta su estética colonial.

- **La Parroquia de San Miguel Arcángel:** El ícono indiscutible de la ciudad, con sus torres neogóticas de cantera rosa que cambian de tonalidad con la luz del sol.
- **Patios Ocultos:** Detrás de las pesadas puertas de madera en el centro histórico, se esconden oasis privados con fuentes de piedra, enredaderas de bugambilias y un diseño interior que fusiona el minimalismo moderno con la artesanía local.
- **Calles Fotogénicas:** Calles como Aldama o el callejón del Chorro ofrecen perspectivas visuales perfectas que atraen tanto a fotógrafos como a amantes del diseño estético.

### Un Refugio Cosmopolita y Creativo

A pesar de su tamaño, San Miguel posee un espíritu profundamente global. Desde mediados del siglo XX, la ciudad se ha consolidado como un imán para artistas, escritores y expatriados de todo el mundo.

Esta mezcla de culturas ha generado una comunidad inclusiva e intelectualmente estimulante. El Instituto Allende y la Fábrica La Aurora —un antiguo molino textil convertido en un sofisticado centro de arte y diseño— son los pilares de una escena creativa donde galerías de arte contemporáneo conviven a la perfección con talleres de artesanía tradicional.

### Gastronomía y Estilo de Vida

El estilo de vida en San Miguel invita a la pausa y al disfrute de los sentidos. La oferta gastronómica compite con la de las grandes capitales, pero se disfruta a un ritmo mucho más relajado.

- **Terrazas con Vista:** La cultura de los *rooftops* es fundamental. Disfrutar de una cena de autor o de coctelería mixológica mientras el sol se pone sobre las cúpulas de las iglesias es una experiencia cotidiana.
- **Ingredientes Locales:** La proximidad a ranchos agrícolas y viñedos de Guanajuato garantiza que los restaurantes de la ciudad operen con filosofías de la granja a la mesa, ofreciendo ingredientes frescos y orgánicos.
- **Bienestar y Descanso:** Desde spas de aguas termales a las afueras de la ciudad hasta retiros de yoga y boutiques de diseño independiente, la ciudad está diseñada para el buen vivir.

### El Veredicto

San Miguel de Allende demuestra que no se necesita el tamaño de una metrópolis para ofrecer una experiencia de vida de clase mundial. Es una ciudad que se recorre a pie, pero que ofrece un mundo entero de sofisticación, comunidad y belleza arquitectónica. Más que un destino para visitar, es un lugar diseñado para quedarse.`,
            },
            en: mejorCiudadEn,
        },
    },
    {
        slug: "huerto-a-la-mesa",
        publishedAt: "2026-03-17",
        comments: 45,
        likes: 530,
        views: 1105,
        imageSrc: "/final/huerto.webp",
        locales: {
            es: {
                title: "Del Huerto a la Mesa",
                kicker: "Organic Farm & Flowers",
                tags: ["Huertos Orgánicos", "Sustentabilidad", "Ciclo Natural"],
                imageAlt: "Organic Farm & Flowers [cite: 97]",
                intro: "De la tierra al plato: cultivo orgánico, estaciones y un recorrido corto que sabe a comunidad.",
                body: `Hay comidas que saben a supermercado y otras que saben a **lugar**. En Don Diego, Organic Farm & Flowers existe para acortar la distancia entre esas dos experiencias: recuperar la vocación agrícola del predio y convertirla en algo vivo —visible, caminable, compartible— para quienes viven o visitan el desarrollo.

No se trata solo de “tener un huerto bonito”. Se trata de **respetar el suelo y el ritmo de las estaciones**, de entender que cada lluvia y cada helada le hablan al cultivo, y de traducir eso en verduras, hierbas aromáticas y flores que llegan a la mesa con historia breve y sabor largo.

### Qué significa cultivar aquí

Los métodos buscan ser **respetuosos del suelo y del calendario agrícola**: rotación de cultivos cuando aplica, abonos orgánicos, atención al drenaje y a la salud del ecosistema edáfico —ese universo invisible donde las raíces deciden si un tomate vale la pena o no.

En los **invernaderos** y en los campos abiertos conviven lógicas distintas: protección y experimento, germinación y pausa. Los **frutales** marcan otro tiempo: el de la paciencia, el de la primera cosecha que se celebra como un pequeño milagro anual.

### Flores, color y trabajo de temporada

Las **flores de temporada** no son un adorno aparte: dialogan con la granja orgánica y con el paisaje. Siembra, corte y resembrado siguen un calendario que enseña algo simple: **nada florece todo el año sin mentirle al reloj**. Esa honestad estacional es parte del carácter del lugar.

### Del campo a la cocina

Del huerto a la mesa es un **recorrido corto en kilómetros y largo en sentido**: lo que se cosecha puede nutrir los restaurantes del desarrollo, los hogares y los momentos cotidianos en los que “comer bien” deja de ser un slogan y se vuelve rutina.

Menos intermediarios implica **menos desperdicio**, empaques innecesarios y kilómetros de frío innecesarios. Más proximidad implica **más preguntas buenas** —¿de dónde vino esto? ¿en qué mes se da?— y respuestas que caben en una caminata matutina por los bancales.

### Paseos, talleres y comunidad

Los **andadores** atraviesan hileras y caminos: ver de cerca el trabajo diario del huerto cambia la forma en que uno mira el plato. Los **talleres y experiencias** —identificación de hierbas, siembra participativa, cosechas compartidas— convierten el conocimiento agrícola en memoria social.

Las **ciclorutas** y los recorridos peatonales enlazan la granja con el resto del proyecto; la idea es que nadie viva Don Diego sin cruzarse, al menos una vez, con el olor de la tierra húmeda o el rumor del invernadero un día de viento.

### Una visión que se puede saborear

En el fondo, **Del Huerto a la Mesa** es una invitación a comer con mapa: menos anonimato alimentario, más conciencia de origen, y una comunidad que celebra lo fresco no como moda, sino como **forma de estar en el territorio**.

> **Recuerda:** el menú del entorno cambia con las estaciones; lo que encuentres en mesa o en mercado interno en una visita puede ser distinto en la siguiente —y eso, lejos de ser un problema, es la prueba de que el huerto sigue vivo.`,
            },
            en: huertoMesaEn,
        },
    },
    {
        slug: "cultura-del-vinedo",
        publishedAt: "2026-03-14",
        comments: 28,
        likes: 375,
        views: 740,
        imageSrc: "/final/viñedo.webp",
        locales: {
            es: {
                title: "La cultura del Viñedo",
                kicker: "San Miguel de Allende",
                tags: ["Vino", "Enoturismo", "Guanajuato"],
                imageAlt: "Paisaje de cultivo y naturaleza en la región de San Miguel de Allende",
                intro: "Terruño, enoturismo de lujo y viñedos imperdibles en el renacimiento vitivinícola de Guanajuato.",
                body: `Cuando se piensa en San Miguel de Allende, la mente suele evocar calles empedradas, vibrantes flores de cempasúchil, arquitectura colonial y las icónicas torres rosadas de la Parroquia. Sin embargo, al aventurarse a pocos minutos de los límites de la ciudad, se descubre una magia distinta echando raíces: **la cultura del viñedo**.

Durante la última década, el estado de Guanajuato se ha transformado de manera constante en uno de los principales destinos vitivinícolas de México. San Miguel se encuentra en el corazón de este renacimiento enológico, ofreciendo una experiencia que rivaliza con regiones consagradas como el Valle de Guadalupe o la Toscana, pero con un alma innegablemente mexicana.

A continuación, te presentamos todo lo que necesitas saber sobre el auge de la cultura del vino en San Miguel de Allende.

---

### El Terruño: ¿Por qué la vid prospera aquí?

Puede resultar sorprendente que el paisaje semiárido que rodea a San Miguel sea un refugio ideal para la uva. El secreto radica en la altitud.

Ubicada a aproximadamente 2,000 metros sobre el nivel del mar, la región goza de días cálidos y soleados, contrastados con noches frescas y ventosas. Este drástico cambio de temperatura —conocido como *amplitud térmica*— permite que las uvas alcancen una maduración óptima mientras conservan su acidez esencial. ¿El resultado? Expresiones excepcionales de uvas como Cabernet Franc, Syrah, Malbec, Tempranillo y blancos vibrantes como el Sauvignon Blanc.

### Más que una Cata: El Estilo de Vida del Enoturismo

En San Miguel, el vino trasciende la copa; es una estética y un estilo de vida integral. El *enoturismo* en esta zona está diseñado en torno al lujo inmersivo y la contemplación.

Los viñedos de la región no se limitan a ofrecer salas de degustación. Son extensas fincas que albergan hoteles boutique, spas, campos de polo, olivares y restaurantes de primer nivel. La arquitectura suele fusionar el encanto rústico de las haciendas mexicanas con la elegancia europea o un modernismo vanguardista de líneas limpias. Un día en un viñedo sanmiguelense está concebido para ser una experiencia sensorial pausada: una comida prolongada bajo la sombra de un mezquite, un paseo entre las vides y una copa de vino rosado al atardecer.

---

### Viñedos Imperdibles en la Ruta del Vino

Si estás planeando un recorrido, estas son algunas de las propiedades destacadas que definen la cultura vitivinícola local:

- **Bodega Dos Búhos:** Situada a solo 10 minutos del centro, esta bodega boutique de gestión familiar destaca por su enfoque orgánico y su profunda vocación artística. La propiedad exhibe esculturas contemporáneas entre las vides, una hermosa capilla y un vagón de tren restaurado que funciona como sala de catas. Su Tempranillo orgánico es una degustación obligada.
- **Viñedos San Lucas y San Francisco:** Estas propiedades hermanas evocan la serenidad de la campiña italiana. El paisaje se adorna con cipreses, campos de lavanda y olivos. Ofrecen catas de aceite de oliva, instalaciones ecuestres y una excelente oferta gastronómica, ideal para disfrutar de una pizza a la leña con vistas a los viñedos.
- **Tres Raíces:** Para los entusiastas del diseño, Tres Raíces es una joya arquitectónica. Sus imponentes edificios de líneas angulares se integran de forma dramática en el entorno. La finca ofrece una experiencia culinaria meticulosamente curada, maridando sus vinos tintos de gran altitud con alta gastronomía mexicana.
- **Cuna de Tierra:** Aunque geográficamente se ubica en el municipio vecino de Dolores Hidalgo, es la bodega pionera de la escena vitivinícola de Guanajuato y una parada imprescindible. Fueron responsables de la primera cosecha comercial en el estado y sus tintos de ensamble son galardonados frecuentemente a nivel internacional.

> **Nota para el viajero:** La temporada ideal para experimentar esta cultura en su máximo esplendor es durante **Las Fiestas de la Vendimia**, que suelen celebrarse desde finales de julio hasta septiembre. Durante estos meses, los viñedos organizan grandes eventos que incluyen la tradicional pisa de uvas, música en vivo, gastronomía de autor y la presentación de nuevas etiquetas.

---

### Un Brindis por el Futuro

San Miguel de Allende siempre se ha distinguido como un santuario para artistas, viajeros internacionales y amantes de la gastronomía. La consolidación de una cultura del vino de clase mundial se percibe como la evolución natural de esta ciudad. Ya sea que disfrutes de una copa ocasional o seas un conocedor experimentado, los viñedos de Guanajuato representan una frontera fresca y emocionante en el panorama internacional del vino.

*¡Salud!* 🍷`,
            },
            en: culturaVinedoEn,
        },
    },
    {
        slug: "guia-san-miguel-allende-2026",
        publishedAt: "2026-03-01",
        comments: 22,
        likes: 341,
        views: 680,
        imageSrc: "/final/sma.webp",
        locales: {
            es: {
                title: "Guía San Miguel de Allende 2026",
                kicker: "San Miguel de Allende",
                tags: ["Guía", "Tendencias", "Bienestar", "Diseño"],
                imageAlt: "Vista y ambiente de San Miguel de Allende",
                intro: "Qué hacer, ver y saborear en 2026: diseño minimalista, workations, gastronomía consciente y joyas fuera del circuito turístico.",
                body: `San Miguel de Allende ha evolucionado. Si bien sus calles empedradas y su icónica Parroquia siguen siendo el corazón de la ciudad, en 2026 este destino ha madurado hasta convertirse en un sofisticado epicentro de diseño, bienestar y cultura contemporánea. Ya no se trata solo de un viaje al pasado colonial, sino de experimentar una ciudad que marca tendencias a nivel global.

Esta guía definitiva explora lo que realmente vale la pena hacer, ver y saborear en San Miguel este año, alejándonos de las trampas para turistas y adentrándonos en su escena más exclusiva.

Si estás considerando dar el siguiente paso e invertir o establecerte aquí, comunidades exclusivas como **Don Diego** se están perfilando como el refugio perfecto, ofreciendo propiedades que equilibran la tranquilidad de las afueras con una arquitectura de primer nivel.

---

### 1. Las Nuevas Tendencias en 2026

**El Renacimiento del Diseño Minimalista y los Bienes Raíces**
El mercado inmobiliario y arquitectónico de la ciudad está viviendo una transformación fascinante. Detrás de las clásicas fachadas virreinales, las nuevas restauraciones y desarrollos están apostando por una estética profundamente minimalista. Se priorizan las líneas limpias, la luz natural, los materiales crudos y la integración de tecnología inteligente. Visitar las jornadas de "puertas abiertas" de agencias locales es ahora una actividad de nicho para los amantes del diseño.

**Workations para Fundadores y Creativos**
San Miguel se ha posicionado como un refugio de alto nivel para emprendedores y desarrolladores tecnológicos. La tendencia de este año son los cafés de especialidad y espacios híbridos diseñados para el trabajo profundo, con internet de alta velocidad y ambientes estéticamente impecables que fomentan la concentración y el networking silencioso.

**Gastronomía Consciente y "Farm-to-Table"**
La escena culinaria ha cambiado su enfoque hacia la trazabilidad. Los nuevos restaurantes de moda ofrecen menús donde la proteína limpia y los vegetales orgánicos son los protagonistas. Esto es ideal para quienes mantienen un estilo de vida estructurado, cuidan su nutrición o simplemente buscan comida real de la más alta calidad sin sacrificar la experiencia gourmet.

---

### 2. Qué Hacer: Más Allá de lo Evidente

**Inmersión en Arte Contemporáneo**
*Fábrica La Aurora* sigue siendo un imperdible, pero el enfoque en 2026 está en sus galerías más vanguardistas. Busca las exhibiciones de arte abstracto e instalaciones inmersivas que contrastan dramáticamente con el entorno industrial del antiguo molino de algodón.

**Cultura Termal y Bienestar Físico**
Mantener la rutina de entrenamiento o recuperación es fácil en San Miguel. La tendencia dicta escapar a los santuarios de aguas termales en las afueras (como *The Mayan Baths* o *Escondido Place*), pero combinándolo con visitas a los nuevos estudios de entrenamiento funcional y gimnasios boutique que han abierto cerca del centro, perfectos para una sesión intensa antes de salir a explorar.

**La Ruta del Vino de Altura**
Los viñedos de Guanajuato son parada obligatoria. En 2026, la tendencia es reservar experiencias privadas de maridaje al atardecer en bodegas con arquitectura moderna, alejadas del bullicio de los recorridos masivos.

---

### 3. Las Joyas Ocultas (Hidden Gems)

Para salirte del algoritmo de recomendaciones habituales, anota estos puntos en tu mapa:

* **El Charco del Ingenio al Amanecer:** Este jardín botánico no es un secreto, pero ir a las 7:00 a.m. para correr o hacer senderismo por el cañón antes de que la ciudad despierte, sí lo es. Las vistas son espectaculares y es el mejor cardio de la zona.
* **Barras de Especialidad (Calle Hernández Macías):** Pequeñas barras con tostadores locales. Ofrecen el ambiente perfecto para abrir la laptop, conectar los audífonos y avanzar en proyectos con un café de extracción perfecta.
* **Boutiques de la Colonia Guadalupe:** El centro histórico tiene excelentes tiendas, pero el "Distrito de las Artes" en la colonia Guadalupe alberga los verdaderos talleres de creadores locales que trabajan cerámica minimalista y diseño industrial.
* **Terrazas Secretas:** En lugar de ir a los *rooftops* más promocionados frente a la plaza principal, busca las terrazas de los pequeños hoteles boutique escondidos en la calle de Sollano o Recreo. Ofrecen mixología de autor, un ambiente mucho más íntimo y vistas ininterrumpidas.

---

### El Veredicto para el 2026

San Miguel de Allende es una ciudad que exige ser vivida a un ritmo distinto. La clave para disfrutarla este año está en los detalles: apreciar la estética de sus espacios interiores, disfrutar de una gastronomía honesta, y encontrar el equilibrio perfecto entre la productividad y el descanso de lujo.`,
            },
            en: guiaSma2026En,
        },
    },
];

export function localizePost(post: BlogPost, locale: string): BlogPostView {
    const l = locale === "en" ? "en" : "es";
    const block = post.locales[l];
    return {
        slug: post.slug,
        publishedAt: post.publishedAt,
        likes: post.likes,
        views: post.views,
        comments: post.comments,
        imageSrc: post.imageSrc,
        title: block.title,
        kicker: block.kicker,
        tags: block.tags,
        imageAlt: block.imageAlt,
        intro: block.intro,
        body: block.body,
    };
}

export function getAllPosts(locale: string): BlogPostView[] {
    return posts.map((p) => localizePost(p, locale));
}

export function getPostBySlug(slug: string, locale: string): BlogPostView | undefined {
    const post = posts.find((p) => p.slug === slug);
    return post ? localizePost(post, locale) : undefined;
}

export function getAllSlugs(): string[] {
    return posts.map((p) => p.slug);
}

export function isVideoSrc(src: string) {
    return /\.(mp4|webm)$/i.test(src);
}

/** Locale-aware long date (e.g. `es`: "1 de marzo de 2025", `en`: "March 1, 2025"). */
export function formatPostDate(isoDate: string, locale: string): string {
    const normalized = isoDate.includes("T") ? isoDate : `${isoDate}T12:00:00`;
    const d = new Date(normalized);
    const tag = locale === "en" ? "en-US" : "es-MX";
    return new Intl.DateTimeFormat(tag, {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(d);
}
