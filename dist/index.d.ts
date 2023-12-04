import { MailConfigContentTypes, UserMailConfigTypes } from "../type";
export declare function sendMail(to: string, htmlFile: MailConfigContentTypes, mailRequest: Record<string, string>, userMailConfig: UserMailConfigTypes): void;
