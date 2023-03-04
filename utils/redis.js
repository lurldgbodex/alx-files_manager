import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.get = promisify(this.client.get).bind(this.client);
    this.setex = promisify(this.client.setex).bind(this.client);
    this.del = promisify(this.client.del).bind(this.client);
    this.client.on('error', (err) => {
      console.log(err);
    });

    this.client.on('connect', () => {
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const value = await this.client.get(key);
    return value;
  }

  async set(key, value, duration) {
    await this.setex(key, duration, value);
  }

  async del(key) {
    await this.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
