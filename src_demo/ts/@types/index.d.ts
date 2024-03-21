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

// 在 TypeScript 中，`type` 和 `class` 都可以用来定义新的类型，但它们有一些重要的区别。
// 1. `type` 是 TypeScript 的一个特性，它用于定义类型别名，可以表示任何类型，包括基本类型（如 `string`、`number`）、联合类型、交叉类型等。`type` 只存
// 在于编译时，不会生成任何实际的 JavaScript 代码。
// 2. `class` 是 ES6 的一个特性，也被 TypeScript 支持。`class` 不仅可以定义类型，还可以包含实现（如方法）。`class` 在编译后会生成实际的 JavaScript 代码，
// 可以用来创建对象实例。
// 在你的代码中，`Student` 是一个类型别名，它定义了一个对象类型。如果你想要创建一个 `Student` 对象，你可以直接使用字面量语法，
// 如 `{ name: 'Alice', age: 20 }`。但是，如果 `Student` 是一个类，你需要使用 `new` 关键字来创建一个新的实例，如 `new Student('Alice', 20)`。
// 此外，类还支持继承（通过 `extends` 关键字），可以创建子类。而类型别名则不支持继承，但可以通过交叉类型来组合多个类型。
// 总的来说，`type` 和 `class` 在 TypeScript 中都是非常重要的概念，它们各有用途。你应该根据具体的需求来选择使用哪一个。
type Student = {
    name: string,
    age: number,
    hobby?: string[]
}

// `.d.ts` 文件在 TypeScript 中被称为声明文件。它们的主要作用是为 JavaScript 代码提供类型信息，使得 TypeScript 能够理解 JavaScript 代码的类型结构。
// 在 TypeScript 项目中，`.d.ts` 文件通常用于以下几种情况：
// 1. 当你在 TypeScript 项目中使用 JavaScript 库时，你可能需要一个对应的 `.d.ts` 文件，以便 TypeScript 能够理解这个库的 API。许多流行的 JavaScript 
// 库都有社区提供的 `.d.ts` 文件，你可以通过 DefinitelyTyped 项目获取。
// 2. 当你在项目中编写 JavaScript 代码时，你也可以创建一个 `.d.ts` 文件，为这些代码提供类型信息。
// 3. 当你编写 TypeScript 库时，你可以生成一个 `.d.ts` 文件，作为你库的公共 API 的类型定义。这样，其他使用你的库的 TypeScript 项目就可以获得类型检查
// 和自动补全等功能。
// 在你的代码中，`index.d.ts` 文件定义了 `Info` 命名空间和 `Student` 类型。这意味着在其他 TypeScript 文件中，你可以使用 `Info.Dog` 和 `Student` 这
// 两个类型。