import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchBids } from "../../apis";
import type { RootState } from '../index'

export type Bid = {
    id: string,
    price: string,        // wei
    createdAt: number,    // UTC timestamp
    expiration: number,   // UTC timestamp
    bidder: string,       // ethereum address
    nft: {
        contract: string, // ethereum address,
        id: number
    }
}
// Define a type for the slice state
interface BidsState {
  data: Array<Bid>,
  sortBy: string,
  loading: boolean
}

// Define the initial state using that type
const initialState: BidsState = {
  data: [],
  sortBy: '',
  loading: false
}

export const fetchBidsAPI = createAsyncThunk(
  'bids/fetchBidsStatus',
  async () => {
    const response = await fetchBids();
    return response.bids
  }
)

export const bidsSlice = createSlice({
  name: 'bids',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchBidsAPI.fulfilled, (state, action: PayloadAction<Array<Bid>>) => {
      // Add user to the state array
      state.data = action.payload
      state.loading = false;
    })
    builder.addCase(fetchBidsAPI.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchBidsAPI.rejected, (state) => {
      state.loading = false;
    })
  },
  reducers: {
    setSortType: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload
    },
  },
})

export const { setSortType } = bidsSlice.actions
// Other code such as selectors can use the imported `RootState` type
export const getBids = (state: RootState) => state.bids

export default bidsSlice.reducer