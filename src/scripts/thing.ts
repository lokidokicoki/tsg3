import Renderable from './renderable';
import Renderer from './renderer';

export default class Thing {
  public health: number;
  public position: { x: number, y: number };
  public id: number;
  public direction: number;
  public speed: number;
  public gfx: Renderable;

  /**
   * Creates an instance of Thing.
   * @memberof Thing
   */
  constructor() {
    this.health = 100;
    this.position = { x: 100, y: 100 };
    this.id = 1;
    this.direction = 0;
    this.speed = 10;
    this.createGfx();
  }

  /**
   *
   *
   * @memberof Thing
   */
  public update() {
    console.log(this.position, this.direction);
    this.gfx.prop(`transform`, `translate(${this.position.x}, ${this.position.y}) rotate(${this.direction}, -15, -15)`);
  }

  /**
   * Create GFX for the thing
   *
   * @private
   * @memberof Thing
   */
  private createGfx() {
    this.gfx = new Renderable(`g`, { transform: `translate(${this.position.x}, ${this.position.y})` });
    const body = new Renderable(`rect`, { width: 30, height: 30, fill: `#00ff00`, x: 0, y: 0 });
    const eye = new Renderable(`rect`, { width: 10, height: 10, fill: `#000000`, x: 10, y: 0 });
    this.gfx.append(body);
    this.gfx.append(eye);

    Renderer.getInstance().container.append(this.gfx);
  }
}
