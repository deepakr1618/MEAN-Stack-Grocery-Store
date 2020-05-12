export interface OrderInf {
  buyer:  string,
  total: number,
  cart: Array<any>,
  address:{
    houseNo : number,
    street : string,
    city: string,
    pincode : number
  }
}