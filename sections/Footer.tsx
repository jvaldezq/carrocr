import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="border-t w-full flex">
            <div
                className="container max-w-7xl px-4 py-4 mt-2 mx-auto flex flex-col items-center sm:flex-row sm:justify-between">
                <div className="flex flex-col items-center sm:items-start space-y-2">
                    <Link key='Home' href="/" className="text-lg font-semibold text-primary" prefetch={false}>
                        Carro CR
                    </Link>
                    <p className="text-sm text-muted-foreground text-tertiary">&copy; 2024 Carrocr. Reservados todos los
                        derechos.</p>
                </div>
                <div className="flex items-center space-x-4 mt-4 sm:mt-0 text-tertiary">
                    <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:underline"
                          prefetch={false}>
                        Política de privacidad
                    </Link>
                    <Link href="/terms-and-conditions" className="text-sm text-muted-foreground hover:underline"
                          prefetch={false}>
                        Términos de servicio
                    </Link>
                </div>
            </div>
        </footer>
    );
}