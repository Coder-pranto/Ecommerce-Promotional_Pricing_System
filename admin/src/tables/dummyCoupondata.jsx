

const dummyCouponData =   [
    {
      "_id" : 1,
      "couponCode": "FIRST50",
      "couponType": "percentage",
      "discountPercentage": 20,
      "validityPeriod": 3,
      "status": "inactive"
    },
    {
      "_id" : 2,
      "couponCode": "SALE25",
      "couponType": "fixed",
      "discountPercentage": 25,
      "validityPeriod": 1,
      "status": "inactive"
    },
    {
      "_id" : 3,
      "couponCode": "HOLIDAY10",
      "couponType": "percentage",
      "discountPercentage": 10,
      "validityPeriod": 1,
      "status": "inactive"
    },
    {"_id" : 4,
        "couponCode": "SUMMER15",
        "couponType": "percentage",
        "discountPercentage": 15,
        "validityPeriod": 5,
        "status": "inactive"
      },
      {
        "_id" : 5,
        "couponCode": "FLASHSALE20",
        "couponType": "fixed",
        "discountPercentage": 20,
        "validityPeriod": 1,
        "status": "inactive"
      },
      {"_id" : 6,
        "couponCode": "WEEKEND25",
        "couponType": "percentage",
        "discountPercentage": 25,
        "validityPeriod": 3,
        "status": "inactive"
      },
      {"_id" : 7,
        "couponCode": "BACKTOSCHOOL10",
        "couponType": "fixed",
        "discountPercentage": 10,
        "validityPeriod": 2,
        "status": "inactive"
      }
  ]
  

  export default dummyCouponData;