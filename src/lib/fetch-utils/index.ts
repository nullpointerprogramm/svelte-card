import { FetchError } from './fetch-error';

export async function fetchDataWithRetry<T>(
	url: string,
	options: RequestInit = {},
	retries: number = 3,
	delay: number = 1000
): Promise<any> {
	for (let attempt = 1; attempt <= retries; attempt++) {
		try {
			const response = await fetch(url, options);

			if (!response.ok) {
				throw new FetchError(`HTTP Error: ${response.status} ${response.statusText}`, response);
			}

			return response.json();
		} catch (error) {
			if (attempt === retries) {
				throw error;
			}
			console.error(
				`Attempt ${attempt} is not successful. URL: ${url}. Error: ${(error as Error).message} Retry in ${delay} ms... `
			);
			await new Promise((res) => setTimeout(res, delay));
			delay *= 2;
		}
	}
}
