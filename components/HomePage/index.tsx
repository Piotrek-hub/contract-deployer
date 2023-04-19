import {Web3Button} from "@web3modal/react";

import abi from "../../contracts/artifacts/contracts/Deployer.sol/Deployer.json"
import {useContract, useContractEvent, useSigner} from "wagmi";
import {useState} from "react";


interface DeployedToken {
    token_type:string;
    name:string;
    symbol: string;
    addr:string;
}

export default function HomePage() {
    const [name, setName] = useState<string>("")
    const [symbol, setSymbol] = useState<string>("")

    const [deployedTokens, setDeployedTokens] = useState<Array<DeployedToken>>([])

    const contract_address: `0x${string}` = "0x6d3563a4e42516a0669F013386dEc54cb16Cd63c"

    // BSC TESTNET ADDRESS = 0x6d3563a4e42516a0669F013386dEc54cb16Cd63c
    // FANTOM TESTNET ADDRESS = 0xa738f7CEd966382E30B4a54af1438e25e30C7BD4

    const {data: signer, isLoading} = useSigner()
    const contract = useContract({
        address: contract_address,
        abi: abi,
        signerOrProvider: signer,
    })

    useContractEvent({
        address:  contract_address,
        abi: abi,
        eventName: 'Created',
        listener: (token_type, name, symbol, addr) => {
            const dt: DeployedToken = {
                token_type: token_type as string,
                name: name as string,
                symbol: symbol as string,
                addr: addr as string
            }

            setDeployedTokens((prevDt: Array<DeployedToken>) => [...prevDt, dt])
        }
    })

    const validateSubmit = ():boolean => {
        if(signer == undefined ) {
            alert("Signer is undefined")
            return false
        }
        if (name?.length == 0 && symbol.length == 0) {
            alert("Please provide name and symbol")
            return false
        }

        return true;
    }

    const deployERC20 = () => {
        if (validateSubmit())
            contract?.deployERC20(name, symbol).then((value:any) => console.log(value)).catch((err:any) => console.log(err))

    }

    const deployERC721 = () => {
        if (validateSubmit())
            contract?.deployERC721(name, symbol).then((value:any) => console.log(value)).catch((err:any) => console.log(err))
    }

    return <div className={"mt-[200px] flex max-w-[1280px] items-start justify-center mx-auto gap-[200px]"}>
        <div>
            <div className={"grid place-items-center"}>
                <Web3Button/>
            </div>
            <div className={"mt-[50px] p-[20px] max-w-[1280px] mx-auto flex items-center justify-around flex-col gap-[30px]"}>
                <input required type={"text"} onChange={(e: any) => setName(e.target.value)} placeholder={"Token name"} className={"border-[1px] rounded-sm border-black p-3"}/>
                <input required type={"text"} onChange={(e: any) => setSymbol(e.target.value)} placeholder={"Token symbol"} className={"border-[1px] rounded-sm border-black p-3"}/>
                <div className={"flex gap-10 mt-[100px]"}>
                    <button onClick={deployERC20} type={"submit"} className={"bg-blue-400 px-4 py-2 rounded-sm"}>DEPLOY ERC20</button>
                    <button onClick={deployERC721} type={"submit"} className={"bg-red-400 px-4 py-2 rounded-sm"}>DEPLOY ERC721</button>
                </div>
            </div>
        </div>
        <div>
            <div className={"grid place-items-center"}>
              <p className={"text-2xl font-bold"}>Deployed tokens:</p>
            </div>
            <div className={"flex flex-col mt-[50px] gap-[10px]"}>
                {deployedTokens.map((dt:DeployedToken) => {
                    return <div className={"border-[1px] p-[20px] max-w-[1280px] mx-auto flex items-center justify-around flex-col gap-[30px]"}>
                        <div className={"flex flex-col items-center justify-start"}>
                            <span>TOKEN TYPE: {dt.token_type}</span>
                            <span>TOKEN NAME: {dt.name}</span>
                            <span>TOKEN SYMBOL: {dt.symbol}</span>
                            <span>TOKEN ADDRESS: {dt.addr}</span>
                        </div>
                    </div>
                })}
            </div>
        </div>
    </div>
}