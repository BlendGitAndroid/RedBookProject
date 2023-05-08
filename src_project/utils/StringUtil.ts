export function formatPhone(phone: string): string {
    let trim: string = phone.replace(/\s+/g, '');
    const result = [
        trim.slice(0, 3),
        trim.slice(3, 7),
        trim.slice(7, 11)
    ].filter(item => !!item)    //!!双感叹号，真实有值的才要，没有值的就不要
        .join(' '); //添加空格，将array数据中每个元素都转为字符串，用自定义的连接符分割
        
    return result;
}

export function replaceBlank(phone: string): string {
    return phone ? phone.replace(/\s+/g, '') : '';
}