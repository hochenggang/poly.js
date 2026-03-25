/**
 * Shape class - Represents a clickable polygon area
 */
class Shape {
  polygon: SVGPolygonElement;

  /**
   * @param points - Polygon points in format "x1,y1,x2,y2,..."
   */
  constructor(points: string) {
    this.polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    this.polygon.setAttribute('points', points);
    this.polygon.setAttribute('fill', 'transparent');
    this.polygon.setAttribute('class', 'poly-click-area');
    this.polygon.setAttribute('style', 'pointer-events: all; cursor: pointer;');
  }

  /**
   * Bind click event handler
   * @param callback - Click callback function
   * @returns this for chaining
   */
  click(callback: () => void): this {
    this.polygon.addEventListener('click', callback);
    return this;
  }

  /**
   * Bind any DOM event handler
   * @param event - Event name
   * @param callback - Event callback function
   * @returns this for chaining
   */
  on(event: string, callback: (e: Event) => void): this {
    this.polygon.addEventListener(event, callback);
    return this;
  }
}

/**
 * PolyClick class - Creates SVG polygon based click interaction module
 * @param selector - CSS selector or DOM element
 * @param viewBox - SVG viewBox attribute, e.g. "0 0 1920 1080"
 * Note: Typically used for defining clickable areas on image backgrounds.
 * When using https://www.image-map.net/ to draw areas, set the image dimensions
 * used for outlining as the viewBox dimensions.
 */
class PolyClick {
  element: HTMLElement;
  svg: SVGSVGElement;
  shapes: Shape[];
  private colors: string[];
  private _isVisible: boolean;

  /**
   * @param selector - CSS selector or DOM element
   * @param viewBox - SVG viewBox attribute
   */
  constructor(selector: string | HTMLElement, viewBox: string) {
    this.element = typeof selector === 'string' ? document.querySelector(selector) as HTMLElement : selector as HTMLElement;

    if (!this.element || !(this.element instanceof HTMLElement)) {
      throw new Error('PolyClick: selector must be a valid DOM element');
    }

    const computedStyle = window.getComputedStyle(this.element);
    if (computedStyle.position !== 'relative') {
      throw new Error('PolyClick: element position must be relative');
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

  /**
   * Add a clickable polygon area
   * @param points - Polygon points in format "x1,y1,x2,y2,..."
   * @returns Shape instance
   */
  add(points: string): Shape {
    const shape = new Shape(points);
    this.svg.appendChild(shape.polygon);
    this.shapes.push(shape);
    return shape;
  }

  /**
   * Get visibility state
   */
  get isVisible(): boolean {
    return this._isVisible;
  }

  /**
   * Show all polygon areas with debug colors
   */
  show(): void {
    this.shapes.forEach((shape, index) => {
      const color = this.colors[index % this.colors.length];
      shape.polygon.setAttribute('fill', color);
    });
    this._isVisible = true;
  }

  /**
   * Hide all polygon areas (make transparent)
   */
  hide(): void {
    this.shapes.forEach((shape) => {
      shape.polygon.setAttribute('fill', 'transparent');
    });
    this._isVisible = false;
  }
}

export default PolyClick;
