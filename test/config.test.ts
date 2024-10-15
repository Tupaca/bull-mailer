import { initializeMailConfig, getMailConfig } from '../src/config';
import { MailerConfig } from '../src/config/types';

describe('initMailConfig', () => {
  it('debería inicializar correctamente la configuración', () => {
    const config: MailerConfig = {
      nodemailer: {
        host: "smtp.example.com",
        port: 587,
        pool: true,
        auth: {
          user: "user@example.com",
          pass: "password",
        },
      },
      redis: {
        path: "redis://localhost:6379",
        port: 6379,
      },
    };
    
    initializeMailConfig(config);
    
    const result = getMailConfig();
    
    expect(result).toEqual(config);
  });

});
