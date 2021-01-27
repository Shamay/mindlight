class Panel {
  constructor(id, r, g, b, transitionTime) {
    this.id = id;
    this.red = r;
    this.green = g;
    this.blue = b;
    this.transitionTime = transitionTime || 5;
  }

  serialize() {
    return `${this.id} 1 ${this.red} ${this.green} ${this.blue} 0 ${this.transitionTime}`;
  }
}