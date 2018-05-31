import moment from 'moment';
import get from '../../api-methods/get';
import post from '../../api-methods/post';

let jobInfo = {};
const searchForAJob = (title) => {
    cy.visit('https://www.cwjobs.co.uk/');
    cy.get('#keywords').clear().type(title);
    cy.get('#location').clear().type(Cypress.env('location'));
    cy.get('#search-button').click();
    
    cy.get('#facetListDatePosted > .facet-selection > .facet-links > :nth-child(1) > .job-count')
        .then((node) => {
            fetch('http://localhost:3000/counts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    site: 'CW Jobs',
                    position: title,
                    count: node[0].innerHTML.slice(1, 2),
                    date: moment().format('YYYY-MM-DD'),
                }),
            }).then(response => {
                if (!response.ok) throw new Error('Could not post data to json-server');
            });
        })
};


describe('CW Jobs', () => {
    it('might have jobs in the last 24 hours', () => {
        Cypress.env('desiredPositions').forEach((position) => {
            searchForAJob(position);
        });
    });    
});