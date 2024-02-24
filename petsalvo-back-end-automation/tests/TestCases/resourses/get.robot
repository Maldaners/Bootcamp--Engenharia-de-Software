*** Settings ***
Documentation           Keywords dos endpoints POST
Resource                ../variables/libraries_variables.robot
Resource                helpers/bodyRequests.robot



*** Keywords ***
 
Dado que faço uma chamada na API de Busca Ongs
    
Quando realizo uma chamada de busca de todas as ONGs
    chamada_GET_ONG   ${Environment.base_url}/ong/todas

E uma lista de ONGs
    validaReponse    ${response}

Quando realizo uma chamada de busca passando o ID da ONG
    chamada_GET_ONG   ${Environment.base_url}/ong/usuario/1

E os dados do usuario
    validaReponse    ${response}
     
Quando realizo uma chamada de busca 
    chamada_GET_ONG   ${Environment.base_url}/ong   
E os dados da ONG
    validaReponse    ${response}


Quando realizo uma chamada de busca de todos os status por usuario
    chamada_GET_ONG   ${Environment.base_url}/ong/usuario/1/status
Quando realizo uma chamada de busca de status por id e usuario
    chamada_GET_ONG   ${Environment.base_url}/ong/usuario/1/status/5
Quando realizo uma chamada de busca passando o ID do status
    chamada_GET_ONG   ${Environment.base_url}/ong/status1
Quando realizo uma chamada de busca por todos os status
    chamada_GET_ONG   ${Environment.base_url}/ong/status
E uma lista de status
    validaReponse    ${response}

Quando realizo uma chamada de busca de imagens da ong
    chamada_GET_ONG   ${Environment.base_url}/ong/imagem
Quando realizo uma chamada de busca de imagens da ong por user ID
    chamada_GET_ONG   ${Environment.base_url}/ong/usuario/1/imagem


Quando realizo uma chamada de busca de todas as chaves pix
    chamada_GET_ONG   ${Environment.base_url}/ong/pix
Quando realizo uma chamada de busca de por id pix
    chamada_GET_ONG   ${Environment.base_url}/ong/pix/1
Quando realizo uma chamada de busca por id user e id pix
    chamada_GET_ONG   ${Environment.base_url}/ong/usuario/1/pix/1
Quando realizo uma chamada de busca por id user e all pix
    chamada_GET_ONG   ${Environment.base_url}/ong/usuario/1/pix


Quando realizo uma chamada de busca de todos os adotantes
    chamada_GET_adt   ${Environment.base_url}/adotante
Quando realizo uma chamada de busca passando o ID do adotante
    chamada_GET_adt   ${Environment.base_url}/adotante/usuario/2
Quando realizo uma chamada de busca adotante 
    chamada_GET_adt   ${Environment.base_url}/adotante
E uma lista de adotante
    validaReponse    ${response}
E os dados da adotante
    validaReponse    ${response}
Quando realizo uma chamada de busca de imagens da adotante
    chamada_GET_adt   ${Environment.base_url}/adotante/imagem
Quando realizo uma chamada de busca de imagens da adotante por user ID
    chamada_GET_adt   ${Environment.base_url}/adotante/usuario/2/imagem

