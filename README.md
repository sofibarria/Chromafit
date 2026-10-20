# Chromafit · Landing page

> "Del tablero de inspiración a tu guardarropa ideal en segundos"

Landing page en modo oscuro premium ("Dark Luxury Moda") para **Chromafit**, una marca ficticia de colorimetría con IA ubicada en Ainavillo 456, Concepción, Chile. Es un ejercicio académico construido a partir del *Prompt Universal: Landing Page Premium Dark Mode*.

- **Sector:** Moda
- **Tipo de web:** Personal (tono cercano, storytelling, redes y contenido destacados)
- **Propuesta de valor:** Analizamos tu colorimetría para ayudarte a escoger la ropa que mejor combina contigo, creando un puente directo entre la inspiración digital y la compra real.

## Estructura

```
chromafit/
├── index.html     Estructura y contenido
├── styles.css     Sistema de diseño, componentes y responsive
├── script.js      Animaciones e interacciones
├── README.md
└── images/
    ├── logo.png          Logo para fondo oscuro (512×512, transparente)
    ├── logo_light.png    Logo para fondo claro (colores originales)
    ├── hero_visual.webp  Visual del hero (imagen de la marca)
    ├── service_1.webp    App machine learning
    ├── service_2.webp    Vinculación con catálogos locales
    ├── service_3.webp    Análisis de colorimetría personalizada
    ├── service_4.webp    Recomendaciones personalizadas de estilo
    ├── service_5.webp    Servicio y asesoría de imagen virtual
    ├── service_6.webp    Producto de armario digital
    ├── about_image.png   Imagen de "Sobre Chromafit" (900×900)
    └── pattern_bg.png    Patrón sutil de fondo (opcional)
```

Para verla, abre `index.html` en el navegador. No necesita servidor ni instalación.

## Secciones

1. **Hero** con tagline, propuesta de valor, dos CTA y visual flotante con partículas.
2. **Social proof:** contadores animados y tiendas aliadas (escala de grises que se colorea al pasar el cursor).
3. **Servicios:** 6 flip cards con imagen al frente y detalle con etiquetas atrás.
4. **Portafolio de paletas:** las 4 estaciones con subtono, intensidad y contraste, y el flujo "Cómo funciona" en 3 pasos.
5. **Testimonios** con estrellas, comillas y avatares con borde de acento.
6. **Guía de color:** artículos y redes sociales.
7. **Sobre Chromafit** en grilla 1:2.
8. **CTA final y formulario** de contacto.
9. **Footer** con columnas de enlaces, dirección y copyright.

## Paleta de colores

| Token | Valor | Uso |
|---|---|---|
| `--bg-primary` | `#000000` | Fondo principal |
| `--bg-secondary` | `#09090B` | Secciones alternas, footer |
| `--bg-tertiary` | `#18181B` | Cards |
| `--primary-500` | `#F6EFEA` | **Acento principal** (marfil) |
| `--primary-400` | `#FBF7F4` | Hover |
| `--primary-600` | `#E9DCD2` | Activo |
| `--primary-700` | `#D6C1B2` | Labels y gradientes |
| `--primary-800` | `#A68C7A` | Sombra |
| `--primary-900` | `#6B5547` | Sombra profunda |
| `--on-primary` | `#14100E` | Texto sobre botones de acento |
| `--text-primary` → `--text-quaternary` | `#FFFFFF` · `#E4E4E7` · `#A1A1AA` · `#71717A` | Jerarquía de texto |

**Ajuste respecto del prompt:** el prompt pide texto blanco en los botones. Como el color elegido (#F6EFEA) es muy claro, el texto blanco sobre él no se lee. Por eso los botones usan texto casi negro (`--on-primary`), que cumple contraste AA.

Los tonos de las paletas por estación (terracota, salvia, petróleo, etc.) son contenido de la marca, no parte del sistema de color de la interfaz.

## Tipografía

- Títulos: **Plus Jakarta Sans** 700–800 (Google Fonts)
- Cuerpo: **Inter** 400–500 (Google Fonts)

## Interacciones incluidas

- Navbar fija que se vuelve translúcida con blur al hacer scroll
- Menú hamburguesa en móvil
- 50 partículas flotantes en el hero (se reducen a 20 en móvil)
- Flip cards: hover en escritorio, tap en móvil, Enter o espacio con teclado
- Aparición de secciones con Intersection Observer y desfase de 0,1 s
- Contadores animados en las cifras
- Parallax suave (0,3×) del brillo del hero
- Botones con gradiente animado y glow pulsante
- Formulario con validación (demostración: no envía datos)
- Respeta `prefers-reduced-motion`

## Imágenes

- **Imágenes de la marca** (hero y los 6 servicios): creadas por el autor del proyecto con IA. Se escalaron al doble con Lanczos y se guardaron en WebP para que pesen menos.
- **Logo:** redibujado en vector a partir del diseño original (percha con cuatro círculos de tonos de piel), en dos versiones: crema para fondo oscuro y café para fondo claro.
- **"Sobre Chromafit":** ilustración provisoria dibujada por código, hasta tener la imagen definitiva.

Para reemplazar cualquier imagen, guarda el archivo nuevo en `images/` y actualiza el nombre en `index.html` si cambia la extensión. Tamaño recomendado para servicios: 1200×900 o más (proporción 4:3).

## Personalización rápida

- **Color de acento:** cambia `--primary-500` y `--primary-rgb` en `styles.css` (y ajusta la escala `--primary-50` a `--primary-900`).
- **Textos:** todo el contenido está en `index.html`, ordenado por secciones comentadas.
- **Formulario:** para recibir mensajes de verdad, conecta el `submit` en `script.js` a un servicio como Formspree o a tu propio backend.

## Contenido de ejemplo

Las cifras, los nombres de tiendas aliadas y los testimonios son **de ejemplo** para el ejercicio y la página los marca así. Reemplázalos por datos reales antes de usar el sitio públicamente.

## Créditos

- Base de diseño: *Prompt Universal: Landing Page Premium Dark Mode* (inspirado en Cryptolink)
- Fuentes: Plus Jakarta Sans e Inter, de Google Fonts
- Ilustraciones y código: generados para Chromafit, © 2026
