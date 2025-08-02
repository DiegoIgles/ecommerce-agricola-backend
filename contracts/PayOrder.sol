// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PayOrder {
    address public owner;

    mapping(uint => bool) public paidOrders;

    event OrderPaid(uint indexed orderId, address indexed payer, uint amount);

    constructor() {
        owner = msg.sender;
    }

    function payOrder(uint orderId) external payable {
        require(!paidOrders[orderId], "Orden ya pagada");
        require(msg.value > 0, "Debes enviar ETH");

        paidOrders[orderId] = true;
        emit OrderPaid(orderId, msg.sender, msg.value);
    }

    function withdraw() external {
        require(msg.sender == owner, "Solo el owner puede retirar");
        payable(owner).transfer(address(this).balance);
    }
}
