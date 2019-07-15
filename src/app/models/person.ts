export class Person {
    constructor( 
        public name: string,
        public surname: string,
        public email: String,
        public photo: String,
        public telf: String,
        public allowed: Boolean,
        public job: String,
        public office: String,
        public scopusId: String,
        public professionalStatus: String,
        public urls: String,
        public active: Boolean
    ) {}

    static getFields() {
        return {name: "Nombre", surname: "Apellidos", email: "Correo", photo: "Foto",  
        telf: "Telefono", allowed: "Con acceso", job: "Puesto", office: "Despacho", scopusId: "Id de Scopus", professionalStatus: "Estado profesional", 
        urls: "Paginas personales", active: "Activo/a"}
    }

    public toString = (): string => {
        return this.name + ' ' + this.surname;
    }
}

// Person.prototype.toString = function personToString(){
//     return this.name + ' ' + this.surname;
// }

// let p: Person = new Person('a','a','cagoendio@gmail.com','akdsflj','662312232',true,'RESEARCHER','01.42','123456789','RESEARCHER','ADFADF',true);
// console.log(p)