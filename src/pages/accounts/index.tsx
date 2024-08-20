import GoBack from "@/components/GoBack";
import Layout from "@/components/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { accountItems } from "@/static-datas/account-data";
import { Section } from "@/tw-components/Section";
import React from "react";

const AccountPage = () => {
  return (
    <Layout title="Account settings" showHeader showFooter showSidebar>
      <Section
        id="user-account-settings"
        className="md:px-10 overflow-y-auto w-full lg:max-w-7xl "
      >
        <div className="flex gap-3">
          <GoBack />
          <h2 className="font-pally-medium text-2xl">Account</h2>
        </div>
        <Tabs
          className="mt-5 flex flex-col justify-center accountItems-center gap-8 w-full"
          defaultValue={accountItems[0].key}
        >
          <TabsList className="flex overflow-x-auto gap-8 w-full">
            {accountItems.map(({ key, title }, index) => {
              return (
                <TabsTrigger asChild key={index} value={key}>
                  <div>{title}</div>
                </TabsTrigger>
              );
            })}
          </TabsList>
          {accountItems.map((item) => {
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
