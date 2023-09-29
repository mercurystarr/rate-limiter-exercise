const assert = require('chai').assert;
const TokenBucket = require('../src/rate-limit/token-bucket');

describe('TokenBucket ', function() {
  describe('when take() called ', function() {
    it('counter is decremented ', function() {
      const bucket = new TokenBucket(10, 60);
      bucket.take();
      assert.equal(9, bucket.tokens);
      bucket.take();
      assert.equal(8, bucket.tokens);
    });
  });

  describe('when take() called ', function() {
    it('counter is decremented but capacity replenishes after waiting 2 seconds', function() {
      const bucket = new TokenBucket(10, 60);
      bucket.take();
      assert.equal(9, bucket.tokens);
      bucket.take();
      assert.equal(8, bucket.tokens);
      bucket.take();
      assert.equal(7, bucket.tokens);
      bucket.take();
      sleep(2000).then(()=> assert.equal(10, bucket.tokens));
    });
  });
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
