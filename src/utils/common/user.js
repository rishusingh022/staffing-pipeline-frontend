export const extractSkillFromUsers = users => {
  let uniqueSkills = [];
  users.map(user => {
    const skills = user.skills;
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
