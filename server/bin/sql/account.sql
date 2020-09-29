CREATE TABLE account
(
    id SERIAL PRIMARY KEY,
    "usernameHash" CHARACTER(64),
    "passwordHash" CHARACTER(64)

);

ALTER TABLE account 
RENAME COLUMN username TO "usernameHash" ;

ALTER TABLE account 
RENAME COLUMN password TO "passwordHash" ;