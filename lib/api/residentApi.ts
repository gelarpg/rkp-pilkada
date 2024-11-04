export async function getResidentListApi(villageCode:number, page:number, limit:number) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/resident?village_code=${villageCode}&page=${page}&limit=${limit}`, {
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
export async function getResidentByTpsApi(TpsId:number, page:number, limit:number) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/resident?tps_id=${TpsId}&page=${page}&limit=${limit}`, {
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
export async function getResidentIdApi(id:number) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/resident/${id}`, {
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

export async function searchResidentApi(TpsId:number, fullname:string, page:number, limit:number) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/resident?tps_id=${TpsId}&fullname=${fullname}&page=${page}&limit=${limit}`, {
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

export async function createResidentApi(formData:FormData) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/resident/create`, {
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

export async function updateResidentApi(formData:FormData, id:number) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/resident/${id}/update`, {
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

export async function deleteResidentApi( id:number) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/resident/${id}/delete`, {
            method: 'DELETE',
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

