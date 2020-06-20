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
import { saveUser, getUser } from "../api/Users";
const { ipcRenderer } = window.require("electron");
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

        const checkUser = () => {
            ipcRenderer.send("get-username", "get username");
            ipcRenderer.on("username-reply", (event, arg) => {
                if (arg === "Error!") {
                    alert("Error, no keys found on registery");
                } else {
                    getUser(arg).then(result => {
                        if (result.length > 0) {
                            store.usersStore.selectUser({
                                id: result[0].get("objectId"),
                                username: result[0].get("username")
                            });
                            history.push("/quizzes");
                        } else {
                            saveUser(arg).then(result => {
                                store.usersStore.selectUser({
                                    id: result.get("objectId"),
                                    username: result.get("username")
                                });
                                history.push("/quizzes");
                            });
                        }
                    });
                }
            });
        };
        checkUser();

        return (
            <div className={styles.root}>
                <div className={styles.appContent}>
                    <Menu pointing fixed="top">
                        <Menu.Item>
                            <Header size="small">MTN Quiz App</Header>
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
                                    {"System Loader"}
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
                                        <Button>Proceed</Button>
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
