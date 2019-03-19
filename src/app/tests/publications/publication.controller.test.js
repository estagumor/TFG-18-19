var server = require("../../../app");
var chai = require("chai");
var chaiHttp = require("chai-http");
var sinon = require("sinon");
var Publication = require("../../../models/publication");
var expect = chai.expect;

chai.use(chaiHttp);

describe("***Save publications***", function () {

    it('It should save a publication corretly', (done) => {
        publicationDate = { year: 2019, month: 3, day: 5 }
        var pub = {
            "scopusId": "SCOPUS_ID:85034273149",
            "articleTitle": "Predictive monitoring of business processes: A survey",
            "sourceType": "Journal",
            "documentType": "Article",
            "sourceTitle": "IEEE Transactions on Services Computing",
            "sourceVolume": "11",
            "pageRange": "962-977",
            "publicationDate": publicationDate,
            "DOI": "10.1109/TSC.2017.2772256",
            "firstAuthor": "Marquez-Chamorro A.",
            "affiliation": "University of Seville",
            "assigned": false
        }

        var pubMocked = {
            "scopusId": "SCOPUS_ID:85034273149",
            "articleTitle": "Predictive monitoring of business processes: A survey",
            "sourceType": "Journal",
            "documentType": "Article",
            "sourceTitle": "IEEE Transactions on Services Computing",
            "sourceVolume": "11",
            "pageRange": "962-977",
            "publicationDate": publicationDate["month"] + "/" + publicationDate["day"] + "/" + publicationDate["year"],
            "DOI": "10.1109/TSC.2017.2772256",
            "firstAuthor": "Marquez-Chamorro A.",
            "affiliation": "University of Seville",
            "assigned": false
        }

        var pubMock = sinon.mock(Publication);
        pubMock.expects('create').withArgs(pubMocked).yields(null);

        chai.request(server)
            .post("/api/publication")
            .send(pub)
            .end((err, res) => {
                expect(res).to.have.status(201);
                pubMock.verify();
                done();
            })
    })

    it('It should save several publications', (done) => {
        publicationDate = { year: 2019, month: 3, day: 5 }

        pub = [{
            "scopusId": "SCOPUS_ID:85034273149",
            "articleTitle": "Predictive monitoring of business processes: A survey",
            "sourceType": "Journal",
            "documentType": "Article",
            "sourceTitle": "IEEE Transactions on Services Computing",
            "sourceVolume": "11",
            "pageRange": "962-977",
            "publicationDate": publicationDate,
            "DOI": "10.1109/TSC.2017.2772256",
            "firstAuthor": "Marquez-Chamorro A.",
            "affiliation": "University of Seville",
            "assigned": false
        }, {
            "scopusId": "SCOPUS_ID:85033573149",
            "articleTitle": "Predictive monitoring of business processes: A survey",
            "sourceType": "Journal",
            "documentType": "Article",
            "sourceTitle": "IEEE Transactions on Services Computing",
            "sourceVolume": "11",
            "pageRange": "122-977",
            "publicationDate": publicationDate,
            "assigned": false
        }]
        var pubMock = sinon.mock(Publication);
        pubMock.expects('create').withArgs(pub).yields(null, pub);

        chai.request(server)
            .post("/api/publication/all")
            .send(pub)
            .end((err, res) => {
                expect(res).to.have.status(201);
                pubMock.verify();
                done();
            })


    })


})

describe("***Get publications***", function () {
    publicationDate = { year: 2019, month: 3, day: 5 }

    var pubMocked = {
        "scopusId": "SCOPUS_ID:85034273149",
        "articleTitle": "Predictive monitoring of business processes: A survey",
        "sourceType": "Journal",
        "documentType": "Article",
        "sourceTitle": "IEEE Transactions on Services Computing",
        "sourceVolume": "11",
        "pageRange": "962-977",
        "publicationDate": publicationDate["month"] + "/" + publicationDate["day"] + "/" + publicationDate["year"],
        "DOI": "10.1109/TSC.2017.2772256",
        "firstAuthor": "Marquez-Chamorro A.",
        "affiliation": "University of Seville",
        "assigned": false
    }

    var pubMock = sinon.mock(pubMocked);


    var PubStub = sinon.stub(Publication, 'find');
    PubStub.yields(null, [pubMock]);

    it('should return a few publications', (done) => {
        chai.request(server)
            .get('/api/publications')
            .send("test")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.pubs).to.be.an('array');
                expect(res.body.pubs).to.have.lengthOf(1);
                pubMock.verify();
                done();
            });
    });
})