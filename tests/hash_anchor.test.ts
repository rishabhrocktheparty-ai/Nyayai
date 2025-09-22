import { sha256FromBuffer } from '../lib/hash';

describe('hash', () => {
  it('creates sha256', () => {
    const h = sha256FromBuffer(Buffer.from('abc'));
    expect(h).toHaveLength(64);
    expect(h).toBe('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
  });
});
