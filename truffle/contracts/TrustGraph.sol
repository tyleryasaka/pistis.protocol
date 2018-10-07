pragma solidity ^0.4.24;

/** @title Trust Graph */
contract TrustGraph {

    ///State

    mapping(address => mapping(address => bool)) graph;

    ///Events

    event LinkAdded(address indexed source, address indexed target);
    event LinkRemoved(address indexed source, address indexed target);

    ///Functions

    /**
    * @notice Add new link to the graph
    * @param target Address of the new entity to add
    */
    function addLink(address target) public {
        require(msg.sender != target, "Cannot create link to oneself");
        graph[msg.sender][target] = true;
        emit LinkAdded(msg.sender, target);
    }

    /**
    * @notice Remove an exisiting link from the graph
    * @param target Address of the entity to remove
    */
    function removeLink(address target) public {
        require(msg.sender != target, "Cannot remove link from oneself");
        require(isLinked(msg.sender, target), "Cannot remove link that does not exist");
        graph[msg.sender][target] = false;
        emit LinkRemoved(msg.sender, target);
    }


    /**
    * @notice Check if a link exist between two entities
    * @param source Address of the source entity to check
    * @param target Address of the target entity to check
    */
    function isLinked(address source, address target) public view returns (bool) {
        return graph[source][target];
    }
}
