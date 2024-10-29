export const getProvinceApi = async () => {
    try{
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/address/provinces`,
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

export const createProvinceApi = async (formData: FormData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/province/create`, {
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

export const updateProvinceApi = async (id:number,formData: FormData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/province/${id}/update`, {
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

export const deleteProvinceApi = async (id:number) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/province/${id}/delete`, {
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

export const getSearchProvincesApi = async (name: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/address/provinces?name=${name}`,
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