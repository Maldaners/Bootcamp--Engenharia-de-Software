*** Settings ***
Documentation   Transforma a massa de entrada em JSON
Resource    hooks.robot

*** Keywords ***
Gerar request body login
    [Arguments]    ${email}        ${senha}
    ${testFile}    Get JSON login        bodyLogin.json   
    ${test}        Put JSON    ${testFile}    email   ${email}
    ${body}        Put JSON    ${testFile}    senha    ${senha}

    Log To Console   ${body}
    Log              ${body}
    ${BODY}        Set Variable    ${body}

    Set Global Variable    ${BODY}

Gerar request body login Invalido
    [Arguments]    ${email}        ${senha}
    ${testFile}    Get JSON login        bodyLoginInvalido.json   
    ${test}        Put JSON    ${testFile}    email   ${email}
    ${body}        Put JSON    ${testFile}    senha    ${senha}

    Log To Console   ${body}
    Log              ${body}
    ${BODY}        Set Variable    ${body}

    Set Global Variable    ${BODY}

Gerar request body login sem arroba
    [Arguments]    ${email}        ${senha}
    ${testFile}    Get JSON login        bodyLoginSemArroba.json   
    ${test}        Put JSON    ${testFile}    email   ${email}
    ${body}        Put JSON    ${testFile}    senha    ${senha}

    Log To Console   ${body}
    Log              ${body}
    ${BODY_LOGIN}        Set Variable    ${body}

    Set Global Variable    ${BODY}

########################################################################################################
Gerar request body ong
    [Arguments]    ${email}        ${senha}
    ${testFile}    Get JSON ong        postOng.json   
    ${test}        Put JSON    ${testFile}    email   ${email}
    ${body}        Put JSON    ${testFile}    senha    ${senha}

    Log To Console   ${body}
    Log              ${body}
    ${BODY}        Set Variable    ${body}

    Set Global Variable    ${BODY}

Gerar request body ong sem arroba
    [Arguments]    ${email}        ${senha}
    ${testFile}    Get JSON ong        postOngsem@.json   
    ${test}        Put JSON    ${testFile}    email   ${email}
    ${body}        Put JSON    ${testFile}    senha    ${senha}

    Log To Console   ${body}
    Log              ${body}
    ${BODY}        Set Variable    ${body}

    Set Global Variable    ${BODY}

Gerar request body ong com cep e cpf como numeros
    [Arguments]    ${email}        ${senha}
    ${testFile}    Get JSON ong        postOngNoString.json   
    ${test}        Put JSON    ${testFile}    email   ${email}
    ${body}        Put JSON    ${testFile}    senha    ${senha}

    Log To Console   ${body}
    Log              ${body}
    ${BODY}        Set Variable    ${body}

    Set Global Variable    ${BODY}

Gerar request body statusOng
   
    ${testFile}    Get JSON ong        statusong.json   

    Log To Console   ${body}
    Log              ${body}
    ${BODY}        Set Variable    ${body}

    Set Global Variable    ${BODY}

Gerar request body pixOng
   
    ${testFile}    Get JSON ong        postOngPix.json   

    Log To Console   ${body}
    Log              ${body}
    ${BODY}        Set Variable    ${body}

    Set Global Variable    ${BODY}

########################################################################################################
Gerar request body adotante

    [Arguments]    ${email}        ${senha}
    ${testFile}    Get JSON adt        postAdt.json   
    ${test}        Put JSON    ${testFile}    email   ${email}
    ${body}        Put JSON    ${testFile}    senha    ${senha}

    Log To Console   ${body}
    Log              ${body}
    ${BODY}        Set Variable    ${body}

    Set Global Variable    ${BODY}
Gerar request body adotante sem arroba
    [Arguments]    ${email}        ${senha}
    ${testFile}    Get JSON adt        postadt2.json   
    ${test}        Put JSON    ${testFile}    email   ${email}
    ${body}        Put JSON    ${testFile}    senha    ${senha}

    Log To Console   ${body}
    Log              ${body}
    ${BODY}        Set Variable    ${body}

    Set Global Variable    ${BODY}


########################################################################################################
Gerar request body pet

    [Arguments]    ${nome}
    ${testFile}    Get JSON pet        postPet.json   
    ${body}        Put JSON    ${testFile}    nome    ${nome}

    Log To Console   ${body}
    Log              ${body}
    ${BODY}        Set Variable    ${body}

    Set Global Variable    ${BODY}

