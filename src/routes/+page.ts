import type { CardType } from '$lib/types';
import { writable } from 'svelte/store';
import type { PageLoad } from './$types';

const isLoading = writable(false);
const listData = writable<CardType[]>([]);
const error = writable<{ message: string }>();

let lastId: number;

export const load: PageLoad = async ({ fetch }) => {
	const fetchCard = async () => {
		isLoading.set(true);
		try {
			const url = new URL('api/card', 'https://localhost'); // Base URL doesn't matter
			if (lastId) url.searchParams.append('lastId', lastId.toString());

			const resp = await fetch(url.pathname + url.search);

			if (!resp.ok) {
				throw new Error(resp.statusText);
			}

			const card: CardType = await resp.json();
			lastId = card.id;
			listData.update((value) => [...value, card]);
		} catch (e) {
			error.set({
				message: 'Unable to fetch card'
			});
			throw e;
		} finally {
			isLoading.set(false);
		}
	};

	try {
		await fetchCard(); // Found a BUG if not use await It will fire fetch twice on SSR
	} catch (e) {
		console.error('Failed to fetch card: ', e);
	}

	return {
		listData,
		isLoading,
		error,
		fetchOneMoreCard: fetchCard
	};
};
