import abi from './UceCoin.json';
//abi = Application Binary Interface
// esta en smart contracts/artifacts/.../transactions json
//When an external application or another smart contract wants to interact with the blockchain, it needs to have some knowledge of a smart contract’s interface such as a way to identify a method and its parameters. This is facilitated by the Ethereum Application Binary Interface (ABI)
export const contractABI = abi.abi;
//export const contractAddress = '0x6Addf937a1600000d8e750010cEE64e9EAeE3D3D';
export const contractAddress = '0x0b572b391389352E10243C34f321d5Afe3cBF9b3';
