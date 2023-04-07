import React, { useState } from "react"
import { Image, ImageBackground, Modal, SectionList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import icon_bg from "../assets/images/icon_bg.png"
import icon_menu from "../assets/images/icon_menu.png"
import icon_share from "../assets/images/icon_share.png"
import avatar from '../assets/images/default_avatar.png';
import icon_add from '../assets/images/icon_add.png';
import icon_code from '../assets/images/icon_code.png';
import icon_male from '../assets/images/icon_male.png';
import icon_setting from '../assets/images/icon_setting.png';

import icon_1 from '../assets/images/icon_1.png';
import icon_2 from '../assets/images/icon_2.png';
import icon_3 from '../assets/images/icon_3.png';
import icon_close_modal from '../assets/images/icon_close_modal.png';

import { SectionData } from '../constants/Data';

export default () => {

    const [tabIndex, setTabIndex] = useState(0)
    const [visible, setVisible] = useState(false)

    const getContent = () => {
        const contentStyles = StyleSheet.create({
            icon: {
                width: 96,
                height: 96,
                resizeMode: 'contain',
            },
            desc: {
                fontSize: 16,
                marginTop: 16,
            },
            button: {
                width: 76,
                height: 28,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: '#C0C0C0',
                textAlign: 'center',
                textAlignVertical: 'center',
                marginTop: 12,
                color: '#333333',
            },
        })

        const array = []
        array[0] = (
            <>
                <Image style={contentStyles.icon} source={icon_1}></Image>
                <Text style={contentStyles.desc}>用一句话，分享今天的快乐吧～</Text>
                <Text style={contentStyles.button}>去分享</Text>
            </>
        )
        array[1] = (
            <>
                <Image style={contentStyles.icon} source={icon_2}></Image>
                <Text style={contentStyles.desc}>快去收藏你喜欢的作品吧～</Text>
                <Text style={contentStyles.button}>去收藏</Text>
            </>
        )
        array[2] = (
            <>
                <Image style={contentStyles.icon} source={icon_3}></Image>
                <Text style={contentStyles.desc}>你还没有给作品点赞哦～</Text>
                <Text style={contentStyles.button}>去点赞</Text>
            </>
        )
        return array
    }

    const renderModal = () => {
        const modalStyles = StyleSheet.create({
            root: {
                width: "100%",
                height: "100%",
                backgroundColor: 'transparent',
                flexDirection: "column"
            },
            listTitleView: {
                width: "100%",
                paddingTop: 106,
            },
            content: {
                width: "100%",
                height: "90%",
                backgroundColor: "white"
            },
            titleLayout: {
                width: "100%",
                height: 46,
                backgroundColor: "white",
                borderTopLeftRadius: 25,
                borderTopRightRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row"
            },
            listTitle: {
                fontSize: 18,
                color: '#333333',
                fontWeight: 'bold',
            },
            close: {
                position: "absolute",
                right: 10
            },
            closeIcon: {
                width: 20,
                height: 20
            },
            container: {
                width: "100%",
                height: "100%",
                backgroundColor: "white"
            },
            txt: {
                width: "100%",
                height: 56,
                color: "#333333",
            },
            sectionHeaderTxt: {
                width: '100%',
                height: 36,
                backgroundColor: '#DDDDDD',
                textAlignVertical: 'center',
                paddingLeft: 16,
                fontSize: 20,
                color: '#333333',
                fontWeight: 'bold',
            }

        })

        const renderItem = ({ item, index, section }) => {
            return <Text style={modalStyles.txt}>{item}</Text>
        }

        const renderSectionHeader = ({ section }) => {
            return (
                <Text style={modalStyles.sectionHeaderTxt}>{section.type}</Text>
            );
        }

        return <Modal
            visible={visible}
            onRequestClose={() => setVisible(false)}
            transparent={true}
            statusBarTranslucent={true} //沉浸式状态栏
            animationType="slide"   //动画方式
        >
            <View style={modalStyles.root}>
                <View style={modalStyles.listTitleView}>
                    <View style={modalStyles.titleLayout}>
                        <Text style={modalStyles.listTitle}>粉丝列表</Text>
                        <TouchableOpacity
                            style={modalStyles.close}
                            onPress={() => setVisible(false)}
                        >
                            <Image style={modalStyles.closeIcon} source={icon_close_modal}></Image>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={modalStyles.content}>
                    <SectionList
                        style={modalStyles.container}
                        sections={SectionData}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => `${item}-${index}`}
                        renderSectionHeader={renderSectionHeader}
                        stickySectionHeadersEnabled={true}  //吸顶的效果
                    ></SectionList>
                </View>
            </View>
        </Modal>
    }

    return <View style={styles.root}>

        <StatusBar
            barStyle={"light-content"}  //字体颜色
            backgroundColor={"transparent"} //背景颜色
            translucent={true}  //穿透状态栏，沉浸式状态栏
        ></StatusBar>

        <ImageBackground style={styles.imgBg} imageStyle={styles.imgStyleBg} source={icon_bg}>
            <View style={styles.topAction}>
                <Image style={styles.actionView} source={icon_menu}></Image>
                <Image style={styles.actionView} source={icon_share}></Image>
            </View>

            <View style={styles.rowDirection}>
                <View>
                    <Image style={styles.avatarView} source={avatar}></Image>
                    <Image style={styles.avatarAdd} source={icon_add}></Image>
                </View>
                <View style={styles.nameView}>
                    <Text style={styles.name}>{`大公爵`}</Text>
                    <View style={styles.idDirection}>
                        <Text style={styles.id}>小红书号：118302851</Text>
                        <Image style={styles.code} source={icon_code}></Image>
                    </View>
                </View>
            </View>

            <Text style={styles.introduction}>点击关注，填写简介</Text>
            <View style={styles.maleView}>
                <Image style={styles.maleImg} source={icon_male}></Image>
            </View>

            <View style={styles.rowItemLayout}>

                <TouchableOpacity
                    style={styles.itemLayout}
                    onPress={() => {
                        setVisible(true)
                    }}
                >
                    <Text style={styles.itemCount}>142</Text>
                    <Text style={styles.itemLabel}>关注</Text>
                </TouchableOpacity>

                <View style={styles.itemLayout}>
                    <Text style={styles.itemCount}>2098</Text>
                    <Text style={styles.itemLabel}>粉丝</Text>
                </View>


                <View style={styles.itemLayout}>
                    <Text style={styles.itemCount}>1042</Text>
                    <Text style={styles.itemLabel}>获赞与收藏</Text>
                </View>


                <View style={{ flex: 1 }}></View>

                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => {

                    }}
                >
                    <Text style={styles.editLabel}>编辑资料</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.settingButton}
                    onPress={() => {

                    }}
                >
                    <Image style={styles.iconSetting} source={icon_setting}></Image>
                </TouchableOpacity>
            </View>
        </ImageBackground>

        <View style={styles.tabsLayout}>
            <TouchableOpacity style={styles.tabs} onPress={() => setTabIndex(0)}>
                <Text style={tabIndex == 0 ? styles.tabSelectedTxt : styles.tabTxt}>笔记</Text>
                <View style={tabIndex == 0 && styles.tabLine} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabs} onPress={() => setTabIndex(1)}>
                <Text style={tabIndex == 1 ? styles.tabSelectedTxt : styles.tabTxt}>收藏</Text>
                <View style={tabIndex == 1 && styles.tabLine} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabs} onPress={() => setTabIndex(2)}>
                <Text style={tabIndex == 2 ? styles.tabSelectedTxt : styles.tabTxt}>赞过</Text>
                <View style={tabIndex == 2 && styles.tabLine} />
            </TouchableOpacity>
        </View>

        <View style={{ width: "100%", height: 1, backgroundColor: "#E0E0E0" }}></View>

        <View style={styles.contentLayout}>
            {getContent()[tabIndex]}
        </View>

        {renderModal()}
    </View>

}

