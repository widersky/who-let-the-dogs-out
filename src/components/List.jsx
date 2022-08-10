import React, { useState, useEffect } from "react";
import { API, baseEndpoint } from "../helpers/API";
import { v4 as uuidv4 } from 'uuid';

// Components
import ListItem from "./ListItem";
import Modal from "./Modal";

const List = () => {
    const [ data, setData ] = useState(null);
    const [ modalOpened, setModalOpened ] = useState(false);
    const [ selectedBreed, setSelectedBreed ] = useState(null);
    const [ randomBreedImages, setRandomBreedImages ] = useState(null);
    const [ modalImage, setModalimage ] = useState(null);


    // Get every breed available
    const getBreedsList = async () => {
        try {
            const response = await fetch(API.breeds);

            if (response.status === 200) {
                const receivedData = await response.json();
                setData(receivedData.message);
            } else {
                throw 'Error fetching dogs data'; 
            }
        } catch (error) {
            throw `Error: ${error}`
        }
    }


    // Get some random breed photos
    const getBreedImages = async () => {
        try {
            const response = await fetch(`${baseEndpoint}breed/${selectedBreed}/images/random/20`);

            if (response.status === 200) {
                const receivedData = await response.json();
                setRandomBreedImages(receivedData.message);
            } else {
                throw 'Error fetching dogs images data'; 
            } 
        } catch (error) {
            throw `Error: ${error}`
        }
    }


    // Get random dog image from randomBreedImages state
    const randomizeImage = () => setModalimage(randomBreedImages[Math.floor(Math.random() * randomBreedImages.length)]);


    // Get breeds on beginning
    useEffect(() => {
        getBreedsList();
    }, []);


    // And breed images on every selectedBreed change
    useEffect(() => {
        selectedBreed !== null && getBreedImages();
    }, [selectedBreed]);

    
    // Get random breed image
    useEffect(() => {
        randomBreedImages && randomizeImage();
    }, [randomBreedImages]);


    // Render markup
    return (
        <div className="breedsList">

            {data && Object.keys(data).map((breed) => (
                <React.Fragment key={uuidv4()}>
                    <ListItem name={breed} key={uuidv4()} onClick={() => {
                        setSelectedBreed(breed);
                        setModalOpened(true);
                    }} />

                    {/* Sub-breeds */}
                    {data[breed] && data[breed].map((subBreed) => (
                        <ListItem sub key={uuidv4()} name={subBreed} onClick={() => {
                            setSelectedBreed(`${breed}/${subBreed}`);
                            setModalOpened(true);
                        }} />
                    ))}
                </React.Fragment>
            ))}

            <Modal opened={modalOpened} onCloseReq={() => setModalOpened(false)}>
                <div className="currentImage">
                    <img src={modalImage} alt="" />
                </div>

                <div className="thumbnails">
                    {randomBreedImages.map((image) => (<div className="thumbnail" onClick={() => setModalimage(image)}><img src={image} alt="" /></div>))}
                </div>
            </Modal>

        </div>
    )
}

export default List