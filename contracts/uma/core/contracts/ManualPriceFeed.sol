pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./PriceFeedInterface.sol";
import "./Testable.sol";
import "./Withdrawable.sol";

interface DefiDyMaths {
  function exchangeVal() external view returns (int);
}

/**
 * @title Implementation of PriceFeedInterface with the ability to manually push prices.
 */
contract ManualPriceFeed is PriceFeedInterface, Withdrawable, Testable {

    using SafeMath for uint;

    // A single price update.
    struct PriceTick {
        uint timestamp;
        int price;
    }

    // Ethereum timestamp tolerance.
    // Note: this is technically the amount of time that a block timestamp can be *ahead* of the current time. However,
    // we are assuming that blocks will never get more than this amount *behind* the current time. The only requirement
    // limiting how early the timestamp can be is that it must have a later timestamp than its parent. However,
    // this bound will probably work reasonably well in both directions.
    uint constant private BLOCK_TIMESTAMP_TOLERANCE = 900;

    enum Roles {
        Governance,
        Writer,
        Withdraw
    }

    constructor(bool _isTest) public Testable(_isTest) {
        _createExclusiveRole(uint(Roles.Governance), uint(Roles.Governance), msg.sender);
        _createExclusiveRole(uint(Roles.Writer), uint(Roles.Governance), msg.sender);
        createWithdrawRole(uint(Roles.Withdraw), uint(Roles.Governance), msg.sender);
    }

    /**
     * @notice Whether this feed has ever published any prices for this identifier.
     */
    function isIdentifierSupported(bytes32 identifier) external view returns (bool isSupported) {
        isSupported = _isIdentifierSupported(identifier);
    }

    function latestPrice(bytes32 identifier) external view returns (uint publishTime, int price) {
        require(_isIdentifierSupported(identifier));
        // CDai borrowRatePerBlock
        publishTime = getCurrentTime(); // prices[identifier].timestamp;
        DefiDyMaths defidy = DefiDyMaths(0x8eC03A8990b9aA278c8fC3b5bBF765C4bd1B84a9);
        price = defidy.exchangeVal();
    }

    function _isIdentifierSupported(bytes32 identifier) private view returns (bool isSupported) {
        isSupported = getCurrentTime() > 0;
    }
}
