import { fetchDataWithRetry } from '$lib/fetch-utils';
import { FetchError } from '$lib/fetch-utils/fetch-error';
import type { CardData, CardType, ImageResponse } from '$lib/types';

async function fetchData(): Promise<CardData> {
	try {
		const coffeeData: CardData = await fetchDataWithRetry(
			'https://random-data-api.com/api/coffee/random_coffee'
		);
		return coffeeData;
	} catch (error) {
		if (error instanceof FetchError) {
			console.error(
				`Error while fetching coffee data. Response status is ${error.statusCode}: ${error.message}`
			);
		}
		throw error;
	}
}

async function fetchImage(): Promise<ImageResponse> {
	try {
		const imageData: ImageResponse = await fetchDataWithRetry(
			'https://loremflickr.com/json/500/500/coffee,bean'
		);
		return imageData;
	} catch (error) {
		if (error instanceof FetchError) {
			console.error(
				`Error while fetching coffee image. Response status is ${error.statusCode}: ${error.message}`
			);
		}
		throw error;
	}
}

export async function fetchCoffeeObjectAsync(): Promise<CardType> {
	const dataPromise = fetchData();
	const imagePromise = fetchImage();
	const [dataResponse, imageResponse] = await Promise.all([dataPromise, imagePromise]);
	if (!dataResponse || !imageResponse) {
		throw new Error('Fetching data or image are failed');
	}
	return {
		...dataResponse,
		image: imageResponse.file
	};
}
