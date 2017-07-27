import { Mail } from './mail';

type VerificationStatus = 'accepted' | 'rejected';

export interface Mailbox {
  id: string;
  sendAsEmail: string;
  displayName: string;
  replyToAddress: string;
  signature: string;
  isPrimary?: boolean;
  isDefault: boolean;
  treatAsAlias?: boolean;
  verificatationStatus?: VerificationStatus;
  lastMail?: Mail;
  unreadedCount?: number;
}
