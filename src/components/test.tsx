import React from "react";

const TestUi = () => {
  return (
    <div className="relative">
      {/* <FormItem className="w-full">
        <FormLabel className="" htmlFor="organiser_name">
          Organiser Name
        </FormLabel>
        <FormField
          control={form.control}
          name="organiser_name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter organiser name"
                  type="text"
                  id="organiser_name"
                  className="w-full bg-white text-black font-pally-regular"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormItem>
      <FormItem className="w-full">
        <FormLabel htmlFor="organiser_bio">
          Organizer Bio ( Max word count is 500 )
        </FormLabel>
        <FormField
          control={form.control}
          name="organiser_bio"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Write a bio about yourself"
                  id="organiser_bio"
                  maxLength={500}
                  className="w-full bg-white text-black font-pally-regular h-32 md:h-40"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormItem>
      <FormItem className="w-full">
        <FormLabel className="" htmlFor="tagline">
          Tagline for event pages ( Optional )
        </FormLabel>
        <FormField
          control={form.control}
          name="tagline"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Write a short description for this organizer, this shows on all your event pages. "
                  id="organiser_bio"
                  maxLength={500}
                  className="w-full bg-white text-black font-pally-regular h-28"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormItem>

      <div>
        <div className="space-y-1.5 my-4">
          <p className="text-[#101928] text-xl font-pally-medium">
            Social media links{" "}
          </p>
          <p className="text-[#667185] text-sm font-pally-regular">
            Let attendees know how to connect with you
          </p>
        </div>

        <FormItem className="w-full">
          <FormLabel className="" htmlFor="facebook">
            Facebook profile link
          </FormLabel>
          <FormField
            control={form.control}
            name="social_media.facebook"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="facebook handle url"
                    type="text"
                    id="facebook"
                    className="w-full bg-white text-black font-pally-regular"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormItem>
        <FormItem className="w-full">
          <FormLabel className="" htmlFor="instagram">
            Facebook profile link
          </FormLabel>
          <FormField
            control={form.control}
            name="social_media.instagram"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="instagram handle url"
                    type="text"
                    id="instagram"
                    className="w-full bg-white text-black font-pally-regular"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormItem>
      </div>

      <div className="sticky bottom-0 bg-white py-4">
        <Separator />

        <div className="flex justify-end mt-4">
          <Button variant="destructive" type="submit" disabled={isPending}>
            {isPending ? <Spinner /> : `Add Profile`}
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export default TestUi;
