import moment from 'moment';
export const extractSkillsFromEngagement = engagements => {
  let uniqueSkills = [];
  engagements.map(engagement => {
    const skills = engagement.skills;
    skills.map(skill => {
      if (!uniqueSkills.includes(skill)) {
        uniqueSkills.push(skill);
      }
    });
  });
  uniqueSkills.push('All');
  uniqueSkills.sort();
  return uniqueSkills;
};

export const extractGuildFromEngagement = engagements => {
  let uniqueGuilds = [];
  engagements.map(engagement => {
    const guild = engagement.guild;
    if (!uniqueGuilds.includes(guild)) {
      uniqueGuilds.push(guild);
    }
  });
  uniqueGuilds.push('All');
  uniqueGuilds.sort();
  return uniqueGuilds;
};

export const convertStartDate = engagements => {
  engagements.map(engagement => {
    const startDate = engagement.startDate;
    const convertedStartDate = moment(startDate).format('YYYY-MM-DD');
    engagement.startDate = convertedStartDate;
  });
  return engagements;
};
