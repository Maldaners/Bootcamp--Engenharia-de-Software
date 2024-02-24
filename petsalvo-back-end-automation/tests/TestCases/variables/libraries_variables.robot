*** Settings ***

Documentation  Centralização das definições de Libraries, Variables e Resourses utilizados na automação BACKEND

Library   Collections
Library   JSONLibrary
Library   RequestsLibrary


Variables  environment.py

Resource     ../resourses/helpers/hooks.robot
Resource     ../resourses/helpers/bodyRequests.robot
Resource     ../resourses/helpers/routes.robot
Resource     ../resourses/post.robot
Resource     ../resourses/put.robot
Resource     ../resourses/get.robot
Resource     ../resourses/del.robot


