import { withClientState } from "@tgrx/apollo-link-state";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { setContext } from "apollo-link-context";
import { ResolverDefaults, Resolvers } from "../gql";
import { RootState } from "../reducers";
import { useSelector } from "react-redux";

interface IProps {
	graphqlURL: string;
	children: React.ReactChild;
}

export default function({ children, graphqlURL }: IProps) {
	const auth = useSelector((state: RootState) => state.auth);
	console.log(auth);
	const _cache = new InMemoryCache();

	const _stateLink = withClientState({
		cache: _cache,
		defaults: ResolverDefaults,
		resolvers: Resolvers,
	});

	const _httpLink = new HttpLink({
		uri: graphqlURL,
	});

	// Create error handler link
	// https://github.com/apollographql/apollo-client/blob/master/docs/source/features/error-handling.md
	const _errorLink = onError(({ graphQLErrors, networkError }) => {
		console.log(graphQLErrors);
		if (graphQLErrors) {
			graphQLErrors.map(({ message, locations, path }) => {
				console.error(
					`[GraphQL] Message: ${message}, Location: ${locations}, Path: ${path}`
				);
			});
		}

		if (networkError) {
			console.error(`[Network] ${networkError}`);
		}
	});
	console.log(auth.token);

	const authLink = setContext((_, { headers }) => {
		// get the authentication token from local storage if it exists
		const token = localStorage.getItem("token");
		// return the headers to the context so httpLink can read them
		return {
			headers: {
				...headers,
				authorization: auth.token ? auth.token : "",
			},
		};
	});

	const links = [_stateLink, _errorLink, authLink.concat(_httpLink)];

	const _apolloClient: ApolloClient<any> = new ApolloClient({
		cache: _cache,
		connectToDevTools: true,
		link: ApolloLink.from(links),
	});

	return <ApolloProvider client={_apolloClient}>{children}</ApolloProvider>;
}
