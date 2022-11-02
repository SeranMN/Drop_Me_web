import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import View from './bus/View';
import Header from '../Header';
import AdminDashboard from './adminDashBoard/AdminDashboard';
import Timetable from './Timetable/Timetable';
import Journey from './Journey/Journey';
import Token from './Token/Token';
import Report from './Report/Report';

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route >
          {/* <Route path='/upcomingEvents/:id' exact element={<ViewUpcomingEvent />} /> */}
          <Route element={<Header />}>
            <Route path='/' exact element={<AdminDashboard />} />
            <Route path='/buses' exact element={<View />} />
            <Route path='/routes' exact element={<Routes/>} />
            <Route path='/timetable' exact element={<Timetable />} />
            <Route path='/journey' exact element={<Journey />} />
            <Route path='/token' exact element={<Token/>} />
            <Route path='/report' exact element={<Report/>} />





          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Routing