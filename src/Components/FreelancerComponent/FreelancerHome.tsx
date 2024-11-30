import { Card, CardHeader, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

const FreelancerHome = ({data}: any) => {
    const navigate = useNavigate()

    useEffect(()=>{
        if(data?.isBlocked == true){
            localStorage.removeItem('userInfo')
            navigate('/login')
            toast.error('You are blocked')
        }
    },[data])
    
    console.log(data,'this is the data ')

    const products = [
        {
            id: 1,
            name: 'Website Development',
            href: '#',
            price: '$48',
            imageSrc: require('../../Assets/pexels-cottonbro-7696931.jpg'),
            imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
        },
        {
            id: 2,
            name: 'Logo Design        ',
            href: '#',
            price: '$35',
            imageSrc: require('../../Assets/pexels-italo-melo-881954-2379004.jpg'),
            imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
        },
        {
            id: 3,
            name: 'SEO           ',
            href: '#',
            price: '$89',
            imageSrc: require('../../Assets/pexels-kampus-8171187.jpg'),
            imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
        },
        {
            id: 4,
            name: 'Machined Mechanical Pencil',
            href: '#',
            price: '$35',
            imageSrc: require('../../Assets/heroSection.jpg'),
            imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        },
        {
            id: 5,
            name: 'Architecture & Interior Design',
            href: '#',
            price: '$35',
            imageSrc: require('../../Assets/pexels-karolina-grabowska-6333507.jpg'),
            imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        },
        {
            id: 6,
            name: 'Socil Media & Marketing',
            href: '#',
            price: '$35',
            imageSrc: require('../../Assets/pexels-olly-789822.jpg'),
            imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        },
        {
            id: 7,
            name: 'Socil Media & Marketing',
            href: '#',
            price: '$35',
            imageSrc: require('../../Assets/pexels-olly-927022.jpg'),
            imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        },
        
        // More products...
    ]



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
                            <a onClick={()=>navigate('/freelancer/dashboard',{state:data})} className="inline-flex justify-center items-center py-2 sm:py-3 px-4 sm:px-5 text-sm sm:text-base font-medium text-green-500 rounded-md bg-gray-600 bg-opacity-70 hover:bg-gray-700/80  ">
                            Dashboard
                        </a>
                        ):(
                            <a href='/application' className="inline-flex justify-center items-center py-2 sm:py-3 px-4 sm:px-5 text-sm sm:text-base font-medium text-green-500 rounded-md bg-gray-600 bg-opacity-70 hover:bg-gray-700/80  ">
                            Become a Freelancer
                        </a>
                        )}
                        
                    </div>

                    {/* Statistics Section */}
                    <div className="absolute bg-white/50 bottom-4 md:bottom-8 lg:bottom-32 w-full flex flex-wrap justify-center gap-4 lg:gap-32 px-4 py-2 md:h-28">
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
                                $5 - $10,000
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Services Section */}
            <div className="bg-white ">
                <div className="mx-auto max-w-full space-y-5 md:max-w-2xl lg:max-w-7xl lg:px-6 py-5 sm:py-10 lg:py-24">
                    <div className='h-6 pb-20 pl-40 justify-center'>
                    <h2 className="text-black font-bold text-2xl justify-center sm:text-4xl lg:text-5xl mb-5 sm:mb-7">
                    Join our growing freelance community
                    </h2>
                    </div>
                    
                    <div className='grid grid-cols-1 gap-x-5 gap-y-7  xl:grid-cols-4 lg:grid-cols-2 sm:grid-cols-1 '>
                        {products.map((pdt)=>(
                            <div className='h-full rounded-sm'>
                            <Card className="col-span-12 rounded-md sm:col-span-4 h-[300px]">
                                <CardHeader className="absolute z-10 top-1 px-4 py-2 flex-col !items-start">
                                    <p className="text-tiny text-black  uppercase font-bold">What to watch</p>
                             
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default FreelancerHome
