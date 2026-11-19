import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';

const archive = new URL('../package-lock.json.gz.b64', import.meta.url);
const target = new URL('../package-lock.json', import.meta.url);
const compressed = Buffer.from(readFileSync(archive, 'utf8').trim(), 'base64');
const lockBytes = gunzipSync(compressed);
const expectedSha256 = 'e1a3e4ed5e21ae4fd21d2372a5ba87a5d6f2c8b1acc4351dd1d0eb51dd43ac6c';
const actualSha256 = createHash('sha256').update(lockBytes).digest('hex');

if (actualSha256 !== expectedSha256) {
  throw new Error('Restored package-lock.json checksum mismatch.');
}

const lock = JSON.parse(lockBytes.toString('utf8'));
if (lock.name !== 'ocodejs-brand-guidelines' || lock.lockfileVersion !== 3) {
  throw new Error('Unexpected package lock metadata.');
}

writeFileSync(target, lockBytes);
console.log('Restored and verified package-lock.json (sha256).');
