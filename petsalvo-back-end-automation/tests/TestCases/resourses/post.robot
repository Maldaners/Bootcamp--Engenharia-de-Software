*** Settings ***
Documentation           Keywords dos endpoints POST
Resource                ../variables/libraries_variables.robot
Resource                helpers/bodyRequests.robot



*** Variables ***
${email}            ong_12_@email.com
${emailong}         ong_8_@email.com
${emailadt}         adotante_8_@email.com
${senha}            Abcd@1234
${emailInvalido}    ongemailinvalido@email.com
${senhaInvalida}    4446574839444
${emailsem@}        emailsemarroba

*** Keywords ***

################################ LOGIN ################################
Dado que possuo um LOGIN válido 
    Gerar request body login     ${email}    ${senha}  
#    ${sucesso}=   Set Variable   ${bodyLogin.data}[0]

Quando realizo uma chamada POST na rota de LOGIN
   chamada_POST_Login    ${BODY}

Então a api deverá retornar ${statusCode}
    Valida status_code    ${statusCode}
    Log To Console     ${RESPONSE.json()}

E o login deve ser feito com sucesso 
    validaReponse    ${response}

Dado que possuo um email inválido 
    Gerar request body login Invalido     ${emailInvalido}    ${senha}  

Dado que possuo uma senha inválida 
    Gerar request body login Invalido     ${email}    ${senhaInvalida}  

Dado que possuo um email sem a fromacao correta 
    Gerar request body login sem arroba    ${emailsem@}    ${senha}  

E o login não deve ser feito com sucesso 
    validaReponse    ${response} 

################################################################

################################ ONGs ################################
Dado que possuo uma ong  
    Gerar request body ong     ${emailong}    ${senha} 

Quando realizo uma chamada POST na rota de cria ongs
    chamada_POST_ong    ${BODY}   /ong

Dado que possuo uma ong mas ja criado 
    Gerar request body ong     ${emailong}    ${senha} 

Dado que tento criar uma ong com email sem @
    Gerar request body ong sem arroba    ${emailsem@}    ${senha} 

Dado que tento criar uma ong com cep e cpf como numeros
    Gerar request body ong com cep e cpf como numeros    ${email}    ${senha} 

E a criacao deve ser feita com sucesso 
    validaReponse    ${response}

E a criacao nao deve ser feita com sucesso 
    validaReponse    ${response}

Dado que possuo um status de ong 
    Gerar request body statusOng   

Quando realizo uma chamada POST na rota de cria status
    chamada_POST_Ong    ${BODY}    /ong/status

Dado que possuo um status de ong mas ja criado 
    Gerar request body statusOng

Dado que possuo uma ong com PIX 
    Gerar request body pixOng

Quando realizo uma chamada POST na rota de cria pix ongs
    chamada_POST_Ong    ${BODY}    /ong/pix

################################################################

################################ ADOTANTEs ################################
Dado que possuo um adotante  
    Gerar request body adotante   ${emailadt}    ${senha} 
Quando realizo uma chamada POST na rota de cria adotante
    chamada_POST_adt   ${BODY}     /adotante
Dado que possuo um adotante mas ja criado 
    Gerar request body adotante   ${emailadt}    ${senha} 
Dado que tento criar um adotante com email sem @
    Gerar request body adotante sem arroba    ${emailsem@}    ${senha} 
Dado que tento criar um adotante com cep e cpf como numeros
    Gerar request body adotante sem arroba    ${emailsem@}    ${senha} 

################################################################

################################ ADOTANTEs ################################
Dado que possuo um pet
    Gerar request body pet   annabelle 
Quando realizo uma chamada POST na rota de cria pet
    chamada_POST_adt   ${BODY}     /pet
Dado que possuo um pet mas ja criado
    Gerar request body pet   annabelle 