import Link from "next/link";
import React from "react";

const links = [
  { name: "add blog", path: "/addBlog" },
  { name: "login", path: "/" },
  { name: "developer", path: "/" },
];

const Navlinks = () => {
  return (
    <ul className="flex flex-col md:flex-row gap-20 mb-40">
      {links.map((link, index) => (
        <li key={index}>
          <Link href={link.path} className="capitalize text-3xl">
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Navlinks;
