import Barrage from 'barrage-ui';
import data from 'utils/mockData';
import './app.css';

// 父级容器
const container = document.getElementById('container');

// 创建弹幕实例
const barrage = new Barrage({
  container: container,
  overlapOptimized: true,
});

// 重置画布高度，避免弹幕遮挡视频播放控件
barrage.canvas.height = container.clientHeight - 80;
barrage.setData(data);

// 获取视频元素
const video = document.getElementById('video');

// 新建一个画布来实时绘制视频（纯绘图，不用添加进页面）
const vCanvas = document.createElement('canvas');
vCanvas.width = video.clientWidth;
vCanvas.height = video.clientHeight;
const vContext = vCanvas.getContext('2d');

// 实时绘制视频到画布
barrage.afterRender = () => {
  vContext.drawImage(video, 0, 0, vCanvas.width, vCanvas.height);
};

// 渲染前读取画布 vCanvas 的数据，并处理为蒙版图像
barrage.beforeRender = () => {
  // 读取图像
  const frame = vContext.getImageData(0, 0, vCanvas.width, vCanvas.height);

  // 图像总像素个数
  const pxCount = frame.data.length / 4;

  // 将 frame 构造成我们需要的蒙版图像
  for (let i = 0; i < pxCount; i++) {
    // 这里不用 ES6 解构赋值的写法，主要为了保证计算性能
    const r = frame.data[i * 4 + 0];
    const g = frame.data[i * 4 + 1];
    const b = frame.data[i * 4 + 2];

    // 将黑色区域以外的内容设为透明
    if (r > 15 || g > 15 || b > 15) {
      frame.data[4 * i + 3] = 0;
    }
  }

  // 设置蒙版
  barrage.setMask(frame);
};

// 绑定播放事件
video.addEventListener(
  'play',
  () => {
    barrage.play();
  },
  false
);

// 绑定暂停事件
video.addEventListener(
  'pause',
  () => {
    barrage.pause();
  },
  false
);

// 播放进度事件
video.addEventListener(
  'seeked',
  () => {
    barrage.goto(video.currentTime * 1000);
  },
  false
);
