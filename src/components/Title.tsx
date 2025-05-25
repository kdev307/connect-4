interface TitleProps{
    title: string;
    style: string;
}

function Title({title, style}: TitleProps) {
    return (
    <h2 className={`py-4 text-center ${style}`}>{title}</h2>
    )
}

export default Title