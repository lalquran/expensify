import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>
      The info is:
      { props.info }
    </p>
  </div>
);

const withAdminWarning = (WrappedComponent) => (props) => (
  <div>
    <p>This is private info. Please dont share</p>
    {props.isAdmin && <WrappedComponent {...props} />}
  </div>
);

const requireAuthentication = (WrappedComponent) => (props) => (
  <div>
    {props.isAuthenticated ? <WrappedComponent {...props} /> : <p>Please log in to view</p>}
  </div>
);

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);


// ReactDOM.render(<AdminInfo isAdmin={true} info="There are some details"/>, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info="There are some details" />, document.getElementById('app'));
