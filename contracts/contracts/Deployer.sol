// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Deployer {
    event Created(string token_type, string name, string symbol, address addr);

    function deployERC20(string memory name, string memory symbol) public  {
        ERC20 token = new ERC20(name, symbol);

        emit Created("ERC20", name, symbol, address(token));
    }

    function deployERC721(string memory name, string memory symbol) public  {
        ERC721 token = new ERC721(name, symbol);

        emit Created("ERC721", name, symbol, address(token));
    }
}