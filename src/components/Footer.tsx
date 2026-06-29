import Link from "next/link";
function Footer() {
  return (
    <footer className="relative bg-alt-light dark:bg-alt-dark w-full flex flex-col gap-4 h-hidden px-4 md:px-7.5 lg:px-12.5 pt-4 md:pt-7.5 lg:pt-10 pb-2 md:pb-4 lg:pb-3">
        
        <div className="flex flex-col md:flex-row justify-between w-full gap-4 md:gap-4 lg:gap-10">
          <div className="w-full md:w-[35%] lg:w-[40%]">
            <h2 className="text-secondary-heading-light dark:text-secondary-heading-dark text-lg font-semibold mb-4">About Us</h2>
            <p className="w-full md:w-62.5 lg:w-87.5 mb-4 text-secondary text-text-light dark:text-text-dark ">
               A music school for self-expression. Sonder blends personalized instruction with a visually striking, modern web experience that reflects the creativity it teaches.
            </p>
          </div>

          {/* quick links */}
          <div className="w-full md:w-[60%] lg:w-[65%] grid grid-cols-2 md:grid-cols-[0.6fr_0.6fr_1.2fr] lg:grid-cols-[0.8fr_0.8fr_1.2fr] gap-5 md:gap-3 lg:gap-2 text-[14px] md:text-[15px]">

            <div className="w-full">
              <h2 className="text-secondary-heading-light dark:text-secondary-heading-dark text-lg font-semibold mb-2 md:mb-4">Quick Links</h2>
              <ul className="flex flex-col gap-1.5">
                <li><Link href="/" className="text-text-light dark:text-text-dark hover:text-black/90 dark:hover:text-white/90 transition-colors duration-300">Home</Link></li>
                <li><Link href="/courses" className="text-text-light dark:text-text-dark hover:text-black/90 dark:hover:text-white/90 transition-colors duration-300">Courses</Link></li>
                <li><Link href="/contact" className="text-text-light dark:text-text-dark hover:text-black/90 dark:hover:text-white/90 transition-colors duration-300">Contact</Link></li>
              </ul>
            </div>

            <div className="w-full">
              <h2 className="text-secondary-heading-light dark:text-secondary-heading-dark text-lg font-semibold mb-2 md:mb-4">Follow Us</h2>
              <div className="flex flex-col gap-1.5">
                <Link href="#" className="text-text-light dark:text-text-dark hover:text-black/90 dark:hover:text-white/90 transition-colors duration-300">Facebook</Link>
                <Link href="#" className="text-text-light dark:text-text-dark hover:text-black/90 dark:hover:text-white/90 transition-colors duration-300">Twitter</Link>
                <Link href="#" className="text-text-light dark:text-text-dark hover:text-black/90 dark:hover:text-white/90 transition-colors duration-300">Instagram</Link>
              </div>
            </div>

            <div className="w-full col-span-2 md:col-span-1 ">
              <h2 className="text-secondary-heading-light dark:text-secondary-heading-dark text-lg font-semibold mb-2 md:mb-4">
                Contact Us
              </h2>
              <div className="flex flex-col gap-1.5">
                <a href="tel:1234567890" className="text-text-light dark:text-text-dark hover:text-black/90 dark:hover:text-white/90 block">Phone:(123) 456-7890</a>
                <a href="mailto:info@musicschool.com" className="text-text-light dark:text-text-dark hover:text-black/90 dark:hover:text-white/90 block">Email: info@musicschool.com</a>
                <p className="text-text-light dark:text-text-dark">Karachi, Pakistan</p>
              </div>
            </div>

          </div>
        </div>

        {/* Footer bottom  */}
        <div className="flex items-center justify-between pt-4 md:pt-6 lg:pt-8">
            <p className=" text-[10px] text-black/70 dark:text-white/50 ">© 2026 Music School. All rights reserved.</p>
            <p className=" text-[10px] text-black/70 dark:text-white/50 ">Design By Abdul Rehman</p>
        </div>
    </footer>
  )
}

export default Footer