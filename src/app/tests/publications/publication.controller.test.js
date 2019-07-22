// var server = require("../../../../app");
// var chai = require("chai");
// var chaiHttp = require("chai-http");
// var sinon = require("sinon");
// var Publication = require("../../../../models/publication");
// var Project = require("../../../../models/project")
// var expect = chai.expect;

// chai.use(chaiHttp);

// describe("***Save publications***", function () {
//     this.timeout(20000)

//     it('It should save a publication corretly', (done) => {
//         publicationDate = "2019"
//         var pub = {
//             "scopusId": "SCOPUS_ID:85034273149",
//             "articleTitle": "Predictive monitoring of business processes: A survey",
//             "sourceType": "Journal",
//             "documentType": "Article",
//             "sourceTitle": "IEEE Transactions on Services Computing",
//             "sourceVolume": "11",
//             "pageRange": "962-977",
//             "publicationDate": publicationDate,
//             "quartil": "Q1",
//             "DOI": "10.1109/TSC.2017.2772256",
//             "firstAuthor": "Marquez-Chamorro A.",
//             "affiliation": "University of Seville",
//             "assigned": false
//         }

//         var pubMocked = {
//             "scopusId": "SCOPUS_ID:85034273149",
//             "articleTitle": "Predictive monitoring of business processes: A survey",
//             "sourceType": "Journal",
//             "documentType": "Article",
//             "sourceTitle": "IEEE Transactions on Services Computing",
//             "sourceVolume": "11",
//             "pageRange": "962-977",
//             "publicationDate": publicationDate,
//             "quartil": "Q1",
//             "DOI": "10.1109/TSC.2017.2772256",
//             "firstAuthor": "Marquez-Chamorro A.",
//             "affiliation": "University of Seville",
//             "assigned": false
//         }

//         var pubMock = sinon.mock(Publication);
//         pubMock.expects('create').withArgs(pubMocked).yields(null);

//         chai.request(server)
//             .post("/api/publication")
//             .send(pub)
//             .end((err, res) => {
//                 expect(res).to.have.status(201);
//                 pubMock.verify();
//                 done();
//             })
//     })


// })

// describe("***Get publications***", function () {

//     it('should return a few publications', (done) => {
//     var pubMocked = {
//         "scopusId": "SCOPUS_ID:85034273149",
//         "articleTitle": "Predictive monitoring of business processes: A survey",
//         "sourceType": "Journal",
//         "documentType": "Article",
//         "sourceTitle": "IEEE Transactions on Services Computing",
//         "sourceVolume": "11",
//         "pageRange": "962-977",
//         "publicationDate": "2019",
//         "DOI": "10.1109/TSC.2017.2772256",
//         "firstAuthor": "Marquez-Chamorro A.",
//         "affiliation": "University of Seville",
//         "assigned": false
//     }

//     var pubMock = sinon.mock(Publication);


//     pubMock.expects('find').withArgs().yields(null, [pubMocked])

//         chai.request(server)
//             .get('/api/publications')
//             .send("test")
//             .end((err, res) => {
//                 expect(res).to.have.status(200);
//                 expect(res.body.pubs).to.be.an('array');
//                 expect(res.body.pubs).to.have.lengthOf(1);
//                 pubMock.verify();
//                 done();
//             });
//     });
// })

// describe("***Refresh indexes***", function() {
//     this.timeout(10000)

//     it('should update update one publication', (done) => {
//     var pubMocked = {
//         "scopusId": "SCOPUS_ID:85034273149",
//         "articleTitle": "Predictive monitoring of business processes: A survey",
//         "sourceType": "Journal",
//         "documentType": "Article",
//         "sourceTitle": "IEEE Transactions on Services Computing",
//         "sourceVolume": "11",
//         "pageRange": "962-977",
//         "publicationDate": "2019",
//         "DOI": "10.1109/TSC.2017.2772256",
//         "firstAuthor": "Marquez-Chamorro A.",
//         "affiliation": "University of Seville",
//         "assigned": false
//     }

//     var pubMock = sinon.mock(Publication)

//     pubMock.expects('find').withArgs().yields([pubMocked])
//     // var PubSaveStub = sinon.stub(Publication, 'update')
//     // PubSaveStub.yields({"n": 1})

//         chai.request(server)
//             .get("/api/publication/loadStats")
//             .end((err, res) => {
//                 expect(res).to.have.status(200);
//                 done();
//             })
//     })
// })

