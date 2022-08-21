import { motion, AnimatePresence } from "framer-motion"
import { v4 as uuidv4 } from 'uuid';

const CloseIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="24" height="24"
            viewBox="0 0 24 24"
            style={{ fill: '#dd0000' }}><path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path></svg>
    )
}

const Modal = ({ loading, opened, onCloseReq, title, modalImage, randomBreedImages, onImageChangeReq }) => {
    return (
        <AnimatePresence exitBeforeEnter>
            {opened && (
                <motion.div 
                    className="modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div 
                        className="modalBody"
                        initial={{ translateY: 20 }}
                        animate={{ translateY: 0 }}
                        exit={{ translateY: 20 }}
                    >
                        <div className="modalBodyHeader">
                            <div className="modalBodyHeaderTitle">{title}</div>
                            <button onClick={onCloseReq}>
                                <CloseIcon />
                            </button>
                        </div>

                        <div className="modalBodyContent">
                            <div className="currentImage">
                                <img src={modalImage} alt={title} />
                            </div>

                            <div className="thumbnails">
                                {randomBreedImages && randomBreedImages.map((image) => (<div className="thumbnail" key={uuidv4()} onClick={() => onImageChangeReq(image)}><img src={image} alt={title} /></div>))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;