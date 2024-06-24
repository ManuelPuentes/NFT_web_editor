import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */

export async function load({ params }: any) {

    const collectionName = params.collection;

    try {
        await ensureCollectionExist({ collectionName });
        const assets_details = await getCollectionAssetsData({ collectionName });
        const initialDrawOrder = await getInitialDrawOrder({ collectionName });

        return {
            assets_details,
            initialDrawOrder,
            collectionName,
        }

    } catch (e) {
        throw error(400, "internal error")
    }
}


const ensureCollectionExist = async ({ collectionName }: { collectionName: string }) => {

    const params = new URLSearchParams({
        "name": collectionName,
    });

    const requestOptions = {
        method: "GET",
    };

    try {
        const exist = (await fetch(
            `http://localhost:3000/collection/exist?` + params,
            requestOptions
        )).ok;

        if (!exist) {
            throw error(400, "collection not found ");
        }

    } catch (e) {
        throw error(400, "internal error");
    }
}


const getCollectionAssetsData = async ({ collectionName }: { collectionName: string }) => {

    const params = new URLSearchParams({
        "name": collectionName,
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

    } catch (e) {
        throw error(400, "asset list not found ")
    }
}

const getInitialDrawOrder = async ({ collectionName }: { collectionName: string }) => {
    const params = new URLSearchParams({
        "name": collectionName,
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

    } catch (e) {
        throw error(400, "asset list not found ")
    }
}