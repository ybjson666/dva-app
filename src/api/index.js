import { postXwww, postForm, postJson, get } from './request'
export const toLogin = params => postJson('/sys/user/login', params)
export const changePwd=(params)=>postJson('/sys/user/modifyMyPwd',params)//修改自己密码