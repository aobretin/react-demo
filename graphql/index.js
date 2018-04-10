const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const cors = require('cors');

const {Book, Others} = require('./typesSchema');

class BookMaker {
  constructor(id, {title, author}) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.sex = 'M';
    this.extraInfo = 'Not available yet';
    this.others = {
      favorite: false
    }
  }
}

const parties = [
  {
    id: '0',
    name: 'Party 1',
    type: 'virtual',
    date: {
      startDate: '2018-03-22',
      startTime: '22:00',
      endDate: '2018-03-23',
      endTime: '05:00'
    },
    host: {
      name: 'Jon Doe',
      mail: 'j@m.com',
      phone: '123123',
      social: 'fb',
      address: 'Some address'
    },
    position: {
      lat: '44.4323612',
      lng: '26.1362941'
    },
    guests: [
      {
        id: '0',
        name: 'gigi ugu',
        status: '1',
        isConsultant: '1',
        fragrance: 'exotic',
        items: '4'
      },
      {
        id: '1',
        name: 'gigi ugu1',
        status: '1',
        isConsultant: '0',
        fragrance: 'exotic',
        items: '3'
      }
    ],
    status: '1'
  },
  {
    id: '1',
    name: 'Party 2',
    type: 'virtual',
    date: {
      startDate: '2018-01-30',
      startTime: '22:00',
      endDate: '2018-01-31',
      endTime: '05:00'
    },
    host: {
      name: 'Jon Doe2',
      mail: 'j@m.com2',
      phone: '123123',
      social: 'fb2',
      address: 'Some address2'
    },
    position: {
      lat: '44.4412182',
      lng: '26.1311791'
    },
    guests: [
      {
        id: '0',
        name: 'gigi ugu',
        status: '1',
        isConsultant: '0',
        fragrance: 'exotic',
        items: '4'
      },
      {
        id: '1',
        name: 'gigi ugu1',
        status: '0',
        isConsultant: '0',
        fragrance: 'exotic',
        items: '3'
      },
      {
        id: '2',
        name: 'gigi ugu2',
        status: '1',
        isConsultant: '1',
        fragrance: 'exotic',
        items: '2'
      }
    ],
    status: '2'
  },
  {
    id: '2',
    name: 'Party 3',
    type: 'real',
    date: {
      startDate: '2018-02-15',
      startTime: '22:00',
      endDate: '2018-02-16',
      endTime: '05:00'
    },
    host: {
      name: 'Jon Doe3',
      mail: 'j@m.com3',
      phone: '123123',
      social: 'fb3',
      address: 'Some address3'
    },
    position: {
      lat: '44.4496744',
      lng: '26.1267595'
    },
    guests: [
      {
        id: '0',
        name: 'gigi ugu',
        status: '1',
        isConsultant: '0',
        fragrance: 'exotic',
        items: '4'
      },
      {
        id: '1',
        name: 'gigi ugu1',
        status: '1',
        isConsultant: '0',
        fragrance: 'exotic',
        items: '3'
      }
    ],
    status: '4'
  },
  {
    id: '3',
    name: 'Party 4',
    type: 'virtual',
    date: {
      startDate: '2017-10-11',
      startTime: '22:00',
      endDate: '2017-10-12',
      endTime: '05:00'
    },
    host: {
      name: 'Jon Doe4',
      mail: 'j@m.com4',
      phone: '123123',
      social: 'fb4',
      address: 'Some address4'
    },
    position: {
      lat: '44.4496744',
      lng: '26.1267595'
    },
    guests: [
      {
        id: '0',
        name: 'gigi ugu',
        status: '1',
        isConsultant: '0',
        fragrance: 'exotic',
        items: '4'
      },
      {
        id: '1',
        name: 'gigi ugu1',
        status: '1',
        isConsultant: '0',
        fragrance: 'exotic',
        items: '3'
      },
      {
        id: '2',
        name: 'gigi ugu2',
        status: '1',
        isConsultant: '0',
        fragrance: 'exotic',
        items: '3'
      },
      {
        id: '3',
        name: 'gigi ugu3',
        status: '1',
        isConsultant: '0',
        fragrance: 'exotic',
        items: '3'
      }
    ],
    status: '1'
  },
  {
    id: '4',
    name: 'Party 14',
    type: 'collective',
    date: {
      startDate: '2018-05-12',
      startTime: '22:00',
      endDate: '2018-05-13',
      endTime: '05:00'
    },
    host: {
      name: 'Jon Doe5',
      mail: 'j@m.com5',
      phone: '123123',
      social: 'fb5',
      address: 'Some address5'
    },
    position: {
      lat: '44.4323612',
      lng: '26.1362941'
    },
    guests: [
      {
        id: '0',
        name: 'gigi ugu',
        status: '1',
        isConsultant: '0',
        fragrance: 'exotic',
        items: '4'
      }
    ],
    status: '1'
  },
  {
    id: '5',
    name: 'Party 42',
    type: 'virtual',
    date: {
      startDate: '2018-03-03',
      startTime: '22:00',
      endDate: '2018-03-04',
      endTime: '05:00'
    },
    host: {
      name: 'Jon Doe6',
      mail: 'j@m.com6',
      phone: '123123',
      social: 'fb6',
      address: 'Some address6'
    },
    position: {
      lat: '44.4323612',
      lng: '26.1362941'
    },
    status: '1'
  }
]

