export const extractCollaboratorsFromCaseStudies = caseStudies => {
  const collaboratorMap = {};
  const uniqueCollaborators = [];
  caseStudies.map(caseStudy => {
    caseStudy.collaborators.map(collaborator => {
      if (!uniqueCollaborators.includes(collaborator.name)) {
        collaboratorMap[collaborator.name] = collaborator.userId;
        uniqueCollaborators.push(collaborator.name);
      }
    });
  });
  uniqueCollaborators.sort();
  uniqueCollaborators.unshift('All');
  return {
    collaboratorMap,
    uniqueCollaborators,
  };
};

export const extractEngagementNameFromCaseStudies = caseStudies => {
  const engagementMap = {};
  const uniqueEngegementNames = [];
  caseStudies.map(caseStudy => {
    const study = caseStudy.engagement;
    if (!uniqueEngegementNames.includes(study.name)) {
      engagementMap[study.name] = study.engagementId;
      uniqueEngegementNames.push(study.name);
    }
  });
  uniqueEngegementNames.push('All');
  uniqueEngegementNames.sort();
  return {
    engagementMap,
    uniqueEngegementNames,
  };
};
