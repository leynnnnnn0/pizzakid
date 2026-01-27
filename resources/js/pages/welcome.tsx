import { Head, router } from '@inertiajs/react';
import { Download, Heart, History, Target, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

// Assuming you replace these paths with your pizza assets
import story3 from '../../../public/images/culture.png';
import PizzaHero from '../../../public/images/culture.png';
import story1 from '../../../public/images/history.png';
import MainLogo from '../../../public/images/mainLogo.png';
import story2 from '../../../public/images/values.png';
import story4 from '../../../public/images/vision.png';
import pizza1 from '../../../public/images/pizza1.png';
import pizza2 from '../../../public/images/pizza2.png';
import pizza3 from '../../../public/images/pizza3.png';
import pizza4 from '../../../public/images/pizza4.png';
import pizza5 from '../../../public/images/pizza5.png';

export default function Welcome() {
    const [platform, setPlatform] = useState<'ios' | 'android' | 'other'>(
        'other',
    );
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor;
        if (/iPad|iPhone|iPod/.test(userAgent)) setPlatform('ios');
        else if (/android/i.test(userAgent)) setPlatform('android');
        else setPlatform('other');

        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };
        window.addEventListener(
            'beforeinstallprompt',
            handleBeforeInstallPrompt,
        );
        return () =>
            window.removeEventListener(
                'beforeinstallprompt',
                handleBeforeInstallPrompt,
            );
    }, []);

    const handleDownload = () => {
        if (platform === 'ios') {
            toast.info('Tap Share (□↑) then "Add to Home Screen"', {
                duration: 6000,
            });
        } else if (deferredPrompt) {
            deferredPrompt.prompt();
            setDeferredPrompt(null);
        } else {
            toast.info('App is ready! Access it via your mobile browser menu.');
        }
    };

    const storySections = [
        {
            title: 'Our History',
            img: story1,
            icon: <History className="h-5 w-5" />,
            desc: 'Crafting dough since 2026.',
        },
        {
            title: 'Our Values',
            img: story2,
            icon: <Heart className="h-5 w-5" />,
            desc: 'Quality ingredients, always.',
        },
        {
            title: 'Our Culture',
            img: story3,
            icon: <Users className="h-5 w-5" />,
            desc: 'A community built on slices.',
        },
        {
            title: 'Our Vision',
            img: story4,
            icon: <Target className="h-5 w-5" />,
            desc: 'The perfect crust in every city.',
        },
    ];

    return (
        <>
            <Head>
                <link rel="manifest" href="/site.webmanifest" />
                <title>Artisan Pizza | Hand-Tossed Perfection</title>
            </Head>

            <div className="min-h-screen bg-black font-sans text-white selection:bg-yellow-500 selection:text-black">
                {/* Navigation - Minimalist Black/White */}
                <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/90 p-6 backdrop-blur-md lg:px-20">
                    <img src={MainLogo} alt="Logo" className="h-10 w-auto" />
                    <button
                        onClick={() => router.get('/customer/login')}
                        className="rounded-full bg-yellow-500 px-8 py-2 text-xs font-black text-black uppercase transition-transform hover:scale-105"
                    >
                        Login
                    </button>
                </nav>

                {/* Hero Section - High Contrast Mustard/Black */}
                <main className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-12 px-6 py-16 lg:flex-row lg:py-32">
                    <div className="flex-1 space-y-8 text-center lg:text-left">
                        <h1 className="font-serif text-7xl leading-none font-black tracking-tighter md:text-9xl">
                            UPPER <br />
                            <span className="text-yellow-500 italic">
                                CRUST.
                            </span>
                        </h1>
                        <p className="mx-auto max-w-md text-lg font-light text-neutral-400 lg:mx-0">
                            Join the elite circle of pizza lovers. Earn gold
                            points on every slice and unlock wood-fired rewards
                            that money can't buy.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                            <button
                                onClick={() => router.get('/customer/login')}
                                className="bg-white px-12 py-4 text-xl font-black text-black transition-all hover:bg-yellow-500"
                            >
                                Join Now
                            </button>
                            <button
                                onClick={handleDownload}
                                className="flex items-center justify-center gap-3 border-2 border-white px-12 py-4 text-xl font-black transition-all hover:bg-white hover:text-black"
                            >
                                <Download className="h-6 w-6" /> Install
                            </button>
                        </div>
                    </div>
                    <div className="relative flex-1">
                        <div className="absolute inset-0 bg-yellow-500/20 blur-[120px]" />
                        <img
                            src={PizzaHero}
                            alt="Fresh Pizza"
                            className="relative z-10 w-full drop-shadow-2xl"
                        />
                    </div>
                </main>

                {/* Menu Section - Dark Gallery Style */}
                <section className="bg-white px-6 py-24">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                            <div>
                                <h2 className="font-serif text-5xl font-black text-black uppercase md:text-7xl">
                                    Our{' '}
                                    <span className="text-yellow-500 italic">
                                        Signatures
                                    </span>
                                </h2>
                                <div className="mt-4 h-2 w-24 bg-yellow-500" />
                            </div>
                            <p className="max-w-xs font-medium text-neutral-400">
                                From classic Margherita to our bold Spicy
                                Mustard Infusion.
                            </p>
                        </div>

                        <Carousel
                            opts={{ align: 'start', loop: true }}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-2 md:-ml-4">
                                {/* Assuming menu1-5 are your pizza images */}
                                {[pizza1, , pizza2, pizza4, pizza3, pizza5].map(
                                    (img, index) => (
                                        <CarouselItem
                                            key={index}
                                            className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
                                        >
                                            <div className="group relative overflow-hidden bg-neutral-900 transition-all hover:ring-4 hover:ring-yellow-500">
                                                <div className="aspect-square overflow-hidden">
                                                    <img
                                                        src={img}
                                                        alt={`Pizza Variety ${index + 1}`}
                                                        className="h-full w-full object-cover grayscale-[20%] transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                                                    />
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ),
                                )}
                            </CarouselContent>
                            {/* Styled buttons to match the black/mustard theme */}
                            <div className="hidden md:block">
                                <CarouselPrevious className="left-[-50px] border-none bg-yellow-500 text-black hover:bg-white hover:text-black" />
                                <CarouselNext className="right-[-50px] border-none bg-yellow-500 text-black hover:bg-white hover:text-black" />
                            </div>
                        </Carousel>
                    </div>
                </section>

                {/* How It Works - Dark/Mustard Theme */}
                <section className="bg-[#111] px-6 py-24">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-16">
                            <h2 className="text-4xl font-black uppercase md:text-6xl">
                                Earn your{' '}
                                <span className="text-yellow-500 italic">
                                    Dough
                                </span>
                            </h2>
                        </div>
                        <div className="grid gap-1 md:grid-cols-3">
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
                                <div
                                    key={i}
                                    className="group border border-white/10 p-12 transition-colors hover:bg-yellow-500 hover:text-black"
                                >
                                    <span className="text-5xl font-black text-yellow-500 group-hover:text-black">
                                        {item.step}
                                    </span>
                                    <h3 className="mt-8 text-2xl font-black uppercase">
                                        {item.title}
                                    </h3>
                                    <p className="mt-4 opacity-70 group-hover:opacity-100">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <footer className="border-t border-white/10 bg-black py-16 text-center">
                    <p className="text-xs font-black tracking-[0.5em] text-yellow-500 uppercase">
                        EST. 2026 — Slice & Co.
                    </p>
                </footer>
            </div>
        </>
    );
}
