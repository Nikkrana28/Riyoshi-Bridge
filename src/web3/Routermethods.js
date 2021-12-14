import { getAccount, getContract, web3Instance } from "./web3";
import { routerABI } from "./../ABI/AnySwapRouter";
import { envdev } from "./environments";

export const getROUTERContract = async () => {
    const routercontract = getContract(
        routerABI, 
        envdev.Router);
    return routercontract;
}

export const SaleNFTItem = async(tokenAddress,tokenID,price) => {
    const routercontract = await getROUTERContract();
    var getData = await routercontract.methods.createItemForSale(tokenAddress,tokenID,price).send({
        from: await getAccount(),
    });;
    return getData
}

