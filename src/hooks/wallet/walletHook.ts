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

export {WalletSwich}