const styles = StyleSheet.create({
    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "#F0F0F0"
    },
    imgBg: {
        width: "100%",
        paddingTop: 30,
    },
    imgStyleBg: {
        resizeMode: "cover"
    },
    topAction: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10
    },
    actionView: {
        width: 25,
        height: 25,
        marginTop: 10
    },
    rowDirection: {
        flexDirection: "row",
        marginTop: 10,
        marginLeft: 10
    },
    rowItemLayout: {
        width: "100%",
        flexDirection: "row",
        marginBottom: 28,
        alignItems: "center",
        marginTop: 10,
    },
    avatarView: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    avatarAdd: {
        width: 20,
        height: 20,
        position: "absolute",
        right: 0,
        bottom: 0
    },
    nameView: {
        flexDirection: "column",
        marginLeft: 10
    },
    name: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    },
    id: {
        color: "white",
        fontSize: 12,
    },
    code: {
        width: 14,
        height: 14,
        tintColor: "white"
    },
    idDirection: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
    },
    introduction: {
        fontSize: 14,
        color: "white",
        marginLeft: 10,
        marginTop: 15
    },
    maleView: {
        width: 30,
        height: 20,
        borderRadius: 15,
        marginLeft: 10,
        marginTop: 10,
        backgroundColor: "#737388",
        alignItems: "center",
        justifyContent: "center"
    },
    maleImg: {
        width: 15,
        height: 14,
        resizeMode: "center"
    },
    itemLayout: {
        flexDirection: "column",
        marginLeft: 10,
        alignItems: "center"
    },
    itemCount: {
        fontSize: 16,
        color: "white"
    },
    itemLabel: {
        fontSize: 14,
        color: "white",
        marginTop: 2
    },
    editButton: {
        width: 80,
        height: 30,
        borderRadius: 16,
        borderColor: "white",
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingButton: {
        width: 50,
        height: 30,
        borderRadius: 16,
        borderColor: "white",
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10
    },
    iconSetting: {
        width: 20,
        height: 20,
        tintColor: "white",
    },
    tabsLayout: {
        height: 46,
        width: "100%",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: "white",
        marginTop: -12,
        flexDirection: "row",
        justifyContent: "center"
    },
    tabs: {
        flexDirection: "column",
        paddingHorizontal: 10,
        marginTop: 10,
        alignItems: "center"
    },
    tabSelectedTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
    },
    tabTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#909090',
    },
    tabLine: {
        width: 35,
        height: 2,
        marginTop: 2,
        backgroundColor: "#f05856"
    },
    contentLayout: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    editLabel: {
        fontSize: 14,
        color: "white",
    }
})