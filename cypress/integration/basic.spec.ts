/// <reference types="cypress" />

describe('basic validation', () => {
  it('should validate before submit', () => {
    cy.visit('http://localhost:3000/basic');

    // Submit the form
    cy.get('button[type=submit]').click();

    // Check that all fields are touched and error messages work
    cy.get('input[name="firstName"] + p').contains('Required');
    cy.get('input[name="lastName"] + p').contains('Required');
    cy.get('input[name="email"] + p').contains('Required');

    cy.get('#renderCounter').contains('0');
  });

  it('should validate show errors on change and blur', () => {
    cy.visit('http://localhost:3000/sign-in');

    cy.get('input[name="username"]')
      .type('john')
      .blur()
      .siblings('p')
      .should('have.length', 0);

    cy.get('input[name="password"]')
      .type('123')
      .blur()
      .siblings('p')
      .should('have.length', 0);

    cy.get('#error-log').should('have.text', '[]');
  });

  it('should validate show errors on blur only', () => {
    cy.visit('http://localhost:3000/sign-in', {
      qs: {
        validateOnMount: false,
        validateOnChange: false,
      },
    });

    cy.get('input[name="username"]')
      .type('john')
      .blur()
      .siblings('p')
      .should('have.length', 0);

    cy.get('input[name="password"]')
      .type('123')
      .blur()
      .siblings('p')
      .should('have.length', 0);

    cy.get('#error-log').should(
      'have.text',
      JSON.stringify(
        [
          // It will quickly flash after `password` blur because `yup` schema
          // validation is async.
          { name: 'password', value: '123', error: 'Required' },
        ],
        null,
        2
      )
    );
  });

  it('should validate autofill', () => {
    // React overrides `input.value` setters, so we have to call
    // native input setter
    // See: https://stackoverflow.com/a/46012210/1709679
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      'value'
    )?.set;

    function setInputValue(input: HTMLElement, value: string) {
      nativeInputValueSetter?.call(input, value);
      const event = new Event('change', { bubbles: true });
      input.dispatchEvent(event);
    }

    cy.visit('http://localhost:3000/sign-in');

    cy.get('body').then($body => {
      // We have set value through JS to simulate autofill behavior.
      setInputValue($body.find('input[name="username"]')[0], '123');
      setInputValue($body.find('input[name="password"]')[0], '123');
    });

    cy.get('button').should('not.be.disabled');
  });
});
