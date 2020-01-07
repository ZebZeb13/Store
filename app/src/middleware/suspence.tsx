import * as React from "react";

// loading component for suspense fallback
const Loader = () => (
	<div className="App">
		<div>loading...</div>
	</div>
);

export default function({ children }: { children: React.ReactChild }) {
	return <React.Suspense fallback={<Loader />}>{children}</React.Suspense>;
}
