/** מרחיב את בקשת Express בפרטי המשתמש המאומת. */
declare module 'express-serve-static-core' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Request {
    userEmail?: string | null;
    isAdmin?: boolean;
  }
}

export {};
