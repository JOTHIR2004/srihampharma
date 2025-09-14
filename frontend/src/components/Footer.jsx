import Contact from "./Contact"


export default function Footer() {
    return(
        <div className="bg-blue-500 text-white py-3 flex-y justify-center items-center h-50 w-full text-xl md:text-2xl lg:text-3xl xl:text-4xl ">
            <h1 className="font-bldbitcnt mx-4 ">S R I H A M S H I N I</h1>
            <div className="font-regbitcnt m-4 text-xs sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl "><Contact/></div>
        </div>
    )
}