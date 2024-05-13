import json

from web3 import Web3

from thuexe.settings import INFURA_URL

contract_abi = json.loads('''\
[
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_seller",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "payer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "PaymentReceived",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "buy",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "price",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "seller",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
''')
contract_address = '0x5AbFEc25f74Cd88437631a7731906932776356f9' # ETH contract address

class ThanhToan:
    def __init__(self, account, price):
        self.w3 = Web3(Web3.HTTPProvider("http://localhost:7545"))
        self.contract = self.w3.eth.contract(address=contract_address, abi=contract_abi)
        self.account = account
        self.seller = "0xad713ad7d094C8d1F9A91FFBFBA43612f96ca2Ea"
        self.price = price
        self.privateKey = "0xc741a0a49779bcd42655078d578765015fc67ed8e6aae41f2072f435393f63f2"

    def buy(self):
        nonce = self.w3.eth.get_transaction_count(self.account)
        price_in_wei = self.w3.to_wei(self.price, 'ether')
		
		# Build the transaction
        tx = {
            'nonce': nonce,
            'from': self.account,
            'to': self.seller,
            'value': price_in_wei,
            'gas': 21000,
            'gasPrice': self.w3.to_wei(5, 'gwei'),
        }
        # Sign and send the transaction
        signed_tx = self.w3.eth.account.sign_transaction(tx, private_key=self.privateKey)
        tx_hash = self.w3.eth.send_raw_transaction(signed_tx.rawTransaction)
        tx_receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
        # Check if the transaction was successful
        if tx_receipt['status'] != 1:
            raise Exception(f'Transaction failed: {tx_receipt["transactionHash"].hex()}')