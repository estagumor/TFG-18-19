import { expect } from 'chai';
import { Given, When, Then, Before } from 'cucumber';
import { PublicationListPage } from '../src/publication.list.po';

  let app: PublicationListPage;

  Before(() => {
    app = new PublicationListPage();
  });

  Then("I should see a list with a few publications",
    () => app.getListedtItems()
      .then(elems => expect(elems.length).to.be.greaterThan(0)));
