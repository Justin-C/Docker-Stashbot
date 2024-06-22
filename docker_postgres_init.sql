CREATE USER me;

CREATE DATABASE api;

GRANT ALL PRIVILEGES ON DATABASE api TO me;

CREATE TABLE bins (
   id SERIAL PRIMARY KEY,
   is_full BOOL DEFAULT false
);

-- foreign key location in bins table must exist to insert into it
CREATE TABLE items (
   item_name VARCHAR(50) NOT NULL PRIMARY KEY, -- natural key (like item name) and a UUID (Universally Unique Identifier) as a primary key
   location INT NOT NULL,
   quantity INT DEFAULT 1 NOT NULL,
   date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
   last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
   FOREIGN KEY(location) REFERENCES bins(id)
);

CREATE TABLE tags ( -- not currently used
   id SERIAL PRIMARY KEY,
   item_name VARCHAR(50) NOT NULL,
   item_tag VARCHAR(50) NOT NULL,
   FOREIGN KEY(item_name) REFERENCES items(item_name) ON DELETE CASCADE
);

CREATE TABLE last_query ( -- not currently used
   item_name VARCHAR(50) NOT NULL PRIMARY KEY,
   date_queried TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
   FOREIGN KEY(item_name) REFERENCES items(item_name) ON DELETE CASCADE
);

CREATE TABLE on_hold (
   item_name VARCHAR(50) PRIMARY KEY,
   date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
   FOREIGN KEY(item_name) REFERENCES items(item_name) ON DELETE CASCADE
);