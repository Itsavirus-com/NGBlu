import { Schema, InferType as YupInferType } from 'yup'

export type OmitNever<T> = { [K in keyof T as T[K] extends never ? never : K]: T[K] }

export type InferType<T extends Schema> = OmitNever<YupInferType<T>>
