import logo from '../assets/logo.jpg';

export default function Header() {
    return (
        <header className="w-screen bg-background border-b border-b-white/25 min-h-32 flex items-center justify-center">
            <img src={logo} alt="Logo" className="h-32" />  
        </header>

    )
}