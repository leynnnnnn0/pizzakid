import first from '../../../public/images/1.jpg';
import CoffeeArt from '../../../public/images/coffee-art-2d.png';
import StepArt from '../../../public/images/loyalty-steps.png';
import MainLogo from '../../../public/images/mainLogo.png';

import third from '../../../public/images/3.jpg';

import fourth from '../../../public/images/4.jpg';

import fifth from '../../../public/images/5.jpg';

import sixth from '../../../public/images/6.jpg';

import seventh from '../../../public/images/7.jpg';

import { router } from '@inertiajs/react';
import eight from '../../../public/images/8.jpg';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-black/5 bg-white/80 p-6 backdrop-blur-md lg:px-20">
                <img
                    src={MainLogo}
                    alt="Logo"
                    className="h-10 w-auto grayscale"
                />
                <div className="flex gap-4 text-xs font-bold tracking-widest uppercase md:gap-8">
                    <button
                        onClick={() => router.get('/customer/login')}
                        className="rounded-full border border-black px-5 py-2 transition-colors hover:bg-black hover:text-white"
                    >
                        Login
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-12 px-6 py-16 lg:flex-row lg:py-24">
                <div className="flex-1 space-y-8 text-center lg:text-left">
                    <h1 className="font-serif text-6xl leading-tight tracking-tighter md:text-8xl">
                        Brewed for <br />
                        <span className="font-light text-gray-400 italic underline decoration-black/10">
                            Loyalty.
                        </span>
                    </h1>
                    <p className="mx-auto max-w-md text-lg leading-relaxed text-gray-600 lg:mx-0">
                        Every cup tells a story. Join our circle and turn your
                        daily ritual into rewards.
                    </p>
                    <button
                        onClick={() => router.get('/customer/login')}
                        className="rounded-full bg-black px-12 py-4 font-bold text-white transition-all hover:shadow-xl active:scale-95"
                    >
                        Get Started
                    </button>
                </div>
                <div className="relative flex flex-1 items-center justify-center">
                    <div className="absolute -z-10 h-[300px] w-[300px] rounded-full bg-gray-50 md:h-[450px] md:w-[450px]" />
                    <img
                        src={CoffeeArt}
                        alt="2D Cafe Art"
                        className="h-auto w-full max-w-[400px] object-contain"
                    />
                </div>
            </main>

            {/* Section 2: How It Works - Re-aligned & Balanced */}
            <section className="bg-gray-50 px-6 py-24">
                <div className="mx-auto max-w-6xl">
                    <div className="grid items-center gap-16 lg:grid-cols-5">
                        {/* Image side - Now smaller and more focused */}
                        <div className="flex justify-center lg:col-span-2">
                            <div className="relative rounded-3xl border border-black/5 bg-white p-4 shadow-sm">
                                <img
                                    src={StepArt}
                                    alt="How to use"
                                    className="w-full max-w-[320px] rounded-2xl object-contain"
                                />
                            </div>
                        </div>

                        {/* Steps side */}
                        <div className="space-y-10 lg:col-span-3">
                            <h2 className="mb-8 font-serif text-4xl md:text-5xl">
                                Simple Steps. <br />
                                <span className="text-gray-400">
                                    Endless Perks.
                                </span>
                            </h2>
                            {[
                                {
                                    step: '01',
                                    title: 'Scan QR',
                                    desc: 'Find our standee at the counter and scan with your phone.',
                                },
                                {
                                    step: '02',
                                    title: 'Register',
                                    desc: 'Create your profile in seconds to start tracking progress.',
                                },
                                {
                                    step: '03',
                                    title: 'Earn Stamps',
                                    desc: 'Collect stamps with every purchase and unlock free treats.',
                                },
                            ].map((item, i) => (
                                <div key={i} className="group flex gap-8">
                                    <span className="font-serif text-5xl text-gray-200 transition-colors group-hover:text-black">
                                        {item.step}
                                    </span>
                                    <div className="pt-2">
                                        <h3 className="mb-1 text-lg font-bold tracking-tight uppercase">
                                            {item.title}
                                        </h3>
                                        <p className="max-w-sm leading-relaxed text-gray-500">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: The Gallery - Stylish Bento Grid */}
            <section className="px-6 py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-16 flex flex-col items-end justify-between gap-4 border-b border-black/5 pb-8 md:flex-row">
                        <h2 className="font-serif text-5xl italic">
                            The Community
                        </h2>
                        <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
                            @tinybubblestearoom
                        </p>
                    </div>

                    {/* Stylish Asymmetric Grid (8 Images) */}
                    <div className="grid auto-rows-[200px] grid-cols-2 gap-3 md:grid-cols-4">
                        <div className="overflow-hidden rounded-sm bg-gray-100 md:col-span-2 md:row-span-2">
                            <img
                                src={first}
                                className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                                alt="1"
                            />
                        </div>
                        <div className="overflow-hidden rounded-sm bg-gray-100">
                            <img
                                src={third}
                                className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                                alt="2"
                            />
                        </div>
                        <div className="row-span-2 overflow-hidden rounded-sm bg-gray-100">
                            <img
                                src={fourth}
                                className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                                alt="3"
                            />
                        </div>
                        <div className="overflow-hidden rounded-sm bg-gray-100">
                            <img
                                src={fifth}
                                className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                                alt="4"
                            />
                        </div>
                        <div className="overflow-hidden rounded-sm bg-gray-100">
                            <img
                                src={sixth}
                                className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                                alt="5"
                            />
                        </div>
                        <div className="overflow-hidden rounded-sm bg-gray-100 md:col-span-2">
                            <img
                                src={seventh}
                                className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                                alt="6"
                            />
                        </div>
                        <div className="overflow-hidden rounded-sm bg-gray-100">
                            <img
                                src={eight}
                                className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                                alt="7"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <footer className="border-t border-black/5 py-12 text-center">
                <p className="text-[10px] tracking-[0.3em] uppercase opacity-40">
                    Est. 2026 — Tiny Bubbles 2D Art Cafe
                </p>
            </footer>
        </div>
    );
}
