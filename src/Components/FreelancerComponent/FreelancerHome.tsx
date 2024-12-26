import { Card, CardHeader, Image, Button, Avatar, CardBody, CardFooter, image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ArrowRightCircleIcon, ChevronLeft, ChevronRight, } from 'lucide-react'
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

const FreelancerHome = ({ data }: any) => {
    const navigate = useNavigate()

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            const newScrollLeft = direction === 'left'
                ? scrollContainerRef.current.scrollLeft - scrollAmount
                : scrollContainerRef.current.scrollLeft + scrollAmount;

            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        if (data?.isBlocked == true) {
            localStorage.removeItem('userInfo')
            navigate('/login')
            toast.error('You are blocked')
        }
    }, [data])

    console.log(data, 'this is the data ')

    const products = [
        {
            id: 1,
            name: 'Website Development',
            href: '#',
            price: '₹48',
            imageSrc: require('../../Assets/pexels-cottonbro-7696931.jpg'),
            imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
        },
        {
            id: 2,
            name: 'Logo Design        ',
            href: '#',
            price: '₹35',
            imageSrc: require('../../Assets/pexels-italo-melo-881954-2379004.jpg'),
            imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
        },
        {
            id: 3,
            name: 'SEO           ',
            href: '#',
            price: '₹89',
            imageSrc: require('../../Assets/pexels-kampus-8171187.jpg'),
            imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
        },
        {
            id: 4,
            name: 'Machined Mechanical Pencil',
            href: '#',
            price: '₹35',
            imageSrc: require('../../Assets/heroSection.jpg'),
            imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        },
        {
            id: 5,
            name: 'Architecture & Interior Design',
            href: '#',
            price: '₹35',
            imageSrc: require('../../Assets/pexels-karolina-grabowska-6333507.jpg'),
            imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        },
        {
            id: 6,
            name: 'Socil Media & Marketing',
            href: '#',
            price: '₹35',
            imageSrc: require('../../Assets/pexels-olly-789822.jpg'),
            imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        },
        {
            id: 7,
            name: 'Socil Media & Marketing',
            href: '#',
            price: '₹35',
            imageSrc: require('../../Assets/pexels-olly-927022.jpg'),
            imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        },

        // More products...
    ]

    const services = [
        { title: "Website Development", color: "#2E7D32", image: require('../../Assets/webdevelopment.jpg')  },
        { title: "Logo Design", color: "#E76F51", image: require('../../Assets/logodesign.jpg')  },
        { title: "AI service", color: "#1B4332", image: require('../../Assets/AI service.jpg')  },
        { title: "Architecture & Interior Design", color: "#6A2E35", image: require('../../Assets/architeture andinteriordesign .jpg')  },
        { title: "Social Media Marketing", color: "#606C38", image: require('../../Assets/socialmediamarkeing.jpg')  },
        { title: "Voice Over", color: "#3E2723", image: require('../../Assets/voice over.jpg')  },
    ];


    return (
        <>

            <section className="bg-white dark:bg-gray-900 relative">
                <div className="relative w-full lg:h-screen md:h-[500px] sm:h-[400px] h-[300px] flex items-center justify-center text-center">
                    <img
                        className="absolute inset-0 w-full h-full object-cover opacity-70"
                        src={require('../../Assets/SignUpimg.jpg')}
                        alt="Background Image"
                    />
                    <div className="relative z-10 flex flex-col p-4 sm:p-8">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold tracking-tight leading-none text-white mb-4 opacity-90">
                            Work Your Way
                        </h1>
                        <p className="text-sm sm:text-lg lg:text-xl font-normal text-white mb-6 lg:mb-8 opacity-90">
                            You bring the skill. We'll make earning easy.
                        </p>
                        {data?.isFreelancer ? (
                            <a onClick={() => navigate('/freelancer/dashboard', { state: data })} className="inline-flex justify-center items-center py-2 sm:py-3 px-4 sm:px-5 text-sm sm:text-base font-medium text-green-500 rounded-md bg-gray-600 bg-opacity-70 hover:bg-gray-700/80  ">
                                Dashboard
                            </a>
                        ) : (
                            <a href='/application' className="inline-flex justify-center items-center py-2 sm:py-3 px-4 sm:px-5 text-sm sm:text-base font-medium text-green-500 rounded-md bg-gray-600 bg-opacity-70 hover:bg-gray-700/80  ">
                                Become a Freelancer
                            </a>
                        )}

                    </div>

                    {/* Statistics Section */}
                    {/* <div className="absolute bg-white/50 bottom-4 md:bottom-8 lg:bottom-32 w-full flex flex-wrap justify-center gap-4 lg:gap-32 px-4 py-2 md:h-28">
                        <div className="text-gray-800 px-4 py-2 rounded-md text-center">
                            <span className="block text-xs sm:text-sm font-semibold">
                                A Gig is Bought Every
                            </span>
                            <span className="block text-xl sm:text-2xl md:text-3xl font-bold">
                                4 SEC
                            </span>
                        </div>
                        <div className="text-gray-800 px-4 py-2 rounded-md text-center">
                            <span className="block text-xs sm:text-sm font-semibold">
                                Transactions
                            </span>
                            <span className="block text-xl sm:text-2xl md:text-3xl font-bold">
                                50M+
                            </span>
                        </div>
                        <div className="text-gray-800 px-4 py-2 rounded-md text-center">
                            <span className="block text-xs sm:text-sm font-semibold">
                                Price Range
                            </span>
                            <span className="block text-xl sm:text-2xl md:text-3xl font-bold">
                                ₹500 - 100,000
                            </span>
                        </div>
                    </div> */}
                </div>
            </section>

            {/* Popular Services Section */}
            <div className="bg-white ">
                <div className="mx-auto max-w-full space-y-5 md:max-w-2xl lg:max-w-7xl lg:px-6 py-5 sm:py-10 lg:py-10">
        
                    

                    <div className="relative bg-white py-16 sm:py-20">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
                            <div className="relative">
                                <img
                                    src={require('../../Assets/community.jpg')}
                                    alt="Professional team"
                                    className="aspect-[3/2] w-full rounded-2xl object-cover"
                                />
                            </div>
                            <div className='flex flex-col justify-center' >
                                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Join our panel of freelancers for free</h2>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    Join our freelancer community for free and attract more clients—no contracts, no fees, and cancel anytime.
                                    Showcase your skills, boost your ratings, and receive direct project requests. No catch, just opportunities!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Consultation Section */}
                <div className="relative bg-white py-16 sm:py-20">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
                            <div className='flex flex-col justify-center'>
                                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Take Remote or On-site Projects</h2>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    Your profile is visible to clients worldwide for project requests. Engage directly with clients from
                                    FreelancePro without any intermediaries. Choose projects that match your skills and availability.
                                </p>
                            </div>
                            <div className="relative">
                                <img
                                    src={require('../../Assets/remotejob.jpg')}
                                    alt="Professional consultation"
                                    className="aspect-[3/2] w-full rounded-2xl object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <section className="bg-white">
                        <div className="max-w-[1400px] mx-auto px-4 py-16">
                            <h2 className="text-[40px] font-normal text-[#404145] mb-6">Popular services</h2>

                            <div className="relative w-full mx-auto"> 
                                <div
                                    ref={scrollContainerRef}
                                    className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                                >
                                    {services.map((service, index) => (
                                        <Card
                                            key={index}
                                            className="w-[300px] h-[345px] border-none rounded-lg flex-shrink-0"
                                            style={{ backgroundColor: service.color }}
                                        >
                                            <CardHeader className="absolute z-10 top-4 flex-col items-start">
                                                <h4 className="text-white text-2xl font-medium leading-6 max-w-[200px]">{service.title}</h4>
                                            </CardHeader>
                                            <CardBody className="overflow-visible p-0 absolute bottom-0 w-full h-3/5">
                                                <div className="h-full w-full flex items-end justify-center">
                                                    <img
                                                        alt={service.title}
                                                        className="w-full h-full object-cover object-center"
                                                        src={service.image}
                                                    />
                                                </div>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </div>
                                <Button
                                    isIconOnly
                                    variant="flat"
                                    className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-12 h-12"
                                    onClick={() => scroll('right')}
                                >
                                    <ChevronRight className="h-6 w-6" />
                                </Button>
                            </div>
                        </div>
                    </section>

                <div className='h-6 pb-20 pl-40 justify-center'>
                        <h2 className="text-black font-bold text-2xl justify-center sm:text-4xl lg:text-5xl mb-5 sm:mb-7">
                            Join our growing freelance community
                        </h2>
                    </div>

                    <div className='grid grid-cols-1 gap-x-5 gap-y-7  xl:grid-cols-4 lg:grid-cols-2 sm:grid-cols-1 '>
                        {products.map((pdt) => (
                            <div className='h-full rounded-sm'>
                                <Card className="col-span-12 rounded-md shadow-lg sm:col-span-4 h-[300px]">
                                    <CardHeader className="absolute z-10 top-1 px-4 py-2 flex-col !items-start">
                                        {/* <p className="text-tiny text-black  uppercase font-bold">What to watch</p> */}

                                    </CardHeader>
                                    <Image
                                        removeWrapper
                                        alt="Card background"
                                        className="z-0 w-full h-full object-cover"
                                        src={pdt.imageSrc}
                                    />
                                </Card>
                            </div>
                        ))}
                        <div className='h-full rounded-sm'>
                            <Card className="col-span-12 rounded-md border shadow-lg sm:col-span-4 h-[300px]">
                                <CardHeader className="absolute z-10 top-1 px-4 py-2 flex-col !items-center">
                                    <p className="text-tiny text-black  uppercase font-bold">Join the community</p>
                                    <ArrowRightCircleIcon className="h-16 w-16 mt-20 text-gray-700" />
                                    <h6 className="text-gray-400">community is under development</h6>
                                </CardHeader>
                                {/* <Image
                                    removeWrapper
                                    alt="Card background"
                                    className="z-0 w-full h-full object-cover"
                                    
                                /> */}
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FreelancerHome
