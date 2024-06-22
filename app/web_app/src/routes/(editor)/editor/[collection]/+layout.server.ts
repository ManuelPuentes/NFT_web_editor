import { error } from '@sveltejs/kit';
import type { AssetDetails } from '../../../../interfaces/AssetDetails';

/** @type {import('./$types').PageLoad} */

export async function load({ params }: any) {

    const collectionName = params.collection;

    try {
        await ensureCollectionExist({ collectionName });
        const assets_details = await getCollectionAssetsData({ collectionName });
        const initialDrawOrder = getInitialDrawOrder(assets_details);

        return {
            assets_details,
            initialDrawOrder,
        }

    } catch (e) {
        throw error(400, "internal error")
    }
}


const ensureCollectionExist = async ({ collectionName }: { collectionName: string }) => {

    const params = new URLSearchParams({
        "name": collectionName,
    })

    try {
        // const result = await (await fetch(`http://localhost:3000/collection/exi?` + params)).json();
    } catch (e) {
        throw error(400, "collection not found ")
    }
}


const getCollectionAssetsData = async ({ collectionName }: { collectionName: string }) => {

    const params = new URLSearchParams({
        "name": collectionName,
    })

    try {
        // const result = await (await fetch(`http://localhost:3000/collection/asset-details?` + params)).json();
        const result = myfectch();
        return result.data;

    } catch (e) {
        throw error(400, "asset list not found ")
    }
}

const getInitialDrawOrder = (assetList: Record<string, Record<string, AssetDetails>> ) => {
    return Object.keys(assetList);
}




