import { extractCollaboratorsFromCaseStudies, extractEngagementNameFromCaseStudies } from '../case-studies';

describe('extractCollaboratorsFromCaseStudies', () => {
  it('should return empty arrays when no case studies are provided', () => {
    const caseStudies = [];
    const result = extractCollaboratorsFromCaseStudies(caseStudies);
    expect(result.collaboratorMap).toEqual({});
    expect(result.uniqueCollaborators).toEqual(['All']);
  });

  it('should correctly extract collaborators and unique names from case studies', () => {
    const caseStudies = [
      {
        collaborators: [
          { name: 'Collaborator A', userId: '123' },
          { name: 'Collaborator B', userId: '456' },
        ],
      },
      {
        collaborators: [
          { name: 'Collaborator C', userId: '789' },
          { name: 'Collaborator A', userId: '123' },
        ],
      },
    ];
    const result = extractCollaboratorsFromCaseStudies(caseStudies);
    expect(result.collaboratorMap).toEqual({
      'Collaborator A': '123',
      'Collaborator B': '456',
      'Collaborator C': '789',
    });
    expect(result.uniqueCollaborators).toEqual(['All', 'Collaborator A', 'Collaborator B', 'Collaborator C']);
  });
});

describe('extractEngagementNameFromCaseStudies', () => {
  it('should return empty arrays when no case studies are provided', () => {
    const caseStudies = [];
    const result = extractEngagementNameFromCaseStudies(caseStudies);
    expect(result.engagementMap).toEqual({});
    expect(result.uniqueEngegementNames).toEqual(['All']);
  });

  it('should correctly extract engagement names and unique names from case studies', () => {
    const caseStudies = [
      { engagement: { name: 'Engagement A', engagementId: '123' } },
      { engagement: { name: 'Engagement B', engagementId: '456' } },
      { engagement: { name: 'Engagement A', engagementId: '123' } },
    ];
    const result = extractEngagementNameFromCaseStudies(caseStudies);
    expect(result.engagementMap).toEqual({
      'Engagement A': '123',
      'Engagement B': '456',
    });
    expect(result.uniqueEngegementNames).toEqual(['All', 'Engagement A', 'Engagement B']);
  });
});
