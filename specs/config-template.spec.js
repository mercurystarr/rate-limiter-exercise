const assert = require('chai').assert;
const configTemplate = require('../src/config/config-template');

describe('Load configuration file from ', async () => {
   describe('a file that exists in path ', () => {
    it('should load configure 3 routes', () => {
      configTemplate.loadConfiguration('./config.json');
      const config = configTemplate.getConfiguration();
      assert.equal(3, config.size);
      configTemplate.reset();
    });
  }); 

  describe('file that does not exist in path', async () => {
    it('should configure no routes', () => {
      configTemplate.loadConfiguration('./doesnotexist.json');
      const config = configTemplate.getConfiguration();
      assert.equal(0, config.size);
      configTemplate.reset();
    });
  });

  describe('file with malformed', async () => {
    it('should configure no routes', () => {
      configTemplate.loadConfiguration('./badconfig.json');
      const config = configTemplate.getConfiguration();
      assert.equal(0, config.size);
      configTemplate.reset();
    });
  });

  describe('file with empty json', async () => {
    it('should configure no routes', () => {
      configTemplate.loadConfiguration('./emptyconfig.json');
      const config = configTemplate.getConfiguration();
      assert.equal(config.size, 0);
      assert.equal(0, config.size);
    });
  });
});
