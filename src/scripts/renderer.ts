
import Renderable from './renderable';

export default class Renderer {
  public static getInstance(divId?: string): Renderer {
    if (!Renderer.instance) {
      Renderer.instance = new Renderer(divId);
    }
    return Renderer.instance;
  }

  private static instance: Renderer;
  public ns: string;
  public container: Renderable;
  public root: Element;
  public bbox: ClientRect | DOMRect;

  private constructor(divId: string) {
    console.warn(`renderer ctro`)
    this.ns = `http://www.w3.org/2000/svg`;
    this.root = document.getElementById(divId);
    this.container = new Renderable(`svg`, { width: `100%`, height: `100%` })
    this.root.appendChild(this.container.svg);
    this.bbox = this.container.svg.getBoundingClientRect();
  }
}
