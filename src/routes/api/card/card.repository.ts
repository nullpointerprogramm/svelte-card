import { promiseWithoutRaceCondition, rateLimitPromise } from '$lib/promise.utils';
import type { CardType } from '$lib/types';
import { fetchCoffeeObjectAsync } from './coffee.api';

let cachedObject: CardType;

async function fetchObjectAndSaveCache(): Promise<CardType> {
	cachedObject = await fetchCoffeeObjectAsync();
	return cachedObject;
}

const fetchObject = promiseWithoutRaceCondition(rateLimitPromise(fetchObjectAndSaveCache, 2000));

export function getNewCard(lastId?: number): Promise<CardType> {
	if (cachedObject && cachedObject.id !== lastId) {
		return Promise.resolve(cachedObject);
	}

	return fetchObject();
}
