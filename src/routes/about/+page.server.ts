import { getSheet } from '$lib/server/sheet';
import type { PageServerLoad } from './$types';
import { loremIpsum } from "lorem-ipsum";

type Person = {
	name: string;
	title: string;
	photo: string;
	fun_fact: string;
	quote: string;
	side: 'groom' | 'bride';
	level: number;
};

export const load = (async () => {
	let people = (await (await getSheet('People')).getRows<Person>())
		.map((person) => person.toObject()).map((person) => ({
			...person,
			level: parseInt(person.level as unknown as string),
			photo: `https://picsum.photos/870/536?random=${Math.floor(Math.random() * 1000)}`,
			fun_fact: person.fun_fact || loremIpsum({units: 'sentence', count: 2}),
			quote: person.quote || loremIpsum()
		}));
	people = people.sort((a, b) => a.level - b.level);
	// Group people by side and level
	const groom_people: Person[] = [];
	const bride_people: Person[] = [];
	people.forEach((person) => {
		if (person.side === 'groom') {
			groom_people.push(person as Person);
		} else {
			bride_people.push(person as Person);
		}
	});

	return {
		groom_people,
		bride_people
	};
}) satisfies PageServerLoad;
