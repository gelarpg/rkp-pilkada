export const registerApi = async (userData: { username: string; email: string; password: string , password_confirmation:string}) =>{
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        const res = await response.json()
        return res
    }catch(error){
        console.log(error)
    }
}

export const loginApi = async (userData: { username: string; password: string }) =>{
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        const res = await response.json()
        return res
    }catch(error){
        console.log(error)
    }
}

export const forgotPasswordlApi = async (formData:FormData) =>{
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
        const res = await response.json()
        return res
    }catch(error){
        console.log(error)
    }
}

export const resetPasswordlApi = async (formData:FormData) =>{
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/reset-password`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
        const res = await response.json()
        return res
    }catch(error){
        console.log(error)
    }
}

export const updateAccountApi = async (formData:FormData) =>{
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/update`, {
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

export const updateUsernameApi = async (formData:FormData) =>{
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/update-username`, {
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

export const updateEmailApi = async (formData:FormData) =>{
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/update-email`, {
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

export const changePasswordApi = async (formData:FormData) =>{
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/change`, {
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


