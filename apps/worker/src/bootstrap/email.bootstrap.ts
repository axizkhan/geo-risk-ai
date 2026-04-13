import { env } from "@repo/shared";
import { startEmailConsumer } from "../consumer/email.consumer";

export const bootStrapEmail = async () => {
  for (let i = 0; i < env.EMAIL_CONSUMER; i++) {
    startEmailConsumer(i);
  }
};
