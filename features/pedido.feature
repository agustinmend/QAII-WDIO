Feature: Comprar un producto con entrega en nueve días
  #2
  @ConfirmarPedido
  Scenario: Agregar un producto y confirmar el pedido con fecha de entrega
    Given estoy en la página de ingreso de la tienda
    When ingreso con el alias "cnueva" y la contraseña "Tienda123!"
    And consulto la ficha del producto "PR002"
    And agrego "1" unidades del producto al carrito
    And voy al carrito de compra y verifico el producto "PR002"
    And continúo con el pedido
    When completo y confirmo la entrega para "Carla Nueva", zona "Villa Aurora", dirección "Calle de prueba 123", fecha "03/11/2026" y franja "morning"
    Then debería ver el pedido con entrega el "03/11/2026"
