![Drag Racing](https://github.com/tyleryasaka/trustability/blob/master/react/public/logo.jpg)

# pistis.protocol

Pistis is a protocol for establishing subjective, peer-to-peer trust in decentralized systems. This protocol can be used as a base layer for decentralized reputation and perhaps other use cases.

## Inspiration

Without a central authority to keep out malicious actors, decentralized reputation systems are vulnerable to Sybil attacks. A Sybil attack is a method of manipulating a reputation system by creating fake identities. A sybil resistant network must have a way to determine legitimacy. But how can legitimacy be determined in a way that could not be gamed by creating fake identities? This is a circular problem. Existing solutions to this problem usually involve a federated model, where some decentralization is sacrificed in exchange for Sybil resistance. The motiviation behind Pistis is implement a solution that is both Sybil resistant and completely peer-to-peer.

## Subjectivity

Pistis produces subjective results. That is, they depend on the observer. There is no known way to implement a fully decentralized system of trust that is both objective and sybil resistant. Pistis allows each identity to be the center of its own graph, thus having full control over who it determines is legitimate without requiring any sort of consensus (which could be manipulated). By using subjectivity, Pistis becomes resistant to Sybil attacks. While Pistis is not immune to manipulation, it does make influence costly from a social perspective. Influence is achieved through trust, and trust is socially expensive. A malicious actor can create as many fake identities as they want, but those identities won't matter until a real world identity becomes subjectively convinced that they are legitimate.

## How it works

Pistis operates on a web of trust and uses graph analysis and probability theory to assign a probability from 0 to 1 from any source entity to a target entity. Stated another way, every entity can look at every other entity and see a probability of legitimacy for that entity. Pistis models declarations of trust in the web of trust (the edges in the graph) as statements with some degree of confidence, or some probability of being free of errors. Given any assumption about what these edge probabilities are, Pistis calculates the aggregate probability that every independent path from one entity (i.e. node) to another is free of errors.

## Technologies Involved

Pistis is young and evolving, so current the implementation only a proof of concept. Currently Pistis is implemented on top of Ethereum using a single smart contract to store edges in the web of trust. [The Graph](https://thegraph.com) is used to efficiently retrieve events from the Ethereum blockchain. We have an npm package called pistis.js for easily querying trust confidence. We also have a UI to demonstrate the capabilities of Pistis, built using React.

```
Give examples
```

### Development

All our our packages are managed with npm. More documentation will be available in the near future.

## Authors

Gabriel Garcia, Tim (?), Marco Montesneri (?), Tyler Yasaka

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
