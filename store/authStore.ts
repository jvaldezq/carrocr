import {atom} from 'nanostores';

interface AuthInterface {
    isLogInOpen: boolean;
}

export const authConfig = atom<AuthInterface>({isLogInOpen: false});