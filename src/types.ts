export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  hasCredential: boolean;
  verifyUrl?: string;
  verifyId?: string;
  signature?: string;
  signTitle?: string;
  logoType: 'alison' | 'coursera' | 'wiley' | 'maryland' | 'packt' | 'hubspot' | 'pma';
  grade?: string;
  achievements?: string[];
}
