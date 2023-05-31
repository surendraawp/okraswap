const WalletSwich = async () => {
    let chainId = await (window as any).ethereum.request({ method: 'eth_chainId' });    
    if(chainId == "0x38") {
        return true
    }
    else {
        await (window as any).ethereum.request({method: "wallet_switchEthereumChain", params: [{chainId: "0x38"}]})
        return false
    }
    
}

const addToken = async () => {
    const wasAdded = await (window as any).ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC-20 tokens, but eventually more!
          options: {
            address: "0x276e8F2A9D8Ecb875af19b3C5313A60aC10506A7", // The address of the token.
            symbol: "OKRT", // A ticker symbol or shorthand, up to 5 characters.
            decimals: 18, // The number of decimals in the token.
            image: "https://okratoken.com/images/OKRT_Coin01.png", // A string URL of the token logo.
          },
        },
      });
      console.log(wasAdded, 'adding....');
      
}

export {WalletSwich, addToken}