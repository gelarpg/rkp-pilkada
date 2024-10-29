export const getVillageApi = async (subdistCode: number) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/address/village?subdistrict_code=${subdistCode}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );
        const response = await res.json();
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const createVillageApi = async (subdistCode: number, formData: FormData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/${subdistCode}/village/create`, {
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
};

export const updateVillageApi = async (subdistCode: number, id: number, formData: FormData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/${subdistCode}/village/${id}/update`, {
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
};

export const deleteVillageApi = async (subdistCode: number, id: number) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/${subdistCode}/village/${id}/delete`, {
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
};

export const getPremiumVillagesApi = async (page:number, limit:number) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/premium?page=${page}&limit=${limit}`,
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
            }
        );
        const response = await res.json();
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const searchPremiumVillageApi = async (name:string, page:number, limit:number) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/premium?name=${name}&page=${page}&limit=${limit}`,
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
            }
        );
        const response = await res.json();
        console.log(response)
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const updatePremiumVillageApi = async ( village_code: number) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/premium/${village_code}/update`, {
            method: 'POST',
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
};
export const deletePremiumVillageApi = async ( id: number) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/premium/${id}/delete`, {
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
};

export const getVillagesApi = async (id: number) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/address/village?subdistrict_code=${id}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );
        const response = await res.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}
export const getSearchVillagesApi = async (id: number, name:string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/address/village?subdistrict_code=${id}&name=${name}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );
        const response = await res.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}