import {isValidNumber} from './utils';

describe('utils', () => {
  it('returns true for number input', () => {
    const actual = isValidNumber(1);

    expect(actual).toBe(true);
  });

  it('returns false for null input', () => {
    const actual = isValidNumber(null);

    expect(actual).toBe(false);
  });

  it('returns false for undefined input', () => {
    const actual = isValidNumber(undefined);

    expect(actual).toBe(false);
  });

  it('returns false for object input', () => {
    const actual = isValidNumber({});

    expect(actual).toBe(false);
  });

  it('returns true for integer string input', () => {
    const actual = isValidNumber('100');

    expect(actual).toBe(true);
  });

  it('returns true for decimal string input', () => {
    const actual = isValidNumber('1.33');

    expect(actual).toBe(true);
  });
});
