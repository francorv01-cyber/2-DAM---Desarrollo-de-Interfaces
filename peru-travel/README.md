# PERÚ – Descubre lo extraordinario

Aplicación web multipantalla (HTML + CSS + JavaScript puro, sin frameworks ni dependencias de instalación) sobre turismo, cultura y gastronomía de Perú. Proyecto académico de DAM.

## Cómo ejecutarla

No hace falta instalar nada. Necesitas conexión a Internet (fotos, mapa).

**Opción 1 (rápida):** abre `index.html` con doble clic en tu navegador.

**Opción 2 (recomendada, servidor local):** desde la carpeta del proyecto:

```bash
python3 -m http.server 8080
# y abre http://localhost:8080
```

También sirve la extensión *Live Server* de VS Code.

## Estructura

```
peru-travel/
├── index.html                inicio: hero, 3 regiones, por qué visitar Perú, festividades, agencia
├── pages/                    costa, sierra, selva, gastronomia, planifica, consejos
├── css/                      themes (claro/oscuro), style, responsive, animations
├── js/
│   ├── data.js               datos (regiones, lugares, platos, restaurantes, festividades)
│   ├── theme.js              modo claro/oscuro persistente
│   ├── favorites.js          favoritos (localStorage)
│   ├── navigation.js         cabecera, pie, menú móvil, transiciones, volver arriba
│   ├── main.js               carga de imágenes, tarjetas reutilizables, páginas de región
│   └── calculator.js         calculadora de presupuesto
└── assets/                   carpetas reservadas para imágenes e iconos propios
```

## Servicios externos (documentación)

- **Wikipedia REST API** (`/api/rest_v1/page/summary/<título>`): proporciona la fotografía de cada lugar o plato (Wikimedia Commons, licencias libres). No requiere clave. Cada foto enlaza a su página de origen con autor y licencia. Las respuestas se guardan en `localStorage`. Si un artículo no tiene foto, se muestra un icono.
  Para cambiar una foto, edita la lista `img` del elemento en `js/data.js` (formato `"es:Título_del_artículo"`).
- Google Maps: solo enlaces de búsqueda externos, sin API.

## Contenidos y honestidad de los datos

- Los restaurantes marcados *«Establecimiento conocido»* son locales conocidos; los marcados *«Sin verificar»* son referencias generales. **Confirma siempre dirección y horario en Google Maps.** No hay valoraciones ni precios inventados.
- Los precios de la calculadora son **supuestos orientativos** editables (panel «Ajustar precios orientativos»); no son precios reales de proveedores.
- Revisa los datos históricos y de restaurantes antes de la entrega si tu profesorado lo exige.

## Cómo probarla

1. Cambia el tema con 🌙/☀️ y navega entre páginas: se conserva.
2. Abre una región desde la portada y comprueba sus apartados.
3. Pulsa ♡ en tarjetas y abre el panel ♥ de la cabecera.
4. En «Planifica tu viaje»: calcula, cambia precios, genera el resumen y reinicia.
5. Reduce la ventana (< 860 px) para ver el menú móvil.
6. Activa «reducir movimiento» en tu sistema para desactivar animaciones.

## Créditos

Fotografías: Wikipedia / Wikimedia Commons. Agencia colaboradora: [Aless Travels](https://alesstravels.com/).
