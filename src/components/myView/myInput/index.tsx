import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";
import { randomNum, getComponentHeight, onGetPageRouter } from './ut'
const pageHeight = Taro.getSystemInfoSync().windowHeight
type P = {
  placeholder: string;//提示语
  disabled: boolean;//是否可用
  textColor: string,//value自提颜色
  password: boolean;//是否是密码输入框
  value: string,
  type: 'text' | 'number' | 'digit'
  onInput: (val) => {};//组件输入
  onConfirm: () => {}//键盘确认按钮
  hasBorder: boolean//是否有边框
  textAligin: 'flex-start' | 'flex-end',
};
type S = {
  modalFouse: boolean,
}
export default class Index extends Component<P, S> {
  constructor(props) {
    super(props);

    this.state = {
      modalFouse: false,//条闪动
    };
    this.onMyBlur = this.onMyBlur.bind(this)
    this.onConfim = this.onConfim.bind(this)
    this.onLongClear = this.onLongClear.bind(this)
    this.onMyInput = this.onMyInput.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }
  static defaultProps = {
    placeholder: "", //提示语
    disabled: false, //是否只读
    type: 'text',
    textColor: '#000000',
    value: '',
    hasBorder: false,
    textAligin: 'flex-start',
    password: false,
    onInput: () => { }, //输入
    onConfirm: () => { },//键盘确认按钮
  };
  inputFous: boolean = false
  inputHeight: number = 0
  inputValue: string = ''
  timerFouse: any = null;
  classRandomId: string = 'input-item-myview' + randomNum(0, 10000)

  componentDidMount() {
    this.inputValue = this.props.value
    Taro.eventCenter.on('onPageClick', this.onMyBlur)//组件失去焦点
    Taro.eventCenter.on('keyBardConfim', this.onConfim)//键盘点击确认
    Taro.eventCenter.on('keyBardLongClear', this.onLongClear)//键盘长按删除
    Taro.eventCenter.on('keyBardMainKey', this.onMyInput)//主键点击事件
    Taro.eventCenter.on('keyBardDelete', this.onDelete)//键盘点击删除
    this.getDomMsg()
  }
  componentWillUnmount() {
    Taro.eventCenter.off('onPageClick', this.onMyBlur)
    Taro.eventCenter.off('keyBardConfim', this.onConfim)
    Taro.eventCenter.off('keyBardLongClear', this.onLongClear)//键盘长按删除
    Taro.eventCenter.off('keyBardMainKey', this.onMyInput)//主键点击事件
    Taro.eventCenter.off('keyBardDelete', this.onDelete)//键盘点击删除
  }
  flickerLine() {
    //字符串后边的闪动条条
    clearInterval(this.timerFouse)
    this.timerFouse = setInterval(() => {
      this.setState({
        modalFouse: !this.state.modalFouse
      });
    }, 600);
  }
  onConfim() {
    if (!this.inputFous) return
    this.props.onConfirm()
  }
  onMyBlur() {
    //组件失去焦点
    clearInterval(this.timerFouse)
    this.inputFous = false
    this.setState({
      modalFouse: false
    })
  }
  getDomMsg() {
    getComponentHeight.call(this, `.${this.classRandomId}`).then((res) => {
      this.inputHeight = pageHeight - res.bottom
    })
  }
  onMyFocus() {
    //组件聚焦
    if (this.props.disabled) return
    setTimeout(() => {
      Taro.eventCenter.trigger('triggerInputFocus', this.inputHeight, onGetPageRouter())
      this.inputFous = true
      this.flickerLine()
    }, 50);
  }
  onMyInput(value) {
    if (!this.inputFous) return
    this.inputValue = this.inputValue + value
    this.props.onInput(this.inputValue)
  }
  onLongClear() {
    if (!this.inputFous) return
    this.inputValue = '';
    this.props.onInput(this.inputValue)
  }
  onDelete() {
    if (!this.inputFous) return
    this.inputValue = this.inputValue.substring(0, this.inputValue.length - 1)
    this.props.onInput(this.inputValue)
  }
  getValue(_value) {
    //转换成显示的字符串
    const { password } = this.props
    if (password) {
      //如果是密码类型，转换为*****
      let str: string = ''
      for (let _v = 0; _v < _value.length; _v++) {
        str = str + '*'
      }
      return str
    }
    return _value
  }
  render() {
    const { placeholder, value, textAligin, textColor } = this.props;
    const { modalFouse } = this.state;
    return (
      <View className={`input-text-box ${this.classRandomId}`} style={{ justifyContent: textAligin }} onClick={this.onMyFocus.bind(this)}>
        {value ? <View className='input-text'>
          <Text className='keyValue' style={{ color: textColor }}>{this.getValue(value)}</Text>
          <View className={modalFouse ? "line bgred" : "line"} />
        </View> : (
            /* 左对齐 */
            textAligin === 'flex-start' ? <View className='input-text'>
              <View className={modalFouse ? "line bgred" : "line"} />
              <Text className="keyValue placeholder">{placeholder ? placeholder : '请输入'}</Text>
            </View> :
              /* 文字又对其 */
              <View className='input-text'>
                <Text className="keyValue placeholder">{placeholder ? placeholder : '请输入'}</Text>
                <View className={modalFouse ? "line bgred" : "line"} />
              </View>
          )}
      </View>
    );
  }
}
