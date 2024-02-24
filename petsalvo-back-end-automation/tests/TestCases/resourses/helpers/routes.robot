*** Settings ***

Documentation   Funções para chamadas das Rotas POST, GET, PUT e DELETE

Resource   ../../variables/libraries_variables.robot
Library    OperatingSystem


*** Keywords ***

chamada_GET_ONG
    [Arguments]     ${url}

    Criar secao ong

    ${RESPONSE}     GET On Session     alias=${SESSION.alias}
    ...                                url=${url}
    ...                                expected_status=anything
        

    Set Suite Variable    ${RESPONSE}


chamada_POST_Ong
    [Arguments]     ${BODY_POST}  ${url}
    Criar secao ong 

    ${RESPONSE}     POST On Session    alias=${SESSION.alias}
    ...                                url=${Environment.base_url}${url}
    ...                                expected_status=anything
    ...                                json=${BODY_POST}    

    Set Suite Variable    ${RESPONSE}
chamada_GET_adt
    [Arguments]     ${url}

    Criar secao adt

    ${RESPONSE}     GET On Session     alias=${SESSION.alias}
    ...                                url=${url}
    ...                                expected_status=anything
        

    Set Suite Variable    ${RESPONSE}
chamada_POST_adt
    [Arguments]     ${BODY_POST}  ${url}

    Criar secao adt 
    ${RESPONSE}     POST On Session    alias=${SESSION.alias}
    ...                                url=${Environment.base_url}${url}
    ...                                expected_status=anything
    ...                                json=${BODY_POST}    

    Set Suite Variable    ${RESPONSE}

chamada_POST_pet
    [Arguments]     ${BODY_POST}  ${url}

    Criar secao adt 

    ${RESPONSE}     POST On Session    alias=${SESSION.alias}
    ...                                url=${Environment.base_url}${url}
    ...                                expected_status=anything
    ...                                json=${BODY_POST}    

    Set Suite Variable    ${RESPONSE}
chamada_POST_Login
    [Arguments]     ${BODY_POST} 

    Criar secao 

    ${RESPONSE}     POST On Session    alias=${SESSION.alias}
    ...                                url=${Environment.base_url}/autenticacao/login
    ...                                expected_status=anything
    ...                                json=${BODY_POST}    

    Set Suite Variable    ${RESPONSE}


chamada_PUT_ong 
    [Arguments]     ${BODY_PUT}   ${url}

    Criar secao ong

    ${RESPONSE}     PUT On Session     alias=${SESSION.alias}
    ...                                url=${Environment.base_url}${url}
    ...                                expected_status=anything
    ...                                json=${BODY_PUT}    

    Set Suite Variable    ${RESPONSE}
chamada_PUT_adt 
    [Arguments]     ${BODY_PUT}   ${url}

    Criar secao adt

    ${RESPONSE}     PUT On Session     alias=${SESSION.alias}
    ...                                url=${Environment.base_url}${url}
    ...                                expected_status=anything
    ...                                json=${BODY_PUT}    

    Set Suite Variable    ${RESPONSE}
chamada_DEL_ong
    [Arguments]     ${url}

    Criar secao ong

    ${RESPONSE}     GET On Session     alias=${SESSION.alias}
    ...                                url=${url}
    ...                                expected_status=anything
        

    Set Suite Variable    ${RESPONSE}

chamada_DEL
    [Arguments]     ${url}

    Criar secao 

    ${RESPONSE}     GET On Session     alias=${SESSION.alias}
    ...                                url=${url}
    ...                                expected_status=anything
        

    Set Suite Variable    ${RESPONSE}




