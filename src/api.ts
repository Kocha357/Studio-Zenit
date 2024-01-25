async function fetchData(
	url: string,
	index: number
): Promise<{ imageInfoArray: { imageUrl: string; imageAlt: string }[]; aboutText?: string }> {
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const imgData = await response.json();
		const aboutText: string = imgData?.data[0]?.attributes.aboutText || "";
		const allImages: any[] = imgData?.data[index]?.attributes?.image?.data || [];
		const imageInfoArray = allImages.map((image: any) => {
			const imageUrl = image?.attributes?.url || "";
			const imageAlt = image?.attributes?.alternativeText || "";
			return { imageUrl, imageAlt };
		});

		return { imageInfoArray, aboutText };
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
}

export default fetchData;
