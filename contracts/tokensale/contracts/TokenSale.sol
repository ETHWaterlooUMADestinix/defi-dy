pragma solidity 0.5.8;

import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol";

contract TokenSale is Crowdsale{
	mapping(address => uint256) public contributions;

	constructor(
    uint256 _rate,
	  address payable _wallet,
	  IERC20 _token
  ) Crowdsale(_rate, _wallet, _token) public { }
}
