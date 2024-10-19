import React, { ComponentPropsWithRef, FC, Fragment } from 'react';

import { cn } from '@/lib/utils';

interface Props extends ComponentPropsWithRef<'section'> {
  clean?: boolean;
  divider?: boolean;
}

const Divider = () => {
  return <div className="bg-blue-50 h-10 w-full"></div>;
};

export const Section: FC<Props> = ({
  children,
  clean,
  divider,
  className,
  ...rest
}) => {
  return (
    <Fragment>
      {divider && <Divider />}
      <section className={cn(className)} {...rest}>
        {children}
      </section>
      {divider && <Divider />}
    </Fragment>
  );
};