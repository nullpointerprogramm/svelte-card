export function rateLimitPromise<T extends (...args: any[]) => Promise<any>>(
	func: T,
	delay: number
): T {
	let nextAvailableTime = Date.now();

	return (async (...args) => {
		const now = Date.now();
		const scheduledTime = Math.max(now, nextAvailableTime);
		const waitTime = scheduledTime - now;

		if (waitTime > 0) {
			await new Promise((resolve) => setTimeout(resolve, waitTime));
		}

		nextAvailableTime = scheduledTime + delay;

		return func(...args);
	}) as T;
}

export function promiseWithoutRaceCondition<T extends (...args: any[]) => Promise<any>>(
	func: T
): T {
	let inProgressPromise: Promise<ReturnType<T>> | null = null;
	return ((...args) => {
		if (inProgressPromise) {
			return inProgressPromise;
		}
		inProgressPromise = func(...args).finally(() => (inProgressPromise = null));
		return inProgressPromise;
	}) as T;
}
