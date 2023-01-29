import { isYesAnswer, unformat } from '../cli.utils';

describe('Parse String to boolean', () => {
  it('should return true for valid true strings', () => {
    expect(isYesAnswer('yes')).toBe(true);
    expect(isYesAnswer('y')).toBe(true);
    expect(isYesAnswer('true')).toBe(true);
    expect(isYesAnswer('true    ')).toBe(true);
    expect(isYesAnswer('  y   ')).toBe(true);
    expect(isYesAnswer('')).toBe(true);
  });
  it('should return false for valid false strings', () => {
    expect(isYesAnswer('f')).toBe(false);
    expect(isYesAnswer('f a ')).toBe(false);
    expect(isYesAnswer('test       ')).toBe(false);
    expect(isYesAnswer('     test')).toBe(false);
    expect(isYesAnswer('  test   ')).toBe(false);
  });
  it('should return false for all otherstrings', () => {
    expect(isYesAnswer('test')).toBe(false);
    expect(isYesAnswer('test    ')).toBe(false);
    expect(isYesAnswer('te \n st ')).toBe(false);
    expect(isYesAnswer("       \n \n '")).toBe(false);
  });
});

describe('unformat()', () => {
  it('should remove all formatting from strings', () => {
    expect(unformat('   Markdown    ')).toBe('markdown');
    expect(unformat('Markdown').startsWith(unformat('   m'))).toBe(
      true,
    );
    expect(
      ['narkDown', 'Markdown'].find((x) =>
        unformat(x).startsWith(unformat('   m')),
      ),
    ).toEqual('Markdown');
  });
});
