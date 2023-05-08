//局部类型文件，只能在当前目录中使用

//把一个模块的类型定义在一个命名空间内部，可以起到分组和归纳的作用
//当调用的时候，需要指明不同的命名空间，用于局部模块
declare namespace Info {

    type Dog = {
        name: string,
        age: number,
        weight: number
    }

}

type Student = {
    name: string,
    age: number,
    hobby?: string[]
}