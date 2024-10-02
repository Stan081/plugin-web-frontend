import React from 'react';
import CardComponent from "@/components/CardComponent";
import OrganiserLayout from "@/components/OrganiserLayout"
import { OrganiserDashboardProvider } from "@/providers/organiser_dashboard.provider";


const OrganiserPage = () => {
  return (
    <OrganiserDashboardProvider>
      <OrganiserLayout title='Organiser Dashboard' showHeader showFooter>
        
        {/* Rest of your organiser page content */}

        <h1>Organiser Dashboard</h1>
      </OrganiserLayout>
    </OrganiserDashboardProvider>
  );
};

export default OrganiserPage;