"use client";

import React, { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CgFormatSlash } from "react-icons/cg";

export type BreadcrumbProps = {
  href?: string;
  name: string;
};

interface BreadcrumbComponentProps {
  breadcrumbArr: BreadcrumbProps[];
  pageName: string;
}

const BreadcrumbComponent: React.FC<BreadcrumbComponentProps> = ({
  breadcrumbArr,
  pageName,
}) => {
  return (
    <Breadcrumb>
      <BreadcrumbList className="font-pally-regular">
        {breadcrumbArr.map((bread, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              {bread.href === undefined ? (
                <BreadcrumbPage>{pageName}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  href={bread.href}
                  className={`${
                    bread.href && `text-gray-400`
                  } p-0 hover:underline`}
                >
                  {bread.name}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index !== breadcrumbArr.length - 1 && (
              <BreadcrumbSeparator>
                <CgFormatSlash />
              </BreadcrumbSeparator>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
