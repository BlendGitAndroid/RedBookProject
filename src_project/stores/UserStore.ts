import { request } from "../utils/Request"


class UserStore {

    userInfo: any

    requestLogin = async (phone: string, pwd: string, callback: (success: boolean) => void) => {
        try {
            const params = {
                name: phone,
                pwd: pwd
            }
            const { data } = await request("login", params)
            if (data) {
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
    }

}

// ESM单例导出
export default new UserStore()