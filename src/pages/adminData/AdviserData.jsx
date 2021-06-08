import React, { Component } from 'react'
import { connect } from 'dva';
class AdviserData extends Component {
    render() {
        return (
            <div className="account-container">
                <h2>我是顾问数据页面</h2>
            </div>
        )
    }
}
export default connect()(AdviserData);

