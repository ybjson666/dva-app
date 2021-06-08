import React, { Component } from 'react'
import { connect } from 'dva';
import './account.less'
import logo from '../../assets/images/logo3.png'
import { Modal,Form, Input,Button,Col,message } from 'antd';
import { changePwd } from '../../api'


class Account extends Component {

    state={
        showDialog:false,
        isUse:false
    }
    userForm = React.createRef();
    onFinish=(values)=>{
        const { newPwd,newPwdTwo}=values
        if(newPwd!==newPwdTwo){
            message.error('两次的密码不一致')
            return
        }
        this.setState({
            isUse:true
        })
        values.token=localStorage.getItem('token')
        changePwd(values).then(res=>{
            this.setState({isUse:false})
            if(res.code===200){
                message.success('修改成功')
                //方式一
                // this.userForm.current.setFieldsValue({
                //     pwd:"",
                //     newPwd:"",
                //     newPwdTwo:""
                // })

                this.userForm.current.resetFields()
                this.setState({showDialog:false})
            }else{
                message.error(res.msg)
            }
        })

    }

    render() {
        const { user }=this.props
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 16 },
        };
        return (
            <div className="account-container">
                <div className="user-content">
                    <div className="logo-block"><img src={logo} alt="" /></div>
                    <div className="user-info-block">
                        <div className="user-row">
                            <span className="user-label">账号：</span>
                            <span className="user-val">{user.phone}</span>
                        </div>
                        <div className="user-row">
                            <span className="user-label">密码：</span>
                            <span className="user-val">{user.pwd}</span>
                            <span className="modify" onClick={()=>{this.setState({showDialog:true})}}>修改</span>
                        </div>
                        <div className="user-row">
                            <span className="user-label">姓名：</span>
                            <span className="user-val">{user.name}</span>
                        </div>
                        <div className="user-row">
                            <span className="user-label">昵称：</span>
                            <span className="user-val">{user.nickname}</span>
                        </div>
                        <div className="user-row">
                            <span className="user-label">姓别：</span>
                            <span className="user-val">{user.sex===1?'男':'女'}</span>
                        </div>
                        <div className="user-row">
                            <span className="user-label">创建时间：</span>
                            <span className="user-val">{user.createTime}</span>
                        </div>
                        <div className="user-row">
                            <span className="user-label">权限说明：</span>
                            <span className="user-val">{user.remark}</span>
                        </div>
                    </div>
                </div>

                <Modal
                    title="修改密码"
                    visible={this.state.showDialog}
                    footer={null}
                    maskClosable={false}
                    closable={false}
                >
                     <Form
                        {...layout}
                        name="user"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        className="user-form"
                        ref={this.userForm}
                        >
                        <Form.Item
                            label="原密码"
                            name="pwd"
                            rules={[{ required: true, message: '请输入原密码' }]}
                        >
                            <Input type="password"/>
                        </Form.Item>
                        <Form.Item
                            label="新密码"
                            name="newPwd"
                            rules={[{ required: true, message: '请输入新密码' }]}
                        >
                            <Input type="password"/>
                        </Form.Item>
                        <Form.Item
                            label="新密码"
                            name="newPwdTwo"
                            rules={[{ required: true, message: '请再次输入密码' }]}
                        >
                            <Input type="password"/>
                        </Form.Item>
                        <Form.Item
                            label=""
                        >
                            <Col className="btn-wraps" span={16} offset={6}>
                                <Button className="cancel-btn" type="default" onClick={()=>{this.setState({showDialog:false})}}>取消</Button>
                                <Button className="sure-btn" type="primary"  htmlType="submit" disabled={this.state.isUse}>确定</Button>
                            </Col>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        user:state.app.user
    }
}
export default connect(mapStateToProps)(Account);

