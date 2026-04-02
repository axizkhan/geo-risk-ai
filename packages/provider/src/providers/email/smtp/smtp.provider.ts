import { SmtpConfig } from "./smtp.types";

export const smtpProvider = {
  send: (
    config: SmtpConfig,
    payload: any,
  ): { success: boolean; error?: any } => {
    console.log("message send");
    let randomNumber = Math.floor(Math.random() * 3);
    if (randomNumber === 3) {
      return {
        success: false,
        error: "network issue",
      };
    }

    return {
      success: true,
    };
  },
};
