export interface DocumentValue {
  _type: string
  _id: string
  _rev?: string
  _updatedAt?: string
  _createdAt?: string
  [key: string]: unknown
}
