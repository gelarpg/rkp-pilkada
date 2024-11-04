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

export const getVillageByIdApi = async (id: number) => {
    try{
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/address/village/${id}`,
        {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        }
    );
    const dataVillage = await res.json();
    console.log(dataVillage);
    return dataVillage;
    } catch (error) {
    console.log(error);
    }
}


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