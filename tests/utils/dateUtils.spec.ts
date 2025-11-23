import { describe, it, expect } from 'vitest';
import { normalizeDate, formatDate, formatDateNumeric, safeParseDate } from '~/utils/dateUtils';

describe('dateUtils', () => {
  describe('normalizeDate', () => {
    it('should convert numeric string to number', () => {
      expect(normalizeDate('123')).toBe(123);
    });

    it('should return number if number is passed', () => {
      expect(normalizeDate(456)).toBe(456);
    });

    it('should return original value if it is not a number', () => {
      expect(normalizeDate('abc')).toBe('abc');
      expect(normalizeDate('12abc')).toBe('12abc');
    });

    it('should return original value for 0 or negative numbers if they are strings (according to current logic > 0)', () => {
      expect(normalizeDate('0')).toBe('0');
      expect(normalizeDate('-5')).toBe('-5');
      expect(normalizeDate(0)).toBe(0);
    });
  });

  describe('formatDate', () => {
    const testDateTs = 1684152000000;

    it('should format timestamp (number) to string "Mon, May 15, 2023"', () => {
      expect(formatDate(testDateTs)).toBe('Mon, May 15, 2023');
    });

    it('should format string date', () => {
      expect(formatDate('2023-05-15T12:00:00Z')).toBe('Mon, May 15, 2023');
    });

    it('should return empty string for null or undefined', () => {
      expect(formatDate(null)).toBe('');
      expect(formatDate(undefined)).toBe('');
    });

    it('should return empty string for invalid date', () => {
      expect(formatDate('invalid-date')).toBe('');
    });
  });

  describe('formatDateNumeric', () => {
    const testDateTs = 1684152000000;

    it('should format date to numeric format "05/15/2023"', () => {
      expect(formatDateNumeric(testDateTs)).toBe('05/15/2023');
    });

    it('should work with strings', () => {
      expect(formatDateNumeric('2023-12-31')).toBe('12/31/2023');
    });

    it('should return empty string on error', () => {
      expect(formatDateNumeric(null)).toBe('');
      expect(formatDateNumeric('not-a-date')).toBe('');
    });
  });

  describe('safeParseDate', () => {
    it('should return Date object from timestamp', () => {
      const ts = 1684152000000;
      const date = safeParseDate(ts);
      expect(date).toBeInstanceOf(Date);
      expect(date?.getTime()).toBe(ts);
    });

    it('should return Date object from string', () => {
      const dateStr = '2023-05-15';
      const date = safeParseDate(dateStr);
      expect(date).toBeInstanceOf(Date);
      expect(date?.toISOString().startsWith('2023-05-15')).toBe(true);
    });

    it('should return null if value is empty (falsy)', () => {
      expect(safeParseDate(null)).toBeNull();
      expect(safeParseDate(undefined)).toBeNull();
      expect(safeParseDate('')).toBeNull();
    });

    it('should return Invalid Date if string is incorrect', () => {
      const date = safeParseDate('invalid-string-date');
      expect(date).toBeInstanceOf(Date);
      expect(isNaN(date!.getTime())).toBe(true);
    });
  });
});
