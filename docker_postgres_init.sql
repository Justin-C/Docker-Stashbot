CREATE USER me;

CREATE DATABASE api;

GRANT ALL PRIVILEGES ON DATABASE api TO me;

CREATE TABLE bins ( -- bug: serialize id not using latest after prepopulate
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


CREATE TEMP TABLE temp_items (
    item_name VARCHAR(50),
    location INT,
    quantity INT
);

-- Load data from CSV into temporary table
COPY temp_items(item_name, location, quantity)
FROM '/docker-entrypoint-initdb.d/data.csv' DELIMITER ',' CSV HEADER;

-- populate bins then populate items from data.csv
DO $$
DECLARE
    max_location INTEGER;
    i INTEGER;
BEGIN
    -- Find the maximum location value from data.csv
    SELECT MAX(location) INTO max_location FROM temp_items;
    
    -- If max_location is NULL, set a default value
    IF max_location IS NULL THEN
        max_location := 0; -- or set to any default value you prefer
    END IF;

    -- Insert bins into the bins table up to max_location
    FOR i IN 1..max_location LOOP
        INSERT INTO bins (id, is_full) VALUES (i, false);
    END LOOP;
END $$;

-- Drop the temporary table
DROP TABLE temp_items;

-- Load data from CSV file into the items table
COPY items(item_name, location, quantity)
FROM '/docker-entrypoint-initdb.d/data.csv' DELIMITER ',' CSV HEADER;