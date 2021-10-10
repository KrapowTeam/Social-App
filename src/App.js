import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup';
import Forgot from './components/screens/Forgot';
import Admin from './components/screens/Admin';
import Otp from './components/screens/Otp';
import Forgotin from './components/screens/Forgotin';
import CreatePost from './components/screens/CreatePost';
import UserProfile from './components/screens/UserProfile';
import { reducer, initialState } from './reducers/userReducers';
export const UserContext = React.createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = React.useContext(UserContext);
  // React.useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   console.log('user in store', user);
  //   if (user) {
  //     dispatch({ type: 'USER', payload: user });
  //     history.push('/');
  //   } else {
  //     history.push('/Login');
  //   }
  // }, []);

  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/signup'>
        <Signup />
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/profile/:userid'>
        <UserProfile />
      </Route>
      <Route path='/profile'>
        <Profile />
      </Route>
      <Route path='/create'>
        <CreatePost />
      </Route>
      <Route path='/forgot'>
        <Forgot />
      </Route>
      <Route path='/forgotpassword'>
        <Forgotin />
      </Route>
      <Route path='/admin'>
        <Admin />
      </Route>

      <Route path='/otp'>
        <Otp />
      </Route>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
