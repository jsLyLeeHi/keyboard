import Taro, { Component } from "@tarojs/taro";
import { ScrollView, View } from "@tarojs/components";
import { onGetPageRouter } from '../ut'
import KeyBoard from '../keyBoard'
import "./index.scss";


type P = {
  onTouchStart: () => void
  backgroundColor: string,
};
type S = {
  pageStyle: any,
  keyBardHeight: number,
  inputFocus: boolean,
  pageRouter: string
}
export default class Index extends Component<P, S> {
  constructor(props) {
    super(props);
    this.state = {
      pageStyle: {},
      keyBardHeight: 0,
      inputFocus: false,
      pageRouter: ''
    };
    this.onInputFous = this.onInputFous.bind(this)
  }
  static defaultProps = {
    onTouchStart: () => { },
    backgroundColor: '',
  }
  componentDidMount() {
    const _pagePath = onGetPageRouter()
    this.setState({
      pageRouter: _pagePath
    })
    Taro.eventCenter.on('triggerInputFocus', this.onInputFous)
  }
  componentWillUnmount() {
    Taro.eventCenter.off('triggerInputFocus', this.onInputFous)
  }
  componentDidShow() {
    this.onBour()
  }
  componentDidHide() {
    this.onBour()
  }
  onPageClick() {
    Taro.eventCenter.trigger('onPageClick')
    this.onBour()
  }
  onInputFous(_bottom: number, _pagePathBuyInput: string = '') {
    const { pageStyle, keyBardHeight, pageRouter } = this.state
    if (pageRouter != _pagePathBuyInput) return
    if (keyBardHeight < _bottom) {
      _bottom = 0
    } else {
      _bottom = keyBardHeight - _bottom + 20
    }
    let newStyle = pageStyle
    newStyle = Object.assign(pageStyle, { bottom: `${_bottom}px` })
    this.setState({
      pageStyle: newStyle,
      inputFocus: true
    })
  }
  onBour() {
    const { pageStyle } = this.state
    let newStyle = pageStyle
    newStyle = Object.assign(pageStyle, { bottom: '0px' })
    this.setState({
      pageStyle: newStyle,
      inputFocus: false
    })
  }
  onGetKeyBardHeight(domEvn: any) {
    if (domEvn) {
      this.setState({
        keyBardHeight: domEvn.height
      })
    }
  }
  render() {
    const { backgroundColor } = this.props
    const { pageStyle, inputFocus } = this.state
    return <View className='pageStyle' onClick={this.onPageClick.bind(this)}>
      <ScrollView className={`pageBox`} scrollY
        style={Object.assign({ backgroundColor: backgroundColor }, pageStyle)}
        onTouchStart={this.props.onTouchStart.bind(this)}>
        {this.props.children}
      </ScrollView>
      <KeyBoard fous={inputFocus} onGetHeight={this.onGetKeyBardHeight.bind(this)} />
    </View>
  }
}


