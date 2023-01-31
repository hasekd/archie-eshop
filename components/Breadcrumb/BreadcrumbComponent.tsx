import { Breadcrumb, BreadcrumbItem } from "@chakra-ui/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const BreadcrumbComponent = ({ initialCrumbs }: any) => {
  const router = useRouter();
  const pathname = router.pathname;
  const [crumbs, setCrumbs] = useState(initialCrumbs);

  useEffect(() => {
    if (!crumbs.some((crumb: any) => crumb.href === pathname)) {
      const newBreadcrumb: any = { label: pathname, href: pathname };
      setCrumbs([...crumbs, newBreadcrumb]);
    }
  }, [pathname]);

  return (
    <Breadcrumb
      spacing="8px"
      separator={<MdKeyboardArrowRight color="gray.500" />}
      fontSize={"1.3rem"}
      p={"2rem 0 0 2rem"}
    >
      {crumbs.map((crumb: any) => (
        <BreadcrumbItem key={crumb.href}>
          <Link href={crumb.href}>{crumb.label}</Link>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
