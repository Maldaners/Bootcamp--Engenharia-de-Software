*** Settings ***
Documentation           Keywords dos endpoints PUT
Resource                ../variables/libraries_variables.robot
Resource                helpers/bodyRequests.robot



*** Variables ***


*** Keywords ***

################################ ONG  ################################
Dado que possuo uma ong válida 
    Gerar request body ong     ${emailong}    ${senha} 

Quando realizo uma chamada PUT para Alteração
    chamada_PUT_ong    ${BODY}   /ong

E o dado deve ser alterado
    validaReponse    ${response}

Dado que tento alterar uma ong com email sem @
    Gerar request body login sem arroba    ${emailsem@}    ${senha} 

Dado que tento alterar uma ong com cep e cpf como numeros
    Gerar request body ong com cep e cpf como numeros    ${email}    ${senha} 

E o dado não deve ser alterado
    validaReponse    ${response}


Dado que possuo uma adotante válida 
    Gerar request body adotante   ${emailadt}    ${senha}
Dado que tento alterar uma adotante com email sem @
    Gerar request body adotante   ${emailadt}    ${senha}
Dado que tento alterar uma adotante com cep e cpf como numeros
    Gerar request body adotante   ${emailadt}    ${senha}

Quando realizo uma chamada PUT para Alteração de adotante
    chamada_PUT_adt    ${BODY}   /adotante
