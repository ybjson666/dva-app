import { toLogin } from "../api/index"
import { message } from 'antd';
import { routerRedux } from 'dva/router'


export default {

  namespace: 'app',

  state: {
    user:JSON.parse(localStorage.getItem('user'))||{},
    menus:JSON.parse(localStorage.getItem('menus'))||[],
    isLoading:false
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *reqLogin({payload},{call,put}){
      const  result  = yield call (toLogin, payload)
      if(result.code===200){
        const { createTime,channel,dataScope,id,name,nickname,
          phone,pwd,remark,sex,sysRoleMenus,token,type,userType }=result.data
        let user={
          createTime,channel,dataScope,id,name,nickname,
          phone,pwd,remark,sex,token,type,userType
        }
        localStorage.setItem('token',token)
        localStorage.setItem('user',JSON.stringify(user))
        localStorage.setItem('menus',JSON.stringify(sysRoleMenus))
        let isLoading=false
        yield put({type:'setLoading',payload:{isLoading}})
        yield put({type:'setUser',payload:{user}})
        yield put({type:'setMenu',payload:{menus:sysRoleMenus}})
        yield put(routerRedux.push('/'))
      }else{
        message.error(result.msg)
      }
    }
  },

  reducers: {
    setUser(state,action){
      return { ...state, ...action.payload };
    },
    setMenu(state,action){
      return { ...state, ...action.payload };
    },
    setLoading(state,action){
      return { ...state, ...action.payload };
    }
  },

};
