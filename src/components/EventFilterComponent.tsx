import React from 'react';
import {Checkbox} from '@/components/ui/checkbox'


const EventFilterComponent = () => {
    return (
        <div className="border-t pt-2 w-[175px] mt-3">
            {/*Event type & Sort by*/}
            <div className="border-b flex-col">
                <div>
                    <p>Event Type</p>
                    <Checkbox label="one time" />
                </div>
            </div>
        </div>
    );
}

export default EventFilterComponent;