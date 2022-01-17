import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ethers } from 'ethers';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import dayjs from 'dayjs';
import { RootState } from '../../store';
import { fetchTokenData } from '../../apis';
import { NFT_ADDRESS } from '../../constants';
import NFTAbi from '../../abi/NFT.abi.json';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';


type Bid = {
    id: string,
    name: string,
    image: string,
    bidder: string,
    price: string,
    expiration: string,
    status: string
}

const addressAbbr = (address : string) => {
    return address.slice(0, 4) + '....' + address.slice(-4);
}

function BidsTable() {

    const bids = useSelector((state : RootState) => state.bids);
    const { sortBy } = bids;
    const [data, setData] = useState<Array<Bid>>([]);

    const provider = useMemo(() => new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"), []);
    const NFTContract =  useMemo(()=> new ethers.Contract(NFT_ADDRESS, NFTAbi, provider), [provider]);

    useEffect(()=> {
        const convertData = async () => {
            for(let bid of bids.data) {
                const currentDate = dayjs();
                const expirationDate = dayjs(bid.expiration);
                const tokenURI = await NFTContract.tokenURI(bid.nft.id);
                const tokenData  = await fetchTokenData(tokenURI);
                setData(data => ([...data, {
                    id: bid.id,
                    name: tokenData.name,
                    image: tokenData.image,
                    bidder: addressAbbr(bid.bidder),
                    price: ethers.utils.formatEther(bid.price),
                    expiration: expirationDate.format('dddd, MMMM D, YYYY h:mm A'),
                    status: expirationDate.diff(currentDate) > 0 ? "active" : "expired"
                }]));
            }
            
        }
        convertData();
    }, [bids.data, NFTContract, provider])

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>ID</Th>
                    <Th>Name</Th>
                    <Th>Image</Th>
                    <Th>Bidder</Th>
                    <Th>Price</Th>
                    <Th>Expiration</Th>
                    <Th>Status</Th>
                </Tr>
            </Thead>
            <Tbody>
                {data?.sort((a: Bid, b: Bid) => parseFloat(a[sortBy as keyof Bid]) > parseFloat(b[sortBy as keyof Bid]) ? 1 : -1)
                    .map((item: Bid) => 
                    <Tr key={item.id}>
                        <Td className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                            <div className="text-sm text-gray-900">{item.id}</div>
                        </Td>
                        <Td className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                            <div className="text-sm text-gray-900">{item.name}</div>
                        </Td>
                        <Td className="flex justify-center px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                            <img alt={item.name} src={item.image} width = {100} />
                        </Td>
                        <Td className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                            <div className="text-sm text-gray-900">{item.bidder}</div>
                        </Td>
                        <Td className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                            <div className="text-sm text-gray-900">{item.price}</div>
                        </Td>
                        <Td className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                            <div className="text-sm text-gray-900">{item.expiration}</div>
                        </Td>
                        <Td className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'active' ? 'bg-green-800 text-white' : 'bg-red-500'} `}>
                                {item.status}
                            </span>
                        </Td>
                    </Tr>
                )}
            </Tbody>
            </Table>
    )
}

export default BidsTable
