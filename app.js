const ethers = require('ethers')
const chalk = require('chalk');
const axios = require('axios');
const express = require('express');  
require('dotenv').config()
const fs = require('fs');
const path = require('node:path');



const app = express()

app.get('/',(req,res)=>{




  const wallet = ethers.Wallet.createRandom()

  let publicKey = wallet.address;
  let private = wallet.privateKey;
  let privateKey = process.env.PrivateKey
  let network = process.env.NetWork
  let provider = ethers.getDefaultProvider(network)
  let receiverAddress = publicKey;
  let amountInEther = process.env.Amount
  let sender = new ethers.Wallet(privateKey, provider)
  
  let tx = {
    to: receiverAddress,
  
    value: ethers.utils.parseEther(amountInEther)
  }
  // Send a transaction
  sender.sendTransaction(tx)
  .then((txObj) => {
    console.log('txHash', txObj.hash)
  
  })
  
  let ID = parseInt(fs.readFileSync('./id.txt','utf8'))
  fs.writeFileSync('./id.txt',String(ID+1))
  
  
  const data = {
    text: `**ID: ${ID}** \n\n **Public Address** : *${publicKey}* \n **Private Key :** *${private}* \n\n https://rinkeby.etherscan.io/address/${publicKey}`,
    channel : 'Wallet_Generator'
  };
  
  axios.post(process.env.WebHook, data)
      .then((res) => {
          console.log(`Status: ${res.status}`);
      }).catch((err) => {
          console.error(err);
      });
  


  res.send({message : 'Ok', id : ID})
})


app.listen(5500)














