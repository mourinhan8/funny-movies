import '@testing-library/jest-dom';
import 'isomorphic-fetch';

// import { TextEncoder, TextDecoder } from 'util';

// global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder as typeof global.TextDecoder;

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: (query: any) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});