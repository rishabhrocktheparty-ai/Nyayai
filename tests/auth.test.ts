import { signToken, verifyToken } from '../lib/auth';

describe('auth token', () => {
  it('signs and verifies', () => {
    const token = signToken({ userId: 'u1' });
    const payload = verifyToken(token) as any;
    expect(payload.userId).toBe('u1');
  });

  it('signs and verifies token with arbitrary payload', () => {
    const t = signToken({ foo: 'bar' });
    const v: any = verifyToken(t);
    expect(v.foo).toBe('bar');
  });
});
