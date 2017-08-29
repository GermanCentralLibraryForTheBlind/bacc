const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const expect = require('chai').expect;
const rimraf = require('rimraf');

// require('should');

chai.use(chaiHttp);

const api = require('./../REST-api');

describe('rest api', function () {

  const EPUB = './server/tests/epub-samples/accessible_epub3.epub';

  beforeEach(function (done) {
    done();
  });

  afterEach(function (done) {
    rimraf.sync('./uploads/');
    done();
  });

  describe('/upload', () => {

    it('It should upload ebook and the response should contains upload id.', function (done) {

      this.timeout(20000);
      chai.request(api)
        .post('/upload')
        .attach("file", fs.readFileSync(EPUB), "accessible_epub_3.epub")
        .type('form')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('msg');
          expect(res.body).to.have.property('uploadID');
          expect(res.body).to.have.property('name');
          expect(res.body.uploadID).to.be.an('string');
          done();
        });
    });
  });

  describe('/checkover', () => {

    it('It should upload ebook and check it.', function (done) {

      this.timeout(50000);
      chai.request(api)
        .post('/upload')
        .attach("file", fs.readFileSync(EPUB), "accessible_epub_3.epub")
        .type('form')
        .end((err, res) => {

          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('msg');
          expect(res.body).to.have.property('uploadID');
          expect(res.body).to.have.property('name');
          expect(res.body.uploadID).to.be.an('string');

          chai.request(api)
            .get('/checkover')
            .query({'uploadID': res.body.uploadID}) // /search?name=foo&limit=10
            .end((err, res) => {
              console.log(err);
              expect(res).to.have.status(200);
              expect(res.text).to.be.an('string');
              done();
            });
        });
    });
  });
});
