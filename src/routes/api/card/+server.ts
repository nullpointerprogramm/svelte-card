import type { CardType } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';
import { getNewCard } from './card.repository';
import { FetchError } from '$lib/fetch-utils/fetch-error';

export const GET: RequestHandler = async ({ url }) => {
	try {
		const lastId = Number(url.searchParams.get('lastId'));
		let dataObject: CardType;
		dataObject = await getNewCard(lastId ? lastId : undefined);
		return new Response(JSON.stringify(dataObject), { status: 200 });
	} catch (error) {
		console.error(error);
		if (error instanceof FetchError) {
			return new Response(error.statusText, { status: error.statusCode });
		}
		return new Response((error as Error).message, { status: 500 });
	}
};
