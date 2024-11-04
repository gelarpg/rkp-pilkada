export async function getUserApi() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        const response = await res.json()
        if(response.code === 401){
            return window.location.href = '/'
        }
        return response
    } catch (error) {
        console.log(error)
    }
}
export async function getUsersApi(role_id:number, page:number, limit:number) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user?role=${role_id}&page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        const response = await res.json()
        return response
    } catch (error) {
        console.log(error)
    }
}

export async function getUserByIdApi(id:number) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user?user_id=${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        const response = await res.json()
        return response
    } catch (error) {
        console.log(error)
    }
}

export async function getUserByTeamApi(team_id:number,  page:number, limit:number) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user?team_id=${team_id}&page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        const response = await res.json()
        return response
    } catch (error) {
        console.log(error)
    }
}

export async function searchUserApi(username:string, team_id:number, page:number, limit:number) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user?username=${username}&team_id=${team_id}&page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        const response = await res.json()
        return response
    } catch (error) {
        console.log(error)
    }
}


export async function createUserApi(formData:FormData) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/create`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: formData,
        })
        const response = await res.json()
        return response
    } catch (error) {
        console.log(error)
    }
}

export async function updateUserApi(id:number, formData:FormData) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/${id}/update`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: formData,
        })
        const response = await res.json()
        return response
    } catch (error) {
        console.log(error)
    }
}

export async function deleteUserApi(id:number) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/${id}/delete`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
        })
        const response = await res.json()
        return response
    } catch (error) {
        console.log(error)
    }
}

export const changeFullnameApi = async (formData:FormData, id:number) =>{
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/${id}/change-fullname`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: formData
        })
        const res = await response.json()
        return res
    }catch(error){
        console.log(error)
    }
}

export const changeUsernameApi = async (formData:FormData, id:number) =>{
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/${id}/change-username`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: formData
        })
        const res = await response.json()
        return res
    }catch(error){
        console.log(error)
    }
}

export const changeEmailApi = async (formData:FormData, id:number) =>{
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/${id}/change-email`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: formData
        })
        const res = await response.json()
        return res
    }catch(error){
        console.log(error)
    }
}


export const changeRoleApi = async (formData:FormData, id:number) =>{
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/${id}/change-role`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: formData
        })
        const res = await response.json()
        return res
    }catch(error){
        console.log(error)
    }
}

export const changePasswordApi = async (formData:FormData, id:number) =>{
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/${id}/change-password`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: formData
        })
        const res = await response.json()
        return res
    }catch(error){
        console.log(error)
    }
}
