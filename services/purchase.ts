import { sleep } from "../utils/sleep";

type PurchaseOptions = {
  trial?: boolean;
  shouldFail?: boolean;
};

export async function purchase(
  offerId: string,
  options: PurchaseOptions = {}
): Promise<{ success: true }> {
  await sleep(800);
  if (options.shouldFail) {
    throw new Error("Purchase failed. Please try again.");
  }
  if (!offerId) {
    throw new Error("Missing offerId");
  }
  return { success: true };
}
