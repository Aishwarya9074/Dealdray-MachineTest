import {Routes,Route} from 'react-router-dom';
import Home from './Pages/Home';
import Adminlogin from './Admin/Adminlogin';
import Dashboard from './Admin/Dashboard';
import Employeelist from './Admin/Employee/Employeelist';
import EditEmployee from './Admin/Employee/EditEmployee';
import CreateEmployee from './Admin/CreateEmployee';


const App=()=>{
  return <div className="app">
  
    <Routes>
   
      <Route path='/' element={<Home/>} />
      <Route path='/admin/login' element={<Adminlogin/>} />
      <Route path='/admin/dashboard' element={<Dashboard/>} />
      <Route path='/admin/employees' element={<Employeelist/>} />
      <Route path='/admin/edit/:id' element={<EditEmployee/>} />
      <Route path='/admin/createemployee' element={<CreateEmployee/>} />






    </Routes>
  </div>

}
export default App;