import { v4 as uuid } from 'uuid';

export class Picture {
  id: string;
  src: string;
  name: string;

  constructor(name: string, src: string) {
    this.id = uuid();
    this.name = name.endsWith('.jpeg') ? name : name + '.jpeg';
    this.src = src;
  }
}
