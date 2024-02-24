export const CODIGOS_VALIDOS_TIPOS_CHAVES_PIX: string = '<b>Os códigos válidos para os tipos de chaves Pix são:</b> <br>' +
    '<ul>' +
        '<li>1 = CPF</li>' +
        '<li>2 = CNPJ</li>' +
        '<li>3 = E-mail</li>' +
        '<li>4 = Telefone</li>' +
        '<li>5 = Aleatória</li>' +
    '</ul>';

export enum TipoChave {
    CPF = 1,
    CNPJ = 2,
    EMAIL = 3,
    TELEFONE = 4,
    ALEATORIA = 5
}