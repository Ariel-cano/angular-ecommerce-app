export interface signUp{
  name: string,
  email: string,
  password: string
}

export interface login{
  email: string,
  password: string
}

export interface Product {
  name: string,
  price: number,
  category: string,
  color: string,
  description: string,
  image:string,
  id: string,
  quantity: undefined | number,
  productId: undefined | string
}

export interface cart{
  name: string,
  price: number,
  category: string,
  color: string,
  description: string,
  image:string,
  id: string | undefined,
  quantity: undefined | number,
  productId: string,
  userId: string
}

export interface priceSummary{
  price: number,
  discount: number,
  tax: number,
  delivery: number,
  total: number
}

export interface contactData{
  email: string,
  address: string,
  contact: string
}

export interface order{
  email: string,
  address: string,
  contact: string,
  userId: string,
  totalPrice: number,
  id: string | undefined
}


