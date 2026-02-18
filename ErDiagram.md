# ER Diagram

## Description
The ER Diagram depicts the database tables and their relationships based on the Fitza.csv dataset.

```mermaid
erDiagram
USER {
  string id
  string name
  string email
  string password
}

PRODUCT {
  string id
  string name
  string brand
  string category
  float discountPrice
  float originalPrice
  string color
  string imageUrl
}

CART {
  string id
  float totalPrice
}

CART_PRODUCT {
  string cartId
  string productId
}

USER ||--o{ CART : owns
CART ||--|{ CART_PRODUCT : contains
PRODUCT ||--|{ CART_PRODUCT : includes
```