import { YourCampusNeedsPage } from './app.po';

describe('your-campus-needs App', function() {
  let page: YourCampusNeedsPage;

  beforeEach(() => {
    page = new YourCampusNeedsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
