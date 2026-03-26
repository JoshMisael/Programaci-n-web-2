let alumno={
    id: 321011999,
    nombre: "Luis",
    PrimerApellido: "Hernández",
    SegundoApellido: "García",
    Edad: 22,
    Titulado: false,
    Egresado:{
        estado: true
    },
    kinder:{
        nombre: "Niños Héroes",
        actividadPrimerdia: function(){
            console.log("Jugar");
        }
    },
    SemestreEnCurso: "Octavo",
    Turno: "Vespertino",
    MateriasDebedidas: 2,
    Promedio: 8.7,
    Domicilio: {
        calle:"Av. Central",
        numero: 150,
        colonia:"Valle de Aragón",
        Municipio: "Nezahualcóyotl",
        Estado: "Estado de Mexico",
        Pais: "México",
        Continente:"America",
        Planeta: "Tierra",
        Galaxia: "Via lactea",
    }
}
console.log(alumno.kinder.nombre);