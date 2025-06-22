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
  quantity: undefined | number
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


