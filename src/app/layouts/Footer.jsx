import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export const Footer = () => (
  <footer>
    <a
      href="https://github.com/yi517513/Ecmarket-client"
      target="_blank"
      rel="noopener noreferrer"
      className="mb-1 text-gray-800"
    >
      <FontAwesomeIcon icon={faGithub} className="text-xl" />
    </a>
    <p className="text-xs text-gray-800">
      本平台為展示用 Demo，圖片版權屬於原著作權所有人，僅供開發用途。
    </p>
  </footer>
);
