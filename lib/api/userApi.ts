export async function getUserApi() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user`, {
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