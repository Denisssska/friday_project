import React, {useEffect} from 'react';
import '../App.css';
import {RoutesComponent} from '../common/components/routes/RoutesComponent';
import {useAppDispatch} from '../common/utils/hooks';
import {authMeTC} from '../features/auth/authReducer';
import {Header} from '../common/components/Header/Header';


function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(authMeTC());
    }, []);

    return (
        <div className="App">
            <Header/>
            <RoutesComponent/>
        </div>
    );
}

export default App;
