class o {
  constructor(t) {
    this.polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon"), this.polygon.setAttribute("points", t), this.polygon.setAttribute("fill", "transparent"), this.polygon.setAttribute("class", "poly-click-area"), this.polygon.setAttribute("style", "pointer-events: all; cursor: pointer;");
  }
  click(t) {
    return this.polygon.addEventListener("click", t), this;
  }
  on(t, e) {
    return this.polygon.addEventListener(t, e), this;
  }
}
class r {
  constructor(t, e) {
    if (this.element = typeof t == "string" ? document.querySelector(t) : t, !this.element || !(this.element instanceof HTMLElement))
      throw new Error("PolyClick: selector must be a valid DOM element");
    const s = window.getComputedStyle(this.element);
    if (!["relative", "absolute", "fixed"].includes(s.position))
      throw new Error("PolyClick: element position must be relative, absolute, or fixed");
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this.svg.setAttribute("viewBox", e), this.svg.setAttribute("style", "position: absolute; top: 0; left: 0; width: 100%; height: 100%;"), this.svg.setAttribute("preserveAspectRatio", "xMidYMid slice"), this.element.appendChild(this.svg), this.shapes = [], this.colors = [
      "rgba(255,100,100,0.4)",
      "rgba(100,255,100,0.4)",
      "rgba(100,100,255,0.4)",
      "rgba(255,255,100,0.4)",
      "rgba(255,100,255,0.4)",
      "rgba(100,255,255,0.4)"
    ], this._isVisible = !1;
  }
  add(t) {
    const e = new o(t);
    return this.svg.appendChild(e.polygon), this.shapes.push(e), e;
  }
  get isVisible() {
    return this._isVisible;
  }
  show() {
    this.shapes.forEach((t, e) => {
      const s = this.colors[e % this.colors.length];
      t.polygon.setAttribute("fill", s);
    }), this._isVisible = !0;
  }
  hide() {
    this.shapes.forEach((t) => {
      t.polygon.setAttribute("fill", "transparent");
    }), this._isVisible = !1;
  }
}
export {
  r as PolyClick,
  o as Shape,
  r as default
};
