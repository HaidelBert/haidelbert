interface HasuraAction<T>{
    session_variables: {
        [key: string]: string;
    };
    input: T;
    action: {
        name: string;
    };
}
