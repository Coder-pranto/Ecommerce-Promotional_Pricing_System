const dummyAdPurchaseData = [
    {
      _id: '1',
      sellerId: 'seller123',
      adPackageId: 'adPackage456',
      status: 'approve',
      purchasedAt: new Date('2023-01-15T10:30:00Z'),
      expirationDate: new Date('2023-02-15T10:30:00Z'),
    },
    {
      _id: '2',
      sellerId: 'seller789',
      adPackageId: 'adPackage101',
      status: 'pending',
      purchasedAt: new Date('2023-02-01T14:45:00Z'),
      expirationDate: null,
    },
    {
      _id: '3',
      sellerId: 'seller456',
      adPackageId: 'adPackage202',
      status: 'reject',
      purchasedAt: new Date('2023-02-10T08:15:00Z'),
      expirationDate: null,
    },
    {
      _id: '4',
      sellerId: 'seller453',
      adPackageId: 'adPackage201',
      status: 'reject',
      purchasedAt: new Date('2023-02-10T08:15:00Z'),
      expirationDate: new Date('2023-02-23T08:15:00Z'),
    },
  ];
  
  export default dummyAdPurchaseData;


  
  