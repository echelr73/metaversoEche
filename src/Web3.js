import abi from "./abi/abi.json" assert {type: "json"};
import { smart_contract_address } from "./contractparams";

const blockchain = new Promise((res, rej) => {
    const h6User = document.getElementById('user');
    const h6ActualSupply = document.getElementById('actualSupply');
    const h6MaxSupply = document.getElementById('maxSupply');
    const buttonExt = document.getElementById('extraction');
    buttonExt.style.display = "none";

    window.addEventListener('load', async () => {
        // If Metamask is not available
        if (typeof window.ethereum == "undefined") {
            rej("You should install Metamask to use it!");
        }

        // Web3 Instance
        let web3 = new Web3(window.ethereum);
        let contract = new web3.eth.Contract(abi, smart_contract_address);

        // Get my Metamask address
        web3.eth.requestAccounts().then((accounts) => {
            contract.methods.getOwner().call({ from: accounts[0] }).then((address) => {
                h6User.innerHTML = accounts[0];
                if (accounts[0] == address) buttonExt.style.display = "block";
                else  buttonExt.style.display = "none";
            });
        });

        // Get the current supply of NFT Tokens
        web3.eth.requestAccounts().then((accounts) => {
            contract.methods.totalSupply().call({ from: accounts[0] }).then((supply) => {
                h6ActualSupply.innerHTML = supply;
            });
        });

        // Get the maximum supply of NFT Tokens
        web3.eth.requestAccounts().then((accounts) => {
            contract.methods.maxSupply().call({ from: accounts[0] }).then((maxsupply) => {
                h6MaxSupply.innerHTML = maxsupply
            });
        });

        // Get your buildings made in the Metaverse
        web3.eth.requestAccounts().then((accounts) => {
            contract.methods.getOwnerBuildings().call({ from: accounts[0] }).then((buildings) => {
                console.log("-> Your buildings: ", buildings);
            });
        });

        // Get all the buildings made in the Metaverse
        web3.eth.getAccounts().then((accounts) => {
            contract.methods.totalSupply().call({ from: accounts[0] }).then((supply) => {
                contract.methods.getBuildings().call({ from: accounts[0] }).then((data) => {
                    res({ supply: supply, building: data });
                });
            });
        });
    });
});



export default blockchain;

