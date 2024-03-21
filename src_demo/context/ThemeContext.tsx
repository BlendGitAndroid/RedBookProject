import { createContext } from "react";

//创建Context
export const ThemeContext = createContext<string>('dark')

// 在 React 中，`Context` 提供了一种在组件树中共享数据的方式，而无需显式地通过组件的 props 传递。这在处理一些全局数据，如主题设置、用户信息等，特别有用。
// 在这个例子中，`ThemeContext.Provider` 组件允许你将 `theme` 的值传递给子组件树。在你的代码中，`ThemeContext` 是一个已经创建的 `Context` 对象。你可以通过 `useContext(ThemeContext)` 钩子函数
// 来获取当前的 `Context` 值。这个值是最近的 `ThemeContext.Provider` 提供的，如果找不到 `Provider`，则使用 `ThemeContext` 的默认值。
// 在这个例子中，`theme` 变量就是 `ThemeContext` 的当前值。然后，你根据 `theme` 的值来选择使用 `darkStyles` 还是 `lightStyles`，这两个变量可能是你在其他地方定义的样式对象。
// 这就是在 React Native 中使用 `Context` 的基本方式。你可以使用它来实现许多功能，如主题切换、语言切换、用户状态管理等。