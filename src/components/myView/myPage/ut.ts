import Taro from '@tarojs/taro'
const symbols = [
  { id: 40, value: '&' },
  { id: 41, value: '@' },
  { id: 42, value: '~' },
  { id: 43, value: ' ' },
  { id: 44, value: '_' },
  { id: 45, value: ',' },
  { id: 46, value: '.' },
]

// 汉字列表
const capitalList = [
  {
    rId: 0,
    keys: [
      { id: 0, value: '1' },
      { id: 1, value: '2' },
      { id: 2, value: '3' },
      { id: 3, value: '4' },
      { id: 4, value: '5' },
      { id: 5, value: '6' },
      { id: 6, value: '7' },
      { id: 7, value: '8' },
      { id: 8, value: '9' },
      { id: 9, value: '0' },
    ],
  },
  {
    rId: 1,
    keys: [
      { id: 10, value: 'q' },
      { id: 11, value: 'w' },
      { id: 12, value: 'e' },
      { id: 13, value: 'r' },
      { id: 14, value: 't' },
      { id: 15, value: 'y' },
      { id: 16, value: 'u' },
      { id: 17, value: 'i' },
      { id: 18, value: 'o' },
      { id: 19, value: 'p' },
    ],
  },
  {
    rId: 2,
    keys: [
      { id: 20, value: 'a' },
      { id: 21, value: 's' },
      { id: 22, value: 'd' },
      { id: 23, value: 'f' },
      { id: 24, value: 'g' },
      { id: 25, value: 'h' },
      { id: 26, value: 'j' },
      { id: 27, value: 'k' },
      { id: 28, value: 'l' },
    ],
  },
  {
    rId: 3,
    keys: [
      { id: 31, value: '*' },
      { id: 32, value: 'z' },
      { id: 33, value: 'x' },
      { id: 34, value: 'c' },
      { id: 35, value: 'v' },
      { id: 36, value: 'b' },
      { id: 37, value: 'n' },
      { id: 38, value: 'm' },
      { id: 39, value: '?' },
    ],
  },
  {
    rId: 4,
    keys: symbols,
  },
]

// 数字、字母列表
const LetterList = [
  {
    rId: 0,
    keys: [
      { id: 0, value: '1' },
      { id: 1, value: '2' },
      { id: 2, value: '3' },
      { id: 3, value: '4' },
      { id: 4, value: '5' },
      { id: 5, value: '6' },
      { id: 6, value: '7' },
      { id: 7, value: '8' },
      { id: 8, value: '9' },
      { id: 9, value: '0' },
    ],
  },
  {
    rId: 1,
    keys: [
      { id: 10, value: 'Q' },
      { id: 11, value: 'W' },
      { id: 12, value: 'E' },
      { id: 13, value: 'R' },
      { id: 14, value: 'T' },
      { id: 15, value: 'Y' },
      { id: 16, value: 'U' },
      { id: 17, value: 'I' },
      { id: 18, value: 'O' },
      { id: 19, value: 'P' },
    ],
  },
  {
    rId: 2,
    keys: [
      { id: 20, value: 'A' },
      { id: 21, value: 'S' },
      { id: 22, value: 'D' },
      { id: 23, value: 'F' },
      { id: 24, value: 'G' },
      { id: 25, value: 'H' },
      { id: 26, value: 'J' },
      { id: 27, value: 'K' },
      { id: 28, value: 'L' },
    ],
  },
  {
    rId: 3,
    keys: [
      { id: 31, value: '*' },
      { id: 32, value: 'Z' },
      { id: 33, value: 'X' },
      { id: 34, value: 'C' },
      { id: 35, value: 'V' },
      { id: 36, value: 'B' },
      { id: 37, value: 'N' },
      { id: 38, value: 'M' },
      { id: 39, value: '?' },
    ],
  },
  {
    rId: 4,
    keys: symbols,
  },
]

// 符号列表
const symbolsList = [
  {
    rId: 0,
    keys: [
      { id: 0, value: '1' },
      { id: 1, value: '2' },
      { id: 2, value: '3' },
      { id: 3, value: '4' },
      { id: 4, value: '5' },
      { id: 5, value: '6' },
      { id: 6, value: '7' },
      { id: 7, value: '8' },
      { id: 8, value: '9' },
      { id: 9, value: '0' },
    ],
  },
  {
    rId: 1,
    keys: [
      { id: 10, value: ';' },
      { id: 11, value: '!' },
      { id: 12, value: '"' },
      { id: 13, value: '#' },
      { id: 14, value: '$' },
      { id: 15, value: '%' },
      { id: 16, value: '-' },
      { id: 17, value: '&' },
      { id: 18, value: ':' },
      { id: 19, value: '(' },
    ],
  },
  {
    rId: 2,
    keys: [
      { id: 20, value: ')' },
      { id: 21, value: '|' },
      { id: 22, value: '_' },
      { id: 23, value: '+' },
      { id: 24, value: '=' },
      { id: 25, value: '{' },
      { id: 26, value: '}' },
      { id: 27, value: '[' },
      { id: 28, value: ']' },
    ],
  },
  {
    rId: 3,
    keys: [
      { id: 31, value: '*' },
      { id: 32, value: '<' },
      { id: 33, value: '>' },
      { id: 34, value: ',' },
      { id: 35, value: '.' },
      { id: 36, value: '，' },
      { id: 37, value: '？' },
      { id: 38, value: '。' },
      { id: 39, value: '?' },
    ],
  },
  {
    rId: 4,
    keys: symbols,
  },
]

// WEB环境，图片点击事件监听，禁止浏览器点击图片放大
const imgEventListener = () => {
  if (Taro.getEnv() !== 'WEB') {
    return
  }
  const imgs = document.getElementsByTagName('img')
  for (let i = 0; i < imgs.length; i += 1) {
    imgs[i].addEventListener("click", function (e) {
      e.preventDefault()
    })
  }
}

export default {
  capitalList,
  LetterList,
  symbolsList,
  imgEventListener,
}


export function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt((Math.random() * minNum + 1) + '', 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
}


export function onGetPageRouter(page: number = -1) {
  const _pages = Taro.getCurrentPages()
  const _pageRouter = _pages[_pages.length + page]
  if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
    return _pageRouter.route
  }
  return _pageRouter.$component.$router.path
}



export function getComponentHeight(className: string = '') {
  //获取组件高度
  return new Promise((resolve, reject) => {
    if (!className) { reject; return }
    if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
      const query = Taro.createSelectorQuery().selectViewport().scrollOffset().in(this.$scope);
      query.select(className).boundingClientRect((rects) => {
        resolve(rects)
      }).exec();
    } else if (Taro.getEnv() === Taro.ENV_TYPE.ALIPAY) {
      Taro.createSelectorQuery()
        .select(className).boundingClientRect().exec((rects) => {
          resolve(rects[0])
        })
    } else {
      reject()
    }
  })
}