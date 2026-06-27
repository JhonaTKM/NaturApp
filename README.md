# NaturApp 🌿

NaturApp es una aplicación móvil híbrida desarrollada con **React Native** y **Expo** diseñada para la venta y distribución de productos naturales y orgánicos. La aplicación ofrece una experiencia de usuario fluida mediante navegación moderna basada en pestañas, persistencia en la nube y un diseño minimalista.

---

## 🚀 Cambios y Mejoras Recientes

El proyecto ha evolucionado para incluir una arquitectura de enrutamiento moderna y conectividad en tiempo real:

1. **Migración a Enrutamiento Moderno**:
   - Se instaló y configuró `@react-navigation` / `expo-router` para manejar las rutas de forma declarativa mediante carpetas y archivos.
   - Modificación de [app.json] para soportar el esquema de enrutamiento de Expo Router y el punto de entrada de la aplicación.
   - Creación de [index.js] como punto de entrada raíz que registra la actividad con `expo-router/entry`.

2. **Nuevos Componentes de Interfaz**:
   - **`CategoryChip.js`**: Un chip interactivo para filtrar rápidamente productos por categorías.
   - **`CartItemRow.js`**: Una fila reutilizable y dinámica para representar los ítems agregados al carrito, con soporte para incrementar/decrementar cantidades y eliminar productos.

3. **Nuevas Pantallas y Rutas**:
   - **`orders.js`**: Pestaña dedicada al historial de pedidos realizados por el usuario, conectada al backend de Supabase.
   - **`profile.js`**: Pestaña de perfil del usuario que permite gestionar la sesión (iniciar sesión, ver datos de perfil y cerrar sesión).
   - **`[id].js`**: Ruta dinámica para ver el detalle de cada producto seleccionado por su identificador único.

4. **Migración del Servidor Backend**:
   - Se reemplazó el backend simulado de API REST local (Express/Node.js) para utilizar **Supabase** como backend remoto (BaaS).
   - Conexión a la base de datos PostgreSQL en la nube de Supabase para la lectura y escritura de productos, pedidos y detalles de compras en tiempo real.
   - Gestión de autenticación segura directamente con Supabase Auth.

---

## 🛠️ Arquitectura del Sistema (Backend & Frontend)

### Frontend (Móvil)
- **Framework**: React Native con Expo (v54.0.x).
- **Enrutamiento**: `expo-router` con estructura basada en directorios (`(tabs)`, `product`, `_layout.js`).
- **Persistencia Local**: `@react-native-async-storage/async-storage` para guardar sesiones y tokens locales de forma segura.

### Backend (Base de Datos & Auth)
El backend de la aplicación está soportado por **Supabase**:
- **Base de Datos**: PostgreSQL alojada en la nube.
- **Tablas Principales**:
  - `products`: Almacena el inventario de productos (nombre, precio, categoría, descripción, URL de imagen, etc.).
  - `orders`: Registra los pedidos totales con su dirección y estado.
  - `order_items`: Tabla intermedia que almacena los detalles de cada ítem comprado en un pedido específico (relación de clave foránea con `orders` y `products`).
- **Autenticación**: Supabase Auth para verificar el correo y la contraseña de los usuarios.

---

## 📂 Estructura del Proyecto

```text
NaturApp/
├── app/                      # Rutas de la aplicación (Expo Router)
│   ├── (tabs)/               # Pestañas principales de navegación
│   │   ├── _layout.js        # Configuración visual de pestañas (Tabs Layout)
│   │   ├── home.js           # Pantalla de inicio con catálogo y filtros
│   │   ├── cart.js           # Carrito de compras y checkout
│   │   ├── orders.js         # Historial de pedidos del usuario [NUEVO]
│   │   └── profile.js        # Gestión del perfil e inicio de sesión [NUEVO]
│   ├── product/              # Rutas relacionadas a productos
│   │   └── [id].js           # Detalle dinámico de producto [NUEVO]
│   ├── _layout.js            # Root Layout de Expo Router
│   └── index.js              # Redirección inicial [NUEVO]
├── src/
│   ├── components/           # Componentes visuales reutilizables
│   │   ├── CartItemRow.js    # Fila de producto en el carrito [NUEVO]
│   │   ├── CategoryChip.js   # Chip de selección de categoría [NUEVO]
│   │   └── ProductCard.js    # Tarjeta de producto en el catálogo
│   ├── services/             # Lógica de comunicación y servicios
│   │   ├── apiService.js     # Adaptador de servicios (Supabase backend)
│   │   ├── databaseService.js# Gestión local SQLite (Offline fallback)
│   │   ├── storageService.js # Persistencia de tokens y perfiles locales
│   │   └── supabaseClient.js # Configuración del cliente Supabase [NUEVO]
├── app.json                  # Configuración global de Expo [MODIFICADO]
├── package.json              # Dependencias y scripts de ejecución
└── index.js                  # Registro de la App (Root Entry)
```

---

## ⚡ Comandos para Ejecución

Sigue estos pasos para instalar y ejecutar el proyecto localmente.

### Prerrequisitos
- Tener instalado [Node.js](https://nodejs.org/) (versión recomendada 18 o superior).
- Disponer de la aplicación **Expo Go** instalada en tu dispositivo móvil (iOS o Android) o tener configurado un emulador.

### 1. Instalar dependencias
Abre tu terminal en la raíz del proyecto y ejecuta:
```bash
npm install
```

### 2. Iniciar el servidor de Expo
Inicia el entorno de desarrollo mediante:
```bash
npm run start
```
*O alternativamente:*
```bash
npx expo start
```

### 3. Ejecutar en tu dispositivo o emulador
Al ejecutar el servidor de desarrollo, se mostrará un código QR en la consola:
- **Android**: Escanea el código QR usando la app **Expo Go**.
- **iOS**: Escanea el código QR con la app nativa de la **Cámara**.
- **Emuladores**:
  - Presiona `a` en la terminal para abrir en un emulador de Android.
  - Presiona `i` en la terminal para abrir en el simulador de iOS.
  - Presiona `w` para abrir la versión Web en tu navegador.
