import { Spin } from 'antd'
import './load.less'

export default function Loading(props) {
    const { isLoading }=props
    return (
        <div className="loading-container" style={{display:isLoading?'block':'none'}}>
            <div className="loading-wraps">
            <Spin spinning={true} tip="加载中..."/>
            </div>
        </div>
    )   
}
