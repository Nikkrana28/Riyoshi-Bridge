import React, {useEffect} from 'react'
import './bridge.css'
import bsc from './../images/bsc.png'
import arrow from './../images/arrows.png'
import eths from './../images/Ethereum.png'
import { outunderlying } from './../web3/Routermethods'
import { initInstance, loginProcess } from './../web3/web3'

function Bridge() {
  useEffect(() => {
    initInstance();
    loginProcess();
  }, [])

  return (
    <div className="top_bridge_class container">
      <div className="bridge_class">
        <div className="app_header">
          <h5 style={{ paddingTop: '20px', fontWeight: '100' }}>Ryoshi Bridge</h5>
        </div>
        <hr className="solid" />
        <div className="chain_changing">
          <div className="binance">
            <div className="img" style={{ display: 'grid' }}>
              <p style={{ fontSize: '10px' }}>From</p>
              <div style={{ backgroundColor: '##383838' }}>
                <img s src={bsc} style={{borderRadius:"2px"}} />
              </div>
            </div>
            <div className="text">
              <br />
              <br />
              <p style={{ fontSize: '10px' }}>
                Binance
                <br />
                Smart Chain
              </p>
            </div>
          </div>
          <div className="convertion"><img src={arrow} style={{paddingTop:"40px"}} /></div>
          <div className="ethereum">
            <div className="img" style={{ display: 'grid' }}>
              <p style={{ fontSize: '10px' }}>To</p>
              <div style={{ backgroundColor: '##383838' }}>
                <img src={eths} style={{borderRadius:"2px"}}  />
              </div>
            </div>
            <div className="text">
              <br />
              <br />
              <p style={{ fontSize: '10px' }}>
                Ethereum
                <br/>
                Network
              </p>
            </div>
          </div>
        </div>
        <hr className="solid" />
        <div className="amount_ender">
          <div className="inner_amount_ender">
            <input
              className="inputbox"
              type="number"
              placeholder="0.0"
              value="Submit"
            />
            <h5 style={{ paddingTop:'13px',fontWeight:'20px'}}>RYOSHI</h5>
          </div>
        </div>
        <hr className="solid" />
        <div className="transfer_btn">
          <button className="btn_tran">Transfer</button>
        </div>
      </div>
    </div>
  )
}

export default Bridge
