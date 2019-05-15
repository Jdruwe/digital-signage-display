import {browser, by, element} from 'protractor';

export class RegisterPage {
  navigateTo() {
    return browser.get('/auth/register');
  }

  fillCredentials(credentials: any) {
    element(by.css('[name="username"]')).sendKeys(credentials.username);
    element(by.css('[name="email"]')).sendKeys(credentials.email);
    element(by.css('[name="password"]')).sendKeys(credentials.password);
    element(by.id('submit')).click();
  }

  getErrorMessage() {
    return element(by.css('.error-message'));
  }
}

