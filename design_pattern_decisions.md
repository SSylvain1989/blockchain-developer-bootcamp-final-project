# Design patterns used

## Access Control Design Patterns

- `Ownable` design pattern used in one function: `addGrade()`. This function do not need to be used by anyone else apart from the contract creator, i.e. the party that is responsible for managing the school class. That way student doesn't cheat on thier grade.

## Inheritance and Interfaces

- `SchollManager` contract inherits the OpenZeppelin `Ownable` contract to enable ownership for one managing user/party.