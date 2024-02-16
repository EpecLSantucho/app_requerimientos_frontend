import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import RutaProtegida from './layouts/RutaProtegida';

import Login from './paginas/Login';
import Registrar from './paginas/Registrar';
import OlvidePassword from './paginas/OlvidePassword';
import NuevoPassword from './paginas/NuevoPassword';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import Requerimientos from './paginas/Requerimientos';
import NuevoRequerimiento from './paginas/NuevoRequerimiento';
import Requerimiento from './paginas/Requerimiento';
import EditarRequerimiento from './paginas/EditarRequerimiento';
import NuevoDesarrollador from './paginas/NuevoDesarrollador';

import { AuthProvider } from './context/AuthProvider';
import { RequerimientoProvider } from './context/RequerimientoProvider';

function App() {

  return (
      <BrowserRouter>
        <AuthProvider>
          <RequerimientoProvider>
            <Routes>
              <Route path='/' element={<AuthLayout/>}>
                <Route index element={<Login/>}/>
                <Route path='registrar' element={<Registrar/>}/>
                <Route path='olvide-password' element={<OlvidePassword/>}/>
                <Route path='olvide-password/:token' element={<NuevoPassword/>}/>
                <Route path='confirmar/:id' element={<ConfirmarCuenta/>}/>
              </Route>

              <Route path='/requerimientos' element={<RutaProtegida/>}>
                <Route index element={<Requerimientos/>}/>
                <Route path='crear-requerimiento' element={<NuevoRequerimiento/>}/>
                <Route path='nuevo-desarrollador/:id' element={<NuevoDesarrollador/>}/>
                <Route path=':id' element={<Requerimiento/>}/>
                <Route path='editar/:id' element={<EditarRequerimiento/>}/>
              </Route>
            </Routes>
          </RequerimientoProvider>
        </AuthProvider>
      </BrowserRouter>
  )
}

export default App
