export default class Cache {
  static get(key) {
    const value = localStorage.getItem(key);
    if(!value) { return value; }

    return JSON.parse(value);
  }
  static remove(key) { return localStorage.removeItem(key); }
  static set(key, value) { return localStorage.setItem(key, JSON.stringify(value)); }
}
