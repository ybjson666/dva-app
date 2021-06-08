import React from 'react';
import { connect } from 'dva';
import { Button,Form,Input} from 'antd'
import './login.less'
import Loading from "../../components/loading/index.js"

import logo from '../../assets/images/logo2.png'
import user from '../../assets/images/username.png'
import pwd from '../../assets/images/password.png'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }
    onFinish=(vals)=>{
        let isLoading=true
        this.props.dispatch({
            type:"app/setLoading",
            payload:{isLoading}
        })
        this.props.dispatch({
            type:"app/reqLogin",
            payload:vals
        })
    }
    render(){
        const layout = {
            wrapperCol: { span: 24 },
        };
        const { isLoading } =this.props
        return(
            <div className="login-container">
                <Loading isLoading={isLoading}/>
                <div className="login-block">
                    <div className="logo-content">
                        <div className="logo-wraper"><img src={logo} alt="" /></div>
                        <p className="loing-title">丁太后台管理平台</p>
                        <Form
                        {...layout}
                        className="login-form"
                        onFinish={this.onFinish}
                        >
                            <Form.Item
                                name="phone"
                                rules={[{ required: true, message: '请输入账号' }]}
                                >
                                <Input prefix= {<img src={user} alt="" className="user-icon"/>}/>
                               
                            </Form.Item>
                            <Form.Item
                                name="pwd"
                                rules={[{ required: true, message: '请输入密码' }]}
                                >
                                <Input type="password" prefix={<img src={pwd} alt="" className="user-icon"/>}/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" className="login-btn"  htmlType="submit">立即登录</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
      isLoading:state.app.isLoading
    }
}

export default connect(mapStateToProps)(Login);