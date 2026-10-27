Feature: Iniciar sesión en Tienda QA
  #1
  @login
  Scenario: Acceder al catálogo con credenciales válidas
    Given estoy en la página de ingreso de la tienda
    When ingreso con el alias "cnueva" y la contraseña "Tienda123!"
    Then debería ver el catálogo
