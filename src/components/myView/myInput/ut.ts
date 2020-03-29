import Taro from '@tarojs/taro'

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