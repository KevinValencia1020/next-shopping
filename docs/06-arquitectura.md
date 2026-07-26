# Arquitectura — next-shopping

## Vista general

next-shopping se compone de 3 piezas independientes que se comunican entre sí:

![Arquitectura general](./assets/arquitectura/arquitectura-general.png)

- **Frontend (Next.js):** interfaz de usuario, consume la API del backend vía `fetch`. No accede a la base de datos directamente.
- **Backend (Express + Node.js):** API REST, contiene toda la lógica de negocio, es el único que se comunica con PostgreSQL (vía Prisma) y con servicios externos (Cloudinary, Resend).
- **Base de datos (PostgreSQL):** almacenamiento persistente, gestionado a través de Prisma ORM.

Esta separación (frontend/backend independientes) permite desplegar cada parte por su lado y escalarlas de forma independiente si fuera necesario.

---

## Backend — arquitectura en capas

El backend sigue una organización por responsabilidad, evitando mezclar lógica de rutas, negocio y acceso a datos en un mismo archivo:

| Capa | Responsabilidad |
|------|------------------|
| `routes/` | Define los endpoints disponibles y qué controller los atiende |
| `controllers/` | Recibe la petición HTTP, llama al service correspondiente, devuelve la respuesta |
| `services/` | Contiene la lógica de negocio (ej: validar stock, calcular si una oferta está vigente) |
| `middlewares/` | Funciones que se ejecutan antes del controller (verificar JWT, verificar rol admin) |
| `prisma/schema.prisma` | Define el modelo de datos y genera el cliente de acceso a PostgreSQL |

---

## Estructura de carpetas

![Estructura de carpetas](./assets/arquitectura/arquitectura-estructura.png)

Ambos proyectos (frontend y backend) viven en repositorios/carpetas separadas.

---

## Convenciones de API (REST)

Los endpoints siguen convención REST estándar, agrupados por recurso:

GET /api/productos - listar catálogo (paginado, ver RNF-02)
GET /api/productos/:id - detalle de producto
POST /api/auth/registro - crear cuenta
POST /api/auth/login - iniciar sesión
GET /api/carrito - ver carrito (requiere autenticación)
POST /api/pedidos - confirmar pedido (requiere autenticación)
GET /api/pedidos - historial de pedidos (requiere autenticación)

POST /api/admin/productos - crear producto (requiere rol admin)
POST /api/admin/ofertas - crear oferta (requiere rol admin)
PATCH /api/admin/pedidos/:id - actualizar estado de pedido (requiere rol admin)

Las rutas protegidas pasan primero por el middleware `verificarJWT`, y las de administración adicionalmente por `verificarAdmin`.

---

## Autenticación

- **Mecanismo:** JWT (JSON Web Token)
- **Almacenamiento:** cookie `httpOnly`, `secure`, `sameSite` — el JavaScript del navegador no puede leer el token, mitigando ataques XSS (ver RNF-04 a RNF-08)
- **Flujo:**
  1. El usuario envía sus credenciales al backend
  2. Express valida contra la base de datos (contraseña con hash bcrypt) y genera un JWT
  3. El backend responde con `Set-Cookie`, entregando el token de forma segura
  4. El navegador envía la cookie automáticamente en cada petición posterior
  5. El middleware `verificarJWT` valida el token antes de permitir acceso a rutas protegidas

**Nota técnica importante:** como frontend y backend corren en dominios distintos (ej: Vercel y Railway), es necesario configurar CORS con credenciales habilitadas en Express, y usar `credentials: 'include'` en las peticiones `fetch` del frontend — de lo contrario, la cookie no viaja entre dominios.

---

## Servicios externos

| Servicio | Uso | Integración |
|----------|-----|--------------|
| **Cloudinary** | Almacenamiento de imágenes de producto (plan gratuito) | El backend gestiona el upload antes de guardar la URL en la base de datos |
| **Resend** | Envío de correos transaccionales (registro, confirmación de pedido) | Llamado desde el backend tras completar la acción correspondiente |

---

## Despliegue

| Componente | Servicio sugerido |
|------------|---------------------|
| Frontend (Next.js) | Vercel |
| Backend (Express) | Railway o Render |
| Base de datos (PostgreSQL) | Railway, Supabase o Neon |

Ver también RNF-09 y RNF-10 (`01-requisitos.md`) sobre las limitaciones de disponibilidad de hosting gratuito.

---

## Gestión de estado (frontend)

- **Context API de React** para estado global simple: carrito de compras (`CartContext`) y sesión de usuario (`AuthContext`)
- No se contempla una librería externa de manejo de estado (Redux, Zustand) dado el tamaño del proyecto — Context API es suficiente para este alcance