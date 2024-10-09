import React from 'react'

const Footer = () => {
  return (
    <>
      <footer className="bg-[#1C1C1C] text-white p-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo */}
          <div className="col-span-1">
            <img
              alt="Your Company"
              src={require('../../Assets/logo.jpg')}
              className="h-14 w-auto "
            />
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#">Home</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Freelancers</a></li>
              <li><a href="#">Clients</a></li>
              <li><a href="#">Jobs</a></li>
              <li><a href="#">About us</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact us</a></li>
            </ul>
          </div>

          {/* Terms */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Terms</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Conditions</a></li>
              <li><a href="#">Fees & Charges</a></li>
            </ul>
          </div>

          {/* Subscribe */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Subscribe</h4>
            <div className="flex items-center mb-4">
              <input
                type="email"
                placeholder="email"
                className="bg-[#333] p-2 rounded-l-md text-white w-full focus:outline-none"
              />
              <button className="bg-gray-500 p-2 h-10 rounded-r-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5 text-white"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
            <p className='text-xs'>Join our newsletter to stay up to date on new features and releases.</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <p>© 2024 GIGFLARE. All right reserved.</p>
          <div className="space-x-4 mt-2 md:mt-0">
            <a href="#">Privacy</a>
            <a href="#">Terms of Services</a>
          </div>
          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#">
              <i className="fab fa-pinterest-p"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
