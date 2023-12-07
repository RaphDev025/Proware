import { UserAuth, AdminAuth } from 'Pages/Auth'
import { ContainerPage, PageRoute } from 'Views'
import "react-loading-skeleton/dist/skeleton.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { UserProvider } from 'Context/UserContext';
import { ItemProvider } from 'Context/ItemContext'

function App() {
  return (
    <BrowserRouter>
    <UserProvider>
      <ItemProvider>
      <div className="App w-auto h-100">
        <Routes>
          <Route path='/' element={<UserAuth />} />
          <Route path='/auth' element={<AdminAuth/>} />
          {/* Nested Routing Configuration from ContainerPage */}
          <Route path='/modiform/*' element={<ContainerPage />} />
          <Route path='/admin/*' element={<PageRoute />} />
        </Routes>
      </div>
      </ItemProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
