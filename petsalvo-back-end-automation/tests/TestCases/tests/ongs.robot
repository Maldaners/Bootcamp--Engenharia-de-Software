*** Settings ***
Documentation   Casos de teste da API de ONGs

Resource        ../variables/libraries_variables.robot

Suite Setup     Gerar token ONGs

*** Test Cases ***

####################################  POSTs ONGs  ########################################

CN01 - Validar criação de ong feito com sucesso 
    Dado que possuo uma ong  
    Quando realizo uma chamada POST na rota de cria ongs
    Então a api deverá retornar 201
    E a criacao deve ser feita com sucesso 
   
CN02 - Validar criação de ong feito com conta ja criada 
    Dado que possuo uma ong mas ja criado 
    Quando realizo uma chamada POST na rota de cria ongs
    Então a api deverá retornar 400
    E a criacao nao deve ser feita com sucesso 

CN03 - Validar criação de ong feito com email sem @
    Dado que tento criar uma ong com email sem @
    Quando realizo uma chamada POST na rota de cria ongs
    Então a api deverá retornar 400
    E a criacao nao deve ser feita com sucesso 

CN04 - Validar criação de ong feito com cep e cpf como numeros
    Dado que tento criar uma ong com cep e cpf como numeros
    Quando realizo uma chamada POST na rota de cria ongs
    Então a api deverá retornar 400
    E a criacao nao deve ser feita com sucesso 


####################################  GETs ONGs   ########################################

CN05 - Validar busca de todas as ONGs 
 #   Dado que faço uma chamada na API de Ongs
    Quando realizo uma chamada de busca de todas as ONGs
    Então a api deverá retornar 200
    E uma lista de ONGs

CN06 - Validar busca de ONGs por ID 
 #   Dado que faço uma chamada na API de Ongs
    Quando realizo uma chamada de busca passando o ID da ONG
#   Então a api deverá retornar 200
    E os dados do usuario

CN07 - Validar busca de ONGs 
 #   Dado que faço uma chamada na API de Ongs
    Quando realizo uma chamada de busca 
#   Então a api deverá retornar 200
    E os dados da ONG



####################################  PUTs ONGs   ########################################
CN08 - Validar Alteração de ong feito com sucesso 
    Dado que possuo uma ong válida 
    Quando realizo uma chamada PUT para Alteração
#   Então a api deverá retornar 201
    E o dado deve ser alterado

CN09 - Validar Alteração de ong feito com conta ja alterada 
    Dado que possuo uma ong válida 
    Quando realizo uma chamada PUT para Alteração
    Então a api deverá retornar 401
    E o dado deve ser alterado

CN10 - Validar Alteração de ong feito com email sem @
    Dado que tento alterar uma ong com email sem @
    Quando realizo uma chamada PUT para Alteração
    Então a api deverá retornar 401
    E o dado não deve ser alterado

CN11 - Validar Alteração de ong feito com cep e cpf como numeros
    Dado que tento alterar uma ong com cep e cpf como numeros
    Quando realizo uma chamada PUT para Alteração
    Então a api deverá retornar 401
    E o dado não deve ser alterado


####################################  DELs ONGs   ########################################


CN12 - Validar DELETE de ONGs 
 #   Dado que faço uma chamada na API de Ongs
    Quando realizo uma chamada de delete das ONGs
#   Então a api deverá retornar 200
    E a ong deve ser deletada

CN13 - Validar DELETE de ONGs com usuario nao autenticado
 #   Dado que faço uma chamada na API de Ongs
    Quando realizo uma chamada de delete das ONGs com usuario nao autenticado
    Então a api deverá retornar 401
    E a ong não deve ser deletada

CN14 - Validar DELETE de ONGs com usuario nao autorizado
 #   Dado que faço uma chamada na API de Ongs
    Quando realizo uma chamada de delete das ONGs com usuario nao autorizado
    Então a api deverá retornar 401
    E a ong não deve ser deletada

CN15 - Validar DELETE de ONGs com usuario não encontrado com o id informado
 #   Dado que faço uma chamada na API de Ongs
    Quando realizo uma chamada de delete das ONGs com usuario não encontrado com o id informado
    Então a api deverá retornar 401
    E a ong não deve ser deletada










