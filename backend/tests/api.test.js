const chai = require('chai');
chai.use(require('chai-match'));
const chaiHttp = require('chai-http');
const fs = require('fs');
const expect = chai.expect;
const rimraf = require('rimraf');

// require('should');

chai.use(chaiHttp);

const api = require('../webApi');

describe('rest api', function () {

  const EPUB_NAME = 'mml-html.epub';
  const EPUB_PATH = './backend/tests/epub-samples/' + EPUB_NAME;

  beforeEach(function (done) {
    done();
  });

  afterEach(function (done) {
    // rimraf.sync('./uploads/');
    done();
  });

  describe('/upload', () => {

    it('An ebook should be uploaded and the response should be contains the upload-id.', function (done) {

      this.timeout(20000);
      chai.request(api)
        .post('/upload')
        .attach("file", fs.readFileSync(EPUB_PATH), EPUB_NAME)
        .type('form')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('msg');
          expect(res.body).to.have.property('uploadID');
          // test uploadID has uuid format
          expect(res.body.uploadID).to.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/);
          expect(res.body).to.have.property('name');
          expect(res.body.uploadID).to.be.an('string');
          done();
        });
    });
  });

  describe('/checkover', () => {

    it('An ebook should be uploaded and the checker should be run on it.', function (done) {

      this.timeout(50000);
      chai.request(api)
        .post('/upload')
        .attach("file", fs.readFileSync(EPUB_PATH), EPUB_NAME)
        .type('form')
        .end((err, res) => {

          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('msg');
          expect(res.body).to.have.property('uploadID');
          // test uploadID has uuid format
          expect(res.body.uploadID).to.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/);
          expect(res.body).to.have.property('name');
          expect(res.body.uploadID).to.be.an('string');

          chai.request(api)
            .get('/checkover')
            .query({'uploadID': res.body.uploadID}) // /search?name=foo&limit=10
            .end((err, res) => {
              console.log(err);
              expect(res).to.have.status(200);
              expect(res).to.be.json;
              expect(res.body).to.have.a.property('aLevel');
              expect(res.body).to.have.a.property('path');
              done();
            });
        });
    });
  });
});
