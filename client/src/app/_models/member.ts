import { Photo } from "./photo"


  export interface Member {
    id: number
    userName: string
    photoUrl: string
    passwordHash: string
    passwordSalt: string
    age: number
    knownAs: string
    created: string
    lastActive: string
    gender: string
    interests: string
    introduction: string
    lookingFor: string
    city: string
    country: string
    photos: Photo[]
  }
