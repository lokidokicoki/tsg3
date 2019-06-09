
export default class Renderable {
  public svg: Element;
  private ns: string;
  constructor(type: string, props?: any) {
    console.warn(`ctor renderable ${type}:`, props)
    this.ns = `http://www.w3.org/2000/svg`;
    this.svg = document.createElementNS(this.ns, type);

    if (props) {
      for (const key of Object.keys(props)) {
        this.prop(key, props[key]);
      }
    }

  }

  public append(child: Renderable): void {
    this.svg.appendChild(child.svg);
  }

  public prop(key: string, value?: (string | number)): (void | string) {
    if (value) {
      this.svg.setAttributeNS(null, key, String(value));
    } else {
      return this.svg.getAttributeNS(null, key);
    }
  }

  public move(x: number, y: number) {
    this.prop(`x`, x);
    this.prop(`y`, y);
  }
}
