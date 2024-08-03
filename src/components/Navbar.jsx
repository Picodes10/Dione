/* eslint-disable no-unused-vars */
import React from "react";

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";

export default function Component() {
  return (
    <Navbar fluid rounded className="bg-gradient-to-r from-slate-900 to-slate-700">
      <NavbarBrand href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold text-slate-200">
          CollabHub.
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Button className="bg-indigo-600">Get started</Button>
        <NavbarToggle />
      </div>
      <NavbarCollapse className="text-slate-400">
        <NavbarLink href="#">Home</NavbarLink>
        <NavbarLink href="#">Projects</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
        <NavbarLink href="#">GitHub</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
