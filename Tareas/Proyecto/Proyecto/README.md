# 🚲 Dashboard de Inventario de Bicitaxis

Sistema de gestión de flota para vehículos tipo bicitaxi. Permite registrar, actualizar y monitorear el estado de cada unidad, así como llevar un historial completo de revisiones técnicas (checkups) por vehículo.

---

## Tecnologías Utilizadas

| Capa         | Tecnología                                              |
|--------------|---------------------------------------------------------|
| Frontend     | React 18, Vite, React Router v6, TailwindCSS, Axios     |
| Backend      | Node.js 18, Express 4, JWT, bcryptjs                    |
| Base de datos| PostgreSQL 15                                           |
| DevOps       | Docker, Docker Compose, Nginx                           |

---

## Diagrama de Arquitectura

```
Navegador
    |
    ▼
[ Nginx :80 ]  ← proxy inverso (punto único de entrada)
    |        \
    |         \
    ▼          ▼
[Frontend   [Backend
  :3000]      :4000]
               |
               ▼
           [PostgreSQL
             :5432]

Red Docker : bicitaxi-net (bridge)
Volumen    : postgres_data (nombrado, persistente)
```

---

## Requisitos Previos

- [Docker](https://docs.docker.com/get-docker/) ≥ 24
- [Docker Compose](https://docs.docker.com/compose/) ≥ 2.20
- [Git](https://git-scm.com/)

---

## Inicio Rápido

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd Proyecto

# 2. Crear el archivo de variables de entorno
cp .env.example .env
# Editar .env y establecer tus propios valores secretos

# 3. Construir e iniciar todos los contenedores
docker compose up --build

# 4. Abrir en el navegador
open http://localhost
```

Credenciales del administrador (incluidas en los datos de prueba):
- **Correo:** `admin@bicitaxi.com`
- **Contraseña:** `admin123`

---

## Variables de Entorno

| Variable       | Descripción                                           | Ejemplo                        |
|----------------|-------------------------------------------------------|--------------------------------|
| `DB_USER`      | Nombre de usuario de PostgreSQL                       | `bicitaxi`                     |
| `DB_PASS`      | Contraseña de PostgreSQL                              | `contraseña_segura`            |
| `DB_NAME`      | Nombre de la base de datos                            | `bicitaxi_db`                  |
| `JWT_SECRET`   | Clave secreta para firmar los tokens JWT              | `cadena_larga_y_aleatoria`     |
| `CORS_ORIGIN`  | Origen permitido para CORS (opcional, por defecto `*`)| `http://localhost`             |

---

## Documentación de la API

### Autenticación

| Método | Ruta                  | Auth | Cuerpo                              | Respuesta         |
|--------|-----------------------|------|-------------------------------------|-------------------|
| POST   | `/api/auth/register`  | No   | `{ name, email, password }`         | `{ token, user }` |
| POST   | `/api/auth/login`     | No   | `{ email, password }`               | `{ token, user }` |

**Ejemplo de inicio de sesión:**
```json
POST /api/auth/login
{
  "email": "admin@bicitaxi.com",
  "password": "admin123"
}
```

---

### Vehículos (requiere token Bearer)

| Método | Ruta                  | Auth | Cuerpo                                                                    |
|--------|-----------------------|------|---------------------------------------------------------------------------|
| GET    | `/api/vehicles`       | Sí   | —                                                                         |
| GET    | `/api/vehicles/:id`   | Sí   | —                                                                         |
| POST   | `/api/vehicles`       | Sí   | `{ plate, model, brand, year, color, status, owner_name, owner_phone }`   |
| PUT    | `/api/vehicles/:id`   | Sí   | `{ plate, model, brand, year, color, status, owner_name, owner_phone }`   |
| DELETE | `/api/vehicles/:id`   | Sí   | —                                                                         |

**Ejemplo de creación de vehículo:**
```json
POST /api/vehicles
Authorization: Bearer <token>
{
  "plate": "BT-010",
  "brand": "VeloTaxi",
  "model": "UrbanX",
  "year": 2023,
  "color": "Azul",
  "status": "active",
  "owner_name": "Luis Gómez",
  "owner_phone": "555-0200"
}
```

---

### Revisiones Técnicas (requiere token Bearer)

| Método | Ruta                                | Auth | Cuerpo                                                                          |
|--------|-------------------------------------|------|---------------------------------------------------------------------------------|
| GET    | `/api/checkups/latest`              | Sí   | —                                                                               |
| GET    | `/api/checkups/vehicle/:vehicleId`  | Sí   | —                                                                               |
| POST   | `/api/checkups`                     | Sí   | `{ vehicle_id, brakes, lights, tires, frame, overall_status, notes }`           |

**Ejemplo de registro de revisión:**
```json
POST /api/checkups
Authorization: Bearer <token>
{
  "vehicle_id": 1,
  "brakes": "good",
  "lights": "regular",
  "tires": "good",
  "frame": "good",
  "overall_status": "approved",
  "notes": "Revisión semestral sin observaciones relevantes"
}
```

---

## Esquema de la Base de Datos

### Tabla `users` — Usuarios del sistema

| Columna         | Tipo         | Descripción                              |
|-----------------|--------------|------------------------------------------|
| id              | SERIAL PK    | Identificador autoincremental            |
| name            | VARCHAR(100) | Nombre completo del usuario              |
| email           | VARCHAR(150) | Correo electrónico único                 |
| password_hash   | VARCHAR(255) | Contraseña cifrada con bcrypt            |
| role            | VARCHAR(20)  | Rol: `admin` u `operator`                |
| created_at      | TIMESTAMP    | Fecha y hora de creación del registro    |

### Tabla `vehicles` — Vehículos registrados

| Columna      | Tipo         | Descripción                               |
|--------------|--------------|-------------------------------------------|
| id           | SERIAL PK    | Identificador autoincremental             |
| plate        | VARCHAR(20)  | Placa única del vehículo                  |
| model        | VARCHAR(100) | Modelo del vehículo                       |
| brand        | VARCHAR(100) | Marca del vehículo                        |
| year         | INT          | Año de fabricación                        |
| color        | VARCHAR(50)  | Color del vehículo                        |
| status       | VARCHAR(20)  | Estado: `active`, `inactive`, `maintenance`|
| owner_name   | VARCHAR(100) | Nombre completo del propietario           |
| owner_phone  | VARCHAR(20)  | Teléfono del propietario                  |
| created_at   | TIMESTAMP    | Fecha y hora de creación del registro     |

### Tabla `checkups` — Revisiones técnicas

| Columna         | Tipo         | Descripción                                   |
|-----------------|--------------|-----------------------------------------------|
| id              | SERIAL PK    | Identificador autoincremental                 |
| vehicle_id      | INT FK       | Referencia a `vehicles(id)`                   |
| inspector_id    | INT FK       | Referencia a `users(id)`                      |
| check_date      | TIMESTAMP    | Fecha y hora de la revisión                   |
| brakes          | VARCHAR(20)  | Estado de frenos: `good`, `regular`, `bad`    |
| lights          | VARCHAR(20)  | Estado de luces: `good`, `regular`, `bad`     |
| tires           | VARCHAR(20)  | Estado de llantas: `good`, `regular`, `bad`   |
| frame           | VARCHAR(20)  | Estado de estructura: `good`, `regular`, `bad`|
| overall_status  | VARCHAR(20)  | Resultado: `approved`, `conditional`, `rejected`|
| notes           | TEXT         | Observaciones adicionales del inspector       |
| created_at      | TIMESTAMP    | Fecha y hora de creación del registro         |

---

## Flujo de Desarrollo

```
1. Usuario accede a http://localhost
        │
        ▼
2. Nginx enruta /* → frontend:3000
   La SPA de React se carga en el navegador
        │
        ▼
3. Usuario envía el formulario de Login
   Axios POST /api/auth/login → Nginx → backend:4000
        │
        ▼
4. El backend verifica credenciales con bcryptjs
   Firma un JWT con jsonwebtoken → devuelve { token, user }
        │
        ▼
5. El frontend guarda el token en localStorage
   React Router redirige a /dashboard
        │
        ▼
6. PrivateRoutes verifica si hay token en localStorage
   Si no existe → redirige a /login
        │
        ▼
7. Cada petición autenticada incluye:
   Authorization: Bearer <jwt>
        │
        ▼
8. auth.middleware.js valida el JWT en cada ruta
   protegida. Token inválido → responde 401.
        │
        ▼
9. Los controladores llaman a los modelos → pg pool
   → PostgreSQL. Responden JSON al cliente.
```

---

## Estructura de Carpetas

```
Proyecto/
├── docker-compose.yml        # Orquesta los 4 servicios Docker
├── .env.example              # Plantilla de variables de entorno
├── README.md
│
├── database/
│   ├── Dockerfile            # FROM postgres:15
│   └── init.sql              # Esquema de tablas + datos de prueba
│
├── backend/
│   ├── Dockerfile            # FROM node:18-alpine
│   ├── package.json
│   └── src/
│       ├── index.js           # Punto de entrada de Express
│       ├── config/db.js       # Configuración del pool de PostgreSQL
│       ├── routes/            # Definición de rutas por recurso
│       ├── controllers/       # Lógica de negocio por recurso
│       ├── models/            # Abstracciones de consultas SQL
│       └── middleware/        # Autenticación JWT + manejo de errores
│
├── frontend/
│   ├── Dockerfile            # Multi-etapa: build con Vite + servir con Nginx
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── src/
│       ├── main.jsx           # Entrada de React con BrowserRouter
│       ├── App.jsx            # Definición de rutas
│       ├── services/api.js    # Instancia de Axios con interceptor JWT
│       ├── routes/            # Guardas PublicRoutes y PrivateRoutes
│       ├── pages/public/      # Login, Register
│       ├── pages/private/     # Dashboard, Vehicles, VehicleDetail, Checkup
│       └── components/        # Navbar, Sidebar, VehicleCard, CheckupForm
│
└── nginx/
    ├── Dockerfile             # FROM nginx:alpine
    └── nginx.conf             # /api/* → backend | /* → frontend
```

---

## Funcionalidades

- Autenticación JWT con token almacenado en `localStorage`
- Rutas públicas (Login, Register) redirigen al usuario ya autenticado al dashboard
- Rutas privadas redirigen al usuario no autenticado a `/login`
- Dashboard con estadísticas de vehículos: total y desglose por estado
- Dashboard muestra las últimas 5 revisiones técnicas con placa e inspector
- Listado completo de vehículos con operaciones CRUD desde un modal
- Página de detalle de vehículo con historial completo de revisiones
- Formulario de revisión técnica con campo por cada componente evaluado
- Proxy inverso Nginx — un único punto de entrada en el puerto 80
- Volumen nombrado de PostgreSQL para persistencia de datos
- Healthcheck en el servicio de base de datos antes de iniciar el backend
- Red Docker bridge personalizada (`bicitaxi-net`) que aísla los contenedores

---

## Capturas de Pantalla

> _Agrega capturas de pantalla aquí después de ejecutar la aplicación_

| Login | Dashboard | Vehículos |
|-------|-----------|-----------|
| ![Login](docs/login.png) | ![Dashboard](docs/dashboard.png) | ![Vehicles](docs/vehicles.png) |

---

## Licencia

MIT
