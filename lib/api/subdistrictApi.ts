
export const getSubSubdistrictApi = async (distCode:number) => {
    try{
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/address/subdistrict?district_code=${distCode}`,
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

export const createSubdistrictApi = async (distCode:number, formData: FormData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/${distCode}/subdistrict/create`, {
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

export const updateSubdistrictApi = async (distCode:number,id:number,formData: FormData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/${distCode}/subdistrict/${id}/update`, {
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

export const deleteSubdistrictApi = async (distCode:number,id:number) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/${distCode}/subdistrict/${id}/delete`, {
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


export const getSubDistrictsApi = async (id: number) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/address/subdistrict?district_code=${id}`,
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

export const getSearchSubDistrictsApi = async (id: number, name: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/address/subdistrict?district_code=${id}&name=${name}`,
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