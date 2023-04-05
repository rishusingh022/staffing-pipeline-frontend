import makeRequest from '../../makeRequest';
import { extractSkillFromUsers, extractRoleFromUsers } from '../user';
import { GET_USER_SKILL_ROUTE } from '../../../constants/apiEndpoints';
jest.mock('../../makeRequest');

describe('extractSkillFromUsers', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('returns the correct skill and skillMap', async () => {
    const users = [{ userId: 1 }, { userId: 2 }, { userId: 3 }];
    const navigate = jest.fn();
    const skillResponse1 = [{ skill: 'React' }, { skill: 'Node.js' }];
    const skillResponse2 = [{ skill: 'React' }, { skill: 'Express' }];
    const skillResponse3 = [{ skill: 'React' }, { skill: 'MongoDB' }];
    makeRequest.mockReturnValueOnce(Promise.resolve(skillResponse1));
    makeRequest.mockReturnValueOnce(Promise.resolve(skillResponse2));
    makeRequest.mockReturnValueOnce(Promise.resolve(skillResponse3));
    const result = await extractSkillFromUsers(users, navigate);
    expect(result.skillMap.get('React')).toEqual([1, 2, 3]);
    expect(result.skillMap.get('Node.js')).toEqual([1]);
    expect(result.skillMap.get('Express')).toEqual([2]);
    expect(result.skillMap.get('MongoDB')).toEqual([3]);

    expect(makeRequest).toHaveBeenCalledTimes(3);
    expect(makeRequest).toHaveBeenNthCalledWith(1, GET_USER_SKILL_ROUTE(1), {}, navigate);
    expect(makeRequest).toHaveBeenNthCalledWith(2, GET_USER_SKILL_ROUTE(2), {}, navigate);
    expect(makeRequest).toHaveBeenNthCalledWith(3, GET_USER_SKILL_ROUTE(3), {}, navigate);
  });
});

describe('extractRoleFromUsers', () => {
  it('returns the correct role', () => {
    const users = [
      {
        userId: 1,
        firstName: 'John',
        lastName: 'Doe',
        role: 'Developer',
      },
      {
        userId: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        role: 'Developer',
      },
    ];
    const uniqueRoles = extractRoleFromUsers(users);
    expect(uniqueRoles).toEqual(['All', 'Developer']);
  });
});
