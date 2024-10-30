describe('E2E - Recruiter Account Creation on Qualified Crew', () => {
  const testemail = 'recruiteruser4@example.com';

  it('Navigate to registration page and select Recruiter', () => {
    cy.visit('https://www.test-qualifiedcrew.com');
    cy.contains('Sign up').click();
    cy.contains('Create recruiter account').click();
    cy.url().should('include', '/auth/register/recruiter');
  });

  describe('Qualified Crew - Recruiter Registration Form', () => {

    beforeEach(() => {
      cy.visit('https://www.test-qualifiedcrew.com');
      cy.contains('Sign up').click();
      cy.contains('Create recruiter account').click();
    });

    it('Displays error message when the name field is left empty', () => {
      cy.get('input[name="name"]').focus().blur();
      cy.contains('Full name is required').should('be.visible');
    });

    it('Displays error message when the email field is left empty', () => {
      cy.get('input[name="email"]').focus().blur();
      cy.contains('Email is required').should('be.visible');
    });

    it('Displays error message when the password field is left empty', () => {
      cy.get('input[name="password"]').focus().blur();
      cy.contains('Password is required').should('be.visible');
    });

    it('Displays error message if the password does not contain an uppercase letter', () => {
      cy.get('input[name="password"]').type('password123');
      cy.get('button').contains('Create recruiter account').click();
      cy.contains('Password requires an uppercase letter').should('be.visible');
    });

    it('Displays error message if the password does not contain a special symbol', () => {
      cy.get('input[name="password"]').type('Password123');
      cy.get('button').contains('Create recruiter account').click();
      cy.contains('Password requires a symbol').should('be.visible');
    });

    it('Displays error message when terms and conditions are not accepted', () => {
      cy.get('input[name="name"]').type('Recruiter User');
      cy.get('input[name="email"]').type(testemail);
      cy.get('input[name="password"]').type('Password123!');
      cy.get('button').contains('Create recruiter account').click();
      cy.contains('This field must be checked').should('be.visible');
    });

    it('Successfully submits form and redirects to verify code page', () => {
      cy.get('input[name="name"]').type('Recruiter User');
      cy.get('input[name="email"]').type(testemail);
      cy.get('input[name="password"]').type('Password123!');
      cy.get('input[type="checkbox"]').check();
      cy.get('button').contains('Create recruiter account').click();

      // Verify that we are redirected to the verify code page
      cy.url({ timeout: 10000 }).should('include', '/auth/register/verify-code');
    });

    it('Displays error message when entering an incorrectly formatted email', () => {
      cy.get('input[name="email"]').type('invalid-email');
      cy.get('button').contains('Create recruiter account').click();
      cy.contains('Must be a valid email').should('be.visible');
    });

    it('Redirects to Google page when clicking the Google login button', () => {
      cy.contains('Google').click();
      cy.origin('https://accounts.google.com', () => {
        cy.url().should('include', 'accounts.google.com');
      });
    });

    it('Ensures the LinkedIn button is disabled', () => {
      cy.contains('LinkedIn').should('be.disabled'); 
    });
    
    it('Displays error message when entering an already registered email', () => {
      cy.get('input[name="name"]').type('Recruiter User');
      cy.get('input[name="email"]').type(testemail); 
      cy.get('input[name="password"]').type('Password123!');
      cy.get('input[type="checkbox"]').check();
      cy.get('button').contains('Create recruiter account').click();
      cy.contains('Email already taken').should('be.visible');
    });
  });
});