// Some fake data
const books = [
  {
    id: '0',
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    sex: 'M',
    extraInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    others: {
      favorite: true
    }
  },
  {
    id: '1',
    title: 'Jurassic Park',
    author: 'Michael Crichton',
    sex: 'F',
    extraInfo: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?',
    others: {
      favorite: false
    }
  },
];

// The GraphQL schema in string form
const typeDefs = `
  type Query {
    parties: [Party],
    party(id: ID!): Party,

    books: [Book],
    book(id: ID!): Book,
    guest(partyID: ID!, guestID: ID!): Guest
  }

  type Party {
    id: ID,
    name: String,
    date: Date,
    host: Host,
    position: Position,
    guests: [Guest],
    status: String,
    type: String
  }

  type Guest {
    id: ID,
    name: String,
    status: String,
    isConsultant: String,
    fragrance: String,
    items: String
  }

  type Date {
    startDate: String,
    startTime: String,
    endDate: String,
    endTime: String
  }

  type Host {
    name: String,
    mail: String,
    phone: String,
    social: String,
    address: String
  }

  type Position {
    lat: String,
    lng: String
  }



  type Book {
    id: ID,
    title: String,
    author: String,
    sex: String,
    extraInfo: String,
    others: Others
  }

  type Others {
    favorite: Boolean
  }

  input Favorite {
    favorite: Boolean
  }

  input BookInput {
    author: String,
    title: String,
    extraInfo: String,
    others: Favorite
  }

  input PartyInput {
    id: ID,
    name: String,
    date: DateInput,
    host: HostInput,
    status: String,
    type: String
  }

  input DateInput {
    startDate: String,
    startTime: String,
    endDate: String,
    endTime: String
  }

  input HostInput {
    name: String,
    mail: String,
    phone: String,
    social: String,
    address: String
  }

  input GuestInput {
    firstname: String,
    lastname: String,
    phone: String,
    mail: String
  }

  type Mutation {
    addBook(book: BookInput!): [Book]
    deleteBook(id: ID!): [Book]
    modifyBook(id: ID!, editBook: BookInput!): [Book]

    modifyParty(editedParty: PartyInput!): [Party]
    deleteParty(id: ID!): [Party]

    addGuest(id: ID!, guest: GuestInput!): [Guest]
  }
`;

// The resolvers
const resolvers = {
  Query: {
    books: () => books,
    parties: () => parties,
    party: (root, {id}, context) => parties.filter(party => party.id === id)[0],
    book: (root, {id}, context) => books.filter(book => book.id === id)[0],

    guest: (root, {partyID, guestID}, context) => {
      const party = parties.filter(party => party.id === partyID)[0];
      const guest = party.guests.filter(guest => guest.id === guestID)[0];

      return guest;
    }
  },
  Mutation: {
    addGuest: (root, {id, guest}, context) => {
      const {
        firstname,
        lastname,
        phone,
        mail
      } = guest;

      const targetedParty = parties.filter(party => party.id === id)[0];
      const newGuest = {
          id: targetedParty.guests.length.toString(),
          fragrance: 'exotic',
          isConsultant: '0',
          items: '0',
          status: '2',
          phone: phone,
          mail: mail,
          name: `${firstname} ${lastname}`
      }

      targetedParty.guests.push(newGuest);

      return targetedParty.guests;
    },
    addBook: (root, {book}, context) => {
      const id = books.length.toString();
      const newBook = new BookMaker(id, book);
      books.unshift({...newBook});

      return books;
    },
    deleteBook: (root, {id}, context) => {
      books.some((book, idx) => {
        if (book.id === id) return books.splice(idx, 1);
      });

      return books;
    },
    modifyBook: (root, {id, editBook}, context) => {
      books.some((book, idx) => {
        if (book.id === id) {
          const newBook = Object.assign({}, book, editBook);

          return books.splice(idx, 1, newBook);
        }
      });

      return books;
    },

    modifyParty: (root, {editedParty}, context) => {
      const {
        id
      } = editedParty;

      if (!id.length) {
        editedParty.id = parties.length.toString();

        parties.push({
          guests: [
            {
              id: '0',
              name: editedParty.host.name,
              status: '1',
              isConsultant: '1',
              fragrance: 'exotic',
              items: '0'
            }
          ],
          position: {
            lat: '44.4323612',
            lng: '26.1362941'
          },
          ...editedParty
        })
      } else {
        parties.some((party, idx) => {
          if (party.id === id) {
            const newParty = Object.assign({}, party, editedParty);

            return parties.splice(idx, 1, newParty);
          }
        });
      }

      return parties;
    },

    deleteParty: (root, {id}, context) => {
      parties.some((party, idx) => {
        if (party.id === id) return parties.splice(idx, 1);
      });

      return parties;
    }
  }
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use('/graphql', cors(), bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});
