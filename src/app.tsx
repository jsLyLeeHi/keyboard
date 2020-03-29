import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Index from './pages/login'
import store from './store'
import './app.scss'
class App extends Component {
  config: Config = {
    pages: [
      'pages/login/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
    }
  }
  componentDidMount() {
    
  }
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}
Taro.render(<App />, document.getElementById('app'))
