import moment from 'moment';
import { extractSkillsFromEngagement, extractGuildFromEngagement, convertStartDate } from '../engagement';

describe('extractSkillsFromEngagement', () => {
  it('returns an array of unique skills from an array of engagements', () => {
    const engagements = [
      { skills: ['JavaScript', 'React'] },
      { skills: ['Python', 'Django'] },
      { skills: ['JavaScript', 'Vue'] },
    ];

    expect(extractSkillsFromEngagement(engagements)).toEqual(['All', 'Django', 'JavaScript', 'Python', 'React', 'Vue']);
  });

  it('returns an array containing only "All" when there are no skills', () => {
    const engagements = [{}, {}, {}];

    expect(extractSkillsFromEngagement(engagements)).toEqual(['All']);
  });
});

describe('extractGuildFromEngagement', () => {
  it('returns an array of unique guilds from an array of engagements', () => {
    const engagements = [{ guild: 'Frontend' }, { guild: 'Backend' }, { guild: 'Design' }, { guild: 'Backend' }];

    expect(extractGuildFromEngagement(engagements)).toEqual(['All', 'Backend', 'Design', 'Frontend']);
  });

  it('returns an array containing only "All" when there are no guilds', () => {
    const engagements = [{}, {}, {}];

    expect(extractGuildFromEngagement(engagements)).toEqual(['All']);
  });
});

describe('convertStartDate', () => {
  it('converts the start date of engagements to YYYY-MM-DD format', () => {
    const engagements = [{ startDate: '2022-01-01' }, { startDate: '2022-02-01' }, { startDate: '2022-03-01' }];

    expect(convertStartDate(engagements)).toEqual([
      { startDate: moment('2022-01-01').format('YYYY-MM-DD') },
      { startDate: moment('2022-02-01').format('YYYY-MM-DD') },
      { startDate: moment('2022-03-01').format('YYYY-MM-DD') },
    ]);
  });

  it('does not modify the engagements if there are no start dates', () => {
    const engagements = [{}, {}, {}];

    expect(convertStartDate(engagements)).toEqual([{}, {}, {}]);
  });
});
