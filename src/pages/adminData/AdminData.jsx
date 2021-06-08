import React, { Component } from 'react'
import { connect } from 'dva';
class AdminData extends Component {
    render() {
        return (
            <div className="account-container">
                <h2>我是管理员数据页面</h2>
            </div>
        )
    }
}
export default connect()(AdminData);

