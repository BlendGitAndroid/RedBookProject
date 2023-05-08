//全局类型文件，不需要导入，就可以使用

//.d.ts (d即declare)，ts的声明文件 TypeScript Declaration File

// type Student = {
//     name: string,
//     age: number,
//     hobby?: string
// }

// 在使用TS的时候，最大的一个好处就是可以给JS各种类型约束，使得JS能够完成静态代码分析，推断代码中存在的类型错误或者进行类型提示。
// TS完成类型推断，需要事先知道变量的类型，如果我们都是用TS书写代码，并且给变量都指定了明确的类型，这时TS可以很好的完成类型推断工作。
// 但是有时，我们不免会引入外部的 JS库，这时TS就对引入的JS文件里变量的具体类型不明确了，为了告诉TS变量的类型，因此就有了.d.ts (d即declare)，ts的声明文件。
// TS身为 JS的超集，那么如何让这些第三方库也可以进行类型推导呢，自然需要考虑到如何让 JS 库也能定义静态类型。那么 JavaScript 和 TypeScript 的
// 静态类型交叉口 —— 类型定义文件d.ts(TypeScript Declaration File)，类似于C/C++的.h头文件（#include <stdio.h>），轻松让你的JavaScript也能支持定义静态类型。

// 基于 Typescript 开发的时候，很麻烦的一个问题就是类型定义。导致在编译的时候，经常会看到一连串的找不到类型的提示。“d.ts”文件用于为 TypeScript 提供有关用 JavaScript 
// 编写的 API 的类型信息。简单讲，就是你可以在 ts 中调用的 js 的声明文件。TS的核心在于静态类型，我们在编写 TS 的时候会定义很多的类型，但是主流的库都是 JS编写的，并不支持
// 类型系统。这个时候你不能用TS重写主流的库，这个时候我们只需要编写仅包含类型注释的 d.ts 文件，然后从您的 TS 代码中，可以在仍然使用纯 JS 库的同时，获得静态类型检查的 TS 
// 优势。在此期间，解决的方式经过了许多的变化，从 DefinitelyTyped 到 typings。最后是 @types。在 Typescript 2.0 之后，推荐使用 @types 方式。


// 使png/json/js当成一个模块来引用，这样就不会报图片未找到的错误了
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.webp";
declare module "*.json";
declare module "*.js";

//type:类型别名，其作用就是给类型起一个新名字
//起别名不会新建一个类型 - 它创建了一个新名字来引用那个类型。给基本类型起别名通常没什么用。类型别名常用于联合类型。
type ArticleSimple = {
    id: number;
    title: string;
    userName: string;
    avatarUrl: string;
    favoriteCount: number;
    isFavorite: boolean;
    image: string;
}

type Article = {
    id: number;
    title: string;
    desc: string;
    tag: string[];
    dateTime: string;
    location: string;
    userId: number;
    userName: string;
    isFollow: boolean;
    avatarUrl: string;
    images: string[];
    favoriteCount: number;
    collectionCount: number;
    isFavorite: boolean;
    isCollection: boolean;
    comments?: ArticleComment[];
}

type ArticleComment = {
    userName: string;
    avatarUrl: string;
    message: string;
    dateTime: string;
    location: string;
    favoriteCount: number;
    isFavorite: boolean;
    children?: ArticleComment[];
}

type Category = {
    name: string;
    default: boolean;
    isAdd: boolean;
}

type GoodsSimple = {
    id: number;
    title: string;
    image: string;
    price: number;
    originPrice: number | undefined;
    promotion: string | undefined;
}

type GoodsCategory = {
    id: number;
    name: string;
    image: string;
}

type MessageListItem = {
    id: number;
    name: lastMessage;
    avatarUrl: string;
    lastMessage?: string;
    lastMessageTime?: string;
}

type UnRead = {
    unreadFavorate: number,
    newFollow: number,
    comment: number,
}