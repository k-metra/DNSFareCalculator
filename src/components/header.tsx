import logo from '../assets/logo.jpg';

export default function Header() {
    return (
        <header className="flex w-full flex-wrap items-center justify-center gap-3 border-b border-b-border bg-background px-4 py-3 shadow-lg sm:min-h-24 sm:flex-nowrap sm:gap-5 sm:py-2">
            <img src={logo} alt="Logo" className="h-16 w-16 rounded-full object-cover sm:h-20 sm:w-20 md:h-24 md:w-24" /> 
            <h1 className="text-center font-main text-2xl font-semibold text-white sm:text-3xl md:text-4xl">Fare Calculator</h1> 
        </header>

    )
}