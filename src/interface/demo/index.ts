export interface DemoEntry {
  campaign: {
    information: {
      name: string;
      describe?: string;
    };
  };
  subCampaign: [
    {
      name: string;
      status: boolean;
      ads: [
        {
          name: string;
          quantity: number;
        },
      ];
    }
  ]
}
export interface AdsEntry {
  name: string;
  quantity: number;
  id: number ;
  nameError?:boolean;
  nameHelperText?:string
  quantityError?:boolean;
  quantityHelperText?:string
}
export interface SubCampaignEntry {
  id: number;
  name: string;
  count: number;
  quantity: number;
  status?: boolean;
  checked: boolean;
  ads: AdsEntry[];
}

export interface FormSubCampaignEntry {
  id: number | string;
  name: string;
  count: number;
  quantity: number;
  status?: boolean;
}
