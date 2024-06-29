export async function getDrawOrder({ collection_name }: { collection_name: string }) {
    const params = new URLSearchParams({
        "name": collection_name,
    });
    const requestOptions = {
        method: "GET",
    };

    try {
        const result = await (await fetch(
            `http://localhost:3000/collection/draw-order?` + params,
            requestOptions
        )).json();

        return result.data;

    } catch (e: any) {
        throw new Error(e.message);
    }
}

export async function setDrawOrder({ collection_name, draw_order }: { collection_name: string, draw_order: Array<string> }) {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const params = new URLSearchParams({
        "name": collection_name,
    });


    const raw = JSON.stringify({ draw_order });

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
    };
    try {
        let response = await (await fetch(
            `http://localhost:3000/collection/draw-order?` + params,
            requestOptions
        )).json();

        if (!response.ok) {
            response = await response.json();
            throw new Error(response.message);
        }

    } catch (e: any) {
        throw new Error(e.message);
    }
}