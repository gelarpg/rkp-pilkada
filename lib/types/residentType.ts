import { Province, District, SubDistrict, Village, RT, RW } from "./addressType"

export type Resident={
    id:number
    nik:string
    fullname:string
    gender:string
    birthdate:string
    work_id:Work
    province_code:Province
    district_code:District
    subdistrict_code:SubDistrict
    village_code:Village
    rukun_warga_id:RW
    rukun_tetangga_id:RT
}

export type Work={
    id:number
    name:string
}

export type Gender ={
    id: number,
    name: string
}