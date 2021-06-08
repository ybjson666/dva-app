import React,{Component} from 'react';
import { connect } from 'dva';
import './home.less';
import '../../assets/css/common.less'
import Nav from '../../components/nav' 
import { Route,Switch,Redirect} from 'dva/router';
import routeList from '../../router/routes'
import Header from '../../components/header'
import Loading from '../../components/loading/index.js'

class Home extends Component{
  constructor(props){
    super(props)
    this.state={}
  }


  render(){
    let token=localStorage.getItem('token')
    if(!token){
      this.props.history.replace('/login')
    }
    let path='/'+this.props.menus[0].children[0].path 
    const { isLoading } =this.props
    return(
      <div className="home-container">
        <Loading isLoading={isLoading}/>
        <div className="nav-block">
          <Nav/>
        </div>
        <div className="content-block">
          <div className="header-block">
            <Header props={this.props}/>
          </div>
          <div className="page-block">
            <Switch>
              {
                routeList.map((item,index)=>(<Route  component={item.component} key={index} path={item.path}/>))
              }
              <Redirect to={path} from="/" />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    menus: state.app.menus,
    isLoading:state.app.isLoading
  }
}

export default connect(mapStateToProps)(Home);
