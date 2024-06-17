export type Option = {
    key: string;
    value: string;
};

export type Code = {
    code: string;
}

export type Guest = {
    id: string;
    usedCode: string;
    fullName: string;
    email: string;
    isComing: "TRUE"|"FALSE";
    plusOne: "TRUE"|"FALSE";
    guestId: string;
    notes: string;
}

export type FAQ = {
    question: string;
    answer: string;
}

export type MediaItem = {
	baseUrl: string;
	filename: string;
	description?: string;
	id: string;
	mediaMetadata: {
		creationTime: string;
		height: string;
		width: string;
	},
	mimeType: string;
	productUrl: string;
	srcset?: string[];
}

export type ImageData = {
    src: string,
    original: string,
    width: number,
    height: number,
    title?: string,
}
