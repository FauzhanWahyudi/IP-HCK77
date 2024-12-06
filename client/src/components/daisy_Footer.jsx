import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { BsGithub } from "react-icons/bs";

export default function FooterPage() {
  return (
    <footer
      id="footer"
      className="border-t border-base-content bg-base-200 px-4 py-6 text-base-content"
    >
      <div className="container footer mx-auto flex flex-col items-center justify-between md:flex-row">
        {/* Copyright */}
        <a
          href="https://github.com/FauzhanWahyudi"
          target="_blank"
          className="text-sm transition hover:text-secondary"
        >
          © 2024 PlotAlchemy - All right reserved
        </a>

        {/* Social Icons */}
        <div className="mt-4 flex gap-4 md:mt-0">
          <a
            href="https://www.instagram.com/fauzhanwahyudi/"
            target="_blank"
            className="transition hover:text-secondary"
            aria-label="Instagram"
          >
            <FaInstagram size={24} />
          </a>
          <a
            // target="_blank"
            href="#"
            className="transition hover:text-secondary"
            aria-label="Twitter"
          >
            <FaXTwitter size={24} />
          </a>
          <a
            target="_blank"
            href="https://github.com/FauzhanWahyudi"
            className="transition hover:text-secondary"
            aria-label="GitHub"
          >
            <BsGithub size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
