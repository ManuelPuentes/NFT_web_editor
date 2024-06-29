export async function ensureCollectionExist({ collection_name }: { collection_name: string }) {

    const params = new URLSearchParams({
        "name": collection_name,
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
            throw new Error("collection not found ");
        }
        return true;

    } catch (e: any) {
        throw new Error(e.message);
    }
}