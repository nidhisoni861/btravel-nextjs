export type FormData = {
  occasion: string;
  vibe: string[];
  dateRange: { from: Date | undefined; to: Date | undefined };
  flexibility: string;
  travelParty: string;
  destination: string;
  luxuryToggles: {
    conciergeService: boolean;
    personalGuide: boolean;
    michelinRestaurants: boolean;
    privateDinner: boolean;
    wineTrips: boolean;
    exclusiveAccess: boolean;
    closedEvents: boolean;
    inaccessiblePlaces: boolean;
    luxuryResort: boolean;
    boutiqueHotels: boolean;
    privateVilla: boolean;
    privateBoatTours: boolean;
    privateTransfers: boolean;
    yachtPrivateJet: boolean;
    helicopter: boolean;
  };
  specialRequests: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  email: string;
};

export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
};

export type Offer = {
  id: number;
  title: string;
  image: string;
  description: string;
};
