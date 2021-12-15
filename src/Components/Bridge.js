import React, { useState, useEffect} from 'react'
import './bridge.css'
import bsc from './../images/bsc.png'
import arrow from './../images/arrows.png'
import token from './../images/RYOSHI_TOKEN.png'
import eths from './../images/Ethereum.png'
import { outunderlying } from './../web3/Routermethods'
import { initInstance, loginProcess } from './../web3/web3'
import { envdev } from './../web3/environments'
import  getWeb3 from './../web3/getWeb3'

function Bridge() {
  const [amount, setAmount] = useState(0);
  const [chainID, setChainID] = useState()
  
  
  useEffect(() => {
    initInstance();
    loginProcess();
    chainchanged();
  }, [])


  const chainchanged = async() => {
    const web3 = await getWeb3();
    let chain = await web3.eth.getChainId();
    setChainID(chain)
    console.log("Current chain ID is ",chain)
  }

  window.ethereum.on('chainChanged',(chainId) => {
    window.location.reload();
  });

  const chainChangeOnclick = async() => {
    const Web3 = await initInstance();
    let chain = await Web3.eth.getChainId();
    console.log("Current ",chain)
      if(chainID == 56){
        try {
          await Web3.eth.currentProvider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x1" }]
          });
        } catch (error) {
          alert(error.message);
        }

      }
      else if(chainID == 1){
        try {
          await Web3.eth.currentProvider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x38" }]
          });
        } catch (error) {
          alert(error.message);
        }

      }
      else{
          try {
            await Web3.eth.currentProvider.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x1" }]
            });
          } catch (error) {
            alert(error.message);
          }
    }
  }


  const BSCtoEth =  async(swapAmount) => {
    let anytoken
    let to
    let toChainID 
    if(chainID == 56){
      anytoken = envdev.anyRYOSHI_on_BSC
      to = envdev.mainRYOSHI_on_ETHEREUM
      toChainID = 1
    }
    else{
      anytoken = envdev.anyRYOSHI_on_ETHEREUM
      to = envdev.mainRYOSHI_on_BSC
      toChainID = 56
    }
    
    try{
      if(chainID == 56 || chainID == 1){
        await outunderlying(anytoken, to, swapAmount, toChainID, chainID);
      }
      else{
        alert("Please Switch to Binance Smart Chain Mainnet or Ethereum Mainnet")
      }
    }
    catch(e){
      console.log("error is",e)
    }
  }
  return (
    <>
    <div className="top_bridge_class container">
      <div className="bridge_class">
        <div className="app_header">
          <h5 style={{ paddingTop: '20px', fontWeight: '100' }}>Ryoshi Bridge</h5>
        </div>
        <hr className="solid" />
        <div className="chain_changing">

          {/* changing images according to the current network */}
          <div className="binance">
            {chainID == 56 ?
            <div className="img" style={{ display: 'grid' }}>
              <p style={{ fontSize: '10px' }}>From</p>
              <div style={{ backgroundColor: '##383838' }}>
                <img s src={bsc} style={{borderRadius:"2px"}} />
              </div>
            </div>: <div className="img" style={{ display: 'grid' }}>
              <p style={{ fontSize: '10px' }}>From</p>
              <div style={{ backgroundColor: '##383838' }}>
                <img src={eths} style={{borderRadius:"2px"}}  />
              </div>
            </div>}

            {chainID == 56?<div className="text">
              <br />
              <br />
              <p style={{ fontSize: '10px' }}>
                Binance
                <br />
                Smart Chain
              </p>
            </div>:<div className="text">
              <br />
              <br />
              <p style={{ fontSize: '10px' }}>
                Ethereum
                <br/>
                Network
              </p>
            </div>}


          </div>
          <div className="convertion" onClick={() => chainChangeOnclick()}><img src={arrow} style={{paddingTop:"40px"}} /></div>
          <div className="ethereum">
            {chainID == 56?<div className="img" style={{ display: 'grid' }}>
              <p style={{ fontSize: '10px' }}>To</p>
              <div style={{ backgroundColor: '##383838' }}>
                <img src={eths} style={{borderRadius:"2px"}}  />
              </div>
            </div>:<div className="img" style={{ display: 'grid' }}>
              <p style={{ fontSize: '10px' }}>To</p>
              <div style={{ backgroundColor: '##383838' }}>
                <img s src={bsc} style={{borderRadius:"2px"}} />
              </div>
            </div>}
          {chainID ==56?
            <div className="text">
              <br />
              <br />
              <p style={{ fontSize: '10px' }}>
                Ethereum
                <br/>
                Network
              </p>
            </div>:<div className="text">
              <br />
              <br />
              <p style={{ fontSize: '10px' }}>
                Binance
                <br />
                Smart Chain
              </p>
            </div>}
          </div>
        </div>
        <hr className="solid" />
        <div className="amount_ender">
          <div className="inner_amount_ender">
            <input
              className="inputbox"
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <img src={token} alt='Token' style={{paddingTop:'6px',borderRadius:'100px'}}/>
            {/* <h5 style={{ paddingTop:'13px',fontWeight:'20px'}}>RYOSHI</h5> */}
          </div>
        </div>
        <hr className="solid" />
        <div className="transfer_btn">
          <button className="btn_tran" onClick={() => BSCtoEth(amount)}>Transfer</button>
        </div>
      </div>
    </div>
    <div className='top_bridge_class container' style={{textAlign:'center'}} >
       <p>Minimum Crosschain Amount is 0.08 BNB and 0.02 ETH<br/>Maximum Crosschain Amount is 12,000 BNB and 5,000 ETH</p>
       
       <p></p>
    </div>
    </>
  )
}

export default Bridge
