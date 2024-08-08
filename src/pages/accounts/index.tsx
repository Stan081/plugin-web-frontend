import Layout from "@/components/layout";
import GlobalPreference from "@/components/page-components/user-dashboard/accounts/GlobalPreference";
import Notification from "@/components/page-components/user-dashboard/accounts/Notification";
import PersonalInfo from "@/components/page-components/user-dashboard/accounts/PersonalInfo";
import PrivacySharing from "@/components/page-components/user-dashboard/accounts/PrivacySharing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Section } from "@/tw-components/Seaction";
import React from "react";

const items = [
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
    component: Notification,
  },
  {
    key: "privacy-and-sharing",
    title: "Privacy and Sharing",
    component: PrivacySharing,
  },
];

const AccountPage = () => {
  return (
    <Layout title="Account settings" showHeader showFooter showSidebar>
      <Section id="Account" className="px-10 overflow-y-auto">
        <h2 className="font-pally-medium text-2xl">Account</h2>

        <Tabs
          className="mt-7 flex flex-col justify-center items-center gap-8 w-full"
          defaultValue={items[0].key}
        >
          <TabsList className="flex overflow-x-auto gap-8 w-full">
            {items.map(({ key, title }, index) => {
              return (
                <TabsTrigger asChild key={index} value={key}>
                  <div>{title}</div>
                </TabsTrigger>
              );
            })}
          </TabsList>
          {items.map((item) => {
            const Component = item.component;
            return (
              <TabsContent
                className="w-full border-0"
                key={item.key}
                value={item.key}
              >
                <Component />
              </TabsContent>
            );
          })}
        </Tabs>
      </Section>
    </Layout>
  );
};

export default AccountPage;
