export type AnyObject = Record<string, any>

export type KeyConverter = (data: AnyObject | AnyObject[]) => AnyObject | AnyObject[]
