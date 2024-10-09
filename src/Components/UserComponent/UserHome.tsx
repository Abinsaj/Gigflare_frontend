import React from 'react'
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";


const ClientHome = () => {

    const links = [
        { name: 'Open roles', href: '#' },
        { name: 'Internship program', href: '#' },
        { name: 'Our values', href: '#' },
        { name: 'Meet our leadership', href: '#' },
    ]
    const stats = [
        { name: 'Offices worldwide', value: '12' },
        { name: 'Full-time colleagues', value: '300+' },
        { name: 'Hours per week', value: '40' },
        { name: 'Paid time off', value: 'Unlimited' },
    ]

    const products = [
        {
            id: 1,
            name: 'Website Development',
            href: '#',
            price: '$48',
            imageSrc: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_2.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156477/website-development.png',
            imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
        },
        {
            id: 2,
            name: 'Logo Design        ',
            href: '#',
            price: '$35',
            imageSrc: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_2.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156494/logo-design.png',
            imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
        },
        {
            id: 3,
            name: 'SEO           ',
            href: '#',
            price: '$89',
            imageSrc: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_2.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156488/seo.png',
            imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
        },
        {
            id: 4,
            name: 'Machined Mechanical Pencil',
            href: '#',
            price: '$35',
            imageSrc: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_2.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156473/architecture-design.png',
            imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        },
        {
            id: 4,
            name: 'Architecture & Interior Design',
            href: '#',
            price: '$35',
            imageSrc: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_2.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156476/software-development.png',
            imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        },
        {
            id: 4,
            name: 'Socil Media & Marketing',
            href: '#',
            price: '$35',
            imageSrc: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_2.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156494/video-editing.png',
            imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        },
        // More products...
    ]

    return (
        <>
            <section className="bg-white relative">
                {/* Content Div with Background Image */}
                <div className="relative z-10 max-w-full px-20 py-24 mx-auto lg:py-36 lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-0">
                    {/* Background Image for the Div */}
                    <div className="absolute top-0 left-0 w-full h-full">
                        <img
                            className="w-full h-full object-cover"
                            src={require('../../Assets/heroSection.jpg')}
                            alt="Background Image"
                        />
                        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay for readability */}
                    </div>

                    {/* Content on top of the background */}
                    <div className="relative z-20 mr-auto place-self-center lg:col-span-7 text-white pl-10"> {/* Add padding-left */}
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
                            Find the right Freelance service right away
                        </h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-200 lg:mb-8 md:text-lg lg:text-xl">
                            From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack.
                        </p>
                        <a
                            href="#"
                            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                        >
                            Get started
                            <svg
                                className="w-5 h-5 ml-2 -mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-gray-900 border border-gray-900 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                        >
                            Speak to Sales
                        </a>
                    </div>
                </div>

                <div className="bg-white  sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
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

                <div className="bg-white ">
                    <div className="mx-auto max-w-2xl py-5 sm:py-24 lg:max-w-7xl lg:px-6 ">
                        <h2 className="text-black font-bold text-5xl mb-7">Popular services</h2>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-8">
                            {products.map((pdt) => (
                                <Card className="bg-[#D4D4D8] text-black rounded-lg p-4 shadow-lg h-[270px]">
                                    <CardHeader className="pb-0 pt-2 px-0 flex-col items-start">
                                        <p className="text-xs uppercase font-bold text-gray-900">{pdt.name}</p>
                                        <small className="text-gray-900"></small>
                                        <h4 className="font-bold text-xl mt-1"></h4>
                                    </CardHeader>
                                    <CardBody className="overflow-hidden mt-4 ">
                                        <Image
                                            alt="Card background"
                                            className="object-cover rounded-lg w-[200px] h-[150px] mx-auto"
                                            src={pdt.imageSrc}
                                            width={300}
                                            height={200}
                                        />
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>




                {/* Additional Content Below */}
                <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
                    <img
                        alt=""
                        src="https://images.pexels.com/photos/8944957/pexels-photo-8944957.jpeg?auto=compress&cs=tinysrgb&w=1200"
                        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
                    />
                    <div
                        aria-hidden="true"
                        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
                    >
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#000000] opacity-10"
                        />
                    </div>
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Work with us</h2>
                            <p className="mt-6 text-lg leading-8 text-gray-300">
                                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                                fugiat veniam occaecat fugiat aliqua.
                            </p>
                        </div>
                        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                                {links.map((link) => (
                                    <a key={link.name} href={link.href}>
                                        {link.name} <span aria-hidden="true">&rarr;</span>
                                    </a>
                                ))}
                            </div>
                            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                                {stats.map((stat) => (
                                    <div key={stat.name} className="flex flex-col-reverse">
                                        <dt className="text-base leading-7 text-gray-300">{stat.name}</dt>
                                        <dd className="text-2xl font-bold leading-9 tracking-tight text-white">{stat.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}

export default ClientHome
