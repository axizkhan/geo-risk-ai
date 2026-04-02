import { findProviderByProviderIdAndUserId } from "@repo/db";

export async function toggleProvider({
  providerId,
  userId,
  isActive,
}: {
  userId: string;
  providerId: string;
  isActive: boolean;
}) {
  const providerDocument = await findProviderByProviderIdAndUserId(
    providerId,
    userId,
  );

  if (!providerDocument) {
    throw new Error("provider document don't exist");
  }

  const toggleDocument = await toggleDocumentById(providerId, isActive);
}
