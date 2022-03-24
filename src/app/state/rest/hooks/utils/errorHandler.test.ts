// Module mocking should always be on top:
// -----------------------------------------
import { renderHook } from '@testing-library/react-hooks';
import { AxiosError } from 'axios';

import { useErrorHandler } from './errorHandler';

const mockAddErrorFlashMessage = jest.fn();
jest.mock('app/state/flashMessages/useFlashMessages', () => ({
  __esModule: true,
  useFlashMessages: () => ({ addErrorFlashMessage: mockAddErrorFlashMessage }),
}));

describe('rest hook utils', () => {
  describe('useErrorHandler', () => {
    beforeEach(() => {
      mockAddErrorFlashMessage.mockReset();
    });

    it('should return a callback pushes a flash message', () => {
      const mockedError: AxiosError = {
        isAxiosError: true,
        name: 'error',
        message: 'S.O.S.',
        config: { url: 'http://www.foo.com' },
        toJSON: () => ({}),
      };

      const { result } = renderHook(() => useErrorHandler());
      result.current(mockedError);

      expect(mockAddErrorFlashMessage).toHaveBeenCalledWith('Oeps er ging iets mis!', 'S.O.S. (URL: http://www.foo.com)');
    });
  });
});
