import React, { useState } from "react";
import {
    Header,
    Menu,
    Container,
    Form,
    Segment,
    Divider,
    Button,
    Dimmer,
    Loader
} from "semantic-ui-react";

import { inject, observer } from "mobx-react";
import { bootDatabase } from "./Bootstrapper";
const styles = {
    root: {
        display: "flex",
        minHeight: "100vh"
    },
    appContent: {
        flex: 1,
        display: "flex",
        flexDirection: "column"
    },
    mainContent: {
        flex: 1,
        padding: "48px 36px 0",
        background: "#eaeff1",
        position: "relative"
    }
};

const SystemLoader = inject("store")(
    observer(props => {
        const { history, store } = props;
        const [isDimmed, setDimmer] = useState(true);

        bootDatabase(store, history);

        return (
            <div className={styles.root}>
                <div className={styles.appContent}>
                    <Menu pointing fixed="top">
                        <Menu.Item>
                            <Header size="small">Ashfi Pharmacy System</Header>
                        </Menu.Item>
                    </Menu>
                    <main className={styles.mainContent}>
                        <React.Fragment>
                            <Container style={{ marginTop: "1em" }}>
                                <Header
                                    as="h2"
                                    attached="top"
                                    style={{ width: "500px", margin: "auto" }}
                                >
                                    {"Login"}
                                </Header>
                                <Segment
                                    attached
                                    style={{ width: "500px", margin: "auto" }}
                                >
                                    <Dimmer active={isDimmed} inverted>
                                        <Loader inverted>Loading</Loader>
                                    </Dimmer>
                                    <Form>
                                        <Divider />
                                        <Button>Login</Button>
                                    </Form>
                                </Segment>
                            </Container>
                        </React.Fragment>
                    </main>
                </div>
            </div>
        );
    })
);
export default SystemLoader;
