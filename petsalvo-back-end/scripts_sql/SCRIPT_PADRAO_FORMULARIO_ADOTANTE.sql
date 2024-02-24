/*CADASTRO FORMULÁRIO*/
INSERT INTO formulario (idFormulario, titulo, descricao) VALUES (1, "Formulário adotante", "Este é o formulário padrão para obtenção dos dados do adotante. É de extrema importância que as respostas reflitam a realidade, pois este formulário será sempre avaliado pela ONG envolvida no processo de adoção.")

/*CADASTRO PERGUNTAS E RESPOSTAS - FORMULÁRIO*/
INSERT INTO formulario_pergunta (idFormulario, idFormularioPergunta, texto) VALUES 
(1, 1, "Mora em casa ou apartamento?")
INSERT INTO formulario_resposta (idFormularioPergunta, texto) VALUES 
(1, "Casa"), 
(1, "Apartamento")

INSERT INTO formulario_pergunta (idFormulario, idFormularioPergunta, texto) VALUES 
(1, 2, "Onde o animal ficará?")
INSERT INTO formulario_resposta (idFormularioPergunta, texto) VALUES 
(2, "Área interna"),
(2, "Área externa com cobertura"),
(2, "Área externa sem cobertura")

INSERT INTO formulario_pergunta (idFormulario,  idFormularioPergunta, texto) VALUES 
(1, 3, "Há proteções suficientes nas janelas e muros para garantir a integridade do animal?")
INSERT INTO formulario_resposta (idFormularioPergunta, texto) VALUES 
(3, "Sim"),
(3, "Não"),
(3, "Estou adequando o espaço")

INSERT INTO formulario_pergunta (idFormulario,  idFormularioPergunta, texto) VALUES 
(1, 4, "Há outros animais na casa? Se sim, são vacinados?")
INSERT INTO formulario_resposta (idFormularioPergunta, texto) VALUES 
(4, "Sim, e são todos vacinados"),
(4, "Sim, mas ainda não estão todos vacinados"),
(4, "Não")

INSERT INTO formulario_pergunta (idFormulario,  idFormularioPergunta, texto) VALUES 
(1, 5, "Como é o comportamento do(s) animal(is) atual(is) diante de outros?")
INSERT INTO formulario_resposta (idFormularioPergunta, texto) VALUES 
(5, "Calmo"),
(5, "Agressivo"),
(5, "Acanhado"),
(5, "Não há outros animais")

INSERT INTO formulario_pergunta (idFormulario,  idFormularioPergunta, texto) VALUES 
(1, 6, "Quanto tempo o animal ficaria sozinho em sua casa?")
INSERT INTO formulario_resposta (idFormularioPergunta, texto) VALUES 
(6, "Há sempre alguém em casa, logo ele nunca ficaria sozinho"),
(6, "De 6 horas ou menos"),
(6, "De 6 horas ou mais")

INSERT INTO formulario_pergunta (idFormulario,  idFormularioPergunta, texto) VALUES 
(1, 7, "Sua renda lhe permite manter um animal com a alimentação e cuidados adequados?")
INSERT INTO formulario_resposta (idFormularioPergunta, texto) VALUES 
(7, "Sim"),
(7, "Não"),
(7, "Não calculei ainda os gastos possíveis")

/*CONSULTA FORMULÁRIO COMPLETO*/
SELECT
	f.idFormulario AS ID_FORM,
	f.titulo AS TITULO,
	p.idFormularioPergunta AS ID_PERGUNTA,
	p.texto AS PERGUNTA_TEXTO,
	r.idFormularioResposta AS ID_RESPOSTA,
	r.texto AS RESPOTAS_TEXTO
from
	formulario f
INNER JOIN formulario_pergunta p
INNER JOIN formulario_resposta r 
ON
	f.idFormulario = p.idFormulario
	AND
	p.idFormularioPergunta = r.idFormularioPergunta
	
/*DELEÇÃO COMPLETA - FORMULÁRIO*/
/*
DELETE FROM formulario_resposta
DELETE FROM formulario_pergunta
DELETE FROM formulario
*/