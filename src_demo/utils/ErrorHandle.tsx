

const defaultHandler = ErrorUtils.getGlobalHandler && ErrorUtils.getGlobalHandler();

// 普通 JavaScript 报错的处理逻辑：重写回调函数的方式,获取错误信息
ErrorUtils.setGlobalHandler((error: Error, isFatal?: boolean) => {
    console.log(
        `Global Error Handled: ${JSON.stringify(
            {
                isFatal,
                errorName: error.name,
                errorMessage: error.message,
                errorStack: error.stack,
            },
            null,
            2,
        )}`,
    );

    defaultHandler(error, isFatal);
});

// Promise 报错的收集
const cusotomtRejectionTrackingOptions = {
    allRejections: true,
    onUnhandled: (id: string, error: Error) => {
        console.log(
            `Possible Unhandled Promise Rejection: ${JSON.stringify({
                id,
                errorMessage: error.message,
                errorStack: error.stack,
            }, null, 2)}`);
    },
    onHandled: (id: string) => { }
}

// @ts-ignore
if (global?.HermesInternal?.hasPromise?.()) {
    if (__DEV__) {
        // @ts-ignore
        global.HermesInternal?.enablePromiseRejectionTracker?.(
            cusotomtRejectionTrackingOptions,
        );
    }
} else {
    if (__DEV__) {
        require('promise/setimmediate/rejection-tracking').enable(
            cusotomtRejectionTrackingOptions,
        );
    }
}
