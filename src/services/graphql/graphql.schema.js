import locationsSchema from '../locations/locations.graphql.schema.js';
import apartmentsSchema from '../apartments/apartments.graphql.schema.js';
import usersSchema from '../users/users.graphql.schema.js';
import countriesSchema from '../countries/countries.graphql.schema.js';

const rootSchema = [
  `
  type Query {
    user(_id: String): Users
    users(owner: String limit: Int skip: Int): UsersWithPagination

    apartment(_id: String): Apartments
    apartments(active: Boolean owner: String location: String limit: Int skip: Int): ApartmentsWithPagination
    
    location(_id: String): Locations
    locations(active: Boolean limit: Int skip: Int): LocationsWithPagination
    
    country(_id: String): Countries
    countries(limit: Int skip: Int): CountriesWithPagination

    #search(q: String) {
    #    id
    #    ... on User { name }
    #    ... on Comment { body author { name } }
    #  }
  
    search(title: String): Search

    
  }

  union searchResult = Locations | Apartments | Countries

  type Mutation {
   deleteApartment( _id: String! ): Apartments
  }

  type Search {
    locations: [Locations],
    apartments: [Apartments],
    countries: [Countries]
  }

  schema {
    query: Query
    mutation: Mutation
  }
`,
];

export default [
  ...rootSchema,
  ...locationsSchema,
  ...apartmentsSchema,
  ...usersSchema,
  ...countriesSchema,
];
