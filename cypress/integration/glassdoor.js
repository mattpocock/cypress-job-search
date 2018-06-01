/* global cy, Cypress, describe, it */
import postToDB from '../functions/postToDB';

const scanPageForJobs = () => {
    cy.document().then((doc) => {
        const results = [...doc.querySelectorAll('.jobLink')]
            .filter(result => result.childNodes[0].nodeType === 3);
        results.forEach((result) => {
            postToDB('Glassdoor', result.innerText, result.href);
        });
    });
};

const searchForAJob = (title) => {
    cy.visit(`https://www.glassdoor.co.uk/Job/abingdon-${title.toLowerCase().replace(' ', '-')}-jobs-SRCH_IL.0,8_IC3380432_KO9,22.htm`);

    scanPageForJobs();
};

describe('Glassdoor', () => {
    it('might have jobs in the last 24 hours', () => {
        Cypress.env('desiredPositions').forEach((position) => {
            searchForAJob(position);
        });
    });
});