#                                     IMAGENS                                            #

####################################  GETs ONGs   ########################################
CN16 - Validar busca de imagens das ONGs 
 #   Dado que faço uma chamada na API de Ongs
    Quando realizo uma chamada de busca de imagens da ong
#   Então a api deverá retornar 200

CN17 - Validar busca de imagens das ONGs por ID
 #   Dado que faço uma chamada na API de Ongs
    Quando realizo uma chamada de busca de imagens da ong por user ID
#   Então a api deverá retornar 200


####################################  DELs ONGs   ########################################

#CN18 - Validar DELETE de imagem das ONGs 
 #   Dado que faço uma chamada na API de Ongs
 #   Quando realizo uma chamada de delete das imagens das ONGs
 #   Então a api deverá retornar 200
 ##   E a imagem deve ser deletada

#N19 - Validar DELETE de imagem das ONGs com erro 
 #   Dado que faço uma chamada na API de Ongs
 #   Quando realizo uma chamada de delete das imagens das ONGs com erro
  #  Então a api deverá retornar 400




#                                     STATUS                                             #
####################################  POSTs ONGs  ########################################

CN20- Validar alteracao de status da ong feito com sucesso 
    Dado que possuo um status de ong   
    Quando realizo uma chamada POST na rota de cria status
#   Então a api deverá retornar 200
    E a criacao deve ser feita com sucesso 

CN21 - Validar criação de status da ong ja criado
    Dado que possuo um status de ong mas ja criado 
    Quando realizo uma chamada POST na rota de cria status
    Então a api deverá retornar 401
    E a criacao nao deve ser feita com sucesso 

####################################  GETs ONGs   ########################################

CN22 - Validar busca de status all usuario
 #   Dado que faço uma chamada na API de Ongs
    Quando realizo uma chamada de busca de todos os status por usuario
#   Então a api deverá retornar 200
    E uma lista de status

CN23 - Validar busca de status por id usuario
 #   Dado que faço uma chamada na API de Ongs
    Quando realizo uma chamada de busca de status por id e usuario
#   Então a api deverá retornar 200
    E uma lista de status

CN24 - Validar busca de status por ID do status
 #   Dado que faço uma chamada na API de Ongs
    Quando realizo uma chamada de busca passando o ID do status
#   Então a api deverá retornar 200
    E uma lista de status




#                                     PIX                                                #
####################################  POSTs ONGs  ########################################

CN25 - Validar criação de pix ong feito com sucesso 
    Dado que possuo uma ong com PIX 
    Quando realizo uma chamada POST na rota de cria pix ongs
#   Então a api deverá retornar 201
    E a criacao deve ser feita com sucesso 
   
CN26 - Validar criação de pix ong feito com conta ja criada 
    Dado que possuo uma ong com PIX 
    Quando realizo uma chamada POST na rota de cria pix ongs
    Então a api deverá retornar 401
    E a criacao nao deve ser feita com sucesso 


####################################  GETs ONGs   ########################################
CN27 - Validar busca de todas as chaves pix ONGs 
 #   Dado que faço uma chamada na API de Ongs
    Quando realizo uma chamada de busca de todas as chaves pix
#   Então a api deverá retornar 200
    E uma lista de ONGs

CN28 - Validar busca de todas as chaves pix ONGs por id pix
 #   Dado que faço uma chamada na API de Ongs
    Quando realizo uma chamada de busca de por id pix
#   Então a api deverá retornar 200
    E os dados do usuario

CN29 - Validar busca de todas as chaves pix ONGs por id user e id pix
 #   Dado que faço uma chamada na API de Ongs
    Quando realizo uma chamada de busca por id user e id pix
#   Então a api deverá retornar 200
    E os dados da ONG

CN30 - Validar busca de todas as chaves pix ONGs por id user e all pix
 #   Dado que faço uma chamada na API de Ongs
    Quando realizo uma chamada de busca por id user e all pix
#   Então a api deverá retornar 200
    E os dados da ONG


