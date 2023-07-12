class Colors {
  colors: any;

  constructor(colors: any) {
    this.colors = colors;
  }

  getColorForKey = (key: string, defaultColor = '#999999') => {
    if (key in this.colors) {
      return this.colors[key];
    }
    return defaultColor;
  };

  static newEmptyRecord = () => {
    return new Colors({});
  };
}

export default Colors;
