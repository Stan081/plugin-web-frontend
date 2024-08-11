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

const breadcrumbArr = [
  {
    href: "/",
    name: "Home",
  },
  {
    href: "/tickets",
    name: "Tickets",
  },
  {
    name: 'Current Compoennt',
  },
];

const TestUI = ({}) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbArr.map((bread, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              {bread.href === undefined ? (
                <BreadcrumbPage>{bread.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={`${bread.href}`}>
                  {bread.name}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index === breadcrumbArr.length - 1 ? (
              ""
            ) : (
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

export default TestUI;
