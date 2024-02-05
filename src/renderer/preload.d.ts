import { ElectronHandler } from '../main/preload';
import { DBMS } from './infra/dbms.model';
declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    electron: ElectronHandler;
    dbms: DBMS
  }

}

export {};
