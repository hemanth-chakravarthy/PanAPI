export interface JwtPayload {
  id: string;         // MongoDB _id of the Seller (ObjectId as string)
  email: string;
  mobile: string;
  uid: string;        // Your custom SELLER-uuid string
  iat?: number;       // (optional) issued at, added by jwt.sign()
  exp?: number;       // (optional) expiry timestamp
}
