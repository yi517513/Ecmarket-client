import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export const Footer = () => (
  <footer>
    <a
      href="//https://github.com/yi517513/marketplace-client"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={faGithub} className="text-xl" />
    </a>
  </footer>
);
