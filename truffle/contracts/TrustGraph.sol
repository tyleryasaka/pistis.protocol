pragma solidity ^0.4.24;

contract TrustGraph {
    event LinkAdded(address indexed source, address indexed target);
    event LinkRemoved(address indexed source, address indexed target);

    mapping(address => mapping(address => bool)) graph;

    function addLink(address target) public {
        require(msg.sender != target, "Cannot create link to oneself");
        graph[msg.sender][target] = true;
        emit LinkAdded(msg.sender, target);
    }

    function removeLink(address target) public {
        require(msg.sender != target, "Cannot remove link from oneself");
        require(isLinked(msg.sender, target), "Cannot remove link that does not exist");
        graph[msg.sender][target] = false;
        emit LinkRemoved(msg.sender, target);
    }

    function isLinked(address source, address target) public view returns (bool) {
        return graph[source][target];
    }
}
