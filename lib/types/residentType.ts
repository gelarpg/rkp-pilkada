import { SubDistrict, Village, RT, RW } from "./addressType"
import { Profession } from "./professionType"
import { Tps } from "./TpsType"

export type Resident={
    id:number
    tps_id:Tps
    user_id:number
    nik:string
    fullname:string
    gender:string
    born_place:string
    birthdate:string
    blood_type:string
    address:string
    religion:string
    rw_id:RW
    rt_id:RT
    subdistrict_code:SubDistrict
    village_code:Village
    marital_status_id:MaritalStatus
    profession_id:Profession
    citizenship:string
    valid_until:string
}


export type Gender ={
    id: number,
    name: string
}
export type MaritalStatus ={
    id: number,
    name: string
}