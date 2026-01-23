import { Head, router } from '@inertiajs/react';
import { Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import BurgerArt from '../../../public/images/homeImage.png';
import MainLogo from '../../../public/images/mainLogo.png';
import menu1 from '../../../public/images/menu1.jpg';
import menu2 from '../../../public/images/menu2.jpg';
import menu3 from '../../../public/images/menu3.jpg';
import menu4 from '../../../public/images/menu4.jpg';
import menu5 from '../../../public/images/menu5.jpg';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

export default function Welcome() {
    const [platform, setPlatform] = useState<'ios' | 'android' | 'other'>(
        'other',
    );
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor;

        // Detect iOS devices
        if (/iPad|iPhone|iPod/.test(userAgent)) {
            setPlatform('ios');
        }
        // Detect Android devices
        else if (/android/i.test(userAgent)) {
            setPlatform('android');
        }
        // Other platforms
        else {
            setPlatform('other');
        }

        // Listen for PWA install prompt (for Android/Chrome)
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener(
            'beforeinstallprompt',
            handleBeforeInstallPrompt,
        );

        return () => {
            window.removeEventListener(
                'beforeinstallprompt',
                handleBeforeInstallPrompt,
            );
        };
    }, []);

    const handleDownload = async () => {
        if (platform === 'ios') {
            // For iOS - show instructions to add to home screen
            toast.info(
                'To install: Tap the Share button (□↑), then "Add to Home Screen"',
                { duration: 6000 },
            );
        } else if (platform === 'android' && deferredPrompt) {
            // For Android - trigger PWA install prompt
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;

            if (outcome === 'accepted') {
                toast.success('App installed successfully!');
            }
            setDeferredPrompt(null);
        } else if (platform === 'android' && !deferredPrompt) {
            // Android but PWA already installed or not available
            toast.info(
                'App is already installed or available through your browser menu',
                { duration: 4000 },
            );
        } else {
            // Desktop or other platforms
            toast.info(
                'Use Chrome or Edge on your mobile device to install this app',
                { duration: 4000 },
            );
        }
    };

    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="manifest" href="/site.webmanifest" />
                <title>Uncle Sam's Diner | Burgers, Drinks & Fries</title>
                <meta
                    name="description"
                    content="The ultimate comfort food destination. Enjoy our signature burgers, tasty drinks, and crispy fries!"
                />
            </Head>

            <div className="min-h-screen bg-[#FFFDF5] font-sans text-neutral-900 selection:bg-red-600 selection:text-white">
                {/* Navigation - Bold Red Accents */}
                <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-yellow-200 bg-white/95 p-6 backdrop-blur-md lg:px-20">
                    <img
                        src={MainLogo}
                        alt="Uncle Sam's Diner"
                        className="h-10 w-auto"
                    />
                    <div className="flex gap-4 text-xs font-black tracking-widest uppercase md:gap-8">
                      
                        <button
                            onClick={() => router.get('/customer/login')}
                            className="cursor-pointer rounded-full border-2 border-red-600 bg-red-600 px-6 py-2 text-white transition-all hover:border-red-700 hover:bg-red-700"
                        >
                            Login
                        </button>
                    </div>
                </nav>

                {/* Hero Section - High Contrast */}
                <main className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-12 px-6 py-16 lg:flex-row lg:py-24">
                    <div className="flex-1 space-y-8 text-center lg:text-left">
                        <h1 className="font-serif text-6xl leading-tight font-black tracking-tighter text-neutral-900 md:text-8xl">
                            Bigger. <br />
                            <span className="text-red-600 italic underline decoration-yellow-400 decoration-8 underline-offset-4">
                                Juicier.
                            </span>
                        </h1>
                        <p className="mx-auto max-w-md text-lg leading-relaxed font-medium text-neutral-700 lg:mx-0">
                            The home of legendary burgers, tasty drinks, and
                            golden fries. Feed your hunger and earn rewards with
                            every bite.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                            <button
                                onClick={() => router.get('/customer/login')}
                                className="cursor-pointer rounded-full bg-blue-700 px-12 py-4 text-xl font-black text-white shadow-xl shadow-blue-700/30 transition-all hover:bg-yellow-400 hover:text-blue-900 hover:shadow-yellow-400/40 active:scale-95"
                            >
                                Get Started
                            </button>
                            <button
                                onClick={handleDownload}
                                className="flex cursor-pointer items-center justify-center gap-3 rounded-full border-4 border-red-600 bg-white px-12 py-4 text-xl font-black text-red-600 shadow-xl shadow-red-600/20 transition-all hover:bg-red-600 hover:text-white active:scale-95"
                            >
                                <Download className="h-6 w-6" />
                                Install App
                            </button>
                        </div>
                    </div>

                    <div className="relative flex flex-1 items-center justify-center">
                        {/* The background blob is now a "Sunshine/Egg" yellow */}
                        <div className="absolute -z-10 h-[300px] w-[300px] rounded-full bg-yellow-400/40 blur-3xl md:h-[450px] md:w-[450px]" />
                        <img
                            src={BurgerArt}
                            alt="Signature Burger"
                            className="h-auto w-full max-w-[450px] object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]"
                        />
                    </div>
                </main>

                {/* Menu Section - Clean White with Red highlights */}
                <section className="bg-white px-6 py-24">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 font-serif text-5xl font-black text-neutral-900 md:text-6xl">
                                CRAVEABLE{' '}
                                <span className="text-red-600 italic">
                                    MENU
                                </span>
                            </h2>
                            <div className="mx-auto h-1.5 w-24 bg-yellow-400" />
                        </div>

                        <Carousel
                            opts={{ align: 'start', loop: true }}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-2 md:-ml-4">
                                {[menu1, menu2, menu3, menu4, menu5].map(
                                    (img, index) => (
                                        <CarouselItem
                                            key={index}
                                            className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
                                        >
                                            <div className="group relative overflow-hidden rounded-2xl border-4 border-yellow-100 bg-white p-2 transition-colors hover:border-red-500">
                                                <div className="aspect-[3/4] overflow-hidden rounded-xl">
                                                    <img
                                                        src={img}
                                                        alt={`Menu item ${index + 1}`}
                                                        className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                                                    />
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ),
                                )}
                            </CarouselContent>
                            <CarouselPrevious className="border-2 border-red-600 bg-white text-red-600 hover:bg-red-600 hover:text-white" />
                            <CarouselNext className="border-2 border-red-600 bg-white text-red-600 hover:bg-red-600 hover:text-white" />
                        </Carousel>
                    </div>
                </section>

                {/* How It Works - Red and Yellow Theme */}
                <section className="bg-yellow-400/10 px-6 py-24">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-16 text-center">
                            <h2 className="font-serif text-5xl font-black md:text-7xl">
                                EAT. EARN. <br />
                                <span className="text-red-600 italic">
                                    REPEAT.
                                </span>
                            </h2>
                        </div>

                        <div className="grid gap-8 md:grid-cols-3">
                            {[
                                {
                                    step: '01',
                                    title: 'Scan QR',
                                    desc: 'Find our standee at the counter and scan.',
                                    accent: 'group-hover:bg-red-600',
                                },
                                {
                                    step: '02',
                                    title: 'Register',
                                    desc: 'Quick profile setup to start your journey.',
                                    accent: 'group-hover:bg-blue-700',
                                },
                                {
                                    step: '03',
                                    title: 'Get Freebies',
                                    desc: 'Collect stamps and unlock delicious rewards.',
                                    accent: 'group-hover:bg-yellow-500',
                                },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="group relative rounded-3xl border-2 border-yellow-200 bg-white p-10 transition-all hover:-translate-y-2 hover:shadow-2xl"
                                >
                                    <span className="mb-6 block font-serif text-6xl font-black text-yellow-100 transition-colors group-hover:text-yellow-200">
                                        {item.step}
                                    </span>
                                    <h3 className="mb-3 text-2xl font-black tracking-tight text-neutral-900 uppercase">
                                        {item.title}
                                    </h3>
                                    <p className="leading-relaxed font-medium text-neutral-600">
                                        {item.desc}
                                    </p>
                                    <div
                                        className={`mt-6 h-2 w-12 bg-yellow-400 transition-all group-hover:w-full ${item.accent}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <footer className="border-t-4 border-yellow-400 bg-neutral-900 py-12 text-center text-white">
                    <p className="text-[12px] font-black tracking-[0.4em] text-yellow-400 uppercase">
                        Est. 2026 — Uncle Sam's Diner
                    </p>
                    <p className="mt-4 text-sm font-medium opacity-80">
                        Burgers • Drinks • Fries and More
                    </p>
                </footer>
            </div>
        </>
    );
}
