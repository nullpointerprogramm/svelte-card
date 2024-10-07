export type CardData = {
	id: number;
	uid: string;
	blend_name: string;
	origin: string;
	variety: string;
	notes: string;
	intensifier: string;
};

export type CardType = CardData & { image: string };

export type ImageResponse = {
	file: string;
	license: string;
	owner: string;
	width: number;
	height: number;
	filter: string;
	tags: string;
	tagMode: string;
};
