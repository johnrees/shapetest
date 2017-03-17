import Shape from 'clipper-js'

export const angle = (p1,p2,radians=false) => {
  const [x1,y1] = p1
  const [x2,y2] = p2
  if (radians) {
    return Math.atan2(y2 - y1, x2 - x1) * 180.0 / Math.PI;
  } else {
    return Math.atan2(y2 - y1, x2 - x1);
  }
}

export const midPoint = (p1,p2,percentage=0.5) => {
  const [x1,y1] = p1
  const [x2,y2] = p2
  return [x1 + (x2 - x1) * percentage, y1 + (y2 - y1) * percentage];
}

export const length = (p1,p2) => {
  const [x1,y1] = p1
  const [x2,y2] = p2
  var a = x1 - x2
  var b = y1 - y2
  return Math.hypot( a, b )
}

export const offset = (points, delta) => {
  return new Shape(points, true).offset(delta, {
    jointType: 'jtMiter',
    endType: 'etClosedPolygon',
    miterLimit: Infinity,
    roundPrecision: 0
  }).paths[0]
}

export const arrayToXY = (p) => ({X: p[0], Y: p[1]})

export const xyToArray = (p) => ([p.X, p.Y])

export const shift = (point, distance, angle) => ([
  point[0] + distance * Math.sin(angle),
  point[1] + distance * Math.cos(angle)
])
