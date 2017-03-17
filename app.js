import SVG from "svg.js"
import * as Point from "./point";

const WIDTH = 390;
const HEIGHT = 390;

const wrap = (arr) => [...arr, arr[0]].map(Point.xyToArray)

const draw = SVG('drawing').size(WIDTH+500, HEIGHT+500).spof()

const mainPoints = [
  [0, 0],
  [WIDTH/2, 180],
  [WIDTH/2, 400],
  [-WIDTH/2, 400],
  [-WIDTH/2, 150],
  [0, 0]
].map(p => [p[0] + WIDTH/2 + 50, p[1] + 50])

const convertedMainPoints = [mainPoints.map(Point.arrayToXY)]
const innerPoints = Point.offset(convertedMainPoints, -14.3)
draw.polyline(wrap(innerPoints)).fill('none').stroke({ width: 0.4 })

const outerPoints = Point.offset(convertedMainPoints, 14.3)
draw.polyline(wrap(outerPoints)).fill('none').stroke({ width: 0.4 })

const outerHolePoints = wrap(Point.offset(convertedMainPoints, 10.7))
const innerHolePoints = wrap(Point.offset(convertedMainPoints, -10.7))

drawHoles(mainPoints)

function drawHoles(points) {
  const rectDimensions = [6,1.8]
  for (var i = 0; i < points.length-1; i++) {
    const p1 = points[i]
    const p2 = points[i+1]
    for (var j = 0.1; j < 0.9; j+=0.1) {
      const rotation = Point.angle(p1, p2, true)
      var things = [10,0,-10]
      things.forEach(d => {
        // const group = draw.group().move(...shift(Point.midPoint(p1,p2,j), d, 90+rotation))
        const group = draw.group().move(...Point.midPoint(p1,p2,j)).rotate(Point.angle(p1, p2, true))
        group
          .rect(...rectDimensions)
          .move(-rectDimensions[0]/2,-rectDimensions[1]/2-d)
          .fill('none').stroke({ width: 0.4 })
          // .rotate(90)
      })
    }
  }
}

console.log(draw.svg())
