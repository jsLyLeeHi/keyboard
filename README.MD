##使用方法


```javascript
import { ComponentType } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import MyInput from '../../components/myView/myInput'
import MyPage from '../../components/myView/myPage/index'
import MyText from '../../components/myView/myText'


type PageState = { account: string; password: string }
type PageProps = {}
interface Index { props: PageProps; state: PageState }
class Index extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      account: '',
      password: '',
    }
  }
  onSetAccount(account) {
    this.setState({ account })
  }
  onSetPwd(password) {
    this.setState({ password })
  }
  render() {
    const { account, password } = this.state;
    return (
      <MyPage backgroundColor='#ffffff'>
        <View className='form-item'>
          <MyInput placeholder='商家账号' value={account}
            onInput={this.onSetAccount.bind(this)} />
        </View>
        <View className='form-item'>
          <MyInput password placeholder='登录密码' value={password}
            onInput={this.onSetPwd.bind(this)} />
        </View>
        <MyText text={`<p>Taro<p>自定义键盘组件，目前适配了<p>支付宝小程序<p>和<p>微信小程序<p>`} specialTextColor='red'></MyText>
      </MyPage>
    )
  }
}
export default Index as ComponentType

```

##在使用中有任何问题，欢迎留言反馈给我