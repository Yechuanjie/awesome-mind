import Konva from 'konva'
import { MindOptions } from './type/mind'

// awesome-mind
export class AwesomeMind {
  stage!: Konva.Stage
  mindLayer!: Konva.Layer
  nodes: Konva.Group[] = []

  constructor(options: MindOptions) {
    // 创建 Stage 画布容器
    this.stage = new Konva.Stage({
      container: options.container,
      width: options.width || window.innerWidth,
      height: options.height || window.innerHeight,
      draggable: true
    })

    // 设计2个Konva.Layer，分别用于绘制背景和思维导图
    // 创建思维导图图层
    this.mindLayer = new Konva.Layer()
    this.stage.add(this.mindLayer)

    this.initMindLayer()

    // 监听窗口大小变化
    window.addEventListener('resize', () => {
      const width = window.innerWidth
      const height = window.innerHeight
      this.stage.width(width)
      this.stage.height(height)
    })
  }

  initMindLayer() {
    // 设置背景颜色
    this.setBackgroundColor('#f3f3f5')
    // 绘制背景点
    this.drawDots('#d2d2d2')
    // 示例：创建初始矩形节点
    this.addNode(100, 100, 'blue', '根节点')
  }

  // 设置背景颜色的方法
  setBackgroundColor(color: string) {
    const backgroundRect = new Konva.Rect({
      x: 0,
      y: 0,
      width: this.stage.width(),
      height: this.stage.height(),
      fill: color
    })

    this.mindLayer.add(backgroundRect)
  }

  // 创建背景点
  drawDots(color: string) {
    const dotSize = 1 // 点的大小
    const spacing = 40 // 点之间的间隔
    const width = this.stage.width()
    const height = this.stage.height()

    // 计算可见区域内的点数量
    const numCols = Math.ceil(width / spacing)
    const numRows = Math.ceil(height / spacing)

    // 绘制点
    for (let i = 0; i <= numCols; i++) {
      for (let j = 0; j <= numRows; j++) {
        this.mindLayer.add(
          new Konva.Circle({
            x: i * spacing,
            y: j * spacing,
            radius: dotSize,
            fill: color
          })
        )
      }
    }
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
    this.mindLayer.add(nodeGroup)
    this.nodes.push(nodeGroup) // 存储节点

    this.mindLayer.draw() // 重新绘制图层
  }

  // 其他方法，如移除节点、更新连线等
}
