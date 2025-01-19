import { appendFile } from "fs/promises";//להוריד את הספריה הזו או מה שזה לא יהיה

export function logToFile(req, res, next) {
  appendFile( "./log1.txt",    `\n${new Date().toLocaleDateString()}--->  ${req.method} ${req.url}`
  );
  next();
}
