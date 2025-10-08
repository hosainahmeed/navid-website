const url: string = 'https://api.divandioneapp.com'
export const imageUrl = ({ image }: { image: string }) => {
    return image
        ? image?.startsWith("http")
            ? image
            : image?.startsWith("/")
                ? `${url}${image}`
                : `${url}/${image}`
        : "https://placehold.co/400";
};