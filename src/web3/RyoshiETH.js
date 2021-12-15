import { getAccount, getContract} from "./web3";
import { RyoshiEthABI } from './../ABI/RyoshiEth'
import { envdev } from "./environments";

export const allowanceOnETH = async () => {
    let contract = getContract(RyoshiEthABI, envdev.mainRYOSHI_on_ETHEREUM);
    let allowedamount = await contract.methods.allowance(await getAccount(), envdev.Router).call()
    return allowedamount;
}

export const approveOnETH = async () => {
    let contract = getContract(RyoshiEthABI, envdev.mainRYOSHI_on_ETHEREUM);
    let allowedamount = await contract.methods.approve(envdev.Router, 115792089237316195423570985008687907853269984665640564039457584007913129639935n).send({
        from: await getAccount(),
    });
    return allowedamount;
}