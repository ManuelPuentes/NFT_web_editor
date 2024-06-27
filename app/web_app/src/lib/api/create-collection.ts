export async function createCollection({ collection_name, collection_assets }: { collection_name: string, collection_assets: File }) {

    const formdata = new FormData();

    formdata.append(
        "assets",
        collection_assets,
    );

    const requestOptions = {
        method: "POST",
        body: formdata,
    };

    const params = new URLSearchParams({
        "name": collection_name,
        "amount": "100",
    })


    try {
        let response: any = await fetch(`http://localhost:3000/collection/create?` + params, requestOptions);

        if (!response.ok) {
            response = await response.json();
            throw new Error(response.message);
        }

    } catch (e: any) {
        throw new Error('Request failed');
    };
}