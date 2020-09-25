CREATE TABLE "personaTrait"
(
    "traitId" INTEGER,
    "personaId" INTEGER,
    FOREIGN KEY ("traitId") REFERENCES trait(id),
    FOREIGN KEY ("personaId") REFERENCES persona(id)

);