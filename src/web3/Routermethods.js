import { getAccount, getContract, web3Instance } from "./web3";
import { routerABI } from "./../ABI/AnySwapRouter";
import { envdev } from "./environments";

export const getROUTERContract = async () => {
    const routercontract = getContract(
        routerABI, 
        envdev.Router);
    return routercontract;
}

export const outunderlying = async(anyToken, to, amount, toChainID) => {
    const routercontract = await getROUTERContract();
    var getData = await routercontract.methods.anySwapOutUnderlying(anyToken, to, amount, toChainID).send({
        from: await getAccount(),
    });;
    return getData
}

export const inunderlying = async(anyToken, to, amount, toChainID) => {
    const routercontract = await getROUTERContract();
    var getData = await routercontract.methods.anySwapInUnderlying(anyToken, to, amount, toChainID).send({
        from: await getAccount(),
    });;
    return getData
}

