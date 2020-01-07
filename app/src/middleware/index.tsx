import * as React from "react";
import Apollo from "./apollo";
import Router from "./router";
import Store from "./store";
import Suspence from "./suspence";
import JwtToken from "./jwtToken";

const GQL_ENDPOINT = "http://localhost:3001/graphql";

function Middlwares({ children }: { children: React.ReactChild }) {
	// ROUTER must come before ALL OTHER middleware
	return (
		<Suspence>
			<Store>
				<JwtToken>
					<Apollo graphqlURL={GQL_ENDPOINT}>
						<Router>{children}</Router>
					</Apollo>
				</JwtToken>
			</Store>
		</Suspence>
	);
}

export default Middlwares;
