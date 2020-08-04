import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://vue-axios-8774c.firebaseio.com'
})

instance.defaults.headers.common['x-something'] = 'something'

export default instance