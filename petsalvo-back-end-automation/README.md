
# PROJETO - PETSALVO - BACK-END - AUTOMATION

Este diretório contém o projeto de automação do back-end da aplicação PetSalvo - Bootcamp da disciplina Software Engineering Project. O nome do repositório de referência é "mba-es-25-grupo-04".

# instalar ferramentas 
### OBS este projeto precisa de Python instalado na máquina 


```bash
# instalações
$  pip install robotframework
$  pip install robotframework-requests
$  pip install robotframework-jsonlibrary 

#   talvez o comando precise ser pip3
```
```bash
# RUN
robot -x junit.xml -N "LOG Cenarios de teste APIs"-d reports tests/TestCases/tests/*.robot

```