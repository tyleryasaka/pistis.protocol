pragma solidity ^0.4.24;

contract TrustGraph {
    event LinkAdded(address indexed source, address indexed target);
    event LinkRemoved(address indexed source, address indexed target);

    mapping(address => mapping(address => bool)) graph;

    function addLink(address target) public {
        require(msg.sender != target);
        graph[msg.sender][target] = true;
        emit LinkAdded(msg.sender, target);
    }

    function removeLink(address target) public {
        require(msg.sender != target);
        require(graph[msg.sender][target]);
        graph[msg.sender][target] = false;
        emit LinkRemoved(msg.sender, target);
    }

    function isLinked(address source, address target) public view returns (bool) {
        return graph[source][target];
    }
}
