import React, { useState, useEffect, useRef } from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Image } from "react-native"

type Props = {
    categoryList: Category[],
    allCategoryList: Category[],
    onCategoryChange: (category: Category) => void,
}

import icon_arrow from '../../assets/icon_arrow.png';
import CategoryModal, { CategoryModalRef } from "./CategoryModal";

export default ({ categoryList, allCategoryList, onCategoryChange }: Props) => {

    const modalRef = useRef<CategoryModalRef>(null)

    const [category, setCategory] = useState<Category>();

    useEffect(() => {
        console.log('categoryList', categoryList);
        setCategory(categoryList.find(i => i.name === '推荐')) //初始化，find找到符合条件的值
    }, [categoryList])

    const onCategoryList = (category: Category) => {
        setCategory(category)
        onCategoryChange?.(category)
    }

    return <View style={styles.container}>
        <ScrollView
            style={styles.scrollView}
            horizontal={true}
            showsHorizontalScrollIndicator={false}  //取消下划线
        >
            {
                categoryList.map((item: Category, index: number) => {
                    const isSelect = item.name == category?.name
                    return <TouchableOpacity
                        key={`${item.name}`}
                        style={styles.tabItem}
                        onPress={() => { onCategoryList(item) }}
                    >
                        <Text style={isSelect ? styles.tabItemTxtSelected : styles.tabItemTxt}>{item.name}</Text>
                    </TouchableOpacity>
                })
            }
        </ScrollView>
        <TouchableOpacity
            style={styles.openButton}
            onPress={() => {
                modalRef.current?.show()
            }}
        >
            <Image style={styles.openImg} source={icon_arrow} />

            <CategoryModal
                ref={modalRef}
                categoryList={allCategoryList}
            />
        </TouchableOpacity>
    </View>

}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 36,
        flexDirection: "row",
        backgroundColor: "white",
        marginBottom: 6
    },
    scrollView: {
        flex: 1,
        height: "100%",
    },
    tabItem: {
        width: 64,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabItemTxt: {
        fontSize: 16,
        color: '#999',
    },
    tabItemTxtSelected: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
    },
    openButton: {
        width: 40,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    openImg: {
        width: 18,
        height: 18,
        transform: [{ rotate: "-90deg" }]   //旋转90度
    }
})