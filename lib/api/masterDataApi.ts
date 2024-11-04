export const dataGender: any[] = [
    {
        id: 1,
        name: "laki-laki"
    },
    {
        id: 2,
        name: "perempuan"
    },
]

export const dataRole: any[] = [
    {
        id: 2,
        name: "Koordinator Kabupaten"
    },
    {
        id: 3,
        name: "Koordinator Kecamatan"
    },
    {
        id: 4,
        name: "Koordinator Desa"
    }
]

export const dataCitizen: any[] = [
    {
        id: 1,
        name: "WNI"
    },
    {
        id: 2,
        name: "WNA"
    },
]

export const dataReligion: any[] = [
    {
        id: 1,
        name: "Islam"
    },
    {
        id: 2,
        name: "Kristen"
    },
    {
        id: 3,
        name: "Katolik"
    },
    {
        id: 4,
        name: "Hindu"
    },
    {
        id: 5,
        name: "Budha"
    }
]

export const dataMaritalStatus: any[] = [
    {
        id: 1,
        name: "Menikah"
    },
    {
        id: 2,
        name: "Belum Menikah"
    },
    {
        id: 3,
        name: "Cerai Hidup"
    },
    {
        id: 4,
        name: "Cerai Mati"
    }
]

export const getRwApi = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/address/rukun_warga`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );
        const dataRw = await res.json();
        return dataRw;
    } catch (error) {
        console.log(error);
    }
}
export const getRtApi = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/address/rukun_tetangga`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );
        const dataRt = await res.json();
        return dataRt;
    } catch (error) {
        console.log(error);
    }
}