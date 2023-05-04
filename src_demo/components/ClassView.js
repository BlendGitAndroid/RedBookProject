import React from "react";
import { Text, View } from "react-native";

class ClassView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            address: "浙江省杭州市"
        }
    }

    //再执行componentDidMount
    componentDidMount() {
        console.log("componentDidMount...")
        setTimeout(()=> {
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