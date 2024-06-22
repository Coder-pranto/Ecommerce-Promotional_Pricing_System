const dummySellerData = [
    {
      "_id": "1",
      "customerId": "customer1",
      "nid": "123456789",
      "status": "approved",
      "shopDetails": {
        "tradeLicense": "987654321",
        "shopName": "ABC Electronics",
        "shopType": "Electronics",
        "brandName": "ABC",
        "shoppingMall": "Mall of Tech",
        "shopAddress": "123 Main Street",
      },
      "location": {
        "type": "Point",
        "coordinates": [34.0522, -118.2437]
      },
      "createdAt": "2022-01-01T12:00:00Z",
      "updatedAt": "2022-01-02T15:30:00Z"
    },
    {
      "_id": "2",
      "customerId": "customer2",
      "nid": "987654321",
      "status": "pending",
      "shopDetails": {
        "tradeLicense": "654321987",
        "shopName": "XYZ Clothing",
        "shopType": "Apparel",
        "brandName": "XYZ",
        "shoppingMall": "Fashion Plaza",
        "shopAddress": "456 Fashion Avenue",
      },
      "location": null,
      "createdAt": "2022-02-05T09:45:00Z",
      "updatedAt": "2022-02-06T11:20:00Z"
    },
    {
      "_id": "3",
      "customerId": "customer3",
      "nid": "555555555",
      "status": "rejected",
      "shopDetails": {
        "tradeLicense": "111111111",
        "shopName": "LMN Books",
        "shopType": "Bookstore",
        "brandName": "LMN",
        "shoppingMall": "Book Haven",
        "shopAddress": "789 Literary Lane",
      },
      "location": null,
      "createdAt": "2022-03-10T08:30:00Z",
      "updatedAt": "2022-03-12T14:15:00Z"
    }
  ]

  


export default dummySellerData;
  