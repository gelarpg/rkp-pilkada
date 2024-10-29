export const getDistrictApi = async (provCode:number) => {
    try{
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/address/district?province_code=${provCode}`,
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

export const createDistrictApi = async (provCode:number, formData: FormData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/${provCode}/district/create`, {
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

export const updateDistrictApi = async (provCode:number,id:number,formData: FormData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/${provCode}/district/${id}/update`, {
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

export const deleteDistrictApi = async (provCode:number,id:number) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/${provCode}/district/${id}/delete`, {
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

export const getSearchDistrictsApi = async (id: number, name: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/address/district?province_code=${id}&name=${name}`,
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