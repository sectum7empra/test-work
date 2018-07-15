import { englishMessages } from 'admin-on-rest';
import swedishMessages from 'aor-language-swedish';

import customSwedishMessages from './sv';
import customEnglishMessages from './en';

export default {
    sv: { ...swedishMessages, ...customSwedishMessages },
    en: { ...englishMessages, ...customEnglishMessages },
};
