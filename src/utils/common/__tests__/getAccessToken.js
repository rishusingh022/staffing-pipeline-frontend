import getAccessToken from '../getAccessToken';

describe('getAccessToken', () => {
  it('returns the access token from the authState', () => {
    const authState = {
      accessToken: {
        accessToken: 'ABC123',
      },
    };
    expect(getAccessToken(authState)).toEqual('ABC123');
  });
});
