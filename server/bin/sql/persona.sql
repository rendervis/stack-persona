CREATE TABLE persona
(
  id SERIAL PRIMARY KEY,
  birthdate TIMESTAMP NOT NULL,
  nickname VARCHAR(64),
  "isPublic" BOOLEAN NOT NULL,
  "saleValue" INTEGER NOT NULL,
  "generationId" INTEGER,
  FOREIGN KEY ("generationId") REFERENCES generation(id)
);


select *
from persona INNER JOIN "personaTrait" ON persona.id = "personaTrait"."personaId";


ALTER TABLE persona
ADD COLUMN "isPublic" BOOLEAN;
ALTER TABLE persona
ADD COLUMN "saleValue" INTEGER;