export const DEFAULT_CAMPAIGN = {
  id:'',
  name: '',
  describe: '',
  subCampaign: [
    {
      name: 'Chiến dịch con 1',
      status: true,
      ads: [
        {
          name: 'Quảng cáo 1',
          quantity: 0,
        },
      ],
    },
  ],
};
export const DEFAULT_SUB_CAMPAIGN = [
  {
    id: 1,
    name: 'Chiến dịch con 1',
    count: 1,
    quantity: 0,
    status: true,
    checked: true,
    ads: [
      {
        name: 'Quảng cáo 1',
        quantity: 1,
        id: Date.now(),
      },
    ],
  },
];
