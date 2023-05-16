import React, { useState, useRef, useEffect } from 'react';
import { FaPlus, FaUser, FaHome } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './PetPage.css';

const petImages = {
    Dogs: '/images/homepage/dog-container.jpg',
    Cats: '/images/homepage/dog-container.jpg',
    Birds: '/images/homepage/dog-container.jpg',
    Fish: '/images/homepage/dog-container.jpg',
    'Other Pets': '/images/homepage/dog-container.jpg',
};

function PetPage() {
    const { petId } = useParams();
    const [activeIndex, setActiveIndex] = useState(0);
    const [petData, setPetData] = useState({});
    const imageContainerRef = useRef(null);
    const dotRefs = useRef([]);

    useEffect(() => {
        const imageContainer = imageContainerRef.current;

        // Function to fetch pets data from the backend
        const fetchPets = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/pet/get/${petId}`);
                const data = await response.json();
                setPetData(data.data);
                console.log(data)
                console.log(petData)
            } catch (error) {
                console.error(error);
            }
        };

        fetchPets();

        const updateActiveIndex = () => {
            const imageWidth = imageContainer.querySelector('.image').offsetWidth;
            const scrollPosition = imageContainer.scrollLeft + (imageWidth / 2);
            const newIndex = Math.floor(scrollPosition / imageWidth);
            setActiveIndex(newIndex);
            resetDotOpacity();
        };

        let timeoutId = null;

        const fadeOutDots = () => {
            const dots = dotRefs.current;
            if (dots[0] != null) {
                const isVisible = dots[0].style.opacity === '1';
                if (isVisible) {
                    dots.forEach((dot) => {
                        dot.classList.add('fade-out');
                        dot.classList.remove('fade-in');
                    });
                }
            }
        };

        imageContainer.addEventListener('scroll', () => {
            updateActiveIndex();
            clearTimeout(timeoutId);
            timeoutId = setTimeout(fadeOutDots, 1000);
        });

        window.addEventListener('resize', updateActiveIndex);

        return () => {
            imageContainer.removeEventListener('scroll', updateActiveIndex);
            window.removeEventListener('resize', updateActiveIndex);
        };
    }, [petId]);

    const handleDotClick = (index) => {
        setActiveIndex(index);
        const imageWidth = imageContainerRef.current.querySelector('.image').offsetWidth;
        imageContainerRef.current.scrollTo({
            left: imageWidth * index,
            behavior: 'smooth',
        });
        resetDotOpacity();
    };

    const resetDotOpacity = () => {
        const dots = dotRefs.current;
        dots.forEach((dot) => {
            dot.style.opacity = '1';
            dot.classList.remove('fade-out');
            dot.classList.add('fade-in');
        });
    };

    return (
        <div className="homepage-container">
            {/* Top Bar */}
            <div className="search-bar-container">
                <button className="back-button" onClick={() => window.history.back()}>
                    <i className="fas fa-chevron-left"></i>
                </button>
                <div className="search-wrapper">
                    <input type="text" className="search-bar" placeholder="Search" />
                    <i className="fas fa-search"></i>
                </div>
            </div>

            {/* Image Carousel */}
            <div className="image-container" ref={imageContainerRef}>
                <img
                    className="image"
                    src={petData.image}
                    alt={`Pet image`}
                    style={{ scrollSnapAlign: 'center' }}
                />
            </div>

            {/* Image Carousel Dots */}
            <div className="dot-container">
                {Object.keys(petImages).map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === activeIndex ? 'active' : ''}`}
                        ref={(ref) => (dotRefs.current[index] = ref)}
                        onClick={() => handleDotClick(index)}
                    />
                ))}
            </div>

            <div className="pet-description">
                <div className="pet-info">
                    <div className="pet-name">
                        <div className="custom-pet-name">{petData.name}</div>
                        <div className="pet-age">{petData.age}</div>
                    </div>
                    <div className="pet-info-details">
                        <div className="pet-breed">{petData.breed}</div>
                        <div className="pet-color">{petData.color}</div>
                        <div className="pet-location">{petData.location}</div>
                    </div>
                </div>
                <p className="pet-description-text">{petData.description}</p>
                <p className="owner-contact-no">{petData.owner_contact_no}</p>
            </div>



            {/* Bottom Panel */}
            <div className="bottom-panel">
                <Link to="/" className="bottom-panel-icon">
                    <FaHome />
                </Link>
                <Link to="/new-post" className="bottom-panel-icon">
                    <FaPlus />
                </Link>
                <Link to="/" className="bottom-panel-icon">
                    <FaUser />
                </Link>
            </div>
        </div>
    );
}

export default PetPage;
