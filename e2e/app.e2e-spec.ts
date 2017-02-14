import { ConsentPage } from './app.po';

describe('consent App', function() {
  let page: ConsentPage;

  beforeEach(() => {
    page = new ConsentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
