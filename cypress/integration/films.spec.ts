describe('Films Page', () => {
  it('should navigate to the films page', () => {
    cy.visit('/');
    cy.findAllByText('Films').first().click();
    cy.url().should('include', '/films');
  });
  it('should showing data from api', () => {
    cy.findByText('A New Hope').should('exist');
  });
  it('should showing search result', () => {
    cy.get('input[placeholder="Search"]').type('Jedi');
    cy.findByText(/Jedi/i).should('exist');
    cy.findByText('A New Hope').should('not.exist');
  });
  it('should redirect to correct detail page', () => {
    cy.findByText('Return of the Jedi').click();
    cy.url().should('include', '/films/ZmlsbXM6Mw==');
  });
  it('should showing correct detail data', () => {
    cy.findByText('Richard Marquand').should('exist');
  });
  it('should showing correct character list', () => {
    cy.findByText(/Darth/).should('exist');
  });
  it('should showing search result', () => {
    cy.get('input[placeholder="Search"]').type('boba');
    cy.findByText('Boba Fett').should('exist');
  });
  it('should showing filtered data', () => {
    cy.get('input').clear();
    cy.get('select').first().select('Male');
    cy.findAllByText('female').should('not.exist');
  });
});

export {};
