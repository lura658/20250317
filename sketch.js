let lines = [];

function setup() { 
  createCanvas(windowWidth, windowHeight);
  background(0, 0, 0, 0); // 背景透明

  // 創建 div 並設置為背景
  let div = createElement('div');
  div.attribute('class', 'background-div');
  div.html('<iframe src="https://www.et.tku.edu.tw/" style="width:100%; height:100%; border:none;"></iframe>');
  div.parent(document.body);

  // 設置 div 的樣式
  let style = createElement('style', `
    .background-div {
      position: absolute;
      top: 10%;
      left: 10%;
      width: 80%;
      height: 80%;
      border: none;
      z-index: -1; /* 確保 div 在 canvas 之下 */
    }
    canvas {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1; /* 確保 canvas 在 div 之上 */
    }
  `);
  style.parent(document.head);

  // 初始化線條數據
  let numLines = 30; // 線條數量
  let minSegments = 10; // 最小分段數量
  let maxSegments = 20; // 最大分段數量
  let colors = ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF", "#FFC3A0", "#FFABAB", "#FFDAAB", "#D4A5A5", "#D4E157"]; // 更多馬卡龍色系

  for (let j = 0; j < numLines; j++) {
    let numSegments = int(random(minSegments, maxSegments)); // 隨機分段數量
    let segmentLength = windowHeight / random(30, 40); // 每段的長度隨機
    let x = (j + 1) * (windowWidth / (numLines + 1)); // 均勻分佈在X軸上
    let colorIndex = j % colors.length; // 循環選擇顏色
    let color = colors[colorIndex];

    lines.push({ x, numSegments, segmentLength, color });
  }
}

function draw() {
  clear(); // 清除背景，保持透明
  
  let baseAmplitude = 10; // 基本搖晃的幅度

  for (let waveLine of lines) {
    let { x, numSegments, segmentLength, color } = waveLine;
    let y = windowHeight;

    stroke(color);
    strokeWeight(40); // 線條寬度設置為40

    for (let i = 0; i <= numSegments; i++) {
      let amplitude = baseAmplitude * (i / numSegments); // 越接近Y軸的地方晃動幅度越小
      let offsetX = sin(frameCount * 0.02 + i * 0.5) * amplitude; // 減緩搖擺速度
      let nextX = x + offsetX;
      let nextY = y - segmentLength;

      line(x, y, nextX, nextY);

      x = nextX;
      y = nextY;
    }
  }
}
