export interface UserInf{
    _id:string,
    firebaseUID: string,
    name: string,
    cart?: Array<any>,
    address:{
        houseNo:number,
        street: string,
        city: string,
        pincode: number
    },
    email:string,
    orders?: Array<any>
}