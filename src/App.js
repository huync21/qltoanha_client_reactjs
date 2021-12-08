import './App.css';
import Header from './components/Header';
import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'
// import "swiper/css/bundle";
import {useSelector} from 'react-redux'
import Home from './components/Home';
import Login from './components/Login';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Company from './components/Company';
import ServiceRegistration_Company from './components/ServiceRegistration_Company';
import ServiceRegistration_RegisteredService from './components/ServiceRegistration_RegisteredServices';
import ServiceRegistration_Services from './components/ServiceRegistration_Services';
import Service from './components/Service';

function App() {
    // const isAdmin = useSelector(state => state.login.isAdmin);
    return (
        <div className="App">
            <Router>
                <Header />
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/contact">
                        <Contact />
                    </Route>
                    <Route path="/company">
                        <Company/>
                    </Route>
                    <Route path="/service-management">
                        <Service/>
                    </Route>
                    <Route path="/service-registration/companies">
                        <ServiceRegistration_Company/>
                    </Route>
                    <Route path="/service-registration/registered-services">
                        <ServiceRegistration_RegisteredService />
                    </Route>
                    <Route path="/service-registration/services">
                        <ServiceRegistration_Services/>
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
                <Footer />
            </Router>
        </div>
    );
}

export default App;