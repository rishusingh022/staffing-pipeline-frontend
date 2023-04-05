import { GET_USER_SKILL_ROUTE } from '../../constants/apiEndpoints';
import makeRequest from '../makeRequest';

export const extractSkillFromUsers = (users, navigate) => {
  let uniqueSkills = [];
  // create a map of skill and corresponding users array
  let skillMap = new Map();
  users.map(user => {
    makeRequest(GET_USER_SKILL_ROUTE(user.userId), {}, navigate).then(response => {
      response.map(skills => {
        if (!uniqueSkills.includes(skills.skill)) {
          uniqueSkills.push(skills.skill);
          // create a new array for each skill
          skillMap.set(skills.skill, []);
        }
        // push the user to the corresponding skill array
        skillMap.get(skills.skill).push(user.userId);
      });
    });
  });
  uniqueSkills.push('All');
  uniqueSkills.sort();
  return {
    uniqueSkills,
    skillMap,
  };
};

export const extractRoleFromUsers = users => {
  let uniqueRoles = [];
  users.map(user => {
    const role = user.role;
    if (!uniqueRoles.includes(role)) {
      uniqueRoles.push(role);
    }
  });
  uniqueRoles.push('All');
  uniqueRoles.sort();
  return uniqueRoles;
};
