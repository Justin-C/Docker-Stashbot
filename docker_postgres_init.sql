CREATE USER me;

CREATE DATABASE api;

GRANT ALL PRIVILEGES ON DATABASE api TO me;

CREATE TABLE bins (
   id SERIAL PRIMARY KEY,
   is_full BOOL DEFAULT false
);

-- foreign key location in bins table must exist to insert into it
CREATE TABLE items (
   item_name VARCHAR(50) NOT NULL PRIMARY KEY,
   location INT NOT NULL,
   quantity INT DEFAULT 1 NOT NULL,
   datecreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
   lastupdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
   FOREIGN KEY(location) REFERENCES bins(id)
);

CREATE TABLE tags (
   id SERIAL PRIMARY KEY,
   item_name VARCHAR(50) NOT NULL,
   item_tag VARCHAR(50) NOT NULL,
   FOREIGN KEY(item_name) REFERENCES items(item_name) ON DELETE CASCADE
);

CREATE TABLE last_query (
   item_name VARCHAR(50) NOT NULL PRIMARY KEY,
   datequeried TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
   FOREIGN KEY(item_name) REFERENCES items(item_name) ON DELETE CASCADE
);