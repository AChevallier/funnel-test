import { sleep } from "../utils/sleep";

export type Offer = {
  id: string;
  title: string;
  price: string;
  per: string;
  badge?: string;
};

const DEFAULT_OFFERS: Offer[] = [
  { id: "monthly", title: "Mensuel", price: "6,99€", per: "mois" },
  { id: "annual", title: "Annuel", price: "49,99€", per: "an", badge: "-40%" },
];

export async function getOffers(): Promise<Offer[]> {
  await sleep(400);
  return DEFAULT_OFFERS;
}
