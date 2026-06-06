# How to start the application:
This application consists of three parts:
* DB
* BE
* FE

To start the application follow this instruction:
1) Start the DB with `cd ./DB/docker-compose.yml` & `docker compose up -d`
2) Start the BE with `java -jar ./Back/TaskManager/target/TaskManager-0.0.1-SNAPSHOT.jar`
3) Open the `./Front/index.html`

Or just run `docker compose up -d --build` from the root folder of the project