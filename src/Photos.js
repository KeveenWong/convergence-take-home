import { useQuery } from "react-query";

const Photos = () => {
    const { isLoading, isFetching, error, data, status } = useQuery("photos", () => 
        fetch("https://jsonplaceholder.typicode.com/photos")
        .then(res => res.json())
    )

    return (
        <div>
            <h1>testing</h1>
            {isFetching && "Background Updating..."}
            {isLoading && "Loading..."}
            {error && error.message}
            {data && data.map((image) => 
                            <div className='image-container'>
                                <img key={image.id} className='hover:scale-105 ease-in-out duration-300' src={image.thumbnailUrl} alt='a photo :D' />
                                <div class='text-on-image'>
                                    <h3>{image.title}</h3>
                                </div>
                            </div>)}
        </div>
    )
}

export default Photos