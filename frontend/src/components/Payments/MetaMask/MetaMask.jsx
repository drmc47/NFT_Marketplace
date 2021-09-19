import React,{ useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core'
const Web3 = require('web3');
const web3 = new Web3(window.ethereum);

function PaymentMetaMask() {
  const allProductsCart = useSelector(state => state.shoppingTrolley)
  console.log("Productos para metaMask: ", allProductsCart)
  const dispatch = useDispatch()


    const dataMetaMask = []
    const pay = async function () {

      
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        let accounts = await web3.eth.getAccounts();
        let myAddress = accounts[0];
        dataMetaMask.push(myAddress)
      }

      for(let data of allProductsCart) {
        let transactionTo = data.tokenId;
        let moneyAmount = data.price;
  
        dataMetaMask.push(transactionTo)
        dataMetaMask.push(moneyAmount)
      }

      console.log("array con datos del carrito", dataMetaMask)

    return web3.eth.sendTransaction({
      from: dataMetaMask[0],
      to: dataMetaMask[1],
      value: dataMetaMask[2],
    })
  } 

  const [metaMaskOption, setMetaMaskOption] = useState(true);

  return (
    <div className="App">
            <Button className="button" type="button" onClick={() => setMetaMaskOption(!metaMaskOption)} 
                    color='primary' variant='contained'> {metaMaskOption ? 'Metamask' : 'Metamask'}
            </Button>

      {metaMaskOption ? (
        <div >

        </div>
      ) : (

        <div className="paymentOption">

          <header className="App-header">

            <div id="content">

            <Button onClick={() => dispatch(pay)}
                    color='primary'
                    variant='contained'>
                Enviar
            </Button>

            </div>

          </header>
        </div>
      )}
    </div>
  );
}

export default PaymentMetaMask;