import React from "react";
import { Text, View } from "react-native";

class ClassView extends React.Component {

    constructor(props) {
        super(props)
        // 类组件是通过构造函数来初始化state的，所以在类组件中，state是一个对象
        // 而函数组件是通过useState来初始化state的，所以在函数组件中，state是一个原始数据类型
        this.state = {
            address: "浙江省杭州市"
        }
    }

    //再执行componentDidMount
    componentDidMount() {
        console.log("componentDidMount...")
        setTimeout(()=> {
            // 更新类组件的时候，需要调用setState方法，而不是直接修改state的值
            // 而在函数组件中，直接修改state的值就可以了
            this.setState({
                address: "江苏省南京市"
            })
        },2000)
    }

    //执行componentWillUnmount，在组件去除时执行
    componentWillUnmount() {
        console.log("componentWillUnmount...")
    }

    //先执行render
    render() {
        console.log("render...")
        const {address} = this.state

        return (
            <View style={{ width: "100%", height: 200, backgroundColor: "#00bcd4" }}>
                <Text >
                    {address}
                </Text>
            </View>
        )
    }

}

export default ClassView;