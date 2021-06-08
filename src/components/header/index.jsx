import React, { Component } from 'react'
import { BellOutlined } from '@ant-design/icons'
import { Dropdown,Menu} from 'antd'
import './header.less'
import userLogo from '../../assets/images/head_man.png'

export default class header extends Component {

    logOut=()=>{
        localStorage.clear()
        this.props.props.history.replace('/login')
    }

    render() {
        let user=JSON.parse(localStorage.getItem('user'))
        const menu = (
            <Menu>
                <Menu.Item onClick={this.logOut} key="1">退出</Menu.Item>
            </Menu>
          );
        return (
            <div className="header-bar">
                <div className="header-data-block fr">
                    <div className="header-tool">
                        <span className="bell"><BellOutlined /></span>
                        <div className="userName">
                            <Dropdown overlay={menu} placement="bottomLeft" arrow>
                                <span className="user">{user.nickname}</span>
                            </Dropdown>
                        </div>
                        <span className="user-icon"><img src={userLogo} alt="" /></span>
                    </div>
                </div>
                <div className="cl"></div>
            </div>
        )
    }
}
