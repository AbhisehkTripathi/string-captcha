// types/string-captcha.d.ts
declare module 'string-captcha' {
    export interface CaptchaOptions {
      length: number;
      charset: string;
    }
  
    export function generateCaptcha(options: CaptchaOptions): string;
  }
  