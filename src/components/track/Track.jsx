const Track = () => {
    return (
        <section className="bg-gray-900 py-10 md:py-14">
            <div className="container mx-auto px-5">
                {/* Main */}
                <h1 className="text-center text-4xl font-bold text-white mb-8">Our Products</h1>
                <h2 className="text-center text-lg font-semibold mb-12 text-gray-400">
                    Discover our premium offerings
                </h2>
                <div className="flex flex-wrap -m-4 text-center">
                    {/* Track 1 */}
                    <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                        <div className="border-2 border-gray-600 bg-gray-800 shadow-lg hover:shadow-xl transform transition-transform duration-300 ease-in-out hover:scale-105 px-6 py-8 rounded-lg">
                            <svg className="text-gray-300 w-16 h-16 mb-4 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            <h2 className="title-font font-medium text-xl text-white">Premium T-Shirts</h2>
                            <p className="leading-relaxed text-gray-400 mt-2">Our T-Shirts are 100% made of cotton.</p>
                        </div>
                    </div>

                    {/* Track 2 */}
                    <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                        <div className="border-2 border-gray-600 bg-gray-800 shadow-lg hover:shadow-xl transform transition-transform duration-300 ease-in-out hover:scale-105 px-6 py-8 rounded-lg">
                            <svg className="text-gray-300 w-16 h-16 mb-4 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            <h2 className="title-font font-medium text-xl text-white">Stylish Hoodies</h2>
                            <p className="leading-relaxed text-gray-400 mt-2">Our hoodies are designed for comfort and style.</p>
                        </div>
                    </div>

                    {/* Track 3  */}
                    <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                        <div className="border-2 border-gray-600 bg-gray-800 shadow-lg hover:shadow-xl transform transition-transform duration-300 ease-in-out hover:scale-105 px-6 py-8 rounded-lg">
                            <svg className="text-gray-300 w-16 h-16 mb-4 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            <h2 className="title-font font-medium text-xl text-white">Trendy Caps</h2>
                            <p className="leading-relaxed text-gray-400 mt-2">Our caps are perfect for any season and style.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Track;