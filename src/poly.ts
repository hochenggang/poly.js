export class Shape {
  polygon: SVGPolygonElement;

  constructor(points: string) {
    this.polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    this.polygon.setAttribute('points', points);
    this.polygon.setAttribute('fill', 'transparent');
    this.polygon.setAttribute('class', 'poly-click-area');
    this.polygon.setAttribute('style', 'pointer-events: all; cursor: pointer;');
  }

  click(callback: () => void): this {
    this.polygon.addEventListener('click', callback);
    return this;
  }

  on(event: string, callback: (e: Event) => void): this {
    this.polygon.addEventListener(event, callback);
    return this;
  }
}

export class PolyClick {
  element: HTMLElement;
  svg: SVGSVGElement;
  shapes: Shape[];
  private colors: string[];
  private _isVisible: boolean;

  constructor(selector: string | HTMLElement, viewBox: string) {
    this.element = typeof selector === 'string' ? document.querySelector(selector) as HTMLElement : selector as HTMLElement;

    if (!this.element || !(this.element instanceof HTMLElement)) {
      throw new Error('PolyClick: selector must be a valid DOM element');
    }

    const computedStyle = window.getComputedStyle(this.element);
    const validPositions = ['relative', 'absolute', 'fixed'];
    if (!validPositions.includes(computedStyle.position)) {
      throw new Error('PolyClick: element position must be relative, absolute, or fixed');
    }

    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('viewBox', viewBox);
    this.svg.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;');
    this.svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    this.element.appendChild(this.svg);

    this.shapes = [];
    this.colors = [
      'rgba(255,100,100,0.4)',
      'rgba(100,255,100,0.4)',
      'rgba(100,100,255,0.4)',
      'rgba(255,255,100,0.4)',
      'rgba(255,100,255,0.4)',
      'rgba(100,255,255,0.4)'
    ];
    this._isVisible = false;
  }

  add(points: string): Shape {
    const shape = new Shape(points);
    this.svg.appendChild(shape.polygon);
    this.shapes.push(shape);
    return shape;
  }

  get isVisible(): boolean {
    return this._isVisible;
  }

  show(): void {
    this.shapes.forEach((shape, index) => {
      const color = this.colors[index % this.colors.length];
      shape.polygon.setAttribute('fill', color);
    });
    this._isVisible = true;
  }

  hide(): void {
    this.shapes.forEach((shape) => {
      shape.polygon.setAttribute('fill', 'transparent');
    });
    this._isVisible = false;
  }
}

export default PolyClick;