export class Person {
    constructor( 
        public name: String,
        public surname: String,
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
        urls: "Paginas personales", active: "Activa"}
    }
}