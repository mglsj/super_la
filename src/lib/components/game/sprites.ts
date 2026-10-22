/**
 * Original 10x10 pixel sprites, drawn as strings. Each character is a palette key,
 * '.' is transparent. Inspired by classic platformer icons, not copied from any game.
 */
export const PALETTE: Record<string, string> = {
	k: '#1a1a1a',
	w: '#ffffff',
	r: '#e52521',
	y: '#fbd000',
	o: '#f08000',
	g: '#43b047',
	b: '#c84c0c',
	t: '#fcd8a8'
};

export const SPRITES = {
	coin: [
		'...kkkk...',
		'..kyyyyk..',
		'.kyyoyyyk.',
		'.kyyoyyyk.',
		'.kyyoyyyk.',
		'.kyyoyyyk.',
		'.kyyoyyyk.',
		'.kyyoyyyk.',
		'..kyyyyk..',
		'...kkkk...'
	],
	mushroom: [
		'...kkkk...',
		'..krrrrk..',
		'.krwwrrwwk',
		'krrwwrrwrk',
		'krrrrrrrrk',
		'kkkkkkkkkk',
		'.kttttttk.',
		'.ktkttktk.',
		'.kttttttk.',
		'..kkkkkk..'
	],
	flower: [
		'...kkkk...',
		'..krrrrk..',
		'.krryyrrk.',
		'.kryyyyrk.',
		'.krryyrrk.',
		'..krrrrk..',
		'...kggk...',
		'.kkkggkkk.',
		'.kggggggk.',
		'..kkkkkk..'
	],
	star: [
		'....kk....',
		'...kyyk...',
		'...kyyk...',
		'kkkkyykkkk',
		'kyyyyyyyyk',
		'.kyyyyyyk.',
		'..kyyyyk..',
		'.kyyyyyyk.',
		'.kyyk.kyyk',
		'.kkk..kkk.'
	],
	qblock: [
		'kkkkkkkkkk',
		'kyyyyyyyyk',
		'kyybbbbyyk',
		'kybbyybbyk',
		'kyyyyybbyk',
		'kyyyybbyyk',
		'kyyyybyyyk',
		'kyyyyyyyyk',
		'kyyyybyyyk',
		'kkkkkkkkkk'
	],
	brick: [
		'kkkkkkkkkk',
		'kbbbbkbbbk',
		'kbbbbkbbbk',
		'kkkkkkkkkk',
		'kbbkbbbbbk',
		'kbbkbbbbbk',
		'kkkkkkkkkk',
		'kbbbbkbbbk',
		'kbbbbkbbbk',
		'kkkkkkkkkk'
	],
	flag: [
		'.k........',
		'.kgg......',
		'.kgggg....',
		'.kggggg...',
		'.kgggg....',
		'.kgg......',
		'.k........',
		'.k........',
		'.k........',
		'kkkk......'
	]
} as const;

export type SpriteName = keyof typeof SPRITES;
