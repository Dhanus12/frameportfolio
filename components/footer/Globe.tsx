
'use client';

export default function Globe() {
    return (
        <footer className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black">
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-60"
                >
                    <source src="/globe-loop.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* Gradient Overlay for seamless integration */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="relative z-10 text-center text-white p-8">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Global Reach. Local Touch.</h2>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                    Connecting ideas across borders through innovative digital solutions.
                </p>
                <button className="mt-8 px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors duration-300">
                    Get in Touch
                </button>
            </div>
        </footer>
    );
}
