// import { Publication } from './publication'

export class Project {
  constructor(
    public researchTeam: Array<String>,
    public workTeam: Array<String>,
    public hiredStaff: Array<String>,
    public title: String,
    public description: String,
    public leader: Array<String>,
    public reference: String,
    public scope: String,
    public status: String,
    public sponsor: String,
    public startDate: Date,
    public endDate: Date|{},
    public amount: Number,
    // public relatedPublications: Array<Publication>,
    public relatedTools: Array<String>
  ) {  }

  static getFields() {
    return { researchTeam: "Equipo de investigacion", workTeam: "Equipo de trabajo", hiredStaff: "Personal contratado", title: "Titulo",  
    description: "Descripción", leader: "Responsable", reference: "Referencia", scope: "Competencia", status: "Estado", sponsor: "Patrocinador", 
    startDate: "Fecha de inicio", endDate: "Fecha de fin", amount: "Importe", relatedPublications: "Publicaciones relacionadas", relatedTools: "Herramientas relacionadas"}
}
}

