export type Province ={
    id:number
    code:number
    name:string
}

export type District ={
    id:number
    code:number
    province_code:number
    name:string
}

export type SubDistrict ={
    id:number
    code:number
    district_code:number
    name:string
}

export type Village ={
    id:number
    code:number
    subdistrict_code:number
    name:string
    subdistrict:SubDistrict
    district:District
    province:Province
}

export type RW ={
    id:number
    name:string
}
export type RT ={
    id:number
    name:string
}

