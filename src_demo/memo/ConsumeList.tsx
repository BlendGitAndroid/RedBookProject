
import React, { useCallback, useMemo, useState } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    FlatList,
    Switch,
    Button,
    TouchableOpacity,
} from 'react-native';

import { ListData, ListData2 } from '../constants/Data';
import { TypeColors } from '../constants/Data';

// useMemo 缓存数据和UI渲染
// useCallback 缓存回调函数
export default () => {

    const [data, setData] = useState<any>(ListData)

    const [showType, setShowType] = useState<boolean>(true)

    //使用useMemo，当data数据没有改变的时候，就不重复计算，返回的是一个值，
    //并赋值给calculateTotal，而不是一个方法
    //`useMemo` 接受两个参数：计算函数和依赖项数组。计算函数用于执行需要缓存的计算操作，并返回计算结果。

    //map() 方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。

    //reduce() 方法对数组中的每个元素按序执行一个由您提供的 reducer 函数，每一次运行 reducer 会将先前元素
    //的计算结果作为参数传入，最后将其结果汇总为单个返回值。
    const calculateTotal = useMemo(() => {
        console.log("重新计算合计")
        return data.map((item: any) => {
            return item.amount
        }).reduce((pre: number, cur: number) => {
            return pre + cur
        })
    }, [data])

    const totalAmountViw = useMemo(() => {

        const total = () =>
            data.map((item: any) => item.amount)
                .reduce((pre: number, cur: number) => pre + cur)

        console.log("重新渲染UI")
        return <View style={styles.totalLayout}>
            <Text style={styles.totalTxt}>{total()}</Text>
            <Text style={styles.totalTxt}>缓存UI -- 合计：</Text>
        </View>
    }, [data])

    const calculateTotalSimple = () =>
        data.map((item: any) => item.amount)
            .reduce((pre: number, cur: number) => pre + cur)

    // 在 React 中，使用 useCallback 钩子来定义回调函数可以帮助我们优化性能。
    // 在函数组件中，每次组件重新渲染时，所有的函数都会被重新创建。这可能会导致一些不必要的性能开销，特别是当这些函数被作为 props 传
    // 递给子组件时。因为子组件的 props 改变了，子组件也会重新渲染，即使实际上这些函数的行为并没有改变。
    // useCallback 钩子可以返回一个记忆化的版本的回调函数，它只在依赖项改变时才会更新。这意味着，只要依赖项没有改变，每次组件重新渲染时，
    // useCallback 都会返回同一个回调函数。这样，即使组件重新渲染，回调函数也不会改变，也就不会触发子组件的不必要的重新渲染。
    // 防止onPress对象反复创建
    // 这里使用高阶函数定义
    const onItemPress = useCallback((item: any, index: number) => () => {
        console.log(`点击了第${index}项，消费名称为：${item.name}`)
    }, [])


    const renderItem = ({ item, index }: any) => {
        const itemStyles = StyleSheet.create({
            itemLayout: {
                width: '100%',
                padding: 16,
                flexDirection: 'column',
                borderBottomWidth: 1,
                borderBottomColor: '#E0E0E0',
            },
            labelRow: {
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
            },
            labelTxt: {
                flex: 1,
                fontSize: 14,
                color: '#666',
            },
            valueRow: {
                marginTop: 10,
            },
            first: {
                flex: 0.4,
            },
            second: {
                flex: 0.3,
            },
            last: {
                flex: 0.6
            },
            valueTxt: {
                flex: 1,
                fontSize: 18,
                color: '#333',
                fontWeight: 'bold',
            },
            typeLayout: {
                flex: 0.3,
            },
            typeTxt: {
                width: 20,
                height: 20,
                textAlign: 'center',
                textAlignVertical: 'center',
                color: 'white',
                borderRadius: 4,
                fontWeight: 'bold',
            },
        })

        return <TouchableOpacity
            onPress={
                onItemPress(item, index)
            }
            style={itemStyles.itemLayout}>
            <View style={itemStyles.labelRow}>
                <Text style={[itemStyles.labelTxt, itemStyles.first]}>序号</Text>
                {showType && <Text style={[itemStyles.labelTxt, itemStyles.second]}>类型</Text>}
                <Text style={[itemStyles.labelTxt]}>消费名称</Text>
                <Text style={[itemStyles.labelTxt, itemStyles.last]}>消费金额</Text>
            </View>

            <View style={[itemStyles.labelRow, itemStyles.valueRow]}>
                <Text style={[itemStyles.valueTxt, itemStyles.first]}>{item.index}</Text>

                {showType && <View style={itemStyles.typeLayout}>
                    <Text style={[itemStyles.typeTxt, { backgroundColor: TypeColors[item.type] }]}>
                        {item.type}
                    </Text>
                </View>
                }
                <Text style={[itemStyles.valueTxt]}>{item.name}</Text>
                <Text style={[itemStyles.valueTxt, itemStyles.last]}>{item.amount}</Text>
            </View>
        </TouchableOpacity>
    }

    return <View style={styles.root}>
        <View style={styles.titleLayout}>
            <Text style={styles.titleTxt}>消费记帐单</Text>
            <Switch style={styles.switch} value={showType}
                onValueChange={(value) => setShowType(value)}>
            </Switch>

            <Button
                title='计算'
                onPress={() => {
                    setData(ListData2)
                }}
            />

        </View>

        <FlatList
            data={data}
            keyExtractor={(item, index) => `${index} - ${item.name}}`}
            renderItem={renderItem}
        />

        <View style={styles.totalLayout}>
            <Text style={styles.totalTxt}>{calculateTotal}</Text>
            <Text style={styles.totalTxt}>缓存数据 -- 合计：</Text>
        </View>

        {totalAmountViw}
    </View>
}

const styles = StyleSheet.create({
    root: {
        width: "100%",
        height: "95%",
        backgroundColor: "white"
    },
    titleLayout: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleTxt: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
    },
    totalLayout: {
        width: '100%',
        height: 60,
        flexDirection: 'row-reverse',
        borderTopWidth: 1,
        borderTopColor: '#c0c0c0',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    totalTxt: {
        fontSize: 20,
        color: '#333',
        fontWeight: 'bold',
    },
    switch: {
        position: 'absolute',
        right: 16,
    },
})

