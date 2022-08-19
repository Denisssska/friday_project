import {appReducer, initializedSuccess, initState} from "../app/appReducer";

test('is app initialized', ()=>{
    const endState = appReducer(initState, initializedSuccess(true));

    expect(endState.isInitialized).toBeTruthy();
})