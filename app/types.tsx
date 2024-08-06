type ReturnItem = {
    id: string;
    date: string;
    image: string;
    title: string;
    sku: string;
    reason: string;
  };
  
  type SetSelectedReturn = (returnItem: ReturnItem) => void;
  