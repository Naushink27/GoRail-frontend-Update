import React from "react";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white text-center py-4">
      <p>&copy; {new Date().getFullYear()} GoRail Admin Panel. All rights reserved.</p>
    </footer>
  );
}