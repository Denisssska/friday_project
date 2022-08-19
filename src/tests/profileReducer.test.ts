import {initState, authReducer, updateMeAC, errorAC, loginAC} from "../features/auth/authReducer";

const testState = {
    _id: 'string',
    email: 'test@test',
    name: 'Bob',
    avatar: 'some pic',
    publicCardPacksCount: 0,
    created: 'some date',
    updated: 'new date',
    isAdmin: false,
    verified: false,
    rememberMe: false,
    error: null,
    isLogin: true,
    isRegistration: false
};

test('get user data for authorization', ()=>{
    const endState = authReducer(initState, loginAC(testState));

    expect(endState.isLogin).toBe(true);
    expect(endState.email).toBe('test@test');
    expect(endState.error).toBe(null);
});

test('check errorAC', ()=>{
    const endState = authReducer(initState, errorAC('some error'));

    expect(endState.error).toBe('some errorAC');
});

test('update user data', ()=>{
    const endState = authReducer(testState, updateMeAC({name: 'NEW NAME', avatar: 'NEW URL AVATAR'}));

    expect(endState.name).toBe('NEW NAME');
    expect(endState.avatar).toBe('NEW URL AVATAR');
})