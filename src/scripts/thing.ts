import Renderable from './renderable';
import Renderer from './renderer';

export default class Thing {
  public health: number;
  public position: { x: number, y: number };
  public id: number;
  public speed: number;
  public gfx: Renderable;
  private angle: number;
  private dx: number;
  private dy: number;
  private dirty: boolean;
  private halfPi: number;

  /**
   * Creates an instance of Thing.
   * @memberof Thing
   */
  constructor(x: number, y: number, d: number) {
    this.health = 100;
    this.position = { x, y };
    this.id = 1;
    this.angle = d;
    this.dirty = true;
    this.speed = 0;
    this.halfPi = (Math.PI / 180);
    this.createGfx();
  }

  public set direction(angle: number) {
    this.dirty = true;
    this.angle = angle;
  }
  public get direction(): number {
    return this.angle;
  }

  public move() {
    this.dirty = true;
    this.speed = 10;
    this.update();
  }
  /**
   * Update gfx
   *
   * @memberof Thing
   */
  public update(ignoreMove?: boolean) {

    if (this.angle > 360) {
      this.angle -= 360
    }

    if (this.dirty) {
      this.dx = this.speed * Math.cos(this.angle / this.halfPi)
      this.dy = this.speed * Math.sin(this.angle / this.halfPi)
      this.dirty = false;
    }

    if (ignoreMove === undefined) {
      this.position.x += this.dx;
      this.position.y += this.dy;
    }
    this.speed = 0;

    console.log(this.dx, this.dy, this.position, this.angle);
    this.gfx.prop(`transform`, `translate(${this.position.x}, ${this.position.y}) rotate(${this.angle}, 15,15)`);
  }

  /**
   * Create GFX for the thing
   *
   * @private
   * @memberof Thing
   */
  private createGfx() {
    this.gfx = new Renderable(`g`, { transform: `translate(${this.position.x}, ${this.position.y}) rotate(${this.angle}, 15, 15)` });
    const body = new Renderable(`rect`, { width: 30, height: 30, fill: `#00ff00`, x: 0, y: 0 });
    const eye = new Renderable(`rect`, { width: 10, height: 10, fill: `#000000`, x: 20, y: 10 });
    // const guide = new Renderable(`line`, { x1: 0, y1: 0, stroke: `black`, x2: 60, y2: 0 });
    this.gfx.append(body);
    this.gfx.append(eye);
    // this.gfx.append(guide);

    Renderer.getInstance().container.append(this.gfx);
  }
}
