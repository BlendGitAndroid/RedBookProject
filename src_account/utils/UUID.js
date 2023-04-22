import 'react-native-get-random-values'
import { v4 } from 'uuid';

//导入这两个库，随机生成uuid
export const getUUID = () => {
    return v4();
}