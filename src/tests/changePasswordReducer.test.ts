import {changePasswordReducer, initState, sendPass} from "../features/ChangePassword/changePasswordReducer";

test('has a new password been sent', ()=>{
    const endState = changePasswordReducer(initState, sendPass(true));

    expect(endState.isNewPasswordSend).toBeTruthy();
});

test('has a confirmation email been sent', ()=>{
    const endState = changePasswordReducer(initState, sendPass(true));

    expect(endState.isNewPasswordSend).toBeTruthy();
});