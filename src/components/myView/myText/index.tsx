import Taro, { Component } from "@tarojs/taro";
import { Text } from "@tarojs/components";
import "./index.scss";
/* 此组件可以转换字符串中需要改变颜色的字符，需要转换的字符用<p><p>包裹 */

type P = {
  text: string
  specialTextColor: string
};
type S = {

}
export default class Index extends Component<P, S> {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  static defaultProps = {
    text: '',
    specialTextColor: 'red'
  }
  onFindText(text: string = '') {
    //找出需要转换颜色的字符
    let _PLength = text.split("<p>").length / 2
    let reg = /<p>([^<p>]*?)<p>/g, retArr: any[] = [];
    for (let i = 0; i < _PLength; i++) {
      let t_arr = reg.exec(text) || []
      if (t_arr.length >= 1) {
        retArr.push(t_arr[1])
      }
    }
    return retArr;
  }
  render() {
    const { text, specialTextColor } = this.props
    const nameArray = text.split('<p>');
    const retArr = this.onFindText(text)
    return (
      <Text>
        {nameArray.map((Pval, Pidx) => {
          let isText = false
          retArr.map((Cval) => {
            if (Cval === Pval) isText = true
          })
          return isText ? <Text key={'text' + Pidx} style={{ color: specialTextColor }}>{Pval}</Text> :
            <Text key={'text' + Pidx}>{Pval}</Text>
        })}
      </Text>
    );
  }
}


