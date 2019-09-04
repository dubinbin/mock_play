import axios from 'axios'

const Config = {
    BASE_URL: 'http://127.0.0.1:3000'
}

function getToken() {
    var token = localStorage.getItem('Mock/token') || ''
    return token
}

axios.defaults.baseURL = Config.BASE_URL
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.interceptors.request.use((config) => {
    config.headers.common.Authorization = config.headers.common.Authorization ?  config.headers.common.Authorization :  getToken()
    return config
})
axios.interceptors.response.use(undefined, (error) => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                location.assign('/#/login')
                // 这里处理未认证情况
                console.log(error.response)
                return
            default:
                break
        }
    }
    return Promise.reject(error)
})

