# Prac - App Starter

* PostGRESql DB
* Create-React-App UI
* Node & Express App server
* Docker

# Credits

[Docker compose, React, Node and PostGres by American Dreamer](https://hardcoded.medium.com/docker-compose-with-react-node-and-postgresql-a-multi-container-application-with-docker-a11197802e33).

# Editor

Works best with Visual Studio Code. All NPM scripts [can be run from nav panel with a single click](https://www.youtube.com/watch?v=Sf1EP5n8RoQ). If it doesn't display, [check the settings](http://www.matthiassommer.it/programming/testing/run-npm-scripts-in-visual-studio-code-with-a-click-of-a-button/). 

![npm-scripts-view](doc/npm-scripts.png)

# Begin notes
Start up docker images:
- docker-compose up -d

login to pgadmin and connect to db
- nav to http://localhost:16543/browser/
-       PGADMIN_DEFAULT_EMAIL: "postgres@test.com"
      PGADMIN_DEFAULT_PASSWORD: "postgres"
- add new connection
- `docker ps`
- `docker inspect {id of postgres cont} | grep IPAddress
`
- paste in ip
- user: root, pw: pass
