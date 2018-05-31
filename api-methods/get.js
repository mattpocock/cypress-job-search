export default loc => (
    cy.request(loc, {
        method: 'GET',
    })
);
