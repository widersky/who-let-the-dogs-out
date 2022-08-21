import React, { useState, useEffect } from "react";
import { API, baseEndpoint } from "../helpers/API";
import { v4 as uuidv4 } from 'uuid';

// Components
import ListItem from "./ListItem";
import Modal from "./Modal";
import Divider from "./Divider";
import Search from "./Search";

const List = () => {
    const [ data, setData ] = useState(null);
    const [ modalOpened, setModalOpened ] = useState(false);
    const [ selectedBreed, setSelectedBreed ] = useState(null);
    const [ randomBreedImages, setRandomBreedImages ] = useState(null);
    const [ modalImage, setModalimage ] = useState(null);
    const [ search, setSearch ] = useState('');
    const [ indexLetter, setIndexLetter ] = useState('');


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

    useEffect(() => {
        randomBreedImages && randomizeImage();
    }, [randomBreedImages]);


    // Get breeds on beginning
    useEffect(() => {
        getBreedsList();
    }, []);


    // And breed images on every selectedBreed change
    useEffect(() => {
        selectedBreed !== null && getBreedImages();
    }, [selectedBreed]);


    // Render markup
    return (
        <div className="breedsList">

            <Search onChange={(value) => setSearch(value)} />

            {data && Object.keys(data)
                .filter((breed) => breed.toUpperCase().includes(search.toUpperCase()))
                .map((breed) => (
                <div className="listItemWrapper" key={uuidv4()}>
                    <ListItem name={breed} key={uuidv4()} onClick={() => {
                        setSelectedBreed(breed);
                        setModalOpened(true);
                    }} />

                    {data[breed].length > 0 && <Divider />}

                    {/* Sub-breeds */}
                    <div className="listSubItemsWrapper">
                        {data[breed] && data[breed].map((subBreed) => (
                            <ListItem sub key={uuidv4()} name={subBreed} onClick={() => {
                                setSelectedBreed(`${breed}/${subBreed}`);
                                setModalOpened(true);
                            }} />
                        ))}
                    </div>
                </div>
            ))}

            <Modal 
                opened={modalOpened} 
                onCloseReq={() => setModalOpened(false)} 
                onImageChangeReq={(image) => setModalimage(image)}
                randomBreedImages={randomBreedImages}
                modalImage={modalImage}
                title={selectedBreed}
            />

        </div>
    )
}

export default List