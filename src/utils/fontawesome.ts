// src/utils/fontawesome.ts

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faFacebookF,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas, faSquare, faFacebook, faFacebookF, faInstagram, faTwitter, faLinkedin);
