*** Settings ***
Documentation   Casos de teste da API de PETs

Resource        ../variables/libraries_variables.robot

Suite Setup     Gerar token adotante

*** Test Cases ***

####################################  POSTs pet  ########################################

CN01 - Validar criação de pet feito com sucesso 
    Dado que possuo um pet  
    Quando realizo uma chamada POST na rota de cria pet
    Então a api deverá retornar 401
    E a criacao deve ser feita com sucesso 
   
CN02 - Validar criação de pet feito com pet ja criado
    Dado que possuo um pet mas ja criado 
    Quando realizo uma chamada POST na rota de cria pet
    Então a api deverá retornar 401
    E a criacao nao deve ser feita com sucesso 
