import { WingChatPage } from './app.po';

describe('wing-chat App', () => {
  let page: WingChatPage;

  beforeEach(() => {
    page = new WingChatPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
