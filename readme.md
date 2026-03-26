# PolyClick

A lightweight JavaScript library for creating clickable polygon areas on image backgrounds using SVG.

## Install

```bash
npm install poly-click
```

## Usage

```javascript
import PolyClick from 'poly-click';

const poly = new PolyClick('#container', '0 0 1920 1080');

poly.add('100,100,200,100,200,200,100,200')
  .click(() => console.log('clicked!'))
  .on('mouseenter', () => console.log('hover!'));
```

### CDN

```html
<script src="https://unpkg.com/poly-click/dist/poly.umd.cjs"></script>
<script>
  const poly = new PolyClick('#container', '0 0 1920 1080');
</script>
```

## API

### new PolyClick(selector, viewBox)

Creates a new PolyClick instance.

**Parameters:**
- `selector` - CSS selector string or HTMLElement
- `viewBox` - SVG viewBox attribute (e.g., `"0 0 1920 1080"`)

**Requirements:**
- Target element must have `position: relative`, `absolute`, or `fixed`
- viewBox dimensions should match the image dimensions used for coordinate mapping

**Instance Properties:**
- `element` - The container HTMLElement
- `svg` - The SVG overlay element
- `shapes` - Array of Shape instances
- `isVisible` - Current visibility state of debug colors

### poly.add(points)

Adds a clickable polygon area.

**Parameters:**
- `points` - String of comma-separated coordinates (`"x1,y1,x2,y2,..."`)

**Returns:** `Shape` instance

### poly.show() / poly.hide()

Toggle visibility of all polygon areas with debug colors (enabled by default).

## Shape API

Returned by `poly.add()`.

### shape.click(callback)

Bind click event handler.

```javascript
poly.add('100,100,200,100').click(() => alert('clicked!'));
```

### shape.on(event, callback)

Bind any DOM event handler.

```javascript
poly.add('100,100,200,100')
  .on('mouseenter', () => console.log('enter'))
  .on('mouseleave', () => console.log('leave'));
```

### shape.polygon

Direct access to the underlying `SVGPolygonElement` for custom manipulation.

```javascript
shape.polygon.setAttribute('fill', 'red');
shape.polygon.style.opacity = '0.5';
```

## Output Structure

```html
<div id="container" style="position: relative;">
  <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice"
       style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
    <polygon points="100,100,200,100,200,200,100,200"
             fill="transparent"
             class="poly-click-area"
             style="pointer-events: all; cursor: pointer;" />
  </svg>
</div>
```

## Tool

Use [get_polygon_points.html](get_polygon_points.html) to visually draw polygons and export coordinates.

1. Load an image
2. Click to add points
3. Drag points to adjust position
4. Double-click a point to delete it
5. Click "View Result" to get viewBox and points

## Browser Support

Requires modern browser with ES6 class support and SVG namespace support (`createElementNS`).