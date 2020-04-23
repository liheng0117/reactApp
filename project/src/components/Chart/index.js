import React, { PureComponent } from "react"
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts"

export default class extends PureComponent {
  static defaultProps = {
    height: 400,
    lineShape: 'smooth',
    pointShape: 'circle',

  }
  render() {

    const { 
      xAxis = 'month',
      yAxis = [],
      geom = 'city',
      xAxisFormatter = v => v,
      lineShape,
      pointShape,
      data,
    } = this.props
    return (
      <Chart 
        height={400} 
        data={data} 
        scale={{
          month: {
            range: [0, 1]
          }
        }}
        padding={[20, 80, 80, 80]}
        forceFit
      >
          <Legend marker="bowtie" />
          { /** X轴属性配置 */}
          <Axis name={xAxis} label={{ formatter: xAxisFormatter }} />
          { /** Y轴属性配置 */}
          {/* <Axis name={yAxis} label={{ label: yAxisFormatter }} /> */}
          <Tooltip crosshairs={{ type: "y" }} showTitle={false}/>
          <Geom
            type="line"
            position={`${xAxis}*${Array.isArray(yAxis) && yAxis[0]}`}
            size={2}
            // color={geom}
            shape={lineShape}
          />
          <Geom 
            type="line"
            shape={lineShape}
            position={`${xAxis}*${Array.isArray(yAxis) && yAxis[1]}`} 
            color="#9AD681"
            size={2} 
          />
        </Chart>
    )
  }
}