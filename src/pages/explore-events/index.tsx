import Layout from "@/components/layout";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

const ExploreEventsPage = () => {
  const form = useForm();
  return (
    <Layout title="Explore events" showHeader showFooter>
      {/*Page Overview Layout*/}
      <div className="px-8 pt-4">
        {/* Page Controller */}

        <div className="flex gap-x-6 items-center">
          {/*Show Map*/}

          <div className="border-0.5 rounded-3xl border border-gray-200 p-1 flex gap-x-4">
            <div className="flex items-center space-x-2 p-2">
              <Label htmlFor="show-map">Show Map</Label>
              <Switch id="show-map" />
            </div>
          </div>

          {/* Input Section */}

          <div className="border border-gray-500 rotate-0 h-5 hidden lg:block"></div>
        </div>
      </div>
    </Layout>
  );
};

export default ExploreEventsPage;
