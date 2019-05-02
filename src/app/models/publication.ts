import { Project } from "./project";
import { Person } from "./person";

export class Publication {
    constructor(
        public scopusId: String,
        public articleTitle: String,
        public sourceType: String,
        public documentType: String,
        public sourceTitle: String,
        public sourceIdentifier: Number,
        public sourceVolume: String,
        public pageRange: String,
        public publicationDate: String,
        public DOI: String,
        public ORCID: String,
        public authors: Array<Person>,
        public affiliation: String,
        public assigned: Boolean,
        public project: Project[],
        public quartil: String
    ) {}

    static parse(object): Publication{
        let scopusId = object["dc:identifier"]
        let articleTitle = object["dc:title"]
        let sourceType = object["prism:aggregationType"]
        let documentType = object["subtypeDescription"]
        let sourceTitle = object["prism:publicationName"]
        let sourceIdentifier = object["prism:issn"]
        let sourceVolume = object["prism:volume"]
        let pageRange = object["prism:pageRange"]
        let publicationDate = new Date(object["prism:coverDate"]).getFullYear().toString()
        let DOI = object["prism:doi"]
        let ORCID = object["orcid"]
        let arrayAuthors = object["author"]
        let authors = []
        for (let index = 0; index < arrayAuthors.length; index++) {
            let actual = arrayAuthors[index]
            //TODO HAY QUE COMPROBAR QUE LA PERSONA NO EXISTA YA
            let auth = new Person(actual["given-name"],actual["surname"],"","","",true,"RESEARCHER","",actual["authid"],"NONE",actual["author-url"],false);
            authors.push(auth);
        }
        var pub = new Publication(scopusId, articleTitle, sourceType, documentType, sourceTitle, sourceIdentifier, sourceVolume, pageRange, publicationDate, DOI, ORCID, authors, null, false, null, null)
        return pub
    }

    static getFields() {
        return { articleTitle: "Titulo del articulo", firstAuthor: "Autores", scopusId: "Id de Scopus", sourceType: "Publicado en",  documentType: "Tipo de publicación", sourceTitle: "Libro/Web/Revista", sourceIdentifier: "Id del lugar de publicacion", sourceVolume: "Volumen", pageRange: "Paginas del volumen", publicationDate: "Fecha de publicación", DOI: "DOI", ORCID: "ORCID", affiliation: "Afiliación"}
    }

    public toString = (): string => {
        return this.articleTitle + ' ';
    }
}