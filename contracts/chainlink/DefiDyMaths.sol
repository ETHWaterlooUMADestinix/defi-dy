/*

the contract is deployed on 0x8eC03A8990b9aA278c8fC3b5bBF765C4bd1B84a9

*/

pragma solidity 0.4.24;

import "https://github.com/smartcontractkit/chainlink/evm/contracts/ChainlinkClient.sol";
import "https://github.com/smartcontractkit/chainlink/evm/contracts/vendor/Ownable.sol";

contract DefiDyMaths is ChainlinkClient, Ownable {
  uint256 constant private ORACLE_PAYMENT = 1 * LINK;

  uint256 public borrowers;
  uint256 public suppliers;
  int256 public tokenRatio;
  uint256 public exchangeVal = 10**18;
  int256 public changeDay;
  bytes32 public lastMarket;

  event GetBorrowers(
    bytes32 indexed requestId,
    uint256 indexed price
  );
    
  event GetSuppliers(
    bytes32 indexed requestId,
    uint256 indexed price
  );


 
  constructor() public Ownable() {
    setPublicChainlinkToken();
  }

  function requestPrice(address _oracle, string _jobId)
    public
    onlyOwner
  { exchangeVal = 10**18;
    for (uint i=0; i<7; i++) {
        Chainlink.Request memory req = buildChainlinkRequest(stringToBytes32(_jobId), this, this.fulfillBorrowers.selector);
        req.add("get", "https://api.compound.finance/api/v2/ctoken");
        string[] memory path = new string[](3);
        path[0] = "cToken";
        path[1] = uint2str(i);
        path[2] = "number_of_borrowers";
        req.addStringArray("path", path);
        req.addInt("times",1);
        sendChainlinkRequestTo(_oracle, req, ORACLE_PAYMENT);
    }
    
     for (uint j =0; j<7; j++) {
        Chainlink.Request memory req1 = buildChainlinkRequest(stringToBytes32(_jobId), this, this.fulfillSuppliers.selector);
        req1.add("get", "https://api.compound.finance/api/v2/ctoken");
        string[] memory path1 = new string[](3);
        path1[0] = "cToken";
        path1[1] = uint2str(j);
        path1[2] = "number_of_suppliers";
        req1.addStringArray("path", path1);
        req1.addInt("times",1);
        sendChainlinkRequestTo(_oracle, req1, ORACLE_PAYMENT);
    }
  }

  

  function fulfillBorrowers(bytes32 _requestId, uint256 _price)
    public
    recordChainlinkFulfillment(_requestId)
  {
    emit GetBorrowers(_requestId, _price);
    borrowers += _price;
  
    tokenRatio -= int256(_price);
    exchangeVal += uint256(tokenRatio) * (10**12);
  }

  
  function fulfillSuppliers(bytes32 _requestId, uint256 _price)
    public
    recordChainlinkFulfillment(_requestId)
  {
    emit GetSuppliers(_requestId, _price);
    suppliers += _price;
    tokenRatio += int256(_price);
    exchangeVal += uint256(tokenRatio) * (10**12);
  }
  
  
  function getChainlinkToken() public view returns (address) {
    return chainlinkTokenAddress();
  }

  function withdrawLink() public onlyOwner {
    LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
    require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
  }

  function cancelRequest(
    bytes32 _requestId,
    uint256 _payment,
    bytes4 _callbackFunctionId,
    uint256 _expiration
  )
    public
    onlyOwner
  {
    cancelChainlinkRequest(_requestId, _payment, _callbackFunctionId, _expiration);
  }

  function stringToBytes32(string memory source) private pure returns (bytes32 result) {
    bytes memory tempEmptyStringTest = bytes(source);
    if (tempEmptyStringTest.length == 0) {
      return 0x0;
    }

    assembly { // solhint-disable-line no-inline-assembly
      result := mload(add(source, 32))
    }
  }
  function uint2str(uint i) internal pure returns (string){
    if (i == 0) return "0";
    uint j = i;
    uint length;
    while (j != 0){
        length++;
        j /= 10;
    }
    bytes memory bstr = new bytes(length);
    uint k = length - 1;
    while (i != 0){
        bstr[k--] = byte(48 + i % 10);
        i /= 10;
    }
    return string(bstr);
}
  
 

}


