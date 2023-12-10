import homePageTrans from "./homePage";
import aboutUsTrans from "./aboutUsTrans";
import eventsPageTrans from "./eventsPageTrans";
import clientsPageTrans from "./clientsPageTrans";
import eventPageTrans from "./eventPageTrans";
import accountPageTrans from "./accountPageTrans";
import clientPageTrans from "./clientPageTrans";
import regPageTrans from "./regPageTrans";

const translationsEn = {
  header: {
    nav: {
      paragraph: "English language",
      about: "About",
      events: "Events",
      clients: "Clients",
      account: "Account",
    },
    btns: {
      login: "Log in",
      logout: "Log out",
    },
  },
  filterBlock: {
    name: "Filters",
    button: "Apply filters",
  },
  homepage: homePageTrans,
  aboutUsPage: aboutUsTrans,

  eventsPage: eventsPageTrans,
  clientsPage: clientsPageTrans,
  eventPage: eventPageTrans,
  accountPage: accountPageTrans,
  clientPage: clientPageTrans,
  loginPage: {
    paragraph: "Log in",
    mail: "mail",
    password: "password",
  },
  regPage: regPageTrans,
};

export default translationsEn;
