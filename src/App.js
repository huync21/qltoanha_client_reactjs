import './App.css';
import Header from './components/Header';
import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'
// import "swiper/css/bundle";
import { useSelector } from 'react-redux'
import Home from './components/Home';
import Login from './components/Login';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Company from './components/Company';
import ServiceRegistration_Company from './components/ServiceRegistration_Company';
import ServiceRegistration_RegisteredService from './components/ServiceRegistration_RegisteredServices';
import ServiceRegistration_Services from './components/ServiceRegistration_Services';
import Service from './components/Service';
import Salary  from './components/Salary';
import BuildingEmployee  from './components/BuildingEmployee';
import Floor from './components/Floor';
import RentedArea from './components/RentedArea';
import ContractCompany from './components/Contract_Companies';
import Statistics from './components/Statistics';
import StatisticsRentedAreas from './components/Statistics_RentedAreas';
import Employee from './components/Employee';
import MonthlyStatistics from './components/MonthlyStatistics';
import MonthlyStatisticDetails from './components/MonthlyStatisticsDetails';
import MonthlySalary from './components/MonthlySalary';
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
                    <Route path="/company/view-employees/:id">
                        <Employee />
                    </Route>
                    <Route path="/company">
                        <Company />
                    </Route>
                    <Route path="/service-management">
                        <Service />
                    </Route>
                    <Route path="/service-registration/companies">
                        <ServiceRegistration_Company />
                    </Route>
                    <Route path="/service-registration/registered-services">
                        <ServiceRegistration_RegisteredService />
                    </Route>
                    <Route path="/service-registration/services">
                        <ServiceRegistration_Services />
                    </Route>
                    <Route path="/salary">
                        <Salary/>
                    </Route>
                    <Route path="/buildingemployee">
                        <BuildingEmployee/>
                    </Route>
                    <Route path="/floors">
                        <Floor />
                    </Route>
                    <Route path="/rented-areas">
                        <RentedArea />
                    </Route>
                    <Route path="/contract-registration">
                        <ContractCompany />
                    </Route>
                    <Route path="/monthly-fee-statistics/rented-areas-of-company">
                        <StatisticsRentedAreas/>
                    </Route>
                    <Route path="/monthly-fee-statistics">
                        <Statistics />
                    </Route>
                    <Route path="/monthly-statistics">
                        <MonthlyStatistics/>
                    </Route>
                    <Route path="/monthly-statistics-details">
                        <MonthlyStatisticDetails/>
                    </Route>
                    <Route path="/monthly-salary">
                        <MonthlySalary/>
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