interface TitleProps{
    title: string
}

function Title({title}: TitleProps) {
    return (
    <h2 className="py-4 text-7xl font-extrabold font- text-center text-[#014210]">{title}</h2>
    )
}

export default Title