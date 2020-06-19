import React from "react";
import { inject, observer } from "mobx-react";
import { compose } from "recompose";
import { Container } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";
import SystemLoader from "./SystemLoader";
import App from "./App";


class Main extends React.Component {
    render() {
        return (
            <Container style={{ marginTop: "5em" }}>
                <Switch>
                    <Route exact path="/" component={SystemLoader} />
                    <Route path="/app" component={App} />
                </Switch>
            </Container>
        );
    }
}
export default compose(observer, inject("store"))(Main);
