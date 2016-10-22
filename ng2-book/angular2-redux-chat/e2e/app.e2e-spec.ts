import { Angular2ReduxChatPage } from './app.po';

describe('angular2-redux-chat App', function() {
  let page: Angular2ReduxChatPage;

  beforeEach(() => {
    page = new Angular2ReduxChatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
