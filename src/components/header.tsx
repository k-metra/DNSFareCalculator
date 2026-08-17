import logo from '../assets/logo.jpg';

export default function Header() {
    return (
        <header className="w-full bg-background border-b border-b-border min-h-24 flex items-center justify-center gap-5 shadow-lg">
            <img src={logo} alt="Logo" className="h-28" /> 
            <h1 className="text-3xl font-semibold text-white font-main">Fare Calculator</h1> 
        </header>

    )
}