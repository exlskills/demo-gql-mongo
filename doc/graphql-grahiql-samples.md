# Graphiql Access 
 
`http://<GQL server host>:<GQL server port>/graph`, e.g., `http://localhost:8080/graph` 

## Queries 

### List Users
```
query listUsers {
  listUsers(first: 3, orderBy: [{field:"full_name",direction:ASC}]) {
    edges {
      node {
        id
        full_name
        username
        primary_email
        primary_locale
      }
    }
  }
}
```

### List User Orders
```
query listUserOrders {
  listUserOrders(user_id: "VXNlcjoxRTRZbzExWTNyOWE=", first: 3, orderBy: [{field: "order_date", direction: ASC}]) {
    edges {
      node {
        id
        payer_id
        order_date
        order_items (first: 10) {
          edges {
            node {
              item_id
              desc
              quantity
              amount
              item_category
              item_details
            }
          }
        }
      }
    }
  }
}
```

## Mutations 

### Create User
```
mutation sendUser($user_data_input: CreateUserInput!) {
  createUser(input: $user_data_input) {
    user_id
    completionObj {
      code
      msg_id
      msg
      processed
      modified
    }
  }
}
```

#### Variables 
```json
{
  "user_data_input": {
    "user_data": {
      "full_name": "Super User",
      "username": "s_user",
      "primary_email": "super@example.com",
      "primary_locale": "en" 
    }
  }
}
```

### Create Order
```
mutation sendOrder($order_data_input: CreateOrderInput!) {
  createOrder(input: $order_data_input) {
    order_id
    completionObj {
      code
      msg_id
      msg
      processed
      modified      
    }
  }
}
```



#### Variables 
```json
{
  "order_data_input": {
    "order_data": {
      "user_id": "VXNlcjoxRTRZbzExWTNyOWE=",
      "payer_id": "VXNlcjoxRTRZbzExWTNyOWE=",
      "order_date": "2018-09-10T00:00:00.000Z",
      "order_items": [
        {
          "item_id": "SXRlbToxSEVPeDZGbkM3Y00=",
          "quantity": 5,
          "amount": 10.13,
          "item_details": "{\"packaging\": \"frozen-pack\", \"special_handling\": {\"before_shipping\": \"freeze\", \"in_transit\":\"refrigerate\"}}"
        },
        {
          "item_id": "SXRlbToxR1ZsMjFscTBTOHA=",
          "quantity": 2,
          "amount": 15.99,
          "item_details": "{\"color\": \"black\"}"
        }
      ]
    }
  }
}
```