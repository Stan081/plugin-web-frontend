import GlobalPreference from "@/components/page-components/user-dashboard/accounts/GlobalPreference";
import Notification from "@/components/page-components/user-dashboard/accounts/Notification";
import PersonalInfo from "@/components/page-components/user-dashboard/accounts/PersonalInfo";
import PrivacySharing from "@/components/page-components/user-dashboard/accounts/PrivacySharing";


export const accountItems = [
  {
    key: "personal-information",
    title: "Personal Information",
    component: PersonalInfo,
  },
  {
    key: "global-preferences",
    title: "Global Preferences",
    component: GlobalPreference,
  },
  {
    key: "notifications",
    title: "Notifications",
    component:Notification,
  },
  {
    key: "privacy-and-sharing",
    title: "Privacy and Sharing",
    component: PrivacySharing,
  },
];
