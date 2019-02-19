import * as React from 'react';

interface AppProps {
    appName:string;
}

export default class App extends React.Component<AppProps> {

render() {
    const { appName } = this.props;
    
    return (
    <header>
        <h1>Hello {appName} Boilerplater!</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pharetra sem a elementum imperdiet. Nullam mollis mi sem, eu suscipit massa elementum quis.</p>
        <p>... Write something here ...</p>
    </header>
    );
}

}