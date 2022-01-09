describe('Characters Page', () => {
  it('should navigate to the characters page', () => {
    cy.visit('/');
    cy.findAllByText('Characters').first().click();
    cy.url().should('include', '/characters');
  });
  it('should showing data from api', () => {
    cy.findByText('Luke Skywalker').should('exist');
  });
  it('should showing search result', () => {
    cy.get('input[placeholder="Search"]').type('Dooku');
    cy.findByText('Dooku').should('exist');
  });
  it('should reset input when button reset clicked', () => {
    cy.findByText(/reset/i).click();
    cy.get('input[placeholder="Search"]').should('be.empty');
    cy.findByText('Dooku').should('not.exist');
  });
  it('should showing filtered data', () => {
    cy.get('input[placeholder="Search"]').clear();
    cy.get('select').first().select('Male');
    cy.findAllByText('female').should('not.exist');
  });
  it('should redirect to correct detail page', () => {
    cy.findByText('Luke Skywalker').click();
    cy.url().should('include', '/characters/cGVvcGxlOjE=');
  });
  it('should showing correct detail data', () => {
    cy.findByText('blond').should('exist');
  });
});

export {};
