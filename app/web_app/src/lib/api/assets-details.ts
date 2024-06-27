import type { AssetDetails } from "../../interfaces/AssetDetails";

export async function setAssetsDetails({ assets_details, collection_name }: {
    collection_name: string;
    assets_details: Record<string, Record<string, AssetDetails>>,

}) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const raw = JSON.stringify({ assets_details });

    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw
    };

    const response = await fetch(
        `http://localhost:3000/collection/asset-datails?name=${collection_name}`,
        requestOptions
    );

    if (response.ok) {
        return await response.text();
    } else {
        throw new Error('Request failed');
    }
}
export async function getCollectionAssetsData({ collection_name }: { collection_name: string }) {

    const params = new URLSearchParams({
        "name": collection_name,
    });

    const requestOptions = {
        method: "GET",
    };

    try {
        const result = await (await fetch(
            `http://localhost:3000/collection/asset-details?` + params,
            requestOptions
        )).json();

        return result.data;

    } catch (e: any) {
        throw new Error(e.message);
    }
}