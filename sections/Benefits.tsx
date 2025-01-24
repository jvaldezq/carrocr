const BENEFITS_DATA = [
    {
        title: 'Uso & Accesibilidad',
        subTitle: 'Interfaz Amigable y Eficiente',
        description: 'Interfaz intuitiva y fácil de usar, encuenta automóviles de manera rápida y eficiente.',
        class: 'text-persianBlue bg-persianBlue/[0.2]'
    },
    {
        title: 'Calidad & Seguridad',
        subTitle: 'Seguridad del Usuario',
        description: 'Todos los automóviles son rigurosamente verificados, asegurando su calidad y autenticidad.',
        class: 'text-jewel bg-jewel/[0.2]'
    },
    {
        title: 'Conexión Directa',
        subTitle: 'Compradores y Vendedores',
        description: 'La plataforma conecta directamente a compradores y vendedores sin intermediarios',
        class: 'text-oldBrick bg-oldBrick/[0.2]'
    }
];
export const Benefits2 = () => {
    return (
        <section id='benefits' className='max-w-screen-3xl mx-auto px-4 mt-16'>
            <h2 className="text-tertiary font-light text-sm">BENEFICIOS</h2>
            <h4 className="text-primary font-bold text-2xl mt-4">Por qué elegirnos</h4>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 sm:gap-6">
                {
                    BENEFITS_DATA.map((benefit, index) => (
                        <div key={index} className='flex flex-col gap-y-3'>
                            <h2 className={`font-semibold text-xs py-1 px-3 w-fit rounded-2xl ${benefit.class}`}>{benefit.title}</h2>
                            <h3 className='text-tertiary font-bold text-lg'>{benefit.subTitle}</h3>
                            <p className='text-tertiary font-light text-lg'>{benefit.description}</p>
                        </div>
                    ))
                }
            </div>
        </section>
    );
}