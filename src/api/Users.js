import InitApi from "./InitApi";

export const saveUser = newUser => {
    const Users = InitApi.parse.Object.extend("Users");
    const user = new Users();
    return user.save(newUser);
};

export const getUser = userName => {
    const Users = InitApi.parse.Object.extend("Users");
    const query = new InitApi.parse.Query(Users);
    query.equalTo("username", userName);
    return query.find();
};

export const usersLiveQuery = () => {
    let query = new InitApi.parse.Query("Users");
    let subscription = InitApi.client.subscribe(query);
    return subscription;
};
