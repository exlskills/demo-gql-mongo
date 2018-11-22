# Graphiql Access 
 
`http://<GQL server host>:<GQL server port>/graph`, e.g., `http://localhost:8080/graph` 

## Mutations 

### Create Order
```
mutation sendOrder($order_data_input: CreateOrderInput!) {
  createOrder(input: $order_data_input) {
    order_id
    completionObj {
      code
      msg_id
      msg
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