async function fetchData(url: string): Promise<{ imageUrl: string; imageAlt: string }[]> {
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const imgData = await response.json();

		const allImages: any[] = imgData?.data || [];

		const imageInfoArray = allImages.flatMap((item: any) => {
			const images = item?.attributes?.image?.data || [];

			return images.map((image: any) => {
				const imageUrl = image?.attributes?.url || "";
				const imageAlt = image?.attributes?.alternativeText || "";
				return { imageUrl, imageAlt };
			});
		});

		return imageInfoArray;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
}

export default fetchData;
  