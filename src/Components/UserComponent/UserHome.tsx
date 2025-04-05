import React, { useEffect, useRef, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Button, Avatar } from "@nextui-org/react";
import { ChevronLeft, ChevronRight, User, } from 'lucide-react'
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { getFreelancers } from '../../Services/userServices/userAxiosCalls';
import { getFreelancerDetails } from '../../Services/adminServices/adminAxiosCall';

const ClientHome = () => {

    const data = useSelector((state: RootState) => state.user.userInfo)
    const [freelancers, setFreelancers] = useState<any[]>([])
    const [visibleIndex, setVisibleIndex] = useState(0);
    const itemsPerPage = 4;
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

    const handleScroll = (direction: string) => {
        if (direction === "right" && visibleIndex + itemsPerPage < freelancers.length) {
            setVisibleIndex(visibleIndex + itemsPerPage);
        } else if (direction === "left" && visibleIndex > 0) {
            setVisibleIndex(visibleIndex - itemsPerPage);
        }
    };

    console.log(freelancers,'this is the freelancers in the data')

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
            setFreelancers(Array.isArray(response.freelancerData) ? response.freelancerData : []);
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
                                src="data:image/png;base64,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"
                                width={158}
                                height={48}
                                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                            />
                            <img
                                alt="Reform"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAllBMVEX/9e0AAAD/+PAGCw7/+/P//fX/9+7///j///v/+/L////Jx8L//vi6t7JWUk/g2tP69fHz7ujr5+HW1M/Iw73Rzsiko52trKfy7ec4NDKuqKIpJyY8OjhzcG53dXJsa2iNjIpfXVocGxygnpy8u7aXlZBOTEs9P0Ht7u6DhIUPDw6KhoPf3+AmJCN/f3oNCwkzLy1bWVcxp87XAAADq0lEQVR4nO3XbXeaSBiHcWc6AyoSZFB8iIomJmnTNjHf/8vtfQNqTdqze/Zswrbn+r3QYRgS/vME9noAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4v4ns65o3Fb83lyeF/7HCh0nwv2r9G3KlMWY1P1fYjVSs/6Bh7C8e0q2ZnBMFU6WVydsj623UzY39Z6I89z7UAW3zGayz82PisDvc/TFT1k/S/PXktBNjNnFbdsezUoq0O+oaO2hKOtRR00TLzvvTVae2x17sRn4j62/qLupsdmvMbjqV23LZrNyP9f4GYVZOfTrr9fZl4ed6YPdlquf2ZTKQi/aFtaXRsXfSNvGTWW6Tci8Nosm0s4j+/uHz8IuZv6o0tdCzT3VBesDfaeHKmCSR76UebFby8Zj1dY9aOifnfJBi3vO6jRn5I/tUvrdu8FUu6yiiTczDt89fzPZi0bnb78bcrBa5l1vbPT1LVpeaVhLMhftY417VCZ2rJGw8OZ5LM/lYWC99kHaU0DdjZFaDi2qn63A0jiTM1bC/N+auL+O1zaeacFBI+TZfG3MIhY50Lg3u24TSEevhTq7OC+mY1GXP5rrbhFfmk3oMF9X1TuN1hFu7XO806j/pdBtLwtxLlk1fg2c2OyW00gcv/toYa+M7TejlOtdlQvfQJDTffpVwtVmvN+vlvEm4OSac62htRvEp4cjrOtTBr+I64ahO6GQki7DoJqHN525w3yT8FAZ5OG+omrAa5gOZpQs3HE6LkdNZGnSB/SThXDacEGTtFmNdhyOdpSF5rMewOi7Jj09op98f0+G6TmgOcbEw5SliJOvrefccdKe5rl4khT/vNG8T6t57o08dI6Mnw3ea3KmzGryjhH6tO3naJHzSANfnm4jr58VX75qdqLLt02JXJzzIOmwTLjRhFG7ak6KQtjMtSMfIs7BvZ3dJWhc/mptJONNO0kctVz9sqHa7Wm3kKRmHdJmGkfZImC2n/aKI5AUvyeSNZZrkWiz0zcUny2XWD8vlpH6H8fNU2mbymHdX5ag/kuWbfXhAuY3bY75ms6kuXrZ9HI/qghsc652+qNXlejyaH5jt0ETOHVs0h/VLXc/KaB6qlW6wH5DoDZ+sjhnle/ke9xCNn9qnzTv88X/A2vSlfeKXc/f37f8NF9LbWdbdbzEbR1mSFHn8Tvl6Opltl78sVNf/HwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB36CyezMqC1pHlgAAAAAElFTkSuQmCC"
                                width={158}
                                height={48}
                                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                            />
                            <img
                                alt="Tuple"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa-W8dn-tap14EaxWD27PkQcQVMzdoxozotA&s"
                                width={158}
                                height={48}
                                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                            />
                            <img
                                alt="SavvyCal"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnbZCJA5btB6r_QmRpFXsUozXVWrXnL-ARQw&s"
                                width={158}
                                height={48}
                                className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                            />
                            <img
                                alt="Statamic"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDZdA0XLLbKnx4Be_QRwf5CQAVoi-DqSmWuQ&s"
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
                                    <Card key={freelancer._id} className="max-w-[290px] bg-gray-100 rounded-2xl" >
                                        <CardHeader className="justify-between">
                                            <div className="flex gap-5">
                                                {freelancer.profile?(

                                                    <Avatar
                                                        isBordered
                                                        radius="full"
                                                        size="md"
                                                        src={freelancer.profile}
                                                    />
                                                ):(
                                                    <User/>
                                                )}
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
