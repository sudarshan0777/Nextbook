import axios from "axios"

// const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:1337';
const BASE_URL = '127.0.0.1:1337'
// TOKEN que se genera en strapi
const tokenStrapi = 'a47408395ec6db862ebcd5b16d64947ea03fa63a395ddba8825849a61219b59f12e7fc70caf6f8060583e27a753b39638a2075f6ed63850e82fa3f24ed69ab246e4e0aa5c7d13f0fab5880380886a848ae08e01679e4d5e33fc761e5de66e14b8aa2bcc288815ae91de71890732711b351e5cb217b67b0a2b519b214739e6ff1'

//export default axios.create({
//  baseURL: BASE_URL,
//})

//export default axios.create({
//  baseURL: BASE_URL,
//  headers: {
//    'Content-Type': 'application/json',
 // },
//  transformRequest: [
//    (data) => {
//      console.log('DATA: ', data)
//      return JSON.stringify(data);
//    },
//  ],
//});

//export const authJsonHeader = (token: string, file?: boolean) => {
 // const contentType = file ? "multipart/form-data" : "Application/json"
 // return {
 //   "Content-Type": contentType,
 //   Accept: "application/json",
 //   Authorization: `Bearer ${token}`,
 // }
//}


const baseURL = 'http://127.0.0.1:1337'
    , isServer = typeof window === 'undefined'

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(async config => {

    if (isServer) {

        const { cookies } = (await import('next/headers'))
            , token = cookies().get('token')?.value || tokenStrapi
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
    }
    else {

        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
    }

    return config
})

export default api

