import Konva from 'konva'
import { MindOptions } from './type/mind'
import { Layer } from 'konva/lib/Layer'

// awesome-mind
export class AwesomeMind {
  /** 容器 */
  stage!: Konva.Stage
  /** 坐标轴层 */
  axisLayer!: Konva.Layer
  /** 思维导图层 */
  mindMapLayer!: Konva.Layer
  // /** 无限画布层 */
  // infiniteCanvasLayer!: Konva.Layer
  nodes: Konva.Group[] = []

  scrollX = 0 // 初始滚动距离X
  scrollY = 0 // 初始滚动距离Y

  constructor(options: MindOptions) {
    // 创建 Stage 画布容器
    this.stage = new Konva.Stage({
      container: options.container,
      width: options.width,
      height: options.height
    })

    this.mindMapLayer = new Konva.Layer()
    this.stage.add(this.mindMapLayer)

    this.renderScene()

    // 监听滚轮事件，用来模拟滚动
    this.stage.addEventListener('wheel', e => {
      const event = e as WheelEvent
      this.scrollX = -event.deltaX
      this.scrollY = -event.deltaY
      this.renderScene()
    })
  }

  renderScene() {
    // this.stage.clear()
    this.drawAxis(this.mindMapLayer, { scrollX: this.scrollX, scrollY: this.scrollY })
    this.addNode(100, 100, 'blue', '根节点')
  }

  /** 绘制坐标轴 */
  drawAxis(layer: Layer, { scrollX, scrollY } = { scrollX: 0, scrollY: 0 }) {
    const rectH = 100 // 纵轴刻度间距
    const rectW = 100 // 横轴刻度间距
    const tickLength = 8 // 刻度线长度
    const stageWidth = layer.getStage().width()
    const stageHeight = layer.getStage().height()

    // 清空当前的layer
    layer.destroyChildren()

    // 绘制横轴和纵轴虚线
    const axisLines = new Konva.Line({
      points: [
        -scrollX,
        0,
        stageWidth - scrollX,
        0, // 横轴
        0,
        -scrollY,
        0,
        stageHeight - scrollY // 纵轴
      ],
      stroke: 'red',
      strokeWidth: 2,
      dash: [10, 10]
    })
    layer.add(axisLines)

    // 绘制纵轴的刻度
    for (let i = 0; i < scrollY / rectH; i++) {
      const yPos = -i * rectH

      const tickLine = new Konva.Line({
        points: [0, yPos, tickLength, yPos],
        stroke: 'red',
        strokeWidth: 2
      })

      const tickText = new Konva.Text({
        x: -25,
        y: yPos - 10,
        text: (-i).toString(),
        fontSize: 20,
        fontFamily: 'Arial',
        fill: 'red'
      })

      layer.add(tickLine)
      layer.add(tickText)
    }

    for (let i = 0; i < (stageHeight - scrollY) / rectH; i++) {
      const yPos = i * rectH

      const tickLine = new Konva.Line({
        points: [0, yPos, tickLength, yPos],
        stroke: 'red',
        strokeWidth: 2
      })

      const tickText = new Konva.Text({
        x: -25,
        y: yPos - 10,
        text: i.toString(),
        fontSize: 20,
        fontFamily: 'Arial',
        fill: 'red'
      })

      layer.add(tickLine)
      layer.add(tickText)
    }

    // 绘制横轴的刻度
    for (let i = 1; i < scrollX / rectW; i++) {
      const xPos = -i * rectW

      const tickLine = new Konva.Line({
        points: [xPos, 0, xPos, tickLength],
        stroke: 'red',
        strokeWidth: 2
      })

      const tickText = new Konva.Text({
        x: xPos - 10,
        y: -30,
        text: (-i).toString(),
        fontSize: 20,
        fontFamily: 'Arial',
        fill: 'red'
      })

      layer.add(tickLine)
      layer.add(tickText)
    }

    for (let i = 1; i < (stageWidth - scrollX) / rectW; i++) {
      const xPos = i * rectW

      const tickLine = new Konva.Line({
        points: [xPos, 0, xPos, tickLength],
        stroke: 'red',
        strokeWidth: 2
      })

      const tickText = new Konva.Text({
        x: xPos - 10,
        y: -30,
        text: i.toString(),
        fontSize: 20,
        fontFamily: 'Arial',
        fill: 'red'
      })

      layer.add(tickLine)
      layer.add(tickText)
    }

    // 重新渲染图层
    layer.draw()
  }

  // 添加节点的方法
  addNode(x: number, y: number, color: string, text: string) {
    const nodeGroup = new Konva.Group({
      x,
      y,
      draggable: true // 允许节点拖拽
    })

    const rect = new Konva.Rect({
      width: 200,
      height: 100,
      fill: color,
      stroke: 'black',
      strokeWidth: 4
    })

    const labelText = new Konva.Text({
      text,
      fontSize: 18,
      fontFamily: 'Calibri',
      fill: '#fff',
      width: 200,
      height: 100,
      align: 'center',
      verticalAlign: 'middle'
    })

    // 将矩形和文本添加到节点组
    nodeGroup.add(rect)
    nodeGroup.add(labelText)

    // 将节点组添加到图层
    this.mindMapLayer.add(nodeGroup)
    this.nodes.push(nodeGroup) // 存储节点

    this.mindMapLayer.draw() // 重新绘制图层
  }

  // 其他方法，如移除节点、更新连线等
}
