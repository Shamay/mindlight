class Effect {
  constructor(serializedPanelData) {
    this.loop = false;
    this.animType = "static";
    this.version = "1.0";
    this.animData = serializedPanelData;
  }

  serializeToDisplay(numPanels) {
    return {
      loop: this.loop,
      animType: this.animType,
      version: this.version,
      animData: `${numPanels} ${this.animData.join(" ")}`,
    };
  }
}