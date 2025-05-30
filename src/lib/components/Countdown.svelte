<script lang="ts">
	import { DateTime } from 'luxon';

	const {
		date,
		timezone = 'UTC',
		show_days = true,
		show_hours = true,
		show_minutes = true,
		show_seconds = true
	}: {
		date: string;
		timezone?: string;
		show_days?: boolean;
		show_hours?: boolean;
		show_minutes?: boolean;
		show_seconds?: boolean;
	} = $props();

	function getTimeRemaining(endtime: string) {
		const total =
			+DateTime.fromFormat(endtime, 'f', { zone: timezone }) - Date.parse(new Date().toISOString());
		if (total < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
		const seconds = Math.floor((total / 1000) % 60);
		const minutes = Math.floor((total / 1000 / 60) % 60);
		const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
		const days = Math.floor(total / (1000 * 60 * 60 * 24));

		return {
			days,
			hours,
			minutes,
			seconds
		};
	}

	let countdown = $state(getTimeRemaining(date));

	let interval: number = 1000 * 60 * 60 * 24;
	if (show_hours) interval = 1000 * 60 * 60;
	if (show_minutes) interval = 1000 * 60;
	if (show_seconds) interval = 1000;

	setInterval(() => {
		countdown = getTimeRemaining(date);
	}, interval);
</script>

<div class="grid auto-cols-max grid-flow-col gap-5 text-center">
	{#if show_days}
		<div class="flex flex-col">
			<span class="days countdown font-mono text-5xl" class:days={countdown.days > 99}>
				<span style="--value:{countdown.days};"></span>
			</span>
			days
		</div>
	{/if}
	{#if show_hours}
		<div class="flex flex-col">
			<span class="countdown font-mono text-5xl">
				<span style="--value:{countdown.hours};"></span>
			</span>
			hours
		</div>
	{/if}
	{#if show_minutes}
		<div class="flex flex-col">
			<span class="countdown font-mono text-5xl">
				<span style="--value:{countdown.minutes};"></span>
			</span>
			min
		</div>
	{/if}
	{#if show_seconds}
		<div class="flex flex-col">
			<span class="countdown font-mono text-5xl">
				<span style="--value:{countdown.seconds};"></span>
			</span>
			sec
		</div>
	{/if}
</div>

<style>
	.countdown.days > *:before {
		content: "000\A 001\A 002\A 003\A 004\A 005\A 006\A 007\A 008\A 009\A 010\A 011\A 012\A 013\A 014\A 015\A 016\A 017\A 018\A 019\A 020\A 021\A 022\A 023\A 024\A 025\A 026\A 027\A 028\A 029\A 030\A 031\A 032\A 033\A 034\A 035\A 036\A 037\A 038\A 039\A 040\A 041\A 042\A 043\A 044\A 045\A 046\A 047\A 048\A 049\A 050\A 051\A 052\A 053\A 054\A 055\A 056\A 057\A 058\A 059\A 060\A 061\A 062\A 063\A 064\A 065\A 066\A 067\A 068\A 069\A 070\A 071\A 072\A 073\A 074\A 075\A 076\A 077\A 078\A 079\A 080\A 081\A 082\A 083\A 084\A 085\A 086\A 087\A 088\A 089\A 090\A 091\A 092\A 093\A 094\A 095\A 096\A 097\A 098\A 099\A 100\A 101\A 102\A 103\A 104\A 105\A 106\A 107\A 108\A 109\A 110\A 111\A 112\A 113\A 114\A 115\A 116\A 117\A 118\A 119\A 120\A 121\A 122\A 123\A 124\A 125\A 126\A 127\A 128\A 129\A 130\A 131\A 132\A 133\A 134\A 135\A 136\A 137\A 138\A 139\A 140\A 141\A 142\A 143\A 144\A 145\A 146\A 147\A 148\A 149\A 150\A 151\A 152\A 153\A 154\A 155\A 156\A 157\A 158\A 159\A 160\A 161\A 162\A 163\A 164\A 165\A 166\A 167\A 168\A 169\A 170\A 171\A 172\A 173\A 174\A 175\A 176\A 177\A 178\A 179\A 180\A 181\A 182\A 183\A 184\A 185\A 186\A 187\A 188\A 189\A 190\A 191\A 192\A 193\A 194\A 195\A 196\A 197\A 198\A 199\A 200\A 201\A 202\A 203\A 204\A 205\A 206\A 207\A 208\A 209\A 210\A 211\A 212\A 213\A 214\A 215\A 216\A 217\A 218\A 219\A 220\A 221\A 222\A 223\A 224\A 225\A 226\A 227\A 228\A 229\A 230\A 231\A 232\A 233\A 234\A 235\A 236\A 237\A 238\A 239\A 240\A 241\A 242\A 243\A 244\A 245\A 246\A 247\A 248\A 249\A 250\A 251\A 252\A 253\A 254\A 255\A 256\A 257\A 258\A 259\A 260\A 261\A 262\A 263\A 264\A 265\A 266\A 267\A 268\A 269\A 270\A 271\A 272\A 273\A 274\A 275\A 276\A 277\A 278\A 279\A 280\A 281\A 282\A 283\A 284\A 285\A 286\A 287\A 288\A 289\A 290\A 291\A 292\A 293\A 294\A 295\A 296\A 297\A 298\A 299\A 300\A 301\A 302\A 303\A 304\A 305\A 306\A 307\A 308\A 309\A 310\A 311\A 312\A 313\A 314\A 315\A 316\A 317\A 318\A 319\A 320\A 321\A 322\A 323\A 324\A 325\A 326\A 327\A 328\A 329\A 330\A 331\A 332\A 333\A 334\A 335\A 336\A 337\A 338\A 339\A 340\A 341\A 342\A 343\A 344\A 345\A 346\A 347\A 348\A 349\A 350\A 351\A 352\A 353\A 354\A 355\A 356\A 357\A 358\A 359\A 360\A 361\A 362\A 363\A 364\A 365\A";
	}
</style>
