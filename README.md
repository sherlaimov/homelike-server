# Homelike server for assignment

## Solution

1. add new endpoint /countries which should represent the data from the `countries` collection

Done. 

2. add new endpoint /countries which should represent the data from the `countries` collection

Done.

3. add `countries` to /graphql endpoint

Done.

4. add `country` to `locations.graphql.schema` as a representative of `country` information

Done. Please, check out the `countries` service.

5. add functionality to use `limit` and `skip` as a parameters to fetch data through `/graphql` endpoint

Done. Please, take a look at graphql.resolvers.queries.js.

6. If you run the following query, location will always be `null`. Please figure out why this is happening. After you found out how this happens, please describe the reason and how you found the issue.

```
    apartments(owner: $owner) {  
            items {  
              location {  
                title  
              }  
            }  
          }  
        }
```
This query is working now. 

I had to go through dozens of publications on StackOverflow to solve this. It is in [this post](https://stackoverflow.com/questions/53577255/mongodb-graphql-and-feather-js-data-fetch-by-id-return-null-for-some-case/53577341) that I found the solution. The code below had `query` spelled in lowercase, whereas it needed to be capitalized, like this:

    location: apartment => {
            return Locations.find({ **Query**: { _id: apartment.location } }).then(result => result);
          }

To be honest with you this looks like a bug to me.  Other than this assumption I really have no idea why capitalized `Query` happened to solve the problem. I also assume we'd be better off using MongoDB's automatically created `ObjectIds` instead of plain strings for `_ids` in our collections.

7. I took the liberty to see if I could create a GraphQL search functionality. So I:

- modified the schema
- added this package `feathers-mongodb-fuzzy-search` to implement Mongo's native search.
- added text index for the `title` field in the locations, apartments and countries models.

You may use the query example below to test it.

    {
      search(title: "Studio") {
     		locations{
          title
        }
        apartments{
          title
        }
        countries{
          title
        }
        
      }
    }
    


## Background information

###run
- edit /config/default.json
- provide mongodb connection path [mongodb://localhost:27017/assignment by default]
- npm install
- npm start

###current endpoints
- `/users`
- `/apartments`
- `/locations`
- `/graphql`
- `/graphiql`

##What to do - for backend engineers
1. add new endpoint /countries which should represent the data from the `countries` collection
1. add `countries` to /graphql endpoint
1. add `country` to `locations.graphql.schema` as a representative of `country` information
1. add functionality to use `limit` and `skip` as a parameters to fetch data through `/graphql` endpoint
1. If you run the following query, location will always be `null`. Please figure out why this is happening.
After you found out how this happens, please describe the reason and how you found the issue. 
```query RootQuery($owner: String) {  
      apartments(owner: $owner) {  
        items {  
          location {  
            title  
          }  
        }  
      }  
    }
```  