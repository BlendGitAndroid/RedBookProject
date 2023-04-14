import { action, flow } from "mobx"
import { request } from "../utils/Request"
import { save } from "../utils/Storage"


class UserStore {

    userInfo: any

    // async的写法
    // requestLogin = async (phone: string, pwd: string, callback: (success: boolean) => void) => {
    //     try {
    //         const params = {
    //             name: phone,
    //             pwd: pwd
    //         }
    //         const { data } = await request("login", params)
    //         if (data) {
    //             this.userInfo = data
    //             callback?.(true)
    //         } else {
    //             this.userInfo = null
    //             callback?.(false)
    //         }
    //     } catch (error) {
    //         this.userInfo = null
    //         callback?.(false)
    //     }
    // }

    // mobx的写法
    // async改为flow， 并增加function*标识   await改为yield
    requestLogin = flow(function* (
        this: UserStore,
        phone: string,
        pwd: string,
        callback: (success: boolean) => void) {
        try {
            const params = {
                name: phone,
                pwd: pwd
            }
            const { data } = yield request("login", params)
            if (data) {
                save("userInfo", JSON.stringify(data))  //转换为string
                this.userInfo = data
                callback?.(true)
            } else {
                this.userInfo = null
                callback?.(false)
            }
        } catch (error) {
            this.userInfo = null
            callback?.(false)
        }
    })


    @action
    setUserInfo = (info: any) => {
        this.userInfo = info;
    }

}

// ESM单例导出
export default new UserStore()