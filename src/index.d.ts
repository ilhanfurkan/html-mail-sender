// index.d.ts

// Import the types from your main module
import {
  MailConfigContentTypes,
  UserMailConfigTypes,
  MailOptions,
  EmailDeliveryResponse,
  MailConfigTypes,
} from "./type";

// Declare the module for your main module
declare module "mailTypes" {
  // Export the types
  export {
    MailConfigContentTypes,
    UserMailConfigTypes,
    MailOptions,
    EmailDeliveryResponse,
  };

  // Additional declarations if needed

  // Function declaration for your sendMail function
  export function sendMail(
    to: string,
    htmlFile: MailConfigContentTypes,
    mailRequest: Record<string, string>,
    userMailConfig: UserMailConfigTypes
  ): void;
}

// Declare the module for your type file
declare module "mailTypes/type" {
  // Export the types from your type file
  export {
    MailConfigContentTypes,
    MailConfigTypes,
    UserMailConfigTypes,
    MailOptions,
    EmailDeliveryResponse,
  };
}
