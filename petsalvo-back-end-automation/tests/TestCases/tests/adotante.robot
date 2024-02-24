*** Settings ***
Documentation   Casos de teste da API de Adotante

Resource        ../variables/libraries_variables.robot

Suite Setup     Gerar token adotante

*** Test Cases ***

####################################  POSTs adotante  ########################################

CN01 - Validar criação de adotante feito com sucesso 
    Dado que possuo um adotante  
    Quando realizo uma chamada POST na rota de cria adotante
    Então a api deverá retornar 201
    E a criacao deve ser feita com sucesso 
   
CN02 - Validar criação de adotante feito com conta ja criada 
    Dado que possuo um adotante mas ja criado 
    Quando realizo uma chamada POST na rota de cria adotante
    Então a api deverá retornar 400
    E a criacao nao deve ser feita com sucesso 

CN03 - Validar criação de adotante feito com email sem @
    Dado que tento criar um adotante com email sem @
    Quando realizo uma chamada POST na rota de cria adotante
    Então a api deverá retornar 400
    E a criacao nao deve ser feita com sucesso 

CN04 - Validar criação de adotante feito com cep e cpf como numeros
    Dado que tento criar um adotante com cep e cpf como numeros
    Quando realizo uma chamada POST na rota de cria adotante
    Então a api deverá retornar 400
    E a criacao nao deve ser feita com sucesso 


####################################  GETs adotante   ########################################

CN05 - Validar busca de todos os adotante 
 #   Dado que faço uma chamada na API de adotante
    Quando realizo uma chamada de busca de todos os adotantes
    Então a api deverá retornar 401
#    E uma lista de adotante

CN06 - Validar busca de adotante por ID 
 #   Dado que faço uma chamada na API de adotante
    Quando realizo uma chamada de busca passando o ID do adotante
    Então a api deverá retornar 401
 #   E os dados do usuario

CN07 - Validar busca de adotante 
 #   Dado que faço uma chamada na API de adotante
    Quando realizo uma chamada de busca adotante 
    Então a api deverá retornar 401
#   E os dados da adotante



####################################  PUTs adotante   ########################################
CN09 - Validar Alteração de adotante feito com conta ja alterada 
    Dado que possuo uma adotante válida 
    Quando realizo uma chamada PUT para Alteração de adotante
    Então a api deverá retornar 401
    E o dado deve ser alterado

CN10 - Validar Alteração de adotante feito com email sem @
    Dado que tento alterar uma adotante com email sem @
    Quando realizo uma chamada PUT para Alteração de adotante
    Então a api deverá retornar 401
    E o dado não deve ser alterado

CN11 - Validar Alteração de adotante feito com cep e cpf como numeros
    Dado que tento alterar uma adotante com cep e cpf como numeros
    Quando realizo uma chamada PUT para Alteração de adotante
    Então a api deverá retornar 401
    E o dado não deve ser alterado


####################################  DELs adotante   ########################################


CN12 - Validar DELETE de adotante 
 #   Dado que faço uma chamada na API de adotante
    Quando realizo uma chamada de delete das adotante
#   Então a api deverá retornar 200
    E a adotante deve ser deletada

CN13 - Validar DELETE de adotante com usuario nao autenticado
 #   Dado que faço uma chamada na API de adotante
    Quando realizo uma chamada de delete das adotante com usuario nao autenticado
    Então a api deverá retornar 401
    E a adotante não deve ser deletada

CN14 - Validar DELETE de adotante com usuario nao autorizado
 #   Dado que faço uma chamada na API de adotante
    Quando realizo uma chamada de delete das adotante com usuario nao autorizado
    Então a api deverá retornar 401
    E a adotante não deve ser deletada

CN15 - Validar DELETE de adotante com usuario não encontrado com o id informado
 #   Dado que faço uma chamada na API de adotante
    Quando realizo uma chamada de delete das adotante com usuario não encontrado com o id informado
    Então a api deverá retornar 401
    E a adotante não deve ser deletada


#                                     IMAGENS                                            #

####################################  GETs adotante   ########################################
CN16 - Validar busca de imagens das adotante 
 #   Dado que faço uma chamada na API de adotante
    Quando realizo uma chamada de busca de imagens da adotante
#   Então a api deverá retornar 200

CN17 - Validar busca de imagens das adotante por ID
 #   Dado que faço uma chamada na API de adotante
    Quando realizo uma chamada de busca de imagens da adotante por user ID
#   Então a api deverá retornar 200


####################################  DELs adotante   ########################################

#CN18 - Validar DELETE de imagem das adotante 
 #   Dado que faço uma chamada na API de adotante
 #   Quando realizo uma chamada de delete das imagens das adotante
 #   Então a api deverá retornar 200
 ##   E a imagem deve ser deletada

#N19 - Validar DELETE de imagem das adotante com erro 
 #   Dado que faço uma chamada na API de adotante
 #   Quando realizo uma chamada de delete das imagens das adotante com erro
  #  Então a api deverá retornar 400


