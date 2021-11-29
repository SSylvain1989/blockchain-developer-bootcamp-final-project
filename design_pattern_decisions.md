# Design patterns used

## Access Control Design Patterns

- `Ownable` design pattern used in three functions: `addStudent()`, `addGrade()`. These functions do not need to be used by anyone else apart from the contract creator, i.e. the party that is responsible for managing the school class.

## Inheritance and Interfaces

- `SchollManager` contract inherits the OpenZeppelin `Ownable` contract to enable ownership for one managing user/party.