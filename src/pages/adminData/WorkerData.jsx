import React, { Component } from 'react'
import { connect } from 'dva';
class WorkerData extends Component {
    render() {
        return (
            <div className="account-container">
                <h2>我是顾问数据页面</h2>
            </div>
        )
    }
}
export default connect()(WorkerData);

