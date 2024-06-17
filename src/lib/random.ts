export function createRandomString(length: number): string {
	const chars = 'abcdefghijklmnopqrstuvwxyz';
	let result = '';
	for (let i = 0; i < length; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
}

export function createUniqueCode(length: number, existing_codes: Set<string>): string {
    while (true) {
        const code = createRandomString(length);
        if (!existing_codes.has(code)) return code
    }
}