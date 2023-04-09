import AsyncStorage from "@react-native-async-storage/async-storage"


const save = async (key: string, value: string) => {
    try {
        return await AsyncStorage.setItem(key, value)
    } catch (e) {
        console.error(e)
        return null
    }
}

const load = async (key: string) => {
    try {
        return await AsyncStorage.getItem(key)
    } catch (e) {
        console.error(e)
        return null
    }
}

const remove = async (key: string) => {
    try {
        return await AsyncStorage.removeItem(key)
    } catch (e) {
        console.error(e)
        return null
    }
}

const clear = async () => {
    try {
        AsyncStorage.clear()
    } catch (e) {
        console.error(e)
    }
}