CREATE TABLE accountPersona
(
    "accountId" INTEGER REFERENCES account(id),
    "personaId" INTEGER REFERENCES persona(id),
    PRIMARY KEY ("accountId", "personaId")

);