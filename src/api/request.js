import axios from 'axios'
import qs from 'qs';


axios.defaults.baseURL = 'api'
// 设置请求超时时间
axios.defaults.timeout = 100000
// 设置请求带 cookie
axios.defaults.withCredentials = false

// 设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// 请求拦截
axios.interceptors.request.use(config => {
  // 如果未登录 就是null
  if (localStorage.getItem('token') != null) {
      config.headers.common = {
          'TINNTAYMESSGE': localStorage.getItem('token')
      }
  }

  return config
}, error => {
  return Promise.error(error)
})


/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function postXwww(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

function reqFormCheck(a) {
  // null "null" undefined "undefined" NaN 不进行通过
  if (a === "undefined" || a === "null" || !a && (isNaN(a) || a === null || a === undefined)) return true;
  // "0" 0 "" {} [] false 通过
  return false;
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function postForm(url, params) {
  let rqParams = new FormData()  // 创建form对象
  for (let key in params) {
    if (!reqFormCheck(params[key])) rqParams.append(key, params[key])
  }
  let config = {
    headers: {'Content-Type': 'multipart/form-data'}
  }


  return new Promise((resolve, reject) => {
    axios.post(url, rqParams, config)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}


/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function postJson(url, params,type="") {
  return new Promise((resolve, reject) => {
    axios.post(url, JSON.stringify(params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
