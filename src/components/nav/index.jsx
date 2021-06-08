import React,{Component} from 'react';
import { connect } from 'dva';
import { Menu} from 'antd';
import { Link } from 'react-router-dom'
import { MailOutlined} from '@ant-design/icons';
import './nav.less'

const { SubMenu } = Menu;


class Nav extends Component{
  constructor(props){
    super(props)
    let selectArr=[]
    selectArr[0]=props.menus[0].menuId+''
    selectArr[1]=props.menus[0].children[0].menuId+""
    this.state={
      collapsed:false,
      selectedKeys:JSON.parse(localStorage.getItem('selArr'))||selectArr,
      menuIcons:{

      }
    }
  }

  setSelectedKey=(farId,menuId)=>{
    let arr=[]
    arr[0]=farId+''
    arr[1]=menuId+''
    localStorage.setItem('selArr',JSON.stringify(arr))
  }

  render(){
    const menus=this.props.menus
    return(
      <div className="nav-container">
         <Menu
          defaultSelectedKeys={this.state.selectedKeys}
          defaultOpenKeys={['sub1']}
          mode="inline"
          inlineCollapsed={this.state.collapsed}
        >
          {
            menus.map(item=>(
              <SubMenu key={item.menuId} icon={<MailOutlined />} title={item.menuName}>
                {
                  item.children.map(menu=>(
                    <Menu.Item key={menu.menuId} onClick={()=>{this.setSelectedKey(item.menuId,menu.menuId)}}>
                      <Link to={'/'+menu.path}>{menu.menuName}</Link>
                    </Menu.Item>
                  ))
                }
              </SubMenu>
            ))
          }
        </Menu>
      </div>

    )
  }
}

function mapStateToProps(state) {
    return {
      menus: state.app.menus,
    }
}
export default connect(mapStateToProps)(Nav);
