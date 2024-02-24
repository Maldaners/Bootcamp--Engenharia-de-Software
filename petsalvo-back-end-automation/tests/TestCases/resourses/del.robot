*** Settings ***
Documentation           Keywords dos endpoints POST
Resource                ../variables/libraries_variables.robot
Resource                helpers/bodyRequests.robot



*** Keywords ***
 
################################ ONGs ################################
Dado que faço uma chamada na API de Busca Ongs
    
Quando realizo uma chamada de delete das ONGs
    chamada_DEL_ong   ${Environment.base_url}/ong

E a ong deve ser deletada
    validaReponse    ${response}

Quando realizo uma chamada del de busca passando o ID da ONG
    chamada_DEL   ${Environment.base_url}/ong/usuario/1

E a ong não deve ser deletada
    validaReponse    ${response}

Quando realizo uma chamada de delete das ONGs com usuario nao autenticado
    chamada_DEL   ${Environment.base_url}/ong

Quando realizo uma chamada de delete das ONGs com usuario nao autorizado
    chamada_DEL   ${Environment.base_url}/ong

Quando realizo uma chamada de delete das ONGs com usuario não encontrado com o id informado
    chamada_DEL   ${Environment.base_url}/ong/usuario/1



Quando realizo uma chamada de delete das adotante
    chamada_DEL   ${Environment.base_url}/adotante
Quando realizo uma chamada de delete das adotante com usuario nao autenticado
    chamada_DEL   ${Environment.base_url}/adotante
Quando realizo uma chamada de delete das adotante com usuario nao autorizado
    chamada_DEL   ${Environment.base_url}/adotante
Quando realizo uma chamada de delete das adotante com usuario não encontrado com o id informado
    chamada_DEL   ${Environment.base_url}/adotante

E a adotante deve ser deletada
    validaReponse    ${response}
E a adotante não deve ser deletada
    validaReponse    ${response}