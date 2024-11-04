import { District, Province, SubDistrict, Village } from "./addressType"

export type Tps = {
    id: number
    team_id: number
    user_id: number
    name: string
    province_code: Province
    district_code: District
    subdistrict_code: SubDistrict
    village_code: Village

}