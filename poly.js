/**
 * Shape class - Represents a clickable polygon area
 */
class Shape {
  /**
   * @param {string} points - Polygon points in format "x1,y1,x2,y2,..."
   */
  constructor(points) {
    this.polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    this.polygon.setAttribute('points', points);
    this.polygon.setAttribute('fill', 'transparent');
    this.polygon.setAttribute('class', 'poly-click-area');
    this.polygon.setAttribute('style', 'pointer-events: all; cursor: pointer;');
  }

  /**
   * Bind click event handler
   * @param {function} callback - Click callback function
   * @returns {Shape} - Returns this for chaining
   */
  click(callback) {
    this.polygon.addEventListener('click', callback);
    return this;
  }

  /**
   * Bind any DOM event handler
   * @param {string} event - Event name
   * @param {function} callback - Event callback function
   * @returns {Shape} - Returns this for chaining
   */
  on(event, callback) {
    this.polygon.addEventListener(event, callback);
    return this;
  }
}

/**
 * PolyClick class - Creates SVG polygon based click interaction module
 * @param {string|HTMLElement} selector - CSS selector or DOM element
 * @param {string} viewBox - SVG viewBox attribute, e.g. "0 0 1920 1080"
 * Note: Typically used for defining clickable areas on image backgrounds.
 * When using https://www.image-map.net/ to draw areas, set the image dimensions
 * used for outlining as the viewBox dimensions.
 */
class PolyClick {
  /**
   * @param {string|HTMLElement} selector - CSS selector or DOM element
   * @param {string} viewBox - SVG viewBox attribute
   */
  constructor(selector, viewBox) {
    this.element = typeof selector === 'string' ? document.querySelector(selector) : selector;

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
   * @param {string} points - Polygon points in format "x1,y1,x2,y2,..."
   * @returns {Shape} - Returns Shape instance
   */
  add(points) {
    const shape = new Shape(points);
    this.svg.appendChild(shape.polygon);
    this.shapes.push(shape);
    return shape;
  }

  /**
   * Get visibility state
   * @returns {boolean}
   */
  get isVisible() {
    return this._isVisible;
  }

  /**
   * Show all polygon areas with debug colors
   */
  show() {
    this.shapes.forEach((shape, index) => {
      const color = this.colors[index % this.colors.length];
      shape.polygon.setAttribute('fill', color);
    });
    this._isVisible = true;
  }

  /**
   * Hide all polygon areas (make transparent)
   */
  hide() {
    this.shapes.forEach((shape) => {
      shape.polygon.setAttribute('fill', 'transparent');
    });
    this._isVisible = false;
  }
}

export default PolyClick;
