Feature: Reprogramar y cancelar un pedido
  #4
  @reprogramarYCancelarPedido
  Scenario: Cambiar la fecha de entrega a siete días y cancelar el pedido
    Given estoy en la página de ingreso de la tienda
    When ingreso con el alias "pfrecuente" y la contraseña "Tienda123!"
    And voy a Mis pedidos
    And reprogramo el pedido "PD0006" para la fecha "05/11/2026"
    And cancelo el pedido "PD0006"
    Then debería ver el pedido "PD0006" cancelado
