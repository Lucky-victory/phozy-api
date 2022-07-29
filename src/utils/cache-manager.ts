import NodeCache from "node-cache";

export default class CacheManager {
  cache!: NodeCache;
  constructor() {
    this.cache = new NodeCache();
  }
  get(key: string) {

    return this.cache.get(key);
  }
  set(key: string, value: unknown, ttl: number = 600) {
    return this.cache.set(key, value, ttl);
  }
}
