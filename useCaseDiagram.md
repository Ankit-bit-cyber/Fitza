# Use Case Diagram

## Description
The Use Case Diagram illustrates the interactions between users and the system. It highlights the primary functionalities of the application.

```mermaid
usecaseDiagram
actor Customer
actor Admin

Customer --> (Browse Products)
Customer --> (View Product Details)
Customer --> (Add to Cart)
Customer --> (Checkout)
Admin --> (Manage Products)
Admin --> (View Sales Reports)
```