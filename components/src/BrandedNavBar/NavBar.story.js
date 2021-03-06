import React from "react";
import styled from "styled-components";
import { storiesOf } from "@storybook/react";
import { BrandedNavBar as NDSBrandedNavBar } from "../index";

const sampleLogo = "http://pigment.github.io/fake-logos/logos/vector/color/auto-speed.svg";

const ResetStorybookView = styled.div({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh"
});

const BrandedNavBar = props => (
  <ResetStorybookView>
    <NDSBrandedNavBar {...props} />
  </ResetStorybookView>
);

const primaryMenu = [
  {
    name: "Dashboard",
    items: [
      { name: "Customers", href: "/" },
      { name: "Invoices", href: "/" },
      { name: "Projects", href: "/" },
      { name: "Items", href: "/" },
      { name: "Vendors", href: "/" },
      { name: "Carriers", href: "/" }
    ]
  },

  {
    name: "Inspector",
    items: [
      { name: "Dashboard", href: "/" },
      { name: "Moves", href: "/" },
      { name: "Pick Lists", href: "/" },
      { name: "Receive Orders", href: "/" },
      { name: "Receipts", href: "/" },
      { name: "Ship Orders", href: "/" },
      { name: "Shipments", href: "/" },
      { name: "Item Lists", href: "/" },
      { name: "Cycle Counts", href: "/" },
      { name: "Blind Counts", href: "/" },
      { name: "Inbound Stock Transfer Orders", href: "/" },
      { name: "Inbound Stock Transfers", href: "/" },
      { name: "Outbound Stock Transfers", href: "/" }
    ]
  },
  {
    name: "Operations",
    items: [
      {
        name: "Production",
        items: [
          { name: "Dashboard", href: "/" },
          {
            name: "Projects",
            items: [{ name: "Cycle Counts", href: "/" }, { name: "Blind Counts", href: "/" }]
          },
          { name: "Jobs", items: [{ name: "Job 1", href: "/" }, { name: "Job 2", href: "/" }] }
        ]
      },
      { name: "Item cart", href: "/" },
      { name: "Inventory", href: "/" }
    ]
  },
  { name: "Link", href: "/" }
];

const secondaryMenu = [
  {
    name: "User@Nulogy.com",
    items: [{ name: "Profile", href: "/" }, { name: "Preferences", href: "/" }, { name: "Logout", href: "/" }]
  },
  {
    name: "Settings",
    items: [{ name: "Permissions", href: "/" }, { name: "Manage account", href: "/" }]
  }
];

storiesOf("BrandedNavBar", module)
  .add("BrandedNavBar", () => <BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />)
  .add("With a company logo", () => <BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} logoSrc={sampleLogo} />)
  .add("With app name", () => <BrandedNavBar subtext="Quality Control" menuData={{ primaryMenu, secondaryMenu }} />)
  .add("With a company logo and app name", () => (
    <BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} subtext="Quality control" logoSrc={sampleLogo} />
  ))
  .add("In a training environment", () => (
    <BrandedNavBar
      menuData={{ primaryMenu, secondaryMenu }}
      subtext="Quality control"
      logoSrc={sampleLogo}
      showTraining
    />
  ));
