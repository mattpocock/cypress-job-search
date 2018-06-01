/*eslint-disable*/
import moment from 'moment';
import get from '../../api-methods/get';
import post from '../../api-methods/post';
import cleanHref from '../functions/cleanHref';

const searchForAJob = (title) => {
    cy.visit('https://www.cwjobs.co.uk/');
    cy.get('#keywords').clear().type(title);
    cy.get('#location').clear().type(Cypress.env('location'));
    cy.get('#search-button').click();

    scanPageForJobs();
};

const scanPageForJobs = () => {
    cy.document().then((doc) => {
        const results = [...doc.querySelectorAll('.job-title > a')];
        results.forEach((result) => {
            fetch(`http://localhost:3000/jobs?href=${result.href}`, {
                method: 'GET',
            }).then(response => response.json())
            .then(json => {
                if (json.length > 0) {
                    return;
                };
                fetch('http://localhost:3000/jobs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        site: 'CW Jobs',
                        title: result.innerText,
                        href: cleanHref(result.href),
                        date: moment().format('YYYY-MM-DD'),
                        checkedItOut: false,
                        worthApplyingFor: false,
                        hidden: false,
                    }),
                })
            })
        })
    })
}


describe('CW Jobs', () => {
    it('might have jobs in the last 24 hours', () => {
        Cypress.env('desiredPositions').forEach((position) => {
            searchForAJob(position);
        });
    });    
});