export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface EmailResponse
{
  success: boolean;
  message: string;
}
