class Environment:
    " " " Realiza chamada do ambiente " " "

    local = 'local'
    #local = 'hom'
    #local = 'dev''

    print(local)

    if (local == 'local'):
        url_token= 'http://localhost:8080/api/v1'
        token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzdWFyaW8iOjIsImVtYWlsIjoiYWRvdGFudGVfMV9AZW1haWwuY29tIiwibm9tZSI6IkVESVRBRE8iLCJ0aXBvVXN1YXJpbyI6MywiaWF0IjoxNzA0OTI2NzI3LCJleHAiOjE3MDQ5MzAzMjd9.959AaC8Ed_u9BaMC2iOJFzV3t6k4VmYxaj7US2yI6FE'
        base_url='http://localhost:8080/api/v1'
        ong_token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzdWFyaW8iOjQsImVtYWlsIjoib25nXzNfQGVtYWlsLmNvbSIsIm5vbWUiOiJPbmciLCJ0aXBvVXN1YXJpbyI6MiwiaW1hZ2VtIjpudWxsLCJpYXQiOjE3MDU5Nzg0NTYsImV4cCI6MTcwNTk4MjA1Nn0.I-PhohjA7Jf9UTSksxaJh6LeQj6zQNHAJf5HTwlLdMk'
        adotante_token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzdWFyaW8iOjMsImVtYWlsIjoiYWRvdGFudGVfMV9AZW1haWwuY29tIiwibm9tZSI6IkFkb3RhbnRlIiwidGlwb1VzdWFyaW8iOjMsImltYWdlbSI6bnVsbCwiaWF0IjoxNzA1OTc5MDQzLCJleHAiOjE3MDU5ODI2NDN9.QlGd0HklSNStX8vyaV1PCnCYhTR35jk2EgcIbmkWvtA'
        emailOng= "ong_800_@email.com"
        senhaOng= "Abcd@1234"
        emailAdt= "adotante_1_@email.com"
        senhaAdt= "Abcd@1234"
