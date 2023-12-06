// import * as Sentry from '@sentry/react-native';
import React, { ErrorInfo } from 'react';
import { Text, View } from 'react-native';


export default class MonitorExample extends React.Component<{}, { hasError: boolean, renderError: boolean }> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    // 处理 Promise 报错
    this.attachUnhandledRejectionHandler();
    // 处理 JS 报错
    this.attachErrorHandler();
    this.state = { hasError: false, renderError: false };
  }

  // 渲染备用 UI，处理 JSX 报错
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // 打印错误信息
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log('componentDidCatch', error, info);
  }

  render() {
    if (this.state.hasError) return <Text>JSX 报错了</Text>;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* @ts-ignore */}
        <Text>herems: {(!!global.HermesInternal).toString()}</Text>

        <View style={{ height: 20 }}></View>


        <Text
          onPress={() => {
            throw new Error('My first Sentry error!2222');
          }}>
          throw js error
        </Text>

        <View style={{ height: 20 }}></View>

        <Text onPress={() => {
          new Promise((resolve, reject) => {
            setTimeout(() => {
              reject(new Error('抛出 Promise 报错'));
            }, 0);
          })
        }}>throw promise error</Text>

        <View style={{ height: 20 }}></View>


        <Text
          onPress={() => {
            this.setState({ renderError: true });
          }}>
          throw JSX error
        </Text>

        <View style={{ height: 20 }}></View>

        {this.state.renderError && <div></div>}
      </View>
    );
  }

  attachUnhandledRejectionHandler(): void {
    const rejectionTrackingOptions = {
      allRejections: true,
      onUnhandled: (id: string, error: Error) => {
        console.log(
          `Possible Unhandled Promise Rejection: ${JSON.stringify({
            id,
            error,
          }, null, 2)}`,
        );
      },
      onHandled: (id: string) => {

        console.log(
          `Promise Rejection Handled: ${JSON.stringify(
            {
              id,
            },
            null,
            2,
          )}`,
        )
      }
    }

    // console.log('global?.HermesInternal', global?.HermesInternal)
    // @ts-ignore
    if (global?.HermesInternal?.hasPromise?.()) {
      console.log('HermesInternal?.hasPromise')
      // @ts-ignore
      global.HermesInternal?.enablePromiseRejectionTracker?.(rejectionTrackingOptions);
    } else {
      const tracking: {
        disable: () => void;
        enable: (arg: unknown) => void;
      } = require('promise/setimmediate/rejection-tracking');
      tracking.disable();

      tracking.enable(rejectionTrackingOptions);
    }
  }


  attachErrorHandler(): void {
    const defaultHandler =
      ErrorUtils.getGlobalHandler && ErrorUtils.getGlobalHandler();

    ErrorUtils.setGlobalHandler((error: Error, isFatal?: boolean) => {
      console.warn(
        `Global Error Handled: ${JSON.stringify(
          {
            isFatal,
            errorName: error.name,
            errorMessage: error.message,
            // @ts-ignore
            componentStack: error.componentStack,
            errorStack: error.stack,
          },
          null,
          2,
        )}`,
      );
      // console.log(typeof error.stack,error.stack);
      defaultHandler(error, isFatal);
    });
  }
}
