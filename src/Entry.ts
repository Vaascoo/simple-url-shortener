export default class Entry {
  mapping!: string;
  url!: string;
  timestamp!: number;

  constructor(mapping: string, url: string) {
    this.mapping = mapping;
    this.url = url;
    this.timestamp = Math.floor(new Date().getTime() / 1000);
  }
}
