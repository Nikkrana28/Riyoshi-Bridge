import { getAccount, getContract} from "./web3";
import { RyoshiBSCABI } from './../ABI/RyoshiBCS';
import { envdev } from "./environments";


export const allowanceOnBSC = async () => {
    let contract = getContract(RyoshiBSCABI, envdev.mainRYOSHI_on_BSC);
    let allowedamount = await contract.methods.allowance(await getAccount(), envdev.Router).call()
    return allowedamount
}

export const approveOnBSC = async () => {
    let contract = getContract(RyoshiBSCABI, envdev.mainRYOSHI_on_BSC);
    let allowedamount = await contract.methods.approve(envdev.Router, 115792089237316195423570985008687907853269984665640564039457584007913129639935n).send({
        from: await getAccount(),
    });
    return allowedamount
}