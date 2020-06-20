import InitApi from "./InitApi";

export const saveUser = newUser => {
    const Users = InitApi.parse.Object.extend("Users");
    const user = new Users();
    return user.save(newUser);
};

export const getUser = userName => {
    const Users = InitApi.parse.Object.extend("Users");
    const users = new InitApi.parse.Query(Usrs);
    query.equalTo("userName", userName);
    return query.find();
};

export const answersLiveQuery = () => {
    let query = new InitApi.parse.Query("Answers");
    let subscription = InitApi.client.subscribe(query);
    return subscription;
};
