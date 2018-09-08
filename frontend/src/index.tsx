import * as React from 'react';
import * as ReactDom from 'react-dom';

const appContainer = document.getElementById('app_container')!;
const Root = () => <div>Hello world!</div>;

ReactDom.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
    appContainer,
);
