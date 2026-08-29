/**
 * Packs the generated PNG favicons into a multi-resolution `public/favicon.ico`.
 *
 *   node scripts/build-ico.mjs      (run generate-icons.mjs first)
 *
 * sharp cannot write ICO, and pulling a dependency in for ~40 lines of header
 * writing is not worth it. Vista onward — and every browser in use — reads
 * PNG-compressed entries inside an ICO container, so each size goes in as the
 * PNG that already exists rather than as a raw BMP with an AND mask.
 *
 * Layout: a 6-byte ICONDIR, then one 16-byte ICONDIRENTRY per image, then the
 * image payloads back to back.
 */
import { readFile, writeFile, stat } from 'node:fs/promises';

const SIZES = [16, 32, 48];
const OUT = 'public/favicon.ico';

const images = await Promise.all(
	SIZES.map(async (size) => ({
		size,
		data: await readFile(`public/favicon-${size}.png`),
	})),
);

const HEADER = 6;
const ENTRY = 16;

const dir = Buffer.alloc(HEADER);
dir.writeUInt16LE(0, 0); // reserved
dir.writeUInt16LE(1, 2); // 1 = icon (2 would be cursor)
dir.writeUInt16LE(images.length, 4);

let offset = HEADER + ENTRY * images.length;

const entries = images.map(({ size, data }) => {
	const entry = Buffer.alloc(ENTRY);
	// 0 encodes 256 in this field; every size here is well under that.
	entry.writeUInt8(size === 256 ? 0 : size, 0); // width
	entry.writeUInt8(size === 256 ? 0 : size, 1); // height
	entry.writeUInt8(0, 2); // palette size, 0 = truecolour
	entry.writeUInt8(0, 3); // reserved
	entry.writeUInt16LE(1, 4); // colour planes
	entry.writeUInt16LE(32, 6); // bits per pixel
	entry.writeUInt32LE(data.length, 8);
	entry.writeUInt32LE(offset, 12);
	offset += data.length;
	return entry;
});

await writeFile(OUT, Buffer.concat([dir, ...entries, ...images.map((i) => i.data)]));

const { size } = await stat(OUT);
console.log(`favicon.ico  ${SIZES.join(', ')}px  ${Math.round(size / 1024)} KiB`);
