import type * as React from "react";

const BurgerSolidIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="none"
    {...props}
  >
    {/* Pan superior */}
    <path
      fill="#C2B4A3"
      d="M48 104C48 63 84 32 128 32C172 32 208 63 208 104H48Z"
    />

    {/* Semillas */}
    <circle cx="88" cy="72" r="4" fill="#FFFFFF" />
    <circle cx="110" cy="62" r="4" fill="#FFFFFF" />
    <circle cx="130" cy="74" r="4" fill="#FFFFFF" />
    <circle cx="150" cy="64" r="4" fill="#FFFFFF" />
    <circle cx="170" cy="76" r="4" fill="#FFFFFF" />

    {/* Lechuga */}
    <path
      fill="#7CB342"
      d="M48 112C60 104 72 120 84 112C96 104 108 120 120 112C132 104 144 120 156 112C168 104 180 120 192 112C200 108 204 112 208 112V124H48V112Z"
    />

    {/* Carne */}
    <rect
      x="48"
      y="124"
      width="160"
      height="24"
      rx="8"
      fill="#6D4C41"
    />

    {/* Queso */}
    <path
      fill="#FBC02D"
      d="M64 148H192L176 170L160 148L144 170L128 148L112 170L96 148L80 170L64 148Z"
    />

    {/* Pan inferior */}
    <rect
      x="48"
      y="170"
      width="160"
      height="36"
      rx="18"
      fill="#C2B4A3"
    />
  </svg>
);

export default BurgerSolidIcon;