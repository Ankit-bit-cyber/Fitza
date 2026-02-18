# Class Diagram

## Description
The Class Diagram outlines the major classes and their relationships within the application.

```mermaid
classDiagram
class Product {
  +String id
  +String name
  +String brand
  +String category
  +float discountPrice
  +float originalPrice
  +String color
  +String imageUrl
}

class User {
  +String id
  +String name
  +String email
  +String password
}

class Cart {
  +String id
  +List~Product~ products
  +float totalPrice
}

User --> Cart
Cart --> Product