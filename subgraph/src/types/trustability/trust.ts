import {
  EthereumEvent,
  SmartContract,
  EthereumValue,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  I128,
  U128,
  I256,
  U256,
  H256
} from "@graphprotocol/graph-ts";

export class LinkAdded extends EthereumEvent {
  get params(): LinkAddedParams {
    return new LinkAddedParams(this);
  }
}

export class LinkAddedParams {
  _event: LinkAdded;

  constructor(event: LinkAdded) {
    this._event = event;
  }

  get source(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get target(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class LinkRemoved extends EthereumEvent {
  get params(): LinkRemovedParams {
    return new LinkRemovedParams(this);
  }
}

export class LinkRemovedParams {
  _event: LinkRemoved;

  constructor(event: LinkRemoved) {
    this._event = event;
  }

  get source(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get target(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class trust extends SmartContract {
  static bind(address: Address): trust {
    return new trust("trust", address);
  }

  isLinked(source: Address, target: Address): boolean {
    let result = super.call("isLinked", [
      EthereumValue.fromAddress(source),
      EthereumValue.fromAddress(target)
    ]);
    return result[0].toBoolean();
  }
}
