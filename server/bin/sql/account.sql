CREATE TABLE account
(
    id SERIAL PRIMARY KEY,
    "usernameHash" CHARACTER(64),
    "passwordHash" CHARACTER(64),
    "sessionId" CHARACTER (36),
    balance INTEGER NOT NULL

);

ALTER TABLE account 
RENAME COLUMN username TO "usernameHash" ;

ALTER TABLE account 
RENAME COLUMN password TO "passwordHash" ;

ALTER TABLE account
ADD COLUMN "sessionId" CHARACTER
(36);

ALTER TABLE account
ADD COLUMN balance INTEGER NOT NULL;