import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from '../pages/MainPage';
import Write from '../pages/WritePage';
import Detail from '../pages/DetailPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/write" element={<Write />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
