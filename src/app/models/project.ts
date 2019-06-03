import { Person } from "./person";

// import { Publication } from './publication'

export class Project {
  constructor(
    public researchTeam: Array<Person>,
    public workTeam: Array<Person>,
    public hiredStaff: Array<Person>,
    public title: string,
    public description: String,
    public leader: Array<Person>,
    public reference: String,
    public scope: String,
    public status: String,
    public sponsor: String,
    public startDate: Date,
    public endDate: Date|{},
    public amount: number,
    // public relatedPublications: Array<Publication>,
    public relatedTools: Array<String>
  ) {  }

  static getFields() {
    return { researchTeam: "Equipo de investigacion", workTeam: "Equipo de trabajo", hiredStaff: "Personal contratado", title: "Titulo",  
    description: "Descripción", leader: "Responsable", reference: "Referencia", scope: "Competencia", status: "Estado", sponsor: "Patrocinador", 
    startDate: "Fecha de inicio", endDate: "Fecha de fin", amount: "Importe", relatedPublications: "Publicaciones relacionadas", relatedTools: "Herramientas relacionadas"}
}

  public toString = (): string => {
    return this.title + ' ';
  }

}

