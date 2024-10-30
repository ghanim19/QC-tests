describe('E2E - Job Seeker Account Creation on Qualified Crew', () => {
  const testemail = 'testuser9@example.com';

  it('Navigate to registration page and select Job Seeker', () => {
    cy.visit('https://www.test-qualifiedcrew.com');
    cy.contains('Sign up').click();
    cy.contains('Create employee account').click();
    cy.url().should('include', '/auth/register/employee');
  });

  describe('Qualified Crew - Job Seeker Registration Form', () => {

    beforeEach(() => {
      cy.visit('https://www.test-qualifiedcrew.com');
      cy.contains('Sign up').click();
      cy.contains('Create employee account').click();
    });

    it('Display error message when the name field is left empty', () => {
      cy.get('input[name="name"]').focus().blur();
      cy.contains('Full name is required').should('be.visible');
    });

    it('Display error message when the email field is left empty', () => {
      cy.get('input[name="email"]').focus().blur();
      cy.contains('Email is required').should('be.visible');
    });

    it('Display error message when the password field is left empty', () => {
      cy.get('input[name="password"]').focus().blur();
      cy.contains('Password is required').should('be.visible');
    });

    it('Display error message if the password does not contain an uppercase letter', () => {
      cy.get('input[name="password"]').type('password123');
      cy.get('button').contains('Create employee account').click();
      cy.contains('Password requires an uppercase letter').should('be.visible');
    });

    it('Display error message if the password does not contain a special symbol', () => {
      cy.get('input[name="password"]').type('Password123');
      cy.get('button').contains('Create employee account').click();
      cy.contains('Password requires a symbol').should('be.visible');
    });

    it('Display error message when terms and conditions are not accepted', () => {
      cy.get('input[name="name"]').type('Test User');
      cy.get('input[name="email"]').type(testemail);
      cy.get('input[name="password"]').type('Password123!');
      cy.get('button').contains('Create employee account').click();
      cy.contains('This field must be checked').should('be.visible');
    });

    it('Successfully submit the form when all fields are correctly filled', () => {
      cy.get('input[name="name"]').type('Test User');
      cy.get('input[name="email"]').type(testemail);
      cy.get('input[name="password"]').type('Password123!');
      cy.get('input[type="checkbox"]').check();
      cy.get('button').contains('Create employee account').click();
      cy.url().should('include', '/dashboard');
    });

    it('Display error message when entering an incorrectly formatted email', () => {
      cy.get('input[name="email"]').type('invalid-email');
      cy.get('button').contains('Create employee account').click();
      cy.contains('Must be a valid email').should('be.visible');
    });

    it('Redirect to Google page when clicking the Google login button', () => {
      cy.contains('Google').click();
      cy.origin('https://accounts.google.com', () => {
        cy.url().should('include', 'accounts.google.com');
      });
    });

    it('Ensure the LinkedIn button is disabled', () => {
      cy.contains('LinkedIn').should('be.disabled'); 
    });
    
    it('Display error message when entering an already registered email', () => {
      cy.get('input[name="name"]').type('Test User');
      cy.get('input[name="email"]').type(testemail); 
      cy.get('input[name="password"]').type('Password123!');
      cy.get('input[type="checkbox"]').check();
      cy.get('button').contains('Create employee account').click();
      cy.contains('Email already taken').should('be.visible');
    });
  });
});
