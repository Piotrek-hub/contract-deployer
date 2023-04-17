import {Web3Button} from "@web3modal/react";

import { useAccount, useContract, useSigner } from 'wagmi'
import {useEffect} from "react";

export default function HomePage() {
    const {address, isConnecting, isDisconnected} = useAccount()


    return <Web3Button/>
}