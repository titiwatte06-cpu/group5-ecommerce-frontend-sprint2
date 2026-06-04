const SkeletonLoader = () => {
    return (
        <div className="min-h-screen font-sans bg-[#f8f6f2] text-stone-800 flex flex-col w-full">
            {/* NavBar */}
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-8 py-3 border-b border-stone-200 bg-white">
                <div className="flex items-center gap-4 md:gap-10">
                    {/* Logo*/}
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-xl bg-stone-200 animate-pulse"></div>
                        <div className="h-5 w-24 rounded-md bg-stone-200 animate-pulse hidden md:block"></div>
                    </div>
                    {/* Menu Items */}
                    <div className="hidden md:flex gap-7">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="h-4 w-16 rounded bg-stone-200 animate-pulse"
                            ></div>
                        ))}
                    </div>
                </div>
                {/* Right Action Buttons */}
                <div className="flex gap-4">
                    <div className="h-10 w-32 rounded-xl bg-stone-200 animate-pulse hidden sm:block"></div>
                    <div className="h-10 w-10 rounded-xl bg-stone-200 animate-pulse"></div>
                    <div className="h-10 w-10 rounded-full bg-stone-200 animate-pulse"></div>
                </div>
            </div>

            {/* (Main Content) */}
            <div className="flex-1 w-full max-w-7xl mx-auto px-8 py-12 flex flex-col items-center gap-6">
                {/* Hero Banner */}
                <div className="h-12 w-3/4 md:w-1/2 rounded-2xl bg-stone-200 animate-pulse mb-4"></div>
                <div className="h-6 w-1/2 md:w-1/3 rounded-lg bg-stone-200 animate-pulse mb-12"></div>

                {/* Grid Products */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div
                            key={i}
                            className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col gap-4"
                        >
                            <div className="aspect-square rounded-xl bg-stone-200 animate-pulse w-full"></div>
                            <div className="h-6 w-3/4 rounded-md bg-stone-200 animate-pulse mt-2"></div>
                            <div className="h-4 w-1/2 rounded-md bg-stone-200 animate-pulse"></div>
                            <div className="h-10 w-full rounded-xl bg-stone-200 animate-pulse mt-4"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkeletonLoader;
