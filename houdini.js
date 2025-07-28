registerPaint('smooth-corners', class {
  static get inputProperties() {
    return ['--smooth-corner-radius', '--smooth-corner-smoothness'];
  }

  paint(ctx, geom, properties) {
    const radius = parseFloat(properties.get('--smooth-corner-radius')) || 20;
    const smoothness = parseFloat(properties.get('--smooth-corner-smoothness')) || 1;

    const width = geom.width;
    const height = geom.height;

    function smoothCornerPath(x, y, w, h, r, s) {
      const k = (1 - s) * r;
      return `
        M${x + r},${y}
        H${x + w - r}
        C${x + w - k},${y} ${x + w},${y + k} ${x + w},${y + r}
        V${y + h - r}
        C${x + w},${y + h - k} ${x + w - k},${y + h} ${x + w - r},${y + h}
        H${x + r}
        C${x + k},${y + h} ${x},${y + h - k} ${x},${y + h - r}
        V${y + r}
        C${x},${y + k} ${x + k},${y} ${x + r},${y}
        Z
      `;
    }

    const path = new Path2D(smoothCornerPath(0, 0, width, height, radius, smoothness));
    ctx.fillStyle = 'black';
    ctx.fill(path);
  }
});
