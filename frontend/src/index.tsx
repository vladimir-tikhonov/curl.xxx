import * as React from 'react';
import * as ReactDom from 'react-dom';

import { Root } from 'src/ui';

const appContainer = document.getElementById('app_container')!;

ReactDom.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
    appContainer,
);
