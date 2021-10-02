---
id: utils
title: Utils
---

# Reference

## Exported Functions

#### `getActiveElement(doc?: Document): Element | null`

#### `getIn(obj: any, key: string | string[], def?: any, p?: number): any`

#### `setIn(obj: any, path: string, value: any): any`

#### `setNestedObjectValues<T>(object: any, value: any, visited?: any, response?: any): T`

#### `isEmptyArray: (value?: any) => boolean`

#### `isFunction: (obj: any) => obj is Function`

#### `isObject: (obj: any) => obj is Object`

#### `isInteger: (obj: any) => boolean`

#### `isString: (obj: any) => obj is string`

#### `isNaN: (obj: any) => boolean`

#### `isEmptyChildren: (children: any) => boolean`

#### `isPromise: (value: any) => value is PromiseLike<any>`

#### `isInputEvent: (value: any) => value is React.SyntheticEvent<any, Event>`
