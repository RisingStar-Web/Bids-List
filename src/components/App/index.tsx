import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBidsAPI, setSortType } from '../../store/bids/bidsSlice';
import { RootState } from '../../store';
import Loading from '../Loading';
import BidsTable from '../BidsTable';
import DropDown from '../DropDown';
import { TYPES } from '../../constants';

function App() {

  const bids = useSelector((state : RootState) => state.bids);
  const [sortBy, setSortBy] = useState<string>(TYPES[0].value);

  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchBidsAPI());
  }, [dispatch])

  useEffect(()=> {
    dispatch(setSortType(sortBy))
  }, [sortBy, dispatch])


  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-between items-center p-4 bg-gray-200 w-full mb-8 shadow-2xl">
        <h1 className="text-2xl">Bids List</h1>
        <DropDown sortBy={sortBy} setSortBy={setSortBy} types={TYPES} />
      </div>
      { bids?.loading ? <Loading /> : <BidsTable /> }
    </div>
  );
}

export default App;
