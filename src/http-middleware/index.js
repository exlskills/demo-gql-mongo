import jwt from 'jsonwebtoken';
import { jwtpublic_key } from '.././config';
import { logger } from '../utils/logger';

export const loginRequired = (req, res, next) => {
  logger.debug(`in loginReqired`);
  if (req.gqlviewer) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export const getViewer = (req, res, next) => {
  logger.debug(`in getViewer`);
  if (req.cookies.token) {
    const decoded = jwt.verify(req.cookies.token, jwtpublic_key, {
      algorithm: 'RS256'
    });
    req.gqlviewer = {
      user_id: decoded.user_id,
      locale: decoded.locale
    };
  } else if (process.env.NODE_ENV !== 'production') {
    req.gqlviewer = {
      user_id: '1E4Yo11Y3r9a',
      locale: 'en'
    };
  }

  if (req.gqlviewer) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
