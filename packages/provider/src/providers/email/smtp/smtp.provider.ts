import { SmtpConfig } from "./smtp.types";

export const smtpProvider = {
  send: async ({
    config,
    payload,
    recipient,
  }: {
    config: SmtpConfig;
    payload: any;
    recipient: string;
  }): Promise<{ success: boolean; error?: any; isRetryable?: boolean }> => {
    console.log("message send");
    let randomNumber = Math.floor(Math.random() * 3);
    if (randomNumber === 3) {
      return {
        success: false,
        isRetryable: true,
        error: "network issue",
      };
    }

    return {
      success: true,
    };
  },
};