const myfectch = () => {

    return {
        "data": {
            "aditionals": {
                "angel": {
                    "file_name": "angel",
                    "directory_name": "aditionals",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/aditionals/angel.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "baronesa": {
                    "file_name": "baronesa",
                    "directory_name": "aditionals",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/aditionals/baronesa.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "catrin": {
                    "file_name": "catrin",
                    "directory_name": "aditionals",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/aditionals/catrin.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "felinojr": {
                    "file_name": "felinojr",
                    "directory_name": "aditionals",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/aditionals/felinojr.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "flameboy": {
                    "file_name": "flameboy",
                    "directory_name": "aditionals",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/aditionals/flameboy.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "generic": {
                    "file_name": "generic",
                    "directory_name": "aditionals",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/aditionals/generic.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "juventud": {
                    "file_name": "juventud",
                    "directory_name": "aditionals",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/aditionals/juventud.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "konnan": {
                    "file_name": "konnan",
                    "directory_name": "aditionals",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/aditionals/konnan.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "laredokid": {
                    "file_name": "laredokid",
                    "directory_name": "aditionals",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/aditionals/laredokid.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "psychoclown": {
                    "file_name": "psychoclown",
                    "directory_name": "aditionals",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/aditionals/psychoclown.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "psychosis": {
                    "file_name": "psychosis",
                    "directory_name": "aditionals",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/aditionals/psychosis.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "psychosis2": {
                    "file_name": "psychosis2",
                    "directory_name": "aditionals",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/aditionals/psychosis2.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "rush": {
                    "file_name": "rush",
                    "directory_name": "aditionals",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/aditionals/rush.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "shuriken": {
                    "file_name": "shuriken",
                    "directory_name": "aditionals",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/aditionals/shuriken.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "superastro": {
                    "file_name": "superastro",
                    "directory_name": "aditionals",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/aditionals/superastro.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "ultimodragon": {
                    "file_name": "ultimodragon",
                    "directory_name": "aditionals",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/aditionals/ultimodragon.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                }
            },
            "backgrounds": {
                "background-0": {
                    "file_name": "background-0",
                    "directory_name": "backgrounds",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/backgrounds/background-0.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "background-1": {
                    "file_name": "background-1",
                    "directory_name": "backgrounds",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/backgrounds/background-1.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "background-10": {
                    "file_name": "background-10",
                    "directory_name": "backgrounds",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/backgrounds/background-10.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "background-11": {
                    "file_name": "background-11",
                    "directory_name": "backgrounds",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/backgrounds/background-11.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "background-12": {
                    "file_name": "background-12",
                    "directory_name": "backgrounds",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/backgrounds/background-12.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "background-13": {
                    "file_name": "background-13",
                    "directory_name": "backgrounds",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/backgrounds/background-13.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "background-14": {
                    "file_name": "background-14",
                    "directory_name": "backgrounds",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/backgrounds/background-14.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "background-15": {
                    "file_name": "background-15",
                    "directory_name": "backgrounds",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/backgrounds/background-15.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "background-16": {
                    "file_name": "background-16",
                    "directory_name": "backgrounds",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/backgrounds/background-16.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "background-17": {
                    "file_name": "background-17",
                    "directory_name": "backgrounds",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/backgrounds/background-17.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "background-18": {
                    "file_name": "background-18",
                    "directory_name": "backgrounds",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/backgrounds/background-18.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "background-19": {
                    "file_name": "background-19",
                    "directory_name": "backgrounds",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/backgrounds/background-19.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "background-2": {
                    "file_name": "background-2",
                    "directory_name": "backgrounds",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/backgrounds/background-2.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "background-20": {
                    "file_name": "background-20",
                    "directory_name": "backgrounds",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/backgrounds/background-20.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "background-21": {
                    "file_name": "background-21",
                    "directory_name": "backgrounds",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/backgrounds/background-21.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "background-22": {
                    "file_name": "background-22",
                    "directory_name": "backgrounds",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/backgrounds/background-22.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "background-3": {
                    "file_name": "background-3",
                    "directory_name": "backgrounds",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/backgrounds/background-3.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "background-4": {
                    "file_name": "background-4",
                    "directory_name": "backgrounds",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/backgrounds/background-4.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "background-5": {
                    "file_name": "background-5",
                    "directory_name": "backgrounds",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/backgrounds/background-5.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "background-6": {
                    "file_name": "background-6",
                    "directory_name": "backgrounds",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/backgrounds/background-6.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "background-7": {
                    "file_name": "background-7",
                    "directory_name": "backgrounds",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/backgrounds/background-7.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "background-8": {
                    "file_name": "background-8",
                    "directory_name": "backgrounds",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/backgrounds/background-8.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "background-9": {
                    "file_name": "background-9",
                    "directory_name": "backgrounds",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/backgrounds/background-9.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                }
            },
            "basemasks": {
                "aeroboy": {
                    "file_name": "aeroboy",
                    "directory_name": "basemasks",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/basemasks/aeroboy.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "aeroboyclosed": {
                    "file_name": "aeroboyclosed",
                    "directory_name": "basemasks",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/basemasks/aeroboyclosed.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "angel": {
                    "file_name": "angel",
                    "directory_name": "basemasks",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/basemasks/angel.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "baronesa": {
                    "file_name": "baronesa",
                    "directory_name": "basemasks",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/basemasks/baronesa.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "catrin": {
                    "file_name": "catrin",
                    "directory_name": "basemasks",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/basemasks/catrin.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "chicatormenta": {
                    "file_name": "chicatormenta",
                    "directory_name": "basemasks",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/basemasks/chicatormenta.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "dragonlee": {
                    "file_name": "dragonlee",
                    "directory_name": "basemasks",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/basemasks/dragonlee.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "felinojr": {
                    "file_name": "felinojr",
                    "directory_name": "basemasks",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/basemasks/felinojr.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "flameboy": {
                    "file_name": "flameboy",
                    "directory_name": "basemasks",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/basemasks/flameboy.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "generic": {
                    "file_name": "generic",
                    "directory_name": "basemasks",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/basemasks/generic.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "generic2": {
                    "file_name": "generic2",
                    "directory_name": "basemasks",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/basemasks/generic2.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "generic3": {
                    "file_name": "generic3",
                    "directory_name": "basemasks",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/basemasks/generic3.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "juventud": {
                    "file_name": "juventud",
                    "directory_name": "basemasks",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/basemasks/juventud.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "konnan": {
                    "file_name": "konnan",
                    "directory_name": "basemasks",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/basemasks/konnan.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "laredokid--5": {
                    "file_name": "laredokid--5",
                    "directory_name": "basemasks",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/basemasks/laredokid--5.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "laredokid": {
                    "file_name": "laredokid",
                    "directory_name": "basemasks",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/basemasks/laredokid.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "luchamask": {
                    "file_name": "luchamask",
                    "directory_name": "basemasks",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/basemasks/luchamask.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "matematico": {
                    "file_name": "matematico",
                    "directory_name": "basemasks",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/basemasks/matematico.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "psychoclown": {
                    "file_name": "psychoclown",
                    "directory_name": "basemasks",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/basemasks/psychoclown.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "psychosis": {
                    "file_name": "psychosis",
                    "directory_name": "basemasks",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/basemasks/psychosis.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "psychosis2": {
                    "file_name": "psychosis2",
                    "directory_name": "basemasks",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/basemasks/psychosis2.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "rush": {
                    "file_name": "rush",
                    "directory_name": "basemasks",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/basemasks/rush.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "shuriken": {
                    "file_name": "shuriken",
                    "directory_name": "basemasks",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/basemasks/shuriken.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "solar": {
                    "file_name": "solar",
                    "directory_name": "basemasks",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/basemasks/solar.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "superastro": {
                    "file_name": "superastro",
                    "directory_name": "basemasks",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/basemasks/superastro.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "ultimodragon": {
                    "file_name": "ultimodragon",
                    "directory_name": "basemasks",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/basemasks/ultimodragon.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                }
            },
            "eyes": {
                "aaaa": {
                    "file_name": "aaaa",
                    "directory_name": "eyes",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/eyes/aaaa.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "aeroboy": {
                    "file_name": "aeroboy",
                    "directory_name": "eyes",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/eyes/aeroboy.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "aeroboyclosed": {
                    "file_name": "aeroboyclosed",
                    "directory_name": "eyes",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/eyes/aeroboyclosed.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "angel": {
                    "file_name": "angel",
                    "directory_name": "eyes",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/eyes/angel.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "baronesa": {
                    "file_name": "baronesa",
                    "directory_name": "eyes",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/eyes/baronesa.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "catrin": {
                    "file_name": "catrin",
                    "directory_name": "eyes",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/eyes/catrin.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "chicatormenta": {
                    "file_name": "chicatormenta",
                    "directory_name": "eyes",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/eyes/chicatormenta.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "dragonlee": {
                    "file_name": "dragonlee",
                    "directory_name": "eyes",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/eyes/dragonlee.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "felinojr": {
                    "file_name": "felinojr",
                    "directory_name": "eyes",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/eyes/felinojr.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "flameboy": {
                    "file_name": "flameboy",
                    "directory_name": "eyes",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/eyes/flameboy.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "generic": {
                    "file_name": "generic",
                    "directory_name": "eyes",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/eyes/generic.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "generic2": {
                    "file_name": "generic2",
                    "directory_name": "eyes",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/eyes/generic2.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "generic3": {
                    "file_name": "generic3",
                    "directory_name": "eyes",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/eyes/generic3.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "juventud": {
                    "file_name": "juventud",
                    "directory_name": "eyes",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/eyes/juventud.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "konnan": {
                    "file_name": "konnan",
                    "directory_name": "eyes",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/eyes/konnan.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "laredokid - Copy": {
                    "file_name": "laredokid - Copy",
                    "directory_name": "eyes",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/eyes/laredokid - Copy.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "laredokid": {
                    "file_name": "laredokid",
                    "directory_name": "eyes",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/eyes/laredokid.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "luchamask": {
                    "file_name": "luchamask",
                    "directory_name": "eyes",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/eyes/luchamask.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "matematico": {
                    "file_name": "matematico",
                    "directory_name": "eyes",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/eyes/matematico.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "psychoclown": {
                    "file_name": "psychoclown",
                    "directory_name": "eyes",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/eyes/psychoclown.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "psychosis": {
                    "file_name": "psychosis",
                    "directory_name": "eyes",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/eyes/psychosis.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "psychosis2": {
                    "file_name": "psychosis2",
                    "directory_name": "eyes",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/eyes/psychosis2.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "rush": {
                    "file_name": "rush",
                    "directory_name": "eyes",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/eyes/rush.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "shuriken": {
                    "file_name": "shuriken",
                    "directory_name": "eyes",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/eyes/shuriken.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "solar": {
                    "file_name": "solar",
                    "directory_name": "eyes",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/eyes/solar.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "superastro": {
                    "file_name": "superastro",
                    "directory_name": "eyes",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/eyes/superastro.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "ultimodragon": {
                    "file_name": "ultimodragon",
                    "directory_name": "eyes",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/eyes/ultimodragon.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                }
            },
            "faces": {
                "---": {
                    "file_name": "---",
                    "directory_name": "faces",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/faces/---.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "aeroboy": {
                    "file_name": "aeroboy",
                    "directory_name": "faces",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/faces/aeroboy.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "aeroboyclosed": {
                    "file_name": "aeroboyclosed",
                    "directory_name": "faces",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/faces/aeroboyclosed.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "angel": {
                    "file_name": "angel",
                    "directory_name": "faces",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/faces/angel.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "catrin": {
                    "file_name": "catrin",
                    "directory_name": "faces",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/faces/catrin.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "chicatormenta": {
                    "file_name": "chicatormenta",
                    "directory_name": "faces",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/faces/chicatormenta.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "dragonlee": {
                    "file_name": "dragonlee",
                    "directory_name": "faces",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/faces/dragonlee.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "felinojr": {
                    "file_name": "felinojr",
                    "directory_name": "faces",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/faces/felinojr.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "generic": {
                    "file_name": "generic",
                    "directory_name": "faces",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/faces/generic.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "generic3": {
                    "file_name": "generic3",
                    "directory_name": "faces",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/faces/generic3.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "konnan": {
                    "file_name": "konnan",
                    "directory_name": "faces",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/faces/konnan.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "laredokid": {
                    "file_name": "laredokid",
                    "directory_name": "faces",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/faces/laredokid.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "luchamask": {
                    "file_name": "luchamask",
                    "directory_name": "faces",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/faces/luchamask.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "matematico": {
                    "file_name": "matematico",
                    "directory_name": "faces",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/faces/matematico.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "psychoclown": {
                    "file_name": "psychoclown",
                    "directory_name": "faces",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/faces/psychoclown.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "psychosis": {
                    "file_name": "psychosis",
                    "directory_name": "faces",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/faces/psychosis.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "psychosis2": {
                    "file_name": "psychosis2",
                    "directory_name": "faces",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/faces/psychosis2.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "rush": {
                    "file_name": "rush",
                    "directory_name": "faces",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/faces/rush.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "shuriken": {
                    "file_name": "shuriken",
                    "directory_name": "faces",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/faces/shuriken.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "solar": {
                    "file_name": "solar",
                    "directory_name": "faces",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/faces/solar.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "superastro": {
                    "file_name": "superastro",
                    "directory_name": "faces",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/faces/superastro.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                }
            },
            "fighter": {
                "fighter_0": {
                    "file_name": "fighter_0",
                    "directory_name": "fighter",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/fighter/fighter_0.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "fighter_1": {
                    "file_name": "fighter_1",
                    "directory_name": "fighter",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/fighter/fighter_1.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "fighter_2": {
                    "file_name": "fighter_2",
                    "directory_name": "fighter",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/fighter/fighter_2.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "fighter_3": {
                    "file_name": "fighter_3",
                    "directory_name": "fighter",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/fighter/fighter_3.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "fighter_4": {
                    "file_name": "fighter_4",
                    "directory_name": "fighter",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/fighter/fighter_4.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                }
            },
            "helpers": {
                "ultimodragon": {
                    "file_name": "ultimodragon",
                    "directory_name": "helpers",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/helpers/ultimodragon.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                }
            },
            "mouths": {
                "aeroboyclosed": {
                    "file_name": "aeroboyclosed",
                    "directory_name": "mouths",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/mouths/aeroboyclosed.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "angel--": {
                    "file_name": "angel--",
                    "directory_name": "mouths",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/mouths/angel--.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "angel": {
                    "file_name": "angel",
                    "directory_name": "mouths",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/mouths/angel.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "catrin": {
                    "file_name": "catrin",
                    "directory_name": "mouths",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/mouths/catrin.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "flameboy": {
                    "file_name": "flameboy",
                    "directory_name": "mouths",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/mouths/flameboy.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "generic": {
                    "file_name": "generic",
                    "directory_name": "mouths",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/mouths/generic.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "generic2": {
                    "file_name": "generic2",
                    "directory_name": "mouths",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/mouths/generic2.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "generic3": {
                    "file_name": "generic3",
                    "directory_name": "mouths",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/mouths/generic3.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "lllll": {
                    "file_name": "lllll",
                    "directory_name": "mouths",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/mouths/lllll.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "luchamask": {
                    "file_name": "luchamask",
                    "directory_name": "mouths",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/mouths/luchamask.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "matematico": {
                    "file_name": "matematico",
                    "directory_name": "mouths",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/mouths/matematico.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "psychoclown": {
                    "file_name": "psychoclown",
                    "directory_name": "mouths",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/mouths/psychoclown.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "shuriken": {
                    "file_name": "shuriken",
                    "directory_name": "mouths",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/mouths/shuriken.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "solar": {
                    "file_name": "solar",
                    "directory_name": "mouths",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/mouths/solar.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "superastro": {
                    "file_name": "superastro",
                    "directory_name": "mouths",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/mouths/superastro.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                }
            },
            "signatures": {
                "aeroboy": {
                    "file_name": "aeroboy",
                    "directory_name": "signatures",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/signatures/aeroboy.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "baronesa": {
                    "file_name": "baronesa",
                    "directory_name": "signatures",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/signatures/baronesa.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "chicatormenta": {
                    "file_name": "chicatormenta",
                    "directory_name": "signatures",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/signatures/chicatormenta.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "dragonlee": {
                    "file_name": "dragonlee",
                    "directory_name": "signatures",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/signatures/dragonlee.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "felinojr": {
                    "file_name": "felinojr",
                    "directory_name": "signatures",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/signatures/felinojr.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "juventud": {
                    "file_name": "juventud",
                    "directory_name": "signatures",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/signatures/juventud.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "konnan": {
                    "file_name": "konnan",
                    "directory_name": "signatures",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/signatures/konnan.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "laredokid": {
                    "file_name": "laredokid",
                    "directory_name": "signatures",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/signatures/laredokid.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "matematico": {
                    "file_name": "matematico",
                    "directory_name": "signatures",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/signatures/matematico.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "oscar": {
                    "file_name": "oscar",
                    "directory_name": "signatures",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/signatures/oscar.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "piratamorgan": {
                    "file_name": "piratamorgan",
                    "directory_name": "signatures",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/signatures/piratamorgan.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "psychoclown": {
                    "file_name": "psychoclown",
                    "directory_name": "signatures",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/signatures/psychoclown.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "psychosis": {
                    "file_name": "psychosis",
                    "directory_name": "signatures",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/signatures/psychosis.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "rush": {
                    "file_name": "rush",
                    "directory_name": "signatures",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/signatures/rush.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "solar": {
                    "file_name": "solar",
                    "directory_name": "signatures",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/signatures/solar.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "superastro": {
                    "file_name": "superastro",
                    "directory_name": "signatures",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/signatures/superastro.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "taurus": {
                    "file_name": "taurus",
                    "directory_name": "signatures",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/signatures/taurus.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "ultimodragon": {
                    "file_name": "ultimodragon",
                    "directory_name": "signatures",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/signatures/ultimodragon.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                },
                "unknown": {
                    "file_name": "unknown",
                    "directory_name": "signatures",
                    "file_asset_path": "http://localhost:9999/files/luchamask/assets/signatures/unknown.svg",
                    "styles": "",
                    "transform": "",
                    "scale": "",
                    "rotate": ""
                }
            }
        }
    }
}