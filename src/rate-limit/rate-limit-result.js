module.exports = class RateLimitResult {
  constructor(message, remainingCapacity) {
    this.message = message;
    this.remainingCapacity = remainingCapacity;
  }
};
