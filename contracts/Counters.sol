// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

library Counters {
  struct Counter {
    uint256 _value;
  }

  function current(Counter storage counter) internal view returns (uint256) {
      return counter._value;
  }

  function increment(Counter storage counter) internal {
      unchecked { counter._value += 1; }
  }

  function decrement(Counter storage counter) internal {
      require(counter._value > 0, "Counter: decrement overflow");
      unchecked { counter._value -= 1; }
  }
}