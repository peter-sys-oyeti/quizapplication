import React, { useState } from "react";
import {
    Button,
    Header,
    Segment,
    Popup,
    Form,
    Divider,
    Card,
    Dimmer,
    Loader
} from "semantic-ui-react";
import { observer, inject } from "mobx-react";
import { saveQuiz } from "../../api/Quizzes";

const Quizzes = inject("store")(
    observer(props => {
        const [quiz, setQuiz] = useState({ name: "" });
        const [isDimmed, setDimmer] = useState(false);
        const { store, history } = props;

        const handleChange = e => {
            let value = e.target.value;
            let field = e.target.id;
            setQuiz(quiz => ({ ...quiz, [field]: value }));
        };

        const reset = () => {
            setQuiz(quiz => ({ ...quiz, name: "" }));
        };

        const navigateToQuestions = selectedQuiz => {
            // console.log(store.quizzesStore);

            store.quizzesStore.selectedQuiz(selectedQuiz);
            console.log(store.quizzesStore.quiz);
        };

        return (
            <React.Fragment>
                <Header as="h2" attached="top">
                    <Button
                        content="Quizzes"
                        icon="plus"
                        label={{
                            as: "a",
                            basic: true,
                            content: store.quizzesStore.quizzes.length
                        }}
                    />
                </Header>
                <Segment attached>
                    <Card.Group itemsPerRow={3}>
                        {store.quizzesStore.quizzes.map(quiz => (
                            <Card key={quiz.id} raised>
                                <Card.Content>
                                    <Card.Header>{quiz.name}</Card.Header>
                                </Card.Content>
                                <Card.Content extra>
                                    <div className="ui two buttons">
                                        <Button
                                            basic
                                            color="green"
                                            onClick={() => {
                                                store.quizzesStore.selectedQuiz(
                                                    {
                                                        id: quiz.id,
                                                        name: quiz.name
                                                    }
                                                );

                                                // history.push("/questions");
                                            }}
                                        >
                                            Add Question
                                        </Button>
                                    </div>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                </Segment>
            </React.Fragment>
        );
    })
);

export default Quizzes;
