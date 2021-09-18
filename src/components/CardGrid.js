import React from 'react'
import './CardGrid.css';

function CardGrid(props) {
    return (
        <div className="row g-3">
            {props.images.map((image, index) => 
                <div className="col-lg-3 col-md-6">
                    <div className="card p-3 d-flex flex-column">
                        <img src={image.img_src} alt={image.rover.name + " " + image.camera.full_name}/>
                        <div className="flex-grow-1"></div>
                        <hr/>
                        <h4 className="text-light">{image.rover.name + " - " + image.camera.full_name}</h4>
                        <p className="text-light">{image.earth_date}</p>
                        {
                            (props.likedImages.find(element => element.id === image.id) !== undefined) ? 
                                (<button type="button" className="btn btn-danger" onClick={() => props.handleUnlikeImage(image)}>Unlike</button>) :
                                (<button type="button" className="btn btn-success" onClick={() => props.handleLikeImage(image)}>Like</button>)
                        }
                    </div> 
                </div>
            )}
        </div>
    )
}

export default CardGrid
