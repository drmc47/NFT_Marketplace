const Web3 = require('web3')
const web3 = new Web3(window.ethereum)

export default function Profile() {
  const connect = async function () {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
    } else {
      alert(' Please Install Metamask')
      window.open(
        'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
        '_blank'
      )
    }
  }

  return (
    <div>
      {
        <button id='connect' onClick={connect}>
          Conectá tu cuenta Metamask
        </button>
      }
      <h3>My profile</h3>
    </div>
  )
}
