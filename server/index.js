const Persona = require("./persona");

const newPersona = new Persona({ birthDate: new Date(), nickname: "fooey" });
const baloo = new Persona({ birthDate: new Date(), nickname: "baloo" });

console.log(newPersona, baloo);
