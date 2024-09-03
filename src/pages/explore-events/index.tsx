import Layout from "@/components/layout";
import Image from "next/image"
import {Switch} from "@/components/ui/switch";
import {Input} from "@/components/ui/input";
import React from "react";

const ExploreEventsPage = () => {
  return (
    <Layout title="Explore events" showHeader showFooter>
        {/*Explore Events Layout*/}
        <div className="flex-col px-20 mt-5">
            <div className="flex gap-3 items-center	">
                {/*show map switch*/}
                <div className="flex p-2.5 gap-1.5 border rounded-full w-40 justify-between">
                    <p>
                        Show Map
                    </p>
                    <Switch/>
                </div>
                <div className="flex gap-20 flex-1 justify-between">
                    {/*Enter name & Location*/}
                    <div className=" flex gap-2 items-center">
                        <div>
                            <Input placeholder="Event name" type="text" id="event_name" className="w-64"/>
                        </div>
                        <div className="border border-gray-300 rotate-0 h-5 hidden lg:block"/>
                        <div>
                            <Input placeholder="Enter location " type="text" id="event_name" className="w-64"/>
                        </div>
                    </div>
                    {/*Toggle between list and grid*/}
                    <div className="flex p-2.5 gap-1.5 border rounded-full w-40 justify-between justify-self-end	">
                        <p>
                            Show as list
                        </p>
                        <Image src="/images/list-icon.svg" width={20} height={20} />
                    </div>
                </div>
            </div>
            <div>
                Bottom column
            </div>
        </div>
    </Layout>
  );
};

export default ExploreEventsPage;
