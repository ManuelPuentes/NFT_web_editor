export async function getCanvasSize({ collection_name }: { collection_name: string }) {

    const params = new URLSearchParams({
        "name": collection_name,
    });
    const requestOptions = {
        method: "GET",
    };
    try {

        const response = await fetch(
            `http://localhost:3000/collection/canvas?` + params,
            requestOptions
        );


        if (!response.ok) {
            throw new Error("Network response was not OK");
        }

        return await response.json();

    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
}
export async function setCanvasSize({ collection_name, size }: {
    collection_name: string, size: {
        width: number,
        height: number
    }
}) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ size });

    const params = new URLSearchParams({
        "name": collection_name,
    });

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
    };

    try {

        const response = await fetch(
            `http://localhost:3000/collection/canvas?` + params,
            requestOptions
        );


        if (!response.ok) {
            throw new Error("Network response was not OK");
        }

        return await response.json();

    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
}


