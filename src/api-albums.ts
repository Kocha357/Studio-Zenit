async function fetchAlbums(
	apiUrl: string
): Promise<{ albums: { headingText: string; images: { imageUrl: string; imageAlt: string }[] }[] }> {
	try {
		const response = await fetch(apiUrl);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const imgData = await response.json();

		const allImages: any[] = imgData?.data || [];
		const albums = allImages.map((item: any) => {
			const headingText: string = item?.attributes.headingText || "";
			const images = item?.attributes?.images?.data || [];

			const imageInfoArray = images.map((image: any) => {
				const imageUrl = image?.attributes?.url || "";
				const imageAlt = image?.attributes?.alternativeText || "";
				return { imageUrl, imageAlt };
			});

			return { headingText, images: imageInfoArray };
		});

		return { albums };
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
}
export default fetchAlbums;
