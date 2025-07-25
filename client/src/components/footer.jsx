const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          {/* About Us */}
          <div>
            <h3 className="font-bold mb-3">About Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          {/* Customer Service */}
          <div>
            <h3 className="font-bold mb-3">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          {/* Stay Connected */}
          <div>
            <h3 className="font-bold mb-3">Stay Connected</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  linked In
                </a>
              </li>
            </ul>
          </div>
          {/* Need Help? */}
          <div>
            <h3 className="font-bold mb-3">Need Help?</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Search Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Delivery Information
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Divider */}
        <hr className="my-8 border-gray-700" />
        {/* Copyright */}
        <div className="text-center text-sm text-white">
           2025 Vogue Vault. All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
