import { jest } from '@jest/globals';
import 'whatwg-fetch';
import { TextEncoder, TextDecoder } from 'util';
import '@testing-library/jest-dom';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;


jest.mock("next/navigation", () => ({
    useRouter: () => ({
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn()
      },
      isFallback: false
    }),
    useSearchParams: () => ({
      get: () => {},
    }),
    usePathname: () => ({
      pathname: "",
    }),
  }));
  