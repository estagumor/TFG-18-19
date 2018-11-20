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
    public endDate: Date,
    public amount: Number,
    public relatedPublications: Array<String>,
    public relatedTools: Array<String>
  ) {  }
}

