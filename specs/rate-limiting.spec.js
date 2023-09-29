const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');

chai.use(chaiHttp);

const {expect} = chai;

describe('Call /take', () => {

  describe('once on configured routes ', () => {
    it('/take/get/user/1234 should return success and return remaining token count', async () => {
      chai.request(app).get('/take/get/user/1234').send().then(function(res) {
        expect(res).to.have.statusCode(200);
        expect(res).to.be.json;
        expect(res).body.should.be.eq('{"message":"SUCCESS","remainingCapacity":9}');
      });
    });

    it('/take/patch/user/567 should return success and return remaining token count', async () => {
      chai.request(app).get('/take/patch/user/567').send().then(function(res) {
        expect(res).to.have.statusCode(200);
        expect(res).to.be.json;
        expect(res).body.should.be.eq('{"message":"SUCCESS","remainingCapacity":9}');
      });
    });

    it('/take/post/userinfo should return success and return remaining token count', async () => {
      chai.request(app).get('/take/post/userinfo').send().then(function(res) {
        expect(res).to.have.statusCode(200);
        expect(res).to.be.json;
        expect(res).body.should.be.eq('{"message":"SUCCESS","remainingCapacity":299}');
      });
    });
  });

  describe('on routes not in configuration', () => {
    it('/take/delete/user/1234 not configured should return not found and 0 capacity', async () => {
      chai.request(app).get('/take/delete/user/1234').send().then(function(res) {
        expect(res).to.have.statusCode(404);
        expect(res).to.be.json;
        expect(res).body.should.be.eq('{"message":"NOT FOUND","remainingCapacity":0}');
      });
    });

    it('/take/patch/userstatus not configured should return not found and 0 capacity', async () => {
      chai.request(app).get('/take/patch/userstatus').send().then((res) => {
        expect(res).to.have.statusCode(404);
        expect(res).to.be.json;
        expect(res).body.should.be.eq('{"message":"NOT FOUND","remainingCapacity":0}');
      });
    });
  });

  describe('take until rate limited', () => {
    /** *  I couldn't get this to work :( ***
     it('/take/get/user/1234', async function() {

      const res = async.retry(20, async (cb) => {
        const result = await request(app).get(URL);
        if (response.status == 429) {
          return result;
        }
        else {
          return cb('not rate limited yet');
        }
      }, function (err, results) {
        return cb(err, results);
      });
      console.log(res);
      //expect(res).to.have.status(429);
    });
 */

    // Not how I wanted to test this but I ran out of time
    it('/take/get/user/1234', async function() {
      for (let i = 0; i < 10; i++) {
        console.log * (i);
        chai.request(app).get('/take/get/user/1234').send().then(function(res) {
          expect(res).to.have.statusCode(200);
          expect(res).to.be.json;
          expect(res).body.should.be.eq('{"message":"SUCCESS","remainingCapacity":9}');
        });
      }

      chai.request(app).get('/take/get/user/1234').send().then(function(res) {
        expect(res).to.have.statusCode(429);
        expect(res).to.be.json;
        expect(res).body.should.be.eq('{"message":"RATE LIMITED","remainingCapacity":0}');
      });
    });
  });
});