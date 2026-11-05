import { Router, Request, Response, NextFunction } from 'express';
import { contactSchema } from '../schemas/contact';
import { sendContactEmail } from '../services/emailService';
import { logger } from '../config/logger';

export const contactRouter = Router();

contactRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = contactSchema.parse(req.body);

    // Spam honeypot trap: if 'website' field was populated, silently succeed without sending email
    if (validatedData.website && validatedData.website.trim().length > 0) {
      logger.warn(`Honeypot triggered from IP: ${req.ip}. Discarding spam submission.`);
      return res.status(200).json({
        success: true,
        message: 'Thank you for your message. I will review it shortly.',
      });
    }

    const result = await sendContactEmail(validatedData);

    logger.info(`Contact message processed successfully from: ${validatedData.email} (${result.mode})`);

    return res.status(200).json({
      success: true,
      message: 'Message delivered successfully! I will get back to you within 24 hours.',
      deliveryMode: result.mode,
    });
  } catch (error) {
    next(error);
  }
});
