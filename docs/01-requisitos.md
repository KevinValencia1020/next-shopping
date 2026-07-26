# Requisitos — next-shopping

## Requisitos no funcionales

### Rendimiento
- **RNF-01:** El catálogo y los resultados de búsqueda deben cargar en menos de 2 segundos.
- **RNF-02:** Los productos se cargan en lotes de 20, mediante un botón "Cargar más" (en lugar de scroll infinito automático), para mantener el footer accesible y simplificar la implementación.
- **RNF-03:** La página de detalle de producto (imágenes y características) debe cargar en menos de 2 segundos.

### Seguridad
- **RNF-04:** Las contraseñas deben almacenarse cifradas (hash con bcrypt o equivalente), nunca en texto plano.
- **RNF-05:** El sistema debe bloquear temporalmente una cuenta (15 minutos) tras 5 intentos fallidos de inicio de sesión consecutivos.
- **RNF-06:** Toda comunicación entre cliente y servidor debe realizarse mediante HTTPS.
- **RNF-07:** Las sesiones de usuario deben expirar automáticamente tras un periodo de inactividad definido.
- **RNF-08:** Las rutas del panel de administración deben estar protegidas por verificación de rol en cada solicitud (ver HU-15), no solo al iniciar sesión.

### Disponibilidad
- **RNF-09:** El sistema se despliega en hosting gratuito (ej: Vercel, Railway), sin garantía de disponibilidad 24/7 tipo SLA empresarial, dado el alcance académico del proyecto.
- **RNF-10:** La base de datos debe contar con respaldo (backup) periódico para evitar pérdida de información.

### Usabilidad
- **RNF-11:** La interfaz debe ser responsive, adaptándose correctamente a dispositivos móviles y de escritorio (ver `05-ui-ux.md`).
- **RNF-12:** Los mensajes de error deben ser claros y en español, orientando al usuario sobre cómo resolver el problema.

### Compatibilidad
- **RNF-13:** El sistema debe funcionar correctamente en las últimas 2 versiones de los navegadores Chrome, Firefox, Edge y Safari.

### Mantenibilidad
- **RNF-14:** El código debe organizarse de forma modular, separando lógica de frontend, backend y acceso a datos.
- **RNF-15:** El proyecto debe mantenerse bajo control de versiones (Git), con historial de commits descriptivo.

### Almacenamiento de imágenes
- **RNF-16:** Las imágenes de productos se gestionan mediante Cloudinary (plan gratuito). El sistema debe evitar subidas innecesarias o duplicadas para no exceder los límites del plan.
- **RNF-17:** Las imágenes subidas deben validarse en formato (jpg, png, webp) y tamaño máximo antes de subirse a Cloudinary.

### Legal / Protección de datos
- **RNF-18:** El sistema debe informar al usuario sobre el tratamiento de sus datos personales conforme a la Ley 1581 de 2012 (Habeas Data - Colombia), mediante una política de privacidad básica.

### Notificaciones
- **RNF-19:** El sistema debe enviar un correo electrónico automático al confirmar el registro de una cuenta.
- **RNF-20:** El sistema debe enviar un correo electrónico automático al confirmar un pedido.

---

## Requisitos funcionales

### Autenticación y perfil
- **RF-01:** El sistema debe permitir el registro de nuevos usuarios con correo y contraseña (HU-01).
- **RF-02:** El sistema debe permitir actualizar la contraseña de un usuario autenticado (HU-02).
- **RF-03:** El sistema debe permitir recuperar la contraseña vía correo electrónico (HU-03).
- **RF-04:** El sistema debe permitir agregar, editar y eliminar direcciones de envío (HU-04).
- **RF-05:** El sistema debe permitir modificar el nombre de usuario (HU-05).

### Catálogo y búsqueda
- **RF-06:** El sistema debe permitir buscar productos por nombre, marca, descripción o características (HU-06).
- **RF-07:** El sistema debe mostrar el detalle completo de un producto, incluyendo especificaciones, precio y descripción (HU-07).
- **RF-08:** El sistema debe permitir marcar y desmarcar productos como favoritos (HU-08).
- **RF-09:** El sistema debe mostrar productos similares (misma categoría) en la página de detalle, hasta un máximo de 10 (HU-19).

### Carrito y compra
- **RF-10:** El sistema debe permitir agregar productos al carrito, respetando el stock disponible (HU-09).
- **RF-11:** El sistema debe permitir visualizar, modificar cantidades y eliminar productos del carrito (HU-10).
- **RF-12:** El sistema debe permitir seleccionar método de pago y confirmar un pedido desde el checkout (HU-11).
- **RF-13:** El sistema debe restringir el checkout únicamente a usuarios autenticados (HU-11).
- **RF-14:** El sistema debe mostrar el historial de pedidos del usuario junto con su estado actual (HU-12).
- **RF-15:** El sistema debe validar disponibilidad de stock y descontarlo automáticamente al confirmar un pedido.

### Feed y personalización
- **RF-16:** El sistema debe mostrar un feed personalizado según el historial de búsquedas del usuario autenticado (HU-13).
- **RF-17:** El sistema debe mostrar un feed por defecto (categorías destacadas) para usuarios sin historial o sin sesión activa (HU-13).
- **RF-18:** El sistema debe mostrar una sección de productos favoritos recientes en el inicio, solo si el usuario tiene al menos uno guardado (HU-14).

### Administración de productos
- **RF-19:** El sistema debe verificar el rol de administrador antes de permitir acceso al panel administrativo (HU-15).
- **RF-20:** El sistema debe permitir a un administrador agregar productos con validación de campos obligatorios (HU-16).

### Administración de ofertas
- **RF-21:** El sistema debe permitir a un administrador aplicar ofertas por producto o categoría, con fecha de inicio y vencimiento (HU-17).
- **RF-22:** El sistema debe desactivar automáticamente una oferta una vez vencida su fecha de finalización.

### Administración de pedidos
- **RF-23:** El sistema debe permitir a un administrador actualizar el estado de un pedido, respetando la secuencia válida de estados (HU-18).

### Notificaciones
- **RF-24:** El sistema debe enviar un correo de confirmación al completar el registro de una cuenta.
- **RF-25:** El sistema debe enviar un correo de confirmación al completar la compra de un pedido.