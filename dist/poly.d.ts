export declare class Shape {
    polygon: SVGPolygonElement;
    constructor(points: string);
    click(callback: () => void): this;
    on(event: string, callback: (e: Event) => void): this;
}
export declare class PolyClick {
    element: HTMLElement;
    svg: SVGSVGElement;
    shapes: Shape[];
    private colors;
    private _isVisible;
    constructor(selector: string | HTMLElement, viewBox: string);
    add(points: string): Shape;
    get isVisible(): boolean;
    show(): void;
    hide(): void;
}
export default PolyClick;
//# sourceMappingURL=poly.d.ts.map