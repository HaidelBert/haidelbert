import {NgModule} from '@angular/core';
import {APOLLO_NAMED_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, DefaultOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {getUserApiBaseUrl} from '../config/config';

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

function createNamedApollo(httpLink: HttpLink): Record<string, ApolloClientOptions<any>> {
  return {
    user: {
      name: 'user',
      link: httpLink.create({ uri: getUserApiBaseUrl() }),
      cache: new InMemoryCache(),
      defaultOptions,
    },
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_NAMED_OPTIONS,
      deps: [HttpLink],
      useFactory: createNamedApollo
    }
  ],
})
export class GraphQLModule {}
