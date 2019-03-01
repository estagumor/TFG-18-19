

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
        public publicationDate: Date,
        public DOI: String,
        public ORCID: String,
        public firstAuthor: String,
        public affiliation: String,
        public assigned: Boolean
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
        let publicationDate = new Date(object["prism:coverDate"])
        let DOI = object["prism:doi"]
        let ORCID = object["orcid"]
        let firstAuthor = object["dc:creator"]
        let affiliation = object["affiliation"][0]["affilname"]
        var pub = new Publication(scopusId, articleTitle, sourceType, documentType, sourceTitle, sourceIdentifier, sourceVolume, pageRange, publicationDate, DOI, ORCID, firstAuthor, affiliation, false)
        return pub
    }
}