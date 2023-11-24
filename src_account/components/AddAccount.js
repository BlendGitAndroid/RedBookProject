import React, { useState, forwardRef, useImperativeHandle } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Modal,
    TextInput,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { getUUID } from '../utils/UUID';
import { save, load } from '../utils/Storage';

import icon_close_modal from '../assets/icon_close_modal.png';

export default forwardRef((props, ref) => {

    // 传入onSave方法
    const { onSave } = props;

    
    const [visible, setVisible] = useState(false);
    const [isModify, setIdModify] = useState(false);

    const [id, setId] = useState('');

    const [type, setType] = useState('游戏');

    const [name, setName] = useState('');

    const [account, setAccount] = useState('');

    const [password, setPassword] = useState('');

    //根据入参来判断是编辑还是新增
    const show = (currentAccount) => {
        setVisible(true);

        if (currentAccount) {
            setIdModify(true);
            setId(currentAccount.id);
            setType(currentAccount.type);
            setName(currentAccount.name);
            setAccount(currentAccount.account);
            setPassword(currentAccount.password);
        } else {
            setIdModify(false);
            setId(getUUID());
            setType('游戏');
            setName('');
            setAccount('');
            setPassword('');
        }
    }

    const hide = () => {
        setVisible(false);
    }

    // 通过useImperativeHandle暴露给父组件的方法
    useImperativeHandle(ref, () => {
        return {
            show,// 简单的写法，如果key和value一样，可以直接写一个
            hide,
        }
    });

    const onSavePress = () => {
        const newAccount = { id, type, name, account, password };   // 创建一个对象，key和value一样，可以直接写一个
        load('accountList').then(data => {
            // 将字符串转换成数组
            let accountList = data ? JSON.parse(data) : [];

            // 如果是编辑现有账号，则push前先移除原来的
            if (isModify) {
                accountList = accountList.filter(item => item.id !== id);
            }

            accountList.push(newAccount);
            // 将数组转换成字符串，存储到本地
            save('accountList', JSON.stringify(accountList)).then(() => {
                onSave();
                hide();
            }).catch(e => {
                console.log(e)
            });
        }).catch(e => {
            console.log(e)
        })
    }

    const renderTitle = () => {
        const styles = StyleSheet.create({
            titleLayout: {
                width: '100%',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
            },
            titleTxt: {
                fontSize: 18,
                color: '#333333',
                fontWeight: 'bold',
            },
            closeButton: {
                position: 'absolute',
                right: 6,
            },
            closeImg: {
                width: 28,
                height: 28,
                resizeMode: 'contain',
            },
        });
        return (
            <View style={styles.titleLayout}>
                <Text style={styles.titleTxt}>
                    {isModify ? '修改账号' : '添加账号'}
                </Text>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={hide}
                >
                    <Image style={styles.closeImg} source={icon_close_modal} />
                </TouchableOpacity>
            </View>
        );
    }

    const renderType = () => {
        const styles = StyleSheet.create({
            typesLayout: {
                width: '100%',
                height: 32,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
            },
            tab: {
                flex: 1,
                height: '100%',
                borderWidth: 1,
                borderColor: '#C0C0C0',
                justifyContent: 'center',
                alignItems: 'center',
            },
            leftTab: {
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
            },
            rightTab: {
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
            },
            moveLeft1Pix: {
                marginLeft: -1, //这里的-1，是回退1像素，防止叠加变粗，从第二个模块开始向左移动一个像素
            },
            tabTxt: {
                fontSize: 14,
            },
        });

        const typesArray = ['游戏', '平台', '银行卡', '其它'];

        return (
            <View style={styles.typesLayout}>
                {typesArray.map((item, index) => {  //这里选择便利的方式
                    return (
                        <TouchableOpacity
                            style={[
                                styles.tab,
                                index === 0
                                    ? styles.leftTab    //判断是否是第一个模块，如果是，就加上左边圆角
                                    : index === 3
                                        ? styles.rightTab
                                        : {},
                                index > 0 && styles.moveLeft1Pix,
                                { backgroundColor: type === item ? '#3050ff' : 'transparent' }
                            ]}
                            key={`${item}`}
                            onPress={() => {
                                setType(item);
                            }}
                        >
                            <Text style={[
                                styles.tabTxt,
                                { color: type === item ? 'white' : '#666666' }
                            ]}>{item}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }

    const renderName = () => {
        const styles = StyleSheet.create({
            input: {
                width: '100%',
                height: 40,
                backgroundColor: '#f0f0f0',
                marginTop: 8,
                borderRadius: 8,
                paddingHorizontal: 12,
                fontSize: 16,
                color: '#333333',
            },
        });
        return (
            <TextInput
                style={styles.input}
                maxLength={20}
                value={name}    //name值的改变也回写到输入框
                onChangeText={text => { //输入框的输出，赋值到name上
                    setName(text || '');
                }}
            />
        );
    }

    const renderAccount = () => {
        const styles = StyleSheet.create({
            input: {
                width: '100%',
                height: 40,
                backgroundColor: '#f0f0f0',
                marginTop: 8,
                borderRadius: 8,
                paddingHorizontal: 12,
                fontSize: 16,
                color: '#333333',
            },
        });
        return (
            <TextInput
                style={styles.input}
                maxLength={20}
                value={account}
                onChangeText={text => {
                    setAccount(text || '');
                }}
            />
        );
    }

    const renderPassword = () => {
        const styles = StyleSheet.create({
            input: {
                width: '100%',
                height: 40,
                backgroundColor: '#f0f0f0',
                marginTop: 8,
                borderRadius: 8,
                paddingHorizontal: 12,
                fontSize: 16,
                color: '#333333',
            },
        });
        return (
            <TextInput
                style={styles.input}
                maxLength={20}
                value={password}
                onChangeText={text => {
                    setPassword(text || '');
                }}
            />
        );
    }

    const renderButton = () => {
        const styles = StyleSheet.create({
            saveButton: {
                width: '100%',
                height: 44,
                backgroundColor: '#3050ff',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
                borderRadius: 8,
                marginBottom: 6,
            },
            saveTxt: {
                fontSize: 16,
                color: 'white',
                fontWeight: 'bold',
            },
        });
        return (
            <TouchableOpacity
                style={styles.saveButton}
                onPress={onSavePress}
            >
                <Text style={styles.saveTxt}>保 存</Text>
            </TouchableOpacity>
        );
    }

    // 使用Modal组件来实现弹窗
    return (
        <Modal
            visible={visible}
            onRequestClose={hide}
            transparent={true}
            statusBarTranslucent={true}
            animationType='fade'
        >
            <KeyboardAvoidingView   //为了使软键盘不遮挡输入框
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.root}
            >
                <View style={styles.content}>
                    {renderTitle()}
                    <Text style={styles.subTitleTxt}>账号类型</Text>
                    {renderType()}
                    <Text style={styles.subTitleTxt}>账号名称</Text>
                    {renderName()}
                    <Text style={styles.subTitleTxt}>账号</Text>
                    {renderAccount()}
                    <Text style={styles.subTitleTxt}>密码</Text>
                    {renderPassword()}

                    {renderButton()}
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
})

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: '#00000060',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
    },
    subTitleTxt: {
        fontSize: 12,
        color: '#666666',
        marginTop: 16,
    },
});
