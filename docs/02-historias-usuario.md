# Historias de Usuario — next-shopping

## Rol: Cliente

### HU-01: Registro de cuenta
**Como** cliente nuevo,
**quiero** registrarme con correo y contraseña,
**para** llevar seguimiento de mis compras.

**Criterios de aceptación:**
- El correo debe tener formato válido (ej: usuario@dominio.com)
- El correo no puede estar ya registrado en el sistema
- La contraseña debe tener mínimo 8 caracteres
- Si el registro es exitoso, el usuario recibe confirmación y queda logueado
- Si falla, se muestra un mensaje de error claro (correo duplicado, formato inválido, etc.)

---

### HU-02: Actualizar contraseña
**Como** cliente registrado,
**quiero** actualizar mi contraseña estando logueado,
**para** mantener mi cuenta segura.

**Criterios de aceptación:**
- Debe solicitar la contraseña actual antes de permitir el cambio
- La nueva contraseña debe cumplir el mismo formato mínimo (8 caracteres)
- Se muestra confirmación de cambio exitoso

---

### HU-03: Recuperar contraseña por olvido
**Como** cliente que olvidó su contraseña,
**quiero** poder restablecerla vía correo electrónico,
**para** recuperar el acceso a mi cuenta.

**Criterios de aceptación:**
- El sistema envía un enlace o código de recuperación al correo registrado
- El enlace/código debe expirar después de un tiempo determinado
- El usuario puede definir una nueva contraseña siguiendo el mismo formato mínimo

---

### HU-04: Agregar dirección de envío
**Como** cliente registrado,
**quiero** agregar una dirección de domicilio,
**para** que el pedido llegue al destino correcto.

**Criterios de aceptación:**
- Debe permitir registrar al menos una dirección completa (calle, ciudad, referencia)
- El usuario puede editar o eliminar direcciones guardadas
- Si tiene varias direcciones, puede elegir cuál usar al comprar

---

### HU-05: Cambiar nombre de usuario
**Como** cliente registrado,
**quiero** cambiar mi nombre de usuario,
**para** personalizar mi perfil.
*(Prioridad baja)*

**Criterios de aceptación:**
- El nuevo nombre no puede estar vacío
- Se guarda el cambio y se refleja en el perfil

---

### HU-09: Buscar productos
**Como** cliente,
**quiero** buscar productos por nombre, marca, descripción o características,
**para** encontrar rápido el electrodoméstico que necesito.

**Criterios de aceptación:**
- El buscador debe filtrar resultados en base al texto ingresado
- Debe funcionar aunque el texto coincida parcialmente (no solo exacto)
- Si no hay resultados, se muestra un mensaje claro de "sin resultados"

---

### HU-10: Ver detalle de producto
**Como** cliente,
**quiero** ver especificaciones, calificación, precio y descripción de un producto,
**para** decidir si es lo que necesito antes de comprarlo.

**Criterios de aceptación:**
- Debe mostrar todas las características cargadas por el admin (HU-07)
- Debe mostrar el precio actual (con descuento aplicado, si tiene oferta activa)
- Debe mostrar al menos una imagen del producto

---

### HU-11: Marcar producto como favorito
**Como** cliente,
**quiero** marcar un producto como favorito,
**para** guardarlo y revisarlo después sin perderlo de vista.

**Criterios de aceptación:**
- El cliente puede agregar o quitar un producto de favoritos desde el detalle o el catálogo
- Debe existir una sección donde ver todos los favoritos guardados

---

### HU-12: Agregar producto al carrito
**Como** cliente,
**quiero** agregar un producto al carrito,
**para** comprarlo más adelante.

**Criterios de aceptación:**
- Debe permitir elegir la cantidad antes de agregar (o por defecto 1)
- No debe permitir agregar más unidades que el stock disponible
- Se debe confirmar visualmente que el producto fue agregado

---

### HU-13: Gestionar carrito de compras
**Como** cliente,
**quiero** ver el costo total, los productos agregados, eliminar productos o modificar cantidades en mi carrito,
**para** tener certeza de mi compra antes de confirmarla.

**Criterios de aceptación:**
- Debe mostrar cada producto con su cantidad, precio unitario y subtotal
- Debe mostrar el costo total del carrito
- Debe permitir eliminar un producto o cambiar su cantidad
- Debe tener un botón para confirmar y continuar hacia el checkout

---

### HU-14: Checkout y pago
**Como** cliente,
**quiero** seleccionar un método de pago y ver el resumen de mi compra antes de confirmar,
**para** completar mi pedido con la información correcta.

**Criterios de aceptación:**
- Debe mostrar la dirección de envío seleccionada (HU-04)
- Debe permitir elegir o agregar un método de pago
- Debe mostrar un resumen final (productos, cantidades, total) antes de confirmar
- Solo usuarios registrados y autenticados pueden acceder a esta sección (no hay compra como invitado)

---

### HU-15: Ver historial y estado de pedidos
**Como** cliente,
**quiero** ver mis pedidos anteriores y su estado actual,
**para** hacer seguimiento de mis compras.

**Criterios de aceptación:**
- Debe listar todos los pedidos realizados por el cliente
- Cada pedido debe mostrar su estado actual (pendiente, confirmado, enviado, entregado)
- Debe permitir ver el detalle de un pedido específico (productos, total, fecha)

---

## Rol: Admin

### HU-06: Verificación de rol
**Como** admin,
**quiero** que el sistema verifique mi rol al iniciar sesión,
**para** evitar que cualquier usuario acceda al panel de administración.

**Criterios de aceptación:**
- Solo usuarios con rol "admin" pueden acceder a rutas del panel administrativo
- Si un usuario sin rol admin intenta acceder, se le niega el acceso
- El rol se valida en cada solicitud, no solo al iniciar sesión

---

### HU-07: Agregar producto nuevo
**Como** admin,
**quiero** agregar productos con imágenes, nombre, descripción, precio, stock y características,
**para** evitar errores por campos faltantes.

**Criterios de aceptación:**
- Todos los campos obligatorios (nombre, precio, stock, al menos 1 imagen) deben validarse antes de publicar
- El precio y stock deben ser valores numéricos positivos
- El producto no se publica si falta algún campo obligatorio
- Se muestra confirmación cuando el producto se agrega correctamente

---

### HU-08: Aplicar ofertas
**Como** admin,
**quiero** aplicar ofertas por categoría o por producto específico,
**para** atraer clientes y aumentar ventas.

**Criterios de aceptación:**
- Debe permitir elegir entre aplicar la oferta a un producto o a toda una categoría
- Debe permitir definir el porcentaje o monto de descuento
- El precio con descuento debe mostrarse claramente en el catálogo

---

### HU-16: Actualizar estado de un pedido
**Como** admin,
**quiero** cambiar el estado de un pedido (confirmado, enviado, entregado),
**para** mantener informado al cliente sobre su compra.

**Criterios de aceptación:**
- Debe permitir cambiar el estado desde un panel de gestión de pedidos
- El cambio de estado debe reflejarse inmediatamente en el historial del cliente (HU-15)
- Debe existir una secuencia lógica de estados (no se puede pasar de "pendiente" a "entregado" sin pasos intermedios)