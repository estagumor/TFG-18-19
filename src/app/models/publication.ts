import { Project } from "./project";


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
        public firstAuthor: String,
        public affiliation: String,
        public assigned: Boolean,
        public project: Project
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
        let firstAuthor = object["dc:creator"]
        if(object["affiliation"])
            var affiliation = object["affiliation"][0]["affilname"]
        var pub = new Publication(scopusId, articleTitle, sourceType, documentType, sourceTitle, sourceIdentifier, sourceVolume, pageRange, publicationDate, DOI, ORCID, firstAuthor, affiliation, false, null)
        return pub
    }

    static getFields() {
        return { articleTitle: "Titulo del articulo", firstAuthor: "Autores", scopusId: "Id de Scopus", sourceType: "Publicado en",  documentType: "Tipo de publicación", sourceTitle: "Libro/Web/Revista", sourceIdentifier: "Id del lugar de publicacion", sourceVolume: "Volumen", pageRange: "Paginas del volumen", publicationDate: "Fecha de publicación", DOI: "DOI", ORCID: "ORCID", affiliation: "Afiliación"}
    }
}