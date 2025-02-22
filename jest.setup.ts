import '@testing-library/jest-dom';
import {useDataStore} from "./stores/data-store";
import {useAuthStore} from "./stores/auth-store";
import {DataStore} from "./types/dataStore.type";
import {AuthStore} from "./types/authStore.type";

// Define configuration required to mock Zustand stores.

// turn the useStore hooks into a Jest mocks.
jest.mock("./stores/auth-store", () => ({
    useAuthStore: jest.fn(),
}));

jest.mock("./stores/data-store", () => ({
    useDataStore: jest.fn(),
}));

// jest.mocked allows us to keep type safety on useStore's defined types
// when defining mock implementation values
const useDataStoreMock = jest.mocked(useDataStore);
const useAuthStoreMock = jest.mocked(useAuthStore);

// we will import this method into our tests, allowing them to specify
// only those store values the test needs to care about
export const mockUseDataStore = (
    overrides: Partial<DataStore> = {}
) => {
    useDataStoreMock.mockImplementation((getterFn) => {
        return getterFn({
            // we include the store's actual values by default
            // this allows the mocked store to have complete functionality,
            // with "granular" mocks defined as specified by tests
            ...jest.requireActual("./stores/data-store").useDataStore(),
            ...overrides
        });
    });
};

export const mockUseAuthStore = (
    overrides: Partial<AuthStore> = {}
) => {
    useAuthStoreMock.mockImplementation((getterFn) => {
        return getterFn({
            // we include the store's actual values by default
            // this allows the mocked store to have complete functionality,
            // with "granular" mocks defined as specified by tests
            ...jest.requireActual("./stores/auth-store").useAuthStore(),
            ...overrides
        });
    });
};

// this will set the default mock for the store on a per-test basis
// Note: setting this mock per test is a little heavy-handed, alternatively
// you can use beforeAll to set the default mock once per test suite
beforeAll(() => {
    mockUseDataStore();
    mockUseAuthStore();
});