import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import './Keyboard.scss'
import Utils, { getComponentHeight } from '../ut'

import keyBg from './assets/keyboard/key_bg.png'
import fKeyBg from './assets/keyboard/fkey_bg.png'
import deleteKey from './assets/keyboard/delete.png'

type P = {
  onGetHeight: () => void//获取组件高度
  fous: boolean//开启组件
};
type S = {
  keyBoardType: 'capitalList' | 'LetterList' | 'symbolsList'//键盘类型 大小写
}
class PlateKeyboard extends Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      keyBoardType: 'capitalList'
    }
    this.onKeyChange = this.onKeyChange.bind(this)
  }
  static defaultProps = {
    onGetHeight: () => { },
  };


  componentDidMount() {
    //实体键盘监听
    Taro.eventCenter.on('onKeyBarChange', this.onKeyChange)
    if (Taro.getEnv() === 'WEB') {
      Utils.imgEventListener() // 图片点击监听，禁止图片点击放大
    }
    getComponentHeight.call(this, '.pkd-wrapper').then(this.props.onGetHeight.bind(this))
  }
  componentWillUnmount() {
    Taro.eventCenter.off('onKeyBarChange', this.onKeyChange)
  }

  onShiftCapital = (ev) => { // 键盘切换
    ev.stopPropagation();
    const { keyBoardType } = this.state
    this.setState({
      keyBoardType: keyBoardType === 'capitalList' ? 'LetterList' : 'capitalList'
    })
  }
  onShiftSymbols = (ev) => { // 键盘切换
    ev.stopPropagation();
    this.setState({
      keyBoardType: 'symbolsList'
    })
  }

  onDelete = (ev) => { // 删除键点击事件
    ev.stopPropagation();
    Taro.eventCenter.trigger('keyBardDelete')
  }

  onKeyChange(keys: {
    action: number
    amount: string
    keyCode: number
  }) {
    const { fous = false } = this.props
    if (fous) {
      console.log(keys, 'onKeyChange')
      switch (keys.keyCode) {
        case 131:
          // 收款
          this.onMainKey({ value: keys.amount })
          setTimeout(() => {
            this.onConfim()
          }, 50);
          break;
        case 133:
          //取消
          this.onLongClear()
          break;
        default:
          this.onMainKey({ value: keys.amount })
          break;
      }
    }
  }
  onConfim(ev: any = null) {
    ev && ev.stopPropagation();
    //组件点击确认
    Taro.eventCenter.trigger('keyBardConfim')
  }
  onLongClear(ev: any = null) {
    ev && ev.stopPropagation();
    //组件点击取消
    Taro.eventCenter.trigger('keyBardLongClear')
  }
  onMainKey = (key, ev: any = null) => {
    ev && ev.stopPropagation();
    // 主键点击事件
    const { value = '' } = key
    Taro.eventCenter.trigger('keyBardMainKey', value)
  }

  render() {
    const { fous } = this.props
    const { keyBoardType } = this.state
    const capitalAndSmallLetter = keyBoardType === 'capitalList' ? 'ABC' : 'abc'
    return (<View>
      <View className={fous ? 'pkd-wrapper pkd-wrapper-show' : 'pkd-wrapper'}>
        <View className='pkd-key-panel'>
          {Utils[keyBoardType].map(row => (
            <View className={`pkd-row ${row.rId === 0 ? 'pkd-margin-top-13x' : ''}`} key={row.rId}>
              {/* 大小写切换键 */}
              {row.rId === 4 ? (<View className='pkd-fkey' onClick={this.onShiftCapital}>
                <Image className='pkd-fkey-bg' src={fKeyBg} />
                <Text className='pkd-key-value'>{capitalAndSmallLetter}</Text>
              </View>) : null}
              {/* 大小写切换键 */}

              {row.rId === 3 ? (<View className='pkd-key' onClick={this.onShiftSymbols}>
                <Image className='pkd-key-bg' src={fKeyBg} />
                <Text className='pkd-key-value'>符</Text>
              </View>) : null}

              {/* 主键盘区 */}
              {row.keys.map(key => (<View className='pkd-key' key={key.id} onClick={this.onMainKey.bind(this, key)}>
                <Image className='pkd-key-bg' src={keyBg} />
                <Text className='pkd-key-value'>{key.value}</Text>
              </View>))}

              {/* 删除键 */}
              {row.rId === 4 ? (Taro.getEnv() === Taro.ENV_TYPE.WEAPP ? <View className='pkd-fkey' onClick={this.onDelete} onLongPress={this.onLongClear.bind(this)}>
                <Image className='pkd-fkey-bg' src={fKeyBg} />
                <Image className='pkd-delete-key' src={deleteKey} />
              </View> : <View className='pkd-fkey' onClick={this.onDelete} onLongTap={this.onLongClear.bind(this)}>
                  <Image className='pkd-fkey-bg' src={fKeyBg} />
                  <Image className='pkd-delete-key' src={deleteKey} />
                </View>) : null}
            </View>))}
        </View>
      </View>
    </View>)
  }
}

export default PlateKeyboard
