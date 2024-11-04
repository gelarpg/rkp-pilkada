import { Team } from "./teamType"

export type User={
    id:number
    uuid:string
    fullname:string
    username:string
    email:string
    role:number
    team_id:Team
    access_token:string
}