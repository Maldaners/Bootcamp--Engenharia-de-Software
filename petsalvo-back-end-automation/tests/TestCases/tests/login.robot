*** Settings ***
Documentation   Casos de teste da API de LOGIN

Resource        ../variables/libraries_variables.robot

Suite Setup     Gerar token 


*** Test Cases ***


####################################  LOGIN  ########################################
CN01 - Validar LOGIN feito com sucesso 
    Dado que possuo um LOGIN válido 
    Quando realizo uma chamada POST na rota de LOGIN
    Então a api deverá retornar 201
    E o login deve ser feito com sucesso 

CN02 - Validar LOGIN feito com email inválido 
    Dado que possuo um email inválido 
    Quando realizo uma chamada POST na rota de LOGIN
    Então a api deverá retornar 401
    E o login não deve ser feito com sucesso 

CN03 - Validar LOGIN feito com senha inválida 
    Dado que possuo uma senha inválida 
    Quando realizo uma chamada POST na rota de LOGIN
    Então a api deverá retornar 401
    E o login não deve ser feito com sucesso 

CN04 - Validar LOGIN feito com email sem @
    Dado que possuo um email sem a fromacao correta 
    Quando realizo uma chamada POST na rota de LOGIN
    Então a api deverá retornar 400
    E o login não deve ser feito com sucesso 