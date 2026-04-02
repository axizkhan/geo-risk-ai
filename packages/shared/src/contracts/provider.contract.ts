import * as z from "zod";
import {
  channelTypeSchema,
  providerCreationSchema,
  providerNameSchema,
} from "../validation/provider.schema";

export type providerCreationDTO = z.infer<typeof providerCreationSchema>;
export type ProviderName = z.infer<typeof providerNameSchema>;
export type ChannelType = z.infer<typeof channelTypeSchema>;
export type EncryptedProviderConfig = { iv: string; configEnc: string };
