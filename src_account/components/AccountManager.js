import React, { useRef, useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    SectionList,
    LayoutAnimation,
    Alert,
    Switch
} from 'react-native';

import AddAccount from './AddAccount';
import { load, save } from '../utils/Storage';

import icon_add from '../assets/icon_add.png';
import icon_game from '../assets/icon_game.png';
import icon_platform from '../assets/icon_platform.png';
import icon_bank from '../assets/icon_bank.png';
import icon_other from '../assets/icon_other.png';
import icon_arrow from '../assets/icon_arrow.png';

// 创建一个对象，可以使用person.property 或 person["property"]这两种方式来获取
// 定义了一个名为 iconMap 的常量，它是一个 JavaScript 对象、
// 在 JavaScript 中，对象的属性可以通过点符号（`.`）或方括号（`[]`）来访问。但是，
// 如果属性名是一个字符串并且包含特殊字符（如空格）或者是一个保留字，那么你必须使用
// 方括号来访问。在你的例子中，`iconMap.'游戏'` 是无效的，因为 `'游戏'` 是一个字符串，
// 不能使用点符号来访问。你应该使用 `iconMap['游戏']` 来访问 `'游戏'` 属性。所以，如
// 果 `iconMap` 对象有一个 `'游戏'` 属性，并且 `icon_game` 已经被定义并赋值，那么 `iconMap['游戏']` 应该可以获取到 `icon_game` 的值。
const iconMap = {
    '游戏': icon_game,
    '平台': icon_platform,
    '银行卡': icon_bank,
    '其它': icon_other,
}

// const iconMap = {
//     game: icon_game,
//     platform: icon_platform,
//     bankCard: icon_bank,
//     other: icon_other,
// }

export default () => {

    //弹框属性ref
    const addAccountRef = useRef(null);

    //帐号密码数据
    const [sectionData, setSectionData] = useState([]);

    //是否全部显示，这也是一个对象
    const [sectionState, setSectionState] = useState({
        '游戏': true,
        '平台': true,
        '银行卡': true,
        '其它': true,
    });

    const [passwordOpen, setPasswordOpen] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        load('accountList').then(data => {
            const accountList = JSON.parse(data);

            //获取四种类型
            const gameList = accountList.filter(item => item.type === '游戏') || [];
            const platformList = accountList.filter(item => item.type === '平台') || [];
            const bankList = accountList.filter(item => item.type === '银行卡') || [];
            const otherList = accountList.filter(item => item.type === '其它') || [];

            //sectionList的布局要求，必须是一个数组，数组里面是对象，对象里面有type和data两个属性
            const sectionData = [
                { type: '游戏', data: gameList },
                { type: '平台', data: platformList },
                { type: '银行卡', data: bankList },
                { type: '其它', data: otherList }
            ];

            //这个布局动画在变化之前
            LayoutAnimation.easeInEaseOut();
            setSectionData(sectionData);
        }).catch(e => {
            console.log(e)
        });
    }

    const renderTitle = () => {
        return (
            <View style={styles.titleLayout}>
                <Text style={styles.titleTxt}>账号管理</Text>
                <Switch
                    style={styles.switch}
                    value={passwordOpen}
                    onValueChange={value => {
                        setPasswordOpen(value);
                    }}
                />
            </View>
        );
    }

    // 渲染每一项
    const renderItem = ({ item, index, section }) => {
        if (!sectionState[section.type]) {  //如果不显示数据，则不渲染
            return null;
        }
        return (
            <TouchableOpacity
                style={styles.itemLayout}
                onPress={() => {
                    // 传入item
                    addAccountRef.current.show(item);
                }}
                onLongPress={() => {
                    const buttons = [
                        { text: '取消', onPress: () => { } },
                        { text: '确定', onPress: () => deleteAccount(item) }
                    ];
                    Alert.alert('提示', `确定删除「${item.name}」账号吗？`, buttons);
                }}
            >
                <Text style={styles.nameTxt}>{item.name}</Text>
                <View style={styles.accpwdLayout}>
                    <Text style={styles.accpwdTxt}>{`账号：${item.account}`}</Text>
                    <Text style={styles.accpwdTxt}>{`密码：${passwordOpen ? item.password : '********'}`}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    const deleteAccount = (account) => {
        load('accountList').then(data => {
            let accountList = JSON.parse(data);
            accountList = accountList.filter(item => item.id !== account.id);
            save('accountList', JSON.stringify(accountList)).then(() => {
                loadData();
            });
        })
    }

    const renderSectionHeader = ({ section }) => {
        return (
            <View style={[  //这里使用数组，可以合并多个样式
                styles.groupHeader,
                {
                    borderBottomLeftRadius: (!section.data.length || !sectionState[section.type]) ? 12 : 0, //如果没有数据或者被关起来，就显示下方的圆角
                    borderBottomRightRadius: (!section.data.length || !sectionState[section.type]) ? 12 : 0
                }
            ]}>
                <Image style={styles.typeImg} source={iconMap[section.type]} />
                <Text style={styles.typeTxt}>{section.type}</Text>
                <TouchableOpacity
                    style={styles.arrowButton}
                    onPress={() => {
                        const copy = { ...sectionState };   //复制一份对象
                        copy[section.type] = !copy[section.type];
                        LayoutAnimation.easeInEaseOut();    //在值被改变之前调用布局动画
                        setSectionState(copy);
                    }}
                >
                    <Image
                        style={[
                            styles.arrowImg,
                            { transform: [{ rotate: sectionState[section.type] ? '0deg' : '-90deg' }] } //如果是被合起来，就不旋转
                        ]}
                        source={icon_arrow}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.root}>
            {renderTitle()}

            {/* SectionList来实现分组列表 */}
            <SectionList
                sections={sectionData}
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                contentContainerStyle={styles.listContainer}
            />

            <TouchableOpacity
                style={styles.addButton}
                activeOpacity={0.5}
                onPress={() => {
                    // 什么都不传
                    addAccountRef.current.show();
                }}
            >
                <Image style={styles.addImg} source={icon_add} />
            </TouchableOpacity>

            {/* 回调的方法 */}
            <AddAccount ref={addAccountRef} onSave={() => loadData()} />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F0F0F0'
    },
    titleLayout: {
        width: '100%',
        height: 46,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    titleTxt: {
        fontSize: 18,
        color: '#333333',
        fontWeight: 'bold',
    },
    addButton: {
        position: 'absolute',
        bottom: 64,
        right: 28,
    },
    addImg: {
        width: 56,
        height: 56,
        resizeMode: 'contain',
    },
    groupHeader: {
        width: '100%',
        height: 46,
        backgroundColor: 'white',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginTop: 12,
    },
    typeImg: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    listContainer: {
        paddingHorizontal: 12,
    },
    typeTxt: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
        marginLeft: 16,
    },
    arrowButton: {
        position: 'absolute',
        right: 0,
        padding: 16,
    },
    arrowImg: {
        width: 20,
        height: 20,
    },
    itemLayout: {
        width: '100%',
        flexDirection: 'column',
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    nameTxt: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
    },
    accpwdLayout: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    accpwdTxt: {
        flex: 1,
        fontSize: 14,
        color: '#666666',
        marginTop: 12,
        marginBottom: 6,
    },
    switch: {
        position: 'absolute',
        right: 12,
    },
});
