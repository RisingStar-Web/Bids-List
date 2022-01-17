export const fetchBids = async () => {
    try {
        const response =  await fetch("https://nft-fe-hiring.vercel.app/api/bids");
        return response.json();
    } catch (error) {
        console.log(error)
    }
}

export const fetchTokenData = async (tokenURI: string) => {
    try {
        const response =  await fetch(tokenURI);
        return response.json();
    } catch (error) {
        console.log(error)
    }
}