import React from 'react'
import { Link } from 'react-router-dom'

function contents() {
    return (
        <>
            <section className='app-features-section rounded-lg border p-8 bg-white m-10'>
                <div className='container mx-auto'>
                    <div className='flex flex-wrap justify-center'>
                        <div className='md:w-1/3 p-4'>
                            <div className='feature-wrap animate__animated animate__bounceIn'>
                                <div className='flex items-center justify-center'>
                                    <img
                                        src="https://www.playspots.in/wp-content/uploads/2020/02/search.png"
                                        alt="gameOn"
                                        className='img-fluid animate__animated animate__bounceIn slower mb-3'
                                    />
                                </div>
                                <h4 className='font-bold animate__animated animate__fadeInUp flex flex-wrap justify-center'>
                                    Search
                                </h4>
                                <div className='content text-center'>
                                    <p>
                                        Are you looking to play after work, organize your Sunday Five's football match? Explore the largest network of sports facilities all over India.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='md:w-1/3 p-4'>
                            <div className='feature-wrap animate__animated animate__bounceIn'>
                                <div className='flex items-center justify-center'>
                                    <img
                                        src="https://www.playspots.in/wp-content/uploads/2020/02/book.png"
                                        alt="gameOn"
                                        className='img-fluid animate__animated animate__bounceIn slower mb-3'
                                    />
                                </div>
                                <h4 className='font-bold animate__animated animate__fadeInUp flex items-center justify-center'>
                                    Book
                                </h4>
                                <div className='content text-center'>
                                    <p>
                                        Are you looking to play after work, organize your Sunday Five's football match? Explore the largest network of sports facilities all over India.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='md:w-1/3 p-4'>
                            <div className='feature-wrap animate__animated animate__bounceIn'>
                                <div className='flex justify-center items-center'>
                                    <img
                                        src="https://www.playspots.in/wp-content/uploads/2020/02/play.png"
                                        alt="gameOn"
                                        className='img-fluid animate__animated animate__bounceIn slower mb-3'
                                    />
                                </div>
                                <h4 className='font-bold animate__animated animate__fadeInUp flex items-center justify-center'>
                                    Play
                                </h4>
                                <div className='content text-center'>
                                    <p>
                                        Are you looking to play after work, organize your Sunday Five's football match? Explore the largest network of sports facilities all over India.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="px-28">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-center">
                    <div className="md:w-1/2 md:order-2">
                        <div className="meet-pal-dtl-wrap wow fadeIn slow">
                            <h1 className="text-4xl font-bold mb-2 md:text-5xl md:mb-4">Meet your pals over Game</h1>
                            <div className="content mb-4">
                                <p>
                                    Want to play games?
                                    <br />
                                    But didn't get an opponent team?
                                    <br />
                                    " You can invite a team or Join a pre-scheduled match through GameOn "
                                </p>
                            </div>
                            <Link to="" className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-md shadow-md md:inline-block">Invite</Link>
                        </div>
                    </div>
                    <div className="md:w-1/2 md:order-1 md:mb-8">
                        <div className="md:hidden mb-6">
                            <img
                                src="https://www.playspots.in/wp-content/uploads/2020/02/meet-pals.png"
                                alt="meet-pal"
                                className="img-fluid wow bounceIn slower animated"
                            />
                        </div>
                        <div className="meet-pal-img-wrap">
                            <img
                                src="https://www.playspots.in/wp-content/uploads/2020/02/meet-pals.png"
                                alt="img123"
                                className="img-fluid wow bounceIn slower animated"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default contents