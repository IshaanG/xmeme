FROM ubuntu:18.04


RUN apt-get update
RUN apt-get install -y postgresql postgresql-contrib
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_15.x | bash -
RUN apt-get install -y nodejs

WORKDIR /usr/src/app

COPY backend/package*.json ./

RUN npm install

COPY ./backend .

USER postgres

RUN /etc/init.d/postgresql start &&\
 psql -U postgres -d postgres -c "ALTER USER postgres PASSWORD 'postgres';" &&\
 psql -U postgres -d postgres -f ./db/database.sql

EXPOSE 8081


CMD ["sh","-c", "/etc/init.d/postgresql start; PGPASSWORD=postgres psql -h localhost -U postgres -d xmeme -c \"TRUNCATE memes RESTART IDENTITY\"; npm start" ]