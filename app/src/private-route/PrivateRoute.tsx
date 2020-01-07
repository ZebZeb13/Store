import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

export interface ProtectedRouteProps extends RouteProps {
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = props => {
  const auth = useSelector((state: RootState) => state.auth);
  console.log(auth);
  if (!auth.isAuthentificated) {
    const renderComponent = () => <Redirect to={{ pathname: '/' }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  } else {
    return <Route {...props} />;
  }
};

export default ProtectedRoute;