import { getAccount, getContract, web3Instance } from "./web3";
import { routerABI } from "./../ABI/AnySwapRouter";
import { envdev } from "./environments";
import { allowanceOnBSC, approveOnBSC } from './RyoshiBCS'
import { allowanceOnETH, approveOnETH } from './RyoshiETH'

export const getROUTERContract = async () => {
    const routercontract = getContract(
        routerABI, 
        envdev.Router);
    return routercontract;
}


export const outunderlying = async(anyToken, to, amount, toChainID, currentChainId) => {
    const routercontract = await getROUTERContract();
    let allowedamount
    if(currentChainId == 56){
        allowedamount = await allowanceOnBSC();
        console.log("allowanceOnBSC", allowedamount)

        if(allowedamount > amount){
            var getData = await routercontract.methods.anySwapOutUnderlying(anyToken, to, amount, toChainID).send({
                from: await getAccount(),
            });;  
            
        }
        else{
            let result = await approveOnBSC();
            if(result.status == true){
                var getData = await routercontract.methods.anySwapOutUnderlying(anyToken, to, amount, toChainID).send({
                    from: await getAccount(),
                 });;  
            }
        }
    }
    if(currentChainId == 1){
        allowedamount = await allowanceOnETH();
        console.log("allowanceOnETH", allowedamount)
        if(allowedamount > amount){
            var getData = await routercontract.methods.anySwapOutUnderlying(anyToken, to, amount, toChainID).send({
                from: await getAccount(),
             });; 
        }
        else{
            let result = await approveOnETH();
            if(result.status == true){
            var getData = await routercontract.methods.anySwapOutUnderlying(anyToken, to, amount, toChainID).send({
                from: await getAccount(),
             });;  
            }
        }
    }
}



