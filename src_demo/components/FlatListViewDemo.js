import React from "react";
import { StyleSheet, Text, Button, View, FlatList } from "react-native";

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

export default () => {

    const renderItem = (itemInfo) => {
        const { item, index } = itemInfo    //解构出item和index
        return <Text style={styles.txt}>{`List ${item}`}</Text>
    }

    //组件使用大写
    const ListHeader = () => {
        return <View style={styles.header}>
            <Text style={[styles.txt, styles.txtCenter]}>头部</Text>
        </View>
    }

    //为了不写return，这里直接使用（）简单写法
    const ListFooter = 
        <View style={[styles.header, styles.footer]}>
            <Text style={[styles.txt, styles.txtCenter]}>尾部</Text>
        </View>
    

    // 使用（）表示对象，不需要return，省略了() => {}
    const ListEmpty = (
        <View style={styles.listEmpty}>
            <Text style={styles.extraTxt}>空列表</Text>
        </View>
    )

    return <View style={styles.container}>
        <FlatList
            style={styles.flatlist}
            data={array}
            keyExtractor={(_, index) => `key_${index}`} //唯一的key
            renderItem={renderItem}
            contentContainerStyle={styles.containerStyle}   //容器内的设置
            ListHeaderComponent={ListHeader}    //列表头尾
            ListFooterComponent={ListFooter}
            ListEmptyComponent={ListEmpty}
            ItemSeparatorComponent={    // 分割线
                <View style={styles.separator}></View>
            }
            initialNumToRender={14} //控制渲染的数量
            // numColumns={2}  //多行展示
            onViewableItemsChanged={(info) => { //当前元素可见
                const {viewableItems} = info
                console.log(viewableItems)
            }}
        >
        </FlatList>
    </View>
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "white"
    },
    flatlist: {
        width: "100%",
        height: "100%",
        backgroundColor: "#F0F0F0"
    },
    txt: {
        width: "100%",
        height: 56,
        fontSize: 24,
        color: "blue"
    },
    containerStyle: {
        paddingHorizontal: 16,
        backgroundColor: "#E0E0E0"
    },
    header: {
        width: "100%",
        height: 56,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#00ff0030',
    },
    footer: {
        backgroundColor: '#ff000030',
    },
    txtCenter: {
        textAlign: "center",
        verticalAlign: "middle"
    },
    listEmpty: {
        width: "100%",
        height: 400,
        justifyContent: "center",
        alignItems: "center"
    },
    extraTxt: {
        fontSize: 20,
        color: '#666666',
        textAlignVertical: 'center',
    },
    separator: {
        width: "100%",
        height: 2,
        backgroundColor:"#D0D0D0"
    }
})