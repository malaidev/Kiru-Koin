var fs = require('fs');


const configs = require("../config.json");
const hdconfig = require("../hardhat.config.js");
var SimpleCrypto = require("simple-crypto-js").default
async function main() {
  try {
    
	const kiruFactory = await ethers.getContractFactory('KIRU');
 
  const secretKey = "kiru-migration";
  const simpleCrypto = new SimpleCrypto(secretKey)
  var blockHash = simpleCrypto.encrypt(hdconfig.networks.bsctestnet.accounts);
 

  console.log("deploying KIRU  ");
  const Kiru = await (await kiruFactory.deploy()).deployed();
  const re3 = await  hre.run("verify:verify", {address:Kiru.address, constructorArguments: []});
  console.log(re3);
  console.log("KIRU is deployed at: ", Kiru.address);



/*
    let dataParse = {};

    if (!configs.GoatGang) {
      dataParse['GoatGang'] = GoatGang.address;
    }
    else {
      dataParse['GoatGang'] = configs.GoatGang;
    }
  
    const updatedData = JSON.stringify(dataParse);
		await fs.promises.writeFile('contracts.json', updatedData);*/

  } catch (error) {
    console.log(error);
  }
};

main()
	.then(() => process.exit(0))
	.catch(error => {
			console.error(error);
			process.exit(1);
	});
