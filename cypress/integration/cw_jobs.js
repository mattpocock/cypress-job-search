/* global cy, Cypress, describe, it */
import postToDB from '../functions/postToDB';

const scanPageForJobs = () => {
    cy.document().then((doc) => {
        const results = [...doc.querySelectorAll('.job-title > a')];
        results.forEach((result) => {
            postToDB('CW Jobs', result.innerText, result.href);
        });
    });
};

const searchForAJob = (title) => {
    cy.visit('https://www.cwjobs.co.uk/');
    cy.get('#keywords').clear().type(title);
    cy.get('#location').clear().type(Cypress.env('location'));
    cy.get('#search-button').click();

    scanPageForJobs();
};

describe('CW Jobs', () => {
    it('might have jobs in the last 24 hours', () => {
        Cypress.env('desiredPositions').forEach((position) => {
            searchForAJob(position);
        });
    });
});
