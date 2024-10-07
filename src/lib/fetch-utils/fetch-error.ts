export class FetchError extends Error {
	public statusCode: number;
	public statusText: string;
	public response: Response;

	constructor(message: string, response: Response) {
		super(message);
		this.name = 'FetchError';
		this.statusCode = response.status;
		this.statusText = response.statusText;
		this.response = response;
	}
}
