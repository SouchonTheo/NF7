import '../css/Form.css';
import '../css/Error.css';
import '../css/Info.css';
import '../css/Success.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-native';

import {ethers} from 'ethers'

import NFT from '../NFTapi/ArtCollectible.json';
import { nftContractAddress } from '../config.js';


export default function Mint() {
    
	const [success, setSuccess] = useState('');
	const [err, setErr] = useState('');
	const [info, setInfo] = useState('');
	const [lk, setLink] = useState('');

    const [selectedFile, setSelectedFile] = useState(null);
    const [inputs, setInputs] = useState({});

    const [mintedNFT, setMintedNFT] = useState(null)
	const [miningStatus, setMiningStatus] = useState(null)
	const [loadingState, setLoadingState] = useState(0)
	const [txError, setTxError] = useState(null)
	const [currentAccount, setCurrentAccount] = useState('')
	const [correctNetwork, setCorrectNetwork] = useState(false)

    const pinFileToIPFS = async (link) => {    
        const pinataApiKey = "570cbd4a1c9f50d3b1a6";
        const pinataApiSecret = "b5b3c3c188884a845add4356ad8846e3409ba70358aaede23309e887b0d89f51";
        const pinataEndpoint = "https://api.pinata.cloud/pinning/pinFileToIPFS";
        const pinataEndpointJson = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
        const form_data_image = new FormData();
        try {
            form_data_image.append('file', selectedFile);
            const request_image = {
                method: 'post',
                url: pinataEndpoint,
                maxContentLength: 'Infinity',
                headers: {
                    pinata_api_key: pinataApiKey,
                    pinata_secret_api_key: pinataApiSecret,
                    'Content-Type': `multipart/form-data; boundary=${form_data_image._boundary}`,
                },
                data: form_data_image,
            };
            console.log(request_image);
            const response_image = await axios(request_image);
            console.log('request_image:', request_image.data);


            const link_image = 'https://ipfs.io/ipfs/' + response_image.data.IpfsHash;

            // Metadata JSON 
            const att = JSON.stringify({"trait_type": "Color", "value": "White"});
            const jsonTXT = JSON.stringify({"attributes":att, "description": inputs.description, "image": link_image, "name": inputs.title});
			
			
            const request = {
				method: 'post',
				url: pinataEndpointJson,
				maxContentLength: 'Infinity',
				headers: {
					pinata_api_key: pinataApiKey,
					pinata_secret_api_key: pinataApiSecret,
				},
				data: JSON.parse(jsonTXT),
            };
            const response = await axios(request);
            console.log(response.data);
            const final_link = 'https://ipfs.io/ipfs/' + response.data.IpfsHash;
			
			console.log(final_link);
			await mintNFT(final_link);
            
			const jsonPOST = JSON.stringify({ "couleur": 'white', "description": inputs.description, "image": link_image, "name": inputs.title});
			console.log(jsonPOST);
			const postJSONFinal = JSON.stringify({metadata : JSON.parse(jsonPOST), signer : currentAccount});
			console.log(postJSONFinal);


            axios.post('http://localhost:3500/nfts',JSON.parse(postJSONFinal))
            .then(res => {console.log(res.data);})
            .catch(error => {
				console.error('There was an error!', error);
				setInfo('');
				setSuccess('');
				setErr('There was an error!', error);});
            
        } catch (err) {
			setInfo('');
			setSuccess('');
			setErr('Error occurred while pinning file to IPFS: ', err);
            console.log('Error occurred while pinning file to IPFS: ', err);
        }
    }

    	// Checks if wallet is connected
	const checkIfWalletIsConnected = async () => {
		const { ethereum } = window
		if (ethereum) {
			console.log('Got the ethereum object: ', ethereum)
		} else {
			setSuccess('');
			setInfo('');
			setErr('No Wallet found. Connect Wallet');
			console.log('No Wallet found. Connect Wallet')
		}

		const accounts = await ethereum.request({ method: 'eth_accounts' })

		if (accounts.length !== 0) {
			console.log('Found authorized Account: ', accounts[0])
			setCurrentAccount(accounts[0])
		} else {
			setSuccess('');
			setInfo('');
			setErr("No authorised account found");
			console.log('No authorized account found')
		}
	}

	// Calls Metamask to connect wallet on clicking Connect Wallet button
	const connectWallet = async () => {
		try {
			const { ethereum } = window

			if (!ethereum) {
				setSuccess('');
				setInfo('');
				setErr('Metamask not detected');
				console.log('Metamask not detected')
				return
			}
			let chainId = await ethereum.request({ method: 'eth_chainId' })
			setSuccess('');
			setInfo(info + 'Connected to chain : ' + chainId + "  ");
			setErr('');
			console.log('Connected to chain:' + chainId)

			const rinkebyChainId = '0x4'

			const devChainId = 1337
			const localhostChainId = `0x${Number(devChainId).toString(16)}`

			if (chainId !== rinkebyChainId && chainId !== localhostChainId) {
				alert('You are not connected to the Rinkeby Testnet!')
				return
			}

			const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

			setSuccess('');
			setInfo(info + 'Found account. ');
			setErr('');
			console.log('Found account', accounts[0])
			setCurrentAccount(accounts[0])
		} catch (error) {
			setSuccess('');
			setInfo('');
			setErr('Error connecting to metamask', error);
			console.log('Error connecting to metamask', error)
		}
	}

	// Checks if wallet is connected to the correct network
	const checkCorrectNetwork = async () => {
		const { ethereum } = window
		let chainId = await ethereum.request({ method: 'eth_chainId' })
		console.log('Connected to chain:' + chainId)

		const rinkebyChainId = '0x4'

		const devChainId = 1337
		const localhostChainId = `0x${Number(devChainId).toString(16)}`

		if (chainId !== rinkebyChainId && chainId !== localhostChainId) {
			setCorrectNetwork(false)
		} else {
			setCorrectNetwork(true)
		}
	}

    const mintNFT = async (link) => {
        try {
			const { ethereum } = window

			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum)
				const signer = provider.getSigner()
				const nftContract = new ethers.Contract(
					nftContractAddress,
					NFT.abi,
					signer
				)

                console.log(nftContract)

                let nftTx = await nftContract.claimItem(link);
				setSuccess('');
				setInfo(info + 'Mining...');
				setErr('');
				console.log('Mining....', nftTx.hash)
				setMiningStatus(0)

				let tx = await nftTx.wait()
				setLoadingState(1)
				console.log('Mined!', tx)
				let event = tx.events[0]
				let value = event.args[2]
				let tokenId = value.toNumber()

				setLink("https://testnets.opensea.io/assets/rinkeby/" + nftContractAddress + "/" + tokenId);

				console.log(
					`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTx.hash}`
				)

				console.log("linkToNFT : ", lk);
				setInfo('');
				setErr('');
				setSuccess("Your NFT have been successfully minted. See it at this link :");

			} else {
				console.log("Ethereum object doesn't exist!")
			}
		} catch (error) {
			console.log('Error minting character', error)
			setTxError(error.message)
		}
    }

    useEffect(() => {
		checkIfWalletIsConnected()
		checkCorrectNetwork()
	}, [])

    const handleSubmit = (event) => {
        connectWallet();
        const link = pinFileToIPFS();
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }

    return (
        <div className= "background">   
            <form className= "form-box">
                <h3>Fill out this form in order to mint you NFT : </h3>
                <input type="file" onChange={handleFileSelect} /><br/>
                <label> Title :              
                    <input type="text" name="title" value={inputs.title || ""} onChange={handleChange} /><br/>
                </label>
                <label> Description :              
                    <input type="text" name="description" value={inputs.description || ""} onChange={handleChange} /><br/>
                </label>
                <div className='btn'>
                    <Button color="primary" onPress={handleSubmit} title="Mint" />
                </div>
				{ success &&
                    <div className="success"> { success }<br/>
					<a href={lk}>See you nft</a>
                </div> }
				{ err &&
                    <div className="error"> { err } 
                </div> }
				{ info &&
                    <div className="info"> { info } 
                </div> }
            </form>
        </div>   
    )
}