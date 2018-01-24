const { RedisPubSub } = require('graphql-redis-subscriptions');

const pubsub = new RedisPubSub({
  connection: {
    host: 'redis',
    port: 6379,
    retry_strategy: options => {
      return Math.max(options.attempt * 100, 3000);
    }
  }
});

module.exports = pubsub;
