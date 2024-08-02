export async function getCanvasSize({ collection_name }: Collection) {
	return { width: 1000, height: 1000 };
}

interface Collection {
	collection_name: string;
}
