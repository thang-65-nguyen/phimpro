import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LayoutHome from './view/home/Layout';
import LayoutDescribe from './view/Describe/Layout';
import LayoutMovie from './view/Movie/Layout';
import LayoutSearch from './view/search/Layout';
import LayoutListFilm from './view/danhsachphim/phimle/layout';
import LayoutListFilmHoatHinh from './view/danhsachphim/phimhoathinh/layout';
import LayoutListFilmPhimBo from './view/danhsachphim/phimbo/layout';
import LayoutListFilmTVShow from './view/danhsachphim/tvshow/layout';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<LayoutHome/>} />
            <Route path='/:typeList/:slug' element={<LayoutDescribe/>}></Route>
            <Route path='/WatchMovie/:slug' element={<LayoutMovie/>}/>
            <Route path='/tim-kiem' element={<LayoutSearch />} />
            <Route path='/phim-le' element={<LayoutListFilm />} />
            <Route path='/hoat-hinh' element={<LayoutListFilmHoatHinh/>} />
            <Route path='/phim-bo' element={<LayoutListFilmPhimBo/>} />
            <Route path='/tv-show' element={<LayoutListFilmTVShow/>} />
        </Routes>
    );
};

export default AppRouter;