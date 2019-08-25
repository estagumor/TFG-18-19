import { expect } from 'chai';
import { Given, When, Then, Before } from 'cucumber';
import { PublicationListPage } from '../src/publication.list.po';

  let app: PublicationListPage;

  Before(() => {
    app = new PublicationListPage();
  });

  Then("Deberia ver una lista con varias publicaciones",
    () => app.getListedtItems()
      .then(elems => expect(elems.length).to.be.greaterThan(0)));
