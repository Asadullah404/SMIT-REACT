/* eslint-disable react/no-unescaped-entities */

const Testimonial = () => {
    return (
        <div>
            <section className="text-gray-400 body-font mb-10 bg-gradient-to-b from-black to-gray-800">
                {/* Main */}
                <div className="container px-5 py-10 mx-auto">
                    {/* Heading */}
                    <h1 className='text-center text-4xl font-bold text-white mb-5'>Testimonial</h1>
                    {/* Paragraph */}
                    <h2 className='text-center text-2xl font-semibold mb-10 text-gray-300'>
                        What our <span className='text-pink-500'>customers</span> are saying
                    </h2>

                    <div className="flex flex-wrap -m-4">
                        {/* Testimonial 1 */}
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4 transform transition-transform duration-300 hover:scale-105">
                            <div className="h-full text-center bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl">
                                <img
                                    alt="testimonial"
                                    className="w-24 h-24 mb-4 object-cover object-center rounded-full border-4 border-pink-500 bg-gray-800"
                                    src="https://i.pinimg.com/474x/c9/79/9b/c9799b656db7088c83af7285367590d2.jpg"
                                />
                                <p className="leading-relaxed text-gray-300 mb-4">
                                    Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.
                                </p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 className="text-white font-medium title-font tracking-wider text-sm uppercase">ABC</h2>
                                <p className="text-gray-500">Web Developer</p>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4 transform transition-transform duration-300 hover:scale-105">
                            <div className="h-full text-center bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl">
                                <img
                                    alt="testimonial"
                                    className="w-24 h-24 mb-4 object-cover object-center rounded-full border-4 border-pink-500 bg-gray-800"
                                    src="https://www.devknus.com/img/gawri.png"
                                />
                                <p className="leading-relaxed text-gray-300 mb-4">
                                    Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.
                                </p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 className="text-white font-medium title-font tracking-wider text-sm uppercase">EFG</h2>
                                <p className="text-gray-500">UI Developer</p>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="lg:w-1/3 lg:mb-0 p-4 transform transition-transform duration-300 hover:scale-105">
                            <div className="h-full text-center bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl">
                                <img
                                    alt="testimonial"
                                    className="w-24 h-24 mb-4 object-cover object-center rounded-full border-4 border-pink-500 bg-gray-800"
                                    src="https://i.pinimg.com/736x/df/16/f8/df16f869a0291a1b12557113c94e0f44.jpg"
                                />
                                <p className="leading-relaxed text-gray-300 mb-4">
                                    Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.
                                </p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 className="text-white font-medium title-font tracking-wider text-sm uppercase">XYZ</h2>
                                <p className="text-gray-500">CTO</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Testimonial;
