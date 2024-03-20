
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  return (
    <footer className="p-4 footer footer-center bg-base-300 text-base-content">
      <aside>
        <p>
          {currentMonth} {currentYear} - Copyright © |
          <Link
            href={"https://www.linkedin.com/in/aditya-patil-b7b435258?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"}
            target="_blank"
          >
            {" "}
            <span className="transition-all duration-200 hover:text-white">
              Aditya Patil
            </span>
          </Link>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
