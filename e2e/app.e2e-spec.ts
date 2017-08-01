import { BaccPage } from './app.po';

describe('bacc App', () => {
  let page: BaccPage;

  beforeEach(() => {
    page = new BaccPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
