interface ContactInfoProps {
    acctVerified: boolean;
    thumbnail: string | null;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
}

export const ContactInfo = (props: ContactInfoProps) => {
    const {acctVerified, thumbnail, contactName, contactEmail, contactPhone} = props
    return (
        <div
            className="grid grid-cols-2 gap-2 justify-center items-center text-tertiary w-full justify-self-center">
            <div className="flex flex-col gap-1 justify-center items-center text-center relative">
                {/*TODO need to add logic if it has profile picture render it if not initials*/}
                {/*<Image*/}
                {/*    className="object-cover aspect-auto rounded-full"*/}
                {/*    src={thumbnail ?? CarPlaceholderImage}*/}
                {/*    alt="Carro principal"*/}
                {/*    width={80}*/}
                {/*    height={80}*/}
                {/*/>*/}
                <div
                    className='h-20 w-20 rounded-full font-semibold bg-primary/[0.5] text-white flex justify-center items-center'>
                    {contactName.split(' ')
                        .map(word => word[0].toUpperCase())
                        .join('')}
                </div>
                <div>
                    <h4 className='font-medium text-lg'>{contactName}</h4>
                    {acctVerified && <h4 className="font-medium text-xs text-info">Verificado</h4>}
                </div>
            </div>
            <div className="grid grid-cols-1 divide-y text-tertiary font-light gap-1">
                <div>
                    <p className="text-xs">Email</p>
                    <h3 className="text-base font-normal">{contactEmail}</h3>
                </div>
                <div className="pt-1">
                    <p className="text-xs">Telefono</p>
                    <h3 className="text-base font-normal">{contactPhone}</h3>
                </div>
            </div>
        </div>
    )
}