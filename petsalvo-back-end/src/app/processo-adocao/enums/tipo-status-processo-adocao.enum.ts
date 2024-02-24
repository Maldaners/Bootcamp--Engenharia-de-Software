export const CODIGOS_VALIDOS_TIPOS_STATUS_PROCESSO_ADOCAO: string = '<b>Os códigos válidos para os tipos de status do processo de adoção são:</b> <br>' +
    '<ul>' +
        '<li>1 = Em análise</li>' +
        '<li>2 = Perfil do adotante aceito</li>' +
        '<li>3 = Perfil do adotante rejeitado</li>' +
        '<li>4 = Adotado pelo usuário autenticado</li>' +
        '<li>5 = Adotado por outro usuário</li>' +
        '<li>6 = Desistência por parte do adotante</li>' +
        '<li>7 = Desistência por parte da ONG</li>' +
    '</ul>' +
    '<hr>' +
    'Os códigos de número 1 e 6 são exclusivamente para o usuário do tipo adotante, já os códigos 2, 3, 5 e 7 são exclusivos para o usuário do tipo ONG. O código de número 4 é atribuído automaticamente.';
    
export enum TipoStatusProcessoAdocao {

    EM_ANALISE = 1,
    PERFIL_ACEITO = 2,
    PERFIL_REJEITADO = 3,
    ADOTADO_PELO_USUARIO_AUTENTICADO = 4,
    ADOTADO_POR_OUTRO_USUARIO = 5,
    DESISTENCIA_ADOTANTE = 6,
    DESISTENCIA_ONG = 7
        
}