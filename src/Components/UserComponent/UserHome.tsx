import React, { useEffect, useRef, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Button, Avatar } from "@nextui-org/react";
import { ChevronLeft, ChevronRight, } from 'lucide-react'
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { getFreelancers } from '../../Services/userServices/userAxiosCalls';
import { getFreelancerDetails } from '../../Services/adminServices/adminAxiosCall';

const ClientHome = () => {

    const data = useSelector((state: RootState) => state.user.userInfo)
    console.log(data,'this is the data of the user')
    const [freelancers, setFreelancers] = useState<any[]>([])
    const [visibleIndex, setVisibleIndex] = useState(0);
    const itemsPerPage = 4;
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // const scroll = (direction: 'left' | 'right') => {
    //     if (scrollContainerRef.current) {
    //         const scrollAmount = 300;
    //         const newScrollLeft = direction === 'left'
    //             ? scrollContainerRef.current.scrollLeft - scrollAmount
    //             : scrollContainerRef.current.scrollLeft + scrollAmount;

    //         scrollContainerRef.current.scrollTo({
    //             left: newScrollLeft,
    //             behavior: 'smooth'
    //         });
    //     }
    // };

    const handleScroll = (direction: string) => {
        if (direction === "right" && visibleIndex + itemsPerPage < freelancers.length) {
            setVisibleIndex(visibleIndex + itemsPerPage);
        } else if (direction === "left" && visibleIndex > 0) {
            setVisibleIndex(visibleIndex - itemsPerPage);
        }
    };

    let visibleFreelancers = []
    if(freelancers && freelancers.length > 0){
            visibleFreelancers = freelancers.slice(
            visibleIndex,
            visibleIndex + itemsPerPage
        );
    }
    

    useEffect(() => {

        const fetchFreelancers = async () => {
            let response = [];
            if (data?._id) {
                response = await getFreelancers(data?._id)
            }
            console.log(response, 'this hte response we got in the user home page')
            setFreelancers(Array.isArray(response) ? response : []);
        }
        fetchFreelancers()
    }, [data?._id])

    console.log(freelancers, 'this is the data of the freeelancers')


    return (
        <>
            <section className="bg-white relative">
                {/* Content Div with Background Image */}
                <div className=" relative min-h-screen z-10 max-w-full shadow-inner px-20 py-24 mx-auto lg:py-36 lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-0">
                    {/* Background Image for the Div */}
                    <div className="absolute top-0 left-0 w-full h-full">
                        <img
                            className="w-full h-full object-cover"
                            src={require('../../Assets/heroSection.jpg')}
                            alt="Background Image"
                        />
                        <div className="absolute inset-0 bg-black opacity-10"></div> {/* Overlay for readability */}
                    </div>

                    {/* Content on top of the background */}
                    <div className="relative  mr-auto place-self-center  lg:col-span-7 text-white pl-10 "> {/* Add padding-left */}
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
                            Find the right Freelance service right away
                        </h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-200 lg:mb-8 md:text-lg lg:text-xl">
                            From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack.
                        </p>

                        {/* <a
                            href="#"
                            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-gray-900 border border-gray-900 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                        >
                            Speak to Sales
                        </a> */}
                    </div>
                </div>

                <div className="bg-white  sm:py-16">
                    <div className="mx-auto max-w-7xl px-6 pb-10 lg:px-8">
                        <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
                            Trusted by the world’s most innovative teams
                        </h2>
                        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                            <img
                                alt="Transistor"
                                src="https://tailwindui.com/plus/img/logos/158x48/transistor-logo-gray-900.svg"
                                width={158}
                                height={48}
                                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                            />
                            <img
                                alt="Reform"
                                src="https://tailwindui.com/plus/img/logos/158x48/reform-logo-gray-900.svg"
                                width={158}
                                height={48}
                                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                            />
                            <img
                                alt="Tuple"
                                src="https://tailwindui.com/plus/img/logos/158x48/tuple-logo-gray-900.svg"
                                width={158}
                                height={48}
                                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                            />
                            <img
                                alt="SavvyCal"
                                src="https://tailwindui.com/plus/img/logos/158x48/savvycal-logo-gray-900.svg"
                                width={158}
                                height={48}
                                className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                            />
                            <img
                                alt="Statamic"
                                src="https://tailwindui.com/plus/img/logos/158x48/statamic-logo-gray-900.svg"
                                width={158}
                                height={48}
                                className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                            />
                        </div>
                    </div>
                </div>

                {freelancers && freelancers.length > 0 && (
                    <section className="max-w-7xl mx-auto px-4 mb-12">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold">Freelancers</h2>
                            <Button variant="light">See all</Button>
                        </div>

                        <div className="relative">
                            <Button
                                isIconOnly
                                variant="flat"
                                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 shadow-lg ${visibleIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                onClick={() => handleScroll("left")}
                                disabled={visibleIndex === 0}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>

                            <div
                                ref={scrollContainerRef}
                                className="flex gap-4 pb-4 overflow-hidden"
                            >
                                {visibleFreelancers.map((freelancer) => (
                                    <Card key={freelancer._id} className="max-w-[290px] bg-gray-100 rounded-2xl">
                                        <CardHeader className="justify-between">
                                            <div className="flex gap-5">
                                                <Avatar
                                                    isBordered
                                                    radius="full"
                                                    size="md"
                                                    src={freelancer.profile}
                                                />
                                                <div className="flex flex-col gap-1 items-start justify-center">
                                                    <h4 className="text-small font-semibold leading-none text-default-600">
                                                        {freelancer?.firstName}
                                                    </h4>
                                                    <h5 className="text-small tracking-tight text-default-400">
                                                        {freelancer.email}
                                                    </h5>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardBody className="px-3 py-0 text-small text-default-400">
                                            <p>{freelancer.description?.substring(0, 155)}....</p>
                                            <div className="mt-4">
                                                {freelancer.skills && freelancer.skills.length > 0 ? (
                                                    freelancer.skills.map((skill: any, skillIndex: any) => (
                                                        <span
                                                            key={skillIndex}
                                                            className="inline-block bg-[#1AA803] rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
                                                        >
                                                            {skill.name}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <p className="text-gray-500">No skills have added.</p>
                                                )}
                                            </div>
                                        </CardBody>
                                        <CardFooter className="gap-3">
                                            <div className="flex gap-1">
                                                <p className="font-semibold text-default-400 text-small">4</p>
                                                <p className="text-default-400 text-small">Following</p>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>

                            <Button
                                isIconOnly
                                variant="flat"
                                className={`absolute right-0 top-1/2 -translate-y-1/2 rounded-full z-10 bg-white/90 shadow-lg ${visibleIndex + itemsPerPage >= freelancers.length
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                    }`}
                                onClick={() => handleScroll("right")}
                                disabled={visibleIndex + itemsPerPage >= freelancers.length}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </section>
                )}


                {/* Additional Content Below */}
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

                {/* Client Perspective: Manage Projects Section */}
                <div className="relative bg-white py-16 sm:py-20">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
                            <div className="relative flex items-center justify-center">
                                <img
                                    src={require('../../Assets/manageProject.jpg')}
                                    alt="Project management dashboard"
                                    className="aspect-[4/3] w-full rounded-2xl object-cover"
                                />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h2 className="text-4xl font-bold tracking-tight text-gray-900">Seamlessly Manage Your Projects</h2>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    Our intuitive project management tools make it easy to collaborate with freelancers, track progress, and ensure timely delivery. Communicate effectively, share files, and manage milestones all in one place.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative bg-white py-16 sm:py-20">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
                            <div className="flex flex-col justify-center">
                                <h2 className="text-4xl font-bold tracking-tight text-gray-900">Find the Perfect Talent for Your Project</h2>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    Access a global pool of skilled freelancers for your project needs. Post your job, review proposals, and hire the best fit for your team. Our platform ensures you find quality talent quickly and efficiently.
                                </p>
                            </div>
                            <div className="relative flex items-center justify-center">
                                <img
                                    src={require('../../Assets/collaboration.jpg')}
                                    alt="Client hiring freelancer"
                                    className="aspect-[4/3] w-full rounded-2xl object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}

export default ClientHome
