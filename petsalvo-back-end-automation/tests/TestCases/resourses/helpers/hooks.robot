***Settings***
Documentation       Criação de funções gerais para todas as requisições 
 
variables      ../../variables/environment.py
Resource    routes.robot


Library      OperatingSystem
Library      String

*** Keywords ***

Gerar token 
    Log         ${Environment.local}

    Create Session       token                 ${Environment.url_token}


    &{BODY_TOKEN}       Create Dictionary      authorizaton=Bearer ${Environment.token}
  
    Set Global Variable    ${BODY_TOKEN}  
    Log To Console    ${BODY_TOKEN}


Criar secao

    &{HEADERS}          Create Dictionary        Content_Type=application/json
    ...                                          authorizaton=Bearer ${Environment.token}

    &{SESSION}          Create Dictionary        alias=ambiente
    ...                                          url=${Environment.base_url}
    ...                                          headers=${HEADERS}
    

    Create Session    &{SESSION}


    Set Suite Variable    &{SESSION}

############################################ ONGS ############################################
Gerar token ONGs
    Log         ${Environment.local}

    Create Session       token                 ${Environment.url_token}/autenticacao/login


    &{BODY_TOKEN}          Create Dictionary      email=${Environment.emailOng}
    ...                                           senha=${Environment.senhaOng}
        
    &{HEADERS_TOKEN}       Create Dictionary      Content_Type=application/json



    ${RETORNO_TOKENong}      POST on Session     token    url= 
    ...                                                   data=${BODY_TOKEN}
    ...                                                   headers=${HEADERS_TOKEN}
  
    Set Suite Variable             ${RETORNO_TOKENong}  
#    Log To Console                 ${RETORNO_TOKENong}  
    Should Be Equal As Strings     ${RETORNO_TOKENong.json()['tipoUsuario']}    ONG
    Log To Console                 ${RETORNO_TOKENong.json()['tipoUsuario']}
    Log To Console                 ${RETORNO_TOKENong.json()['accessToken']}

    
Criar secao ong

    &{HEADERS}          Create Dictionary        Content_Type=application/json
    ...                                          authorizaton=Bearer ${RETORNO_TOKENong}

    &{SESSION}          Create Dictionary        alias=ambiente
    ...                                          url=${Environment.base_url}
    ...                                          headers=${HEADERS}
    

    Create Session    &{SESSION}


    Set Suite Variable    &{SESSION}


############################################ adt ############################################

Gerar token adotante
    Log         ${Environment.local}
    
    Create Session       token                 ${Environment.url_token}/autenticacao/login


    &{BODY_TOKEN}          Create Dictionary      email=${Environment.emailAdt}
    ...                                           senha=${Environment.senhaOng}
        
    &{HEADERS_TOKEN}       Create Dictionary      Content_Type=application/json



    ${RETORNO_TOKENadt}      POST on Session     token    url= 
    ...                                                   data=${BODY_TOKEN}
    ...                                                   headers=${HEADERS_TOKEN}
  
    Set Suite Variable             ${RETORNO_TOKENadt}  
#    Log To Console                 ${RETORNO_TOKENong}  
    Should Be Equal As Strings     ${RETORNO_TOKENadt.json()['tipoUsuario']}    ADOTANTE
    Log To Console                 ${RETORNO_TOKENadt.json()['tipoUsuario']}
    Log To Console                 ${RETORNO_TOKENadt.json()['accessToken']}

    
Criar secao adt

   &{HEADERS}          Create Dictionary        Content_Type=application/json
    ...                                          authorizaton=Bearer ${RETORNO_TOKENadt}

    &{SESSION}          Create Dictionary        alias=ambiente
    ...                                          url=${Environment.base_url}
    ...                                          headers=${HEADERS}
    

    Create Session    &{SESSION}


    Set Suite Variable    &{SESSION}



# Get JSON Realiza a chamada do arquivo de massa e converte ele para .JSON

Get JSON login
    [Arguments]    ${massa}

    ${body}    Get File        ./petsalvo-back-end-automation/tests/testCases/database/login/${massa}
    ${json}    Evaluate        json.loads($body)        json
    

    [Return]   ${json}

Get JSON ong
    [Arguments]    ${massa}

    ${body}    Get File        ./petsalvo-back-end-automation/tests/testCases/database/ong/${massa}
    ${json}    Evaluate        json.loads($body)        json
    

    [Return]   ${json}

Get JSON adt
    [Arguments]    ${massa}

    ${body}    Get File        ./petsalvo-back-end-automation/tests/testCases/database/adotante/${massa}
    ${json}    Evaluate        json.loads($body)        json
    

    [Return]   ${json}

Get JSON pet
    [Arguments]    ${massa}

    ${body}    Get File        ./petsalvo-back-end-automation/tests/testCases/database/pet/${massa}
    ${json}    Evaluate        json.loads($body)        json
    

    [Return]   ${json}
###################################################################

# Put JSON Realiza a Alteração de campos do JSON que será utilizado na massa

Put JSON
    [Arguments]        ${massaJson}   ${campoJson}   ${valorNovo}

    ${jsonPut}    Update Value To Json    ${massaJson}   ${campoJson}   ${valorNovo}

    [Return]    ${jsonPut}

###################################################################

# Valida o STATUS_CODE de retorno das APIs
Valida status_code
    [Arguments]   ${statusCode}    
    Log                                    ${RESPONSE.status_code}    
    Log To Console                         ${RESPONSE.json()}  

    Should Be Equal As Strings             ${RESPONSE.status_code}     ${statusCode}   

###################################################################


#Valida os campos do JSON (BODY RESPONSE) das APIS
validaReponse
    [Arguments]     ${response}


    IF    ${RESPONSE.status_code} == 200
        Log               ${RESPONSE}
        Log To Console    ${RESPONSE.json()}
        ${Ret_String}     Convert To String     ${RESPONSE}  

    ELSE IF     ${RESPONSE.status_code} == 201
        Log               ${RESPONSE} 
        Log To Console    ${RESPONSE}\[mensagem]   
        ${Ret_String}     Convert To String     ${RESPONSE}  

    ELSE IF     ${RESPONSE.status_code} == 204
        Log               "204 - Sem Retorno"
        Log To Console    "204 - Sem Retorno"

    ELSE IF    ${RESPONSE.status_code} == 400
        Log               ${RESPONSE}
        Log To Console    ${RESPONSE}\[mensagem]  
        ${Ret_String}     Convert To String     ${RESPONSE}  

    ELSE IF    ${RESPONSE.status_code} == 401
        Log               ${RESPONSE} 
        Log To Console    ${RESPONSE}\[mensagem] 
        ${Ret_String}     Convert To String     ${RESPONSE} 

    ELSE  
        Log              ${RESPONSE}\[mensagem]

    END