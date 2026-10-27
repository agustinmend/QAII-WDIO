Feature: Registrar un usuario y comprar un producto con entrega en tres días
  #3
  @registroYConfirmarPedido
  Scenario: Crear una cuenta y confirmar el pedido
    Given estoy en la página de registro de la tienda
    When registro "Cliente QA Tienda", "cliente.qa27@correo.test", "qaCliente27", "Tienda123!", "Cliente"
    And ingreso con el alias "qaCliente27" y la contraseña "Tienda123!"
    And consulto la ficha del producto "PR002"
    And agrego "1" unidades del producto al carrito
    And voy al carrito de compra y verifico el producto "PR002"
    And continúo con el pedido
    When completo y confirmo la entrega para "Cliente QA Tienda", zona "Villa Aurora", dirección "Calle de prueba 123", fecha "19/10/2026" y franja "morning"
    Then debería ver el pedido con entrega el "19/10/2026"
