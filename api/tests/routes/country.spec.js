/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
  id: "arg",
  name: 'Argentina',
  img: "abc.jpg",
  continent: "America",
  capital: "CABA"
};

describe('Country routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Country.sync({ force: true })
    .then(() => Country.create(country)));
  describe('GET /countries', () => {
    it('should get 200', () =>
      agent.get('/countries').expect(200)
        .expect('Content-Type', /json/)
    );
    it('should get the country that matches the query', () =>
      agent.get('/countries?name=argentina').expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body[0].name).to.eql('Argentina')
          expect(res.body).to.have.length(1);
        })
    );
    it("shouldn't get the country that matches the query", () =>
      agent.get('/countries?name=argentinaaaa').expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.have.length(0);
        })
    );
    it("ruta que no existe", () =>
      agent.get('/Bocajuniors').expect(404)
    );

  });
});